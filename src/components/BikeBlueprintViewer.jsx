import React, { useCallback, useEffect, useRef } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { BIKE_MODEL, BIKE_PARTS, BIKE_PART_IDS } from '../data/bikeParts';
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
}) {
  const wrapRef = useRef(null);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const explodeTextRef = useRef(null);
  const explodeBarRef = useRef(null);
  const markerEls = useRef(new Map());
  const onSelectRef = useRef(onSelectPart);

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

  const handleKeyDown = (event) => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (event.key === '+' || event.key === '=') scene.zoomBy(0.75);
    else if (event.key === '-' || event.key === '_') scene.zoomBy(1.33);
    else if (event.key === 'Escape' || event.key === '0') scene.reassemble();
    else return;
    event.preventDefault();
  };

  const summary = markerIds.length > 0
    ? `Highlighting ${markerIds.map((id, index) => `${index + 1}: ${nameOf(id)}`).join(', ')}. Zoom in to separate the parts.`
    : 'Interactive 3D blueprint. Drag to rotate, scroll or pinch to zoom.';

  return (
    <div
      ref={wrapRef}
      className="bp-viewer"
      tabIndex={0}
      role="group"
      aria-label="Interactive 3D blueprint of the motorcycle"
      onKeyDown={handleKeyDown}
    >
      <div ref={mountRef} className="bp-stage" />

      <div className="bp-hud bp-hud-tl" aria-hidden="true">
        <span>CAD_VIEW: ORBIT</span>
        <span className="bp-hud-model">MODEL: {BIKE_MODEL.code}</span>
        <span className="bp-hud-warn">STYLISED, NOT MANUFACTURER CAD</span>
      </div>
      <div className="bp-hud bp-hud-tr" aria-hidden="true">
        <span>EXPLODE <b ref={explodeTextRef}>0%</b></span>
        <span className="bp-bar"><i ref={explodeBarRef} /></span>
        <span>PARTS: {PART_COUNT}</span>
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

      <div className="bp-controls">
        <button type="button" className="bp-btn" onClick={() => sceneRef.current?.zoomBy(0.7)} aria-label="Zoom in and separate parts"><Plus size={16} aria-hidden="true" /></button>
        <button type="button" className="bp-btn" onClick={() => sceneRef.current?.zoomBy(1.4)} aria-label="Zoom out"><Minus size={16} aria-hidden="true" /></button>
        <button type="button" className="bp-btn bp-btn-wide" onClick={() => sceneRef.current?.reassemble()}><RotateCcw size={15} aria-hidden="true" /> Reassemble</button>
      </div>

      <p className="bp-hint" aria-hidden="true">Drag to rotate · scroll or pinch to zoom in and separate parts · tap a part</p>
      <p className="bp-sr" aria-live="polite">{summary}</p>

      <div className="bp-fallback" role="status">
        <strong>3D view unavailable</strong>
        <span>Your browser could not start WebGL. The photo and repair guide for this part are still available.</span>
      </div>
    </div>
  );
}
