import React, { useState, useEffect } from 'react';
import { AlertOctagon, Bell, HelpCircle, MapPin, PhoneCall, Settings } from 'lucide-react';
import './ToolViews.css';

export default function ProfileView({ onTriggerEmergency }) {
  const [units, setUnits] = useState(() => {
    try {
      return localStorage.getItem('enginium_pref_units') || 'metric';
    } catch {
      return 'metric';
    }
  });

  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('enginium_pref_language') || 'english';
    } catch {
      return 'english';
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('enginium_pref_notifications');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('enginium_pref_units', units);
      localStorage.setItem('enginium_pref_language', language);
      localStorage.setItem('enginium_pref_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn('Failed to save preferences to localStorage', e);
    }
  }, [units, language, notifications]);

  return (
    <main className="tool-view">
      <div className="tool-page">
        <header className="tool-header">
          <div><span className="ui-eyebrow">Profile</span><h1 className="ui-title">Preferences and support</h1><p className="ui-muted">Local account preview and roadside shortcuts.</p></div>
        </header>

        <div className="tool-notice" role="note">
          <Settings size={19} aria-hidden="true" />
          <div><strong>Session preview</strong> Settings only change this screen for this session. Account sync, translation, notifications, location sharing and OBD telemetry are not connected.</div>
        </div>

        <div className="profile-grid">
          <div className="ui-stack">
            <section className="ui-card">
              <div className="profile-identity"><div className="profile-avatar" aria-hidden="true">KA</div><div><span className="ui-eyebrow">Enginium pilot · demo</span><h2>Kamanasis</h2><p className="ui-muted">kamanasis@enginium.app</p></div></div>
            </section>

            <section className="ui-card sos-card">
              <span className="ui-eyebrow">Roadside shortcut</span>
              <h2 className="ui-title">Roadside help</h2>
              <p className="ui-muted">Open the local checklist for steps. Call the hotline directly for real assistance.</p>
              <button type="button" className="ui-btn ui-btn-primary sos-primary" onClick={() => onTriggerEmergency?.()}><AlertOctagon size={16} aria-hidden="true" /> Open SOS mode</button>
              <div className="sos-actions">
                <a className="ui-btn" href="tel:1033"><PhoneCall size={16} aria-hidden="true" /> National Highway 1033</a>
                <button type="button" className="ui-btn" disabled title="Location sharing is unavailable in this local build"><MapPin size={16} aria-hidden="true" /> Location sharing unavailable</button>
              </div>
            </section>
          </div>

          <div className="ui-stack">
            <section className="ui-card">
              <div className="tool-inline profile-section-heading"><Settings size={18} aria-hidden="true" /><div><span className="ui-eyebrow">Preferences</span><strong>Screen preview</strong></div></div>
              <div className="preference-list">
                <div className="preference-row">
                  <div className="preference-copy"><strong>Measurement units</strong><span>Used by this screen only.</span></div>
                  <div className="preference-control tool-inline" role="group" aria-label="Measurement units">
                    <button type="button" className={`ui-btn ${units === 'metric' ? 'ui-btn-primary' : ''}`} aria-pressed={units === 'metric'} onClick={() => setUnits('metric')}>Metric</button>
                    <button type="button" className={`ui-btn ${units === 'imperial' ? 'ui-btn-primary' : ''}`} aria-pressed={units === 'imperial'} onClick={() => setUnits('imperial')}>Imperial</button>
                  </div>
                </div>
                <div className="preference-row">
                  <div className="preference-copy"><strong>Language preview</strong><span>Selection is shown locally; translation is not applied.</span></div>
                  <div className="preference-control"><label className="profile-visually-hidden" htmlFor="profile-language">Language preview</label><select id="profile-language" value={language} onChange={(event) => setLanguage(event.target.value)}><option value="english">English</option><option value="hindi">हिन्दी (Hindi)</option><option value="bengali">বাংলা (Bengali)</option></select></div>
                </div>
                <div className="preference-row">
                  <div className="preference-copy"><strong>Reminder notifications</strong><span>{notifications ? 'Preview says reminders are on.' : 'Preview says reminders are off.'}</span></div>
                  <button type="button" className={`toggle ${notifications ? 'is-on' : ''}`} aria-label="Toggle reminder notifications preview" aria-pressed={notifications} onClick={() => setNotifications((current) => !current)}><span /></button>
                </div>
              </div>
            </section>

            <section className="ui-card">
              <div className="tool-inline profile-section-heading"><Bell size={18} aria-hidden="true" /><div><span className="ui-eyebrow">System details</span><strong>Availability</strong></div></div>
              <div className="support-list">
                <div className="support-row"><span>OBD-II connection</span><strong>Not connected</strong></div>
                <div className="support-row"><span>Vehicle data</span><strong>Demo catalog</strong></div>
                <div className="support-row"><span>App version</span><strong>ENGINIUM-1.0.0-MVP</strong></div>
                <div className="support-row"><span><HelpCircle size={14} aria-hidden="true" /> Need help?</span><strong>Use the local guides</strong></div>
              </div>
            </section>
          </div>
        </div>

      </div>
    </main>
  );
}
