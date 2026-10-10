import React, { useState } from 'react';
import { AlertOctagon, Bell, HelpCircle, MapPin, PhoneCall, Settings, ShieldAlert, User } from 'lucide-react';
import './ToolViews.css';

export default function ProfileView({ onTriggerEmergency }) {
  const [units, setUnits] = useState('metric');
  const [language, setLanguage] = useState('english');
  const [notifications, setNotifications] = useState(true);

  return (
    <main className="tool-view">
      <div className="tool-page">
        <header className="tool-header">
          <div><span className="ui-eyebrow">Account & preferences</span><h1 className="ui-title">A clear, local profile</h1><p className="ui-muted">Keep your preferences and roadside shortcuts close at hand.</p></div>
          <span className="ui-tag ui-tag-demo"><User size={14} /> Demo account</span>
        </header>

        <div className="tool-notice" role="note">
          <Settings size={19} aria-hidden="true" />
          <div><strong>Preview-only settings</strong> These controls update the current screen for this session. There is no account sync, translation service, notification service, or connected OBD device.</div>
        </div>

        <div className="profile-grid" style={{ marginTop: 20 }}>
          <div className="ui-stack">
            <section className="ui-card">
              <div className="profile-identity"><div className="profile-avatar" aria-hidden="true">KA</div><div><span className="ui-eyebrow">Enginium pilot · demo</span><h2>Kamanasis</h2><p className="ui-muted">kamanasis@enginium.app</p></div></div>
              <p className="ui-muted" style={{ marginBottom: 0, marginTop: 18 }}>This is a local account preview. Your vehicle notes remain in the app session and are not sent to a service.</p>
            </section>

            <section className="ui-card sos-card">
              <span className="ui-eyebrow">Roadside shortcut</span>
              <h2 className="ui-title">Highway assistance SOS</h2>
              <p className="ui-muted">Open the local emergency checklist when you need a calm sequence of actions. Use a phone call for the real hotline.</p>
              <button type="button" className="ui-btn ui-btn-primary" style={{ width: '100%', marginTop: 14 }} onClick={() => onTriggerEmergency?.()}><AlertOctagon size={16} aria-hidden="true" /> Open SOS mode</button>
              <div className="sos-actions">
                <a className="ui-btn" href="tel:1033"><PhoneCall size={16} aria-hidden="true" /> National Highway 1033</a>
                <button type="button" className="ui-btn" disabled title="Location sharing is unavailable in this local build"><MapPin size={16} aria-hidden="true" /> Location sharing unavailable</button>
              </div>
            </section>
          </div>

          <div className="ui-stack">
            <section className="ui-card">
              <div className="tool-inline" style={{ marginBottom: 18 }}><Settings size={18} aria-hidden="true" /><div><span className="ui-eyebrow" style={{ marginBottom: 0 }}>Preferences</span><strong>Preview how Enginium behaves</strong></div></div>
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
                  <div className="preference-control"><label className="ui-label" htmlFor="profile-language" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Language preview</label><select id="profile-language" value={language} onChange={(event) => setLanguage(event.target.value)}><option value="english">English</option><option value="hindi">हिन्दी (Hindi)</option><option value="bengali">বাংলা (Bengali)</option></select></div>
                </div>
                <div className="preference-row">
                  <div className="preference-copy"><strong>Reminder notifications</strong><span>{notifications ? 'Preview says reminders are on.' : 'Preview says reminders are off.'}</span></div>
                  <button type="button" className={`toggle ${notifications ? 'is-on' : ''}`} aria-label="Toggle reminder notifications preview" aria-pressed={notifications} onClick={() => setNotifications((current) => !current)}><span /></button>
                </div>
              </div>
            </section>

            <section className="ui-card">
              <div className="tool-inline" style={{ marginBottom: 16 }}><Bell size={18} aria-hidden="true" /><div><span className="ui-eyebrow" style={{ marginBottom: 0 }}>Local system details</span><strong>What is available here</strong></div></div>
              <div className="support-list">
                <div className="support-row"><span>OBD-II connection</span><strong>Not connected</strong></div>
                <div className="support-row"><span>Vehicle data</span><strong>Demo catalog</strong></div>
                <div className="support-row"><span>App version</span><strong>ENGINIUM-1.0.0-MVP</strong></div>
                <div className="support-row"><span><HelpCircle size={14} aria-hidden="true" /> Need help?</span><strong>Use the local guides</strong></div>
              </div>
            </section>
          </div>
        </div>

        <div className="tool-unavailable" style={{ marginTop: 20 }}><ShieldAlert size={16} aria-hidden="true" /> Location sharing, account sync, and OBD telemetry are intentionally unavailable in this local UI build.</div>
      </div>
    </main>
  );
}
