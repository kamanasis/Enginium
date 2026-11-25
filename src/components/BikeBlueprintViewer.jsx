import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2, Minus, Plus, RotateCcw, X } from 'lucide-react';
import { BIKE_MODEL, BIKE_PARTS, BIKE_PART_IDS, BIKE_SPEC, PLACEMENT_LEVELS } from '../data/bikeParts';
import { createBikeScene } from '../viewer/bikeScene';
import '../viewer/bikeBlueprint.css';

const PART_COUNT = BIKE_PARTS.filter((part) => part.selectable !== false).length;

/**
 * Interactive blueprint bike. The three.js scene is created once; props only
 * change which part is highlighted and which numbered markers blink.
 *
 * @param {string|null} selectedPartId   catalogue id to highlight
 * @param {string[]}    markerPartIds    ordered ids; the first one blinks, the rest are numbered 2, 3...
 * @param {Object}      partNames        catalogue id -> display name
 * @param {(id: string) => void} onSelectPart
 */
export default function BikeBlueprintViewer({
  selectedPartId = null,
  markerPartIds = [],
  partNames = {},
  onSelectPart,
  debug = false,
  isEnlarged: controlledIsEnlarged,
  onToggleEnlarge,
}) {
  const wrapRef = useRef(null);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const explodeTextRef = useRef(null);
  const explodeBarRef = useRef(null);
  const dimsRef = useRef(null);
  const markerEls = useRef(new Map());
  const onSelectRef = useRef(onSelectPart);

  const [internalEnlarged, setInternalEnlarged] = useState(false);
  const isEnlarged = controlledIsEnlarged !== undefined ? controlledIsEnlarged : internalEnlarged;

  const toggleEnlarge = useCallback(() => {
    const next = !isEnlarged;
    if (onToggleEnlarge) {
      onToggleEnlarge(next);
    } else {
      setInternalEnlarged(next);
    }

    try {
      if (next) {
        if (!document.fullscreenElement && wrapRef.current?.requestFullscreen) {
          wrapRef.current.requestFullscreen().catch(() => {});
        }
      } else {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    } catch {
      // safe fallback
    }
  }, [isEnlarged, onToggleEnlarge]);

  // Global escape key handler when enlarged
  useEffect(() => {
    if (!isEnlarged) return undefined;
    const onGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        toggleEnlarge();
      }
    };
    window.addEventListener('keydown', onGlobalKeyDown);
    return () => window.removeEventListener('keydown', onGlobalKeyDown);
  }, [isEnlarged, toggleEnlarge]);

  // Lock body scroll during full-screen enlargement
  useEffect(() => {
    if (isEnlarged) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isEnlarged]);

  // Synchronize with native browser fullscreen changes
  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement && isEnlarged) {
        if (onToggleEnlarge) onToggleEnlarge(false);
        else setInternalEnlarged(false);
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, [isEnlarged, onToggleEnlarge]);

  useEffect(() => {
    onSelectRef.current = onSelectPart;
  }, [onSelectPart]);

  const markerIds = markerPartIds.filter((id) => BIKE_PART_IDS.has(id));
  const markerKey = markerIds.join('|');

  const handleFrame = useCallback((frame) => {
    const percent = Math.round(frame.explosion * 100);
    if (explodeTextRef.current && explodeTextRef.current.textContent !== `${percent}%`) {
      explodeTextRef.current.textContent = `${percent}%`;
    }
    if (dimsRef.current) dimsRef.current.style.opacity = String(Math.max(0, 1 - frame.explosion * 3).toFixed(2));
    if (explodeBarRef.current) explodeBarRef.current.style.transform = `scaleX(${frame.explosion.toFixed(3)})`;
    for (const marker of frame.markers) {
      const el = markerEls.current.get(marker.id);
      if (!el) continue;
      el.style.transform = `translate(${marker.x.toFixed(1)}px, ${marker.y.toFixed(1)}px)`;
      el.style.visibility = marker.visible ? 'visible' : 'hidden';
    }
  }, []);

  // Create the scene once.
  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const scene = createBikeScene({
      container: mountRef.current,
      onSelect: (id) => onSelectRef.current?.(id),
      onFrame: handleFrame,
      reducedMotion,
    });
    sceneRef.current = scene;
    const wrap = wrapRef.current;
    if (!scene) {
      wrap.dataset.unavailable = 'true';
      return undefined;
    }
    delete wrap.dataset.unavailable;
    // Test hook: dev server or an explicit debug prop only, never in production builds.
    const exposeDebug = debug || import.meta.env.DEV;
    if (exposeDebug) window.__bikeViewer = scene;
    return () => {
      scene.dispose();
      sceneRef.current = null;
      if (exposeDebug && window.__bikeViewer === scene) delete window.__bikeViewer;
    };
  }, [handleFrame, debug]);

  // Props only recolour; they never rebuild the scene.
  useEffect(() => {
    sceneRef.current?.setSelected(selectedPartId);
  }, [selectedPartId]);

  useEffect(() => {
    sceneRef.current?.setMarkers(markerKey ? markerKey.split('|') : []);
  }, [markerKey]);

  const nameOf = (id) => partNames[id] || id;

  // Which part's placement confidence to show: the selected one, else the primary marker.
  const focusId = selectedPartId && BIKE_PART_IDS.has(selectedPartId) ? selectedPartId : markerIds[0];
  const focusPart = focusId ? BIKE_PARTS.find((part) => part.id === focusId) : null;

  const handleKeyDown = (event) => {
    const scene = sceneRef.current;
    if (event.key === 'Escape') {
      if (isEnlarged) {
        toggleEnlarge();
        event.preventDefault();
        return;
      }
      if (scene) scene.reassemble();
      return;
    }
    if (!scene) return;
    if (event.key === '+' || event.key === '=') scene.zoomBy(0.75);
    else if (event.key === '-' || event.key === '_') scene.zoomBy(1.33);
    else if (event.key === '0') scene.reassemble();
    else return;
    event.preventDefault();
  };

  const summary = markerIds.length > 0
    ? `Highlighting ${markerIds.map((id, index) => `${index + 1}: ${nameOf(id)}`).join(', ')}. Zoom in to separate the parts.`
    : 'Interactive 3D blueprint. Drag to rotate, scroll or pinch to zoom.';

  return (
    <div
      ref={wrapRef}
      className={`bp-viewer ${isEnlarged ? 'is-enlarged' : ''}`}
      tabIndex={0}
      role="group"
      aria-label="Interactive 3D blueprint of the motorcycle"
      onKeyDown={handleKeyDown}
    >
      <div ref={mountRef} className="bp-stage" />

      {isEnlarged && (
        <>
          <div className="bp-hud-center-pill">
            <span className="bp-hud-center-dot" />
            <span className="bp-hud-center-tag">FULLSCREEN CAD BLUEPRINT</span>
            {selectedPartId && (
              <span className="bp-hud-center-part">· {nameOf(selectedPartId)}</span>
            )}
          </div>
          <button
            type="button"
            className="bp-fullscreen-exit-floating"
            onClick={toggleEnlarge}
            aria-label="Exit fullscreen mode"
            title="Exit fullscreen mode (Esc)"
          >
            <X size={15} aria-hidden="true" />
            <span>Exit Fullscreen</span>
            <kbd>ESC</kbd>
          </button>
        </>
      )}

      <div className="bp-hud bp-hud-tl" aria-hidden="true">
        <span>CAD_VIEW: ORBIT {isEnlarged ? '(FULLSCREEN)' : ''}</span>
        <span className="bp-hud-model">MODEL: {BIKE_MODEL.code}</span>
        <span className="bp-hud-warn">STYLISED, NOT MANUFACTURER CAD</span>
      </div>
      <div ref={dimsRef} className="bp-dims" aria-hidden="true">
        <span>WHEELBASE {BIKE_SPEC.wheelbaseMm} mm</span>
        <span>SEAT {BIKE_SPEC.seatHeightMm} mm</span>
        <span>CLEARANCE {BIKE_SPEC.groundClearanceMm} mm</span>
      </div>
      {focusPart && (
        <div className={`bp-place is-${focusPart.placement}`} role="note" title={PLACEMENT_LEVELS[focusPart.placement]}>
          <b>{nameOf(focusPart.id)}</b>
          <span>Placement: {focusPart.placement === 'manual' ? 'stated in Hero document' : focusPart.placement === 'inferred' ? 'inferred' : 'approximate, check the bike'}</span>
          <small>{focusPart.source}</small>
        </div>
      )}
      <div className="bp-hud bp-hud-tr">
        <span aria-hidden="true">EXPLODE <b ref={explodeTextRef}>0%</b></span>
        <span className="bp-bar" aria-hidden="true"><i ref={explodeBarRef} /></span>
        <span aria-hidden="true">PARTS: {PART_COUNT}</span>
      </div>

      <div className="bp-markers">
        {markerIds.map((id, index) => (
          <button
            key={id}
            ref={(el) => {
              if (el) markerEls.current.set(id, el);
              else markerEls.current.delete(id);
            }}
            type="button"
            className={`bp-marker ${index === 0 ? 'is-primary' : ''}`}
            style={{ visibility: 'hidden' }}
            aria-label={`${index + 1}. ${nameOf(id)}`}
            onClick={() => onSelectRef.current?.(id)}
          >
            <span className="bp-marker-dot">
              <span className="bp-marker-ring" aria-hidden="true" />
              <span className="bp-marker-num">{index + 1}</span>
            </span>
            <span className="bp-marker-label">{nameOf(id)}</span>
          </button>
        ))}
      </div>

      <div className="bp-bottom-bar">
        <p className="bp-hint" aria-hidden="true">
          {isEnlarged
            ? 'Drag to orbit · Scroll to zoom & explode · Tap a part · ESC to exit'
            : 'Drag to orbit · Scroll to zoom & explode · Tap a part'}
        </p>
        <div className="bp-controls">
          <button type="button" className="bp-btn" onClick={() => sceneRef.current?.zoomBy(0.7)} aria-label="Zoom in and separate parts" title="Zoom in & explode"><Plus size={16} aria-hidden="true" /></button>
          <button type="button" className="bp-btn" onClick={() => sceneRef.current?.zoomBy(1.4)} aria-label="Zoom out" title="Zoom out"><Minus size={16} aria-hidden="true" /></button>
          <button type="button" className="bp-btn bp-btn-wide" onClick={() => sceneRef.current?.reassemble()} title="Reset view & reassemble (0)"><RotateCcw size={14} aria-hidden="true" /> Reset</button>
          <button
            type="button"
            className={`bp-btn bp-btn-wide bp-btn-enlarge ${isEnlarged ? 'is-active' : ''}`}
            onClick={toggleEnlarge}
            aria-label={isEnlarged ? 'Exit fullscreen view (Esc)' : 'Enlarge blueprint to full screen'}
            title={isEnlarged ? 'Exit fullscreen view (Esc)' : 'Enlarge blueprint to full screen'}
          >
            {isEnlarged ? <Minimize2 size={14} aria-hidden="true" /> : <Maximize2 size={14} aria-hidden="true" />}
            <span>{isEnlarged ? 'Minimize' : 'Enlarge'}</span>
          </button>
        </div>
      </div>
      <p className="bp-sr" aria-live="polite">{summary}</p>

      <div className="bp-fallback" role="status">
        <strong>3D view unavailable</strong>
        <span>Your browser could not start WebGL. The photo and repair guide for this part are still available.</span>
      </div>
    </div>
  );
}
