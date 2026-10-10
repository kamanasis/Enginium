import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, ClipboardList, Send, Sparkles, Wrench } from 'lucide-react';
import './ToolViews.css';

const DEFAULT_STEPS = [
  'Let the engine cool before inspecting the affected part.',
  'Check the visible connector, fastener, or adjustment named in the result.',
  'Stop if the symptom worsens or the part is damaged, then use a qualified technician.',
];

const DEFAULT_TOOLS = ['Torch', 'Basic hand tools', 'Vehicle manual'];

export default function DiagnoseView({
  selectedVehicle,
  diagnoseInput,
  setDiagnoseInput,
  onAddServiceRecord,
  messages,
  setMessages,
  activeDiagnosis,
  setActiveDiagnosis,
  loading,
  setLoading,
}) {
  const [inputValue, setInputValue] = useState('');
  const [diagnosticQuestions, setDiagnosticQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersLog, setAnswersLog] = useState({});
  const messagesEndRef = useRef(null);
  const timersRef = useRef([]);
  const handleSendRef = useRef(null);

  const queueTimer = (callback, delay) => {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
    return timer;
  };

  useEffect(() => () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!diagnoseInput?.trim()) return;
    const incomingText = diagnoseInput;
    const timer = window.setTimeout(() => {
      setInputValue(incomingText);
      setDiagnoseInput('');
      handleSendRef.current?.(incomingText);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [diagnoseInput, setDiagnoseInput]);

  const addMessage = (message) => {
    setMessages((previous) => [...previous, { id: `${Date.now()}-${previous.length}`, ...message }]);
  };

  const startQuestionFlow = () => {
    setDiagnosticQuestions([
      { id: 'starter', text: 'Does the starter motor crank normally when pressing the ignition?' },
      { id: 'cold', text: 'Does this issue happen only in the morning when the engine is cold?' },
      { id: 'age', text: 'Was the vehicle battery replaced in the last 18 months?' },
    ]);
    setCurrentQuestionIndex(0);
    setAnswersLog({});
    addMessage({
      sender: 'ai',
      text: 'This is a deterministic demo questionnaire. I will use your answers to show a sample inspection path, not a live AI assessment.',
    });
  };

  const completeQuestionFlow = (answers) => {
    setLoading(true);
    setDiagnosticQuestions([]);
    queueTimer(() => {
      setLoading(false);
      addMessage({
        sender: 'ai',
        text: `Demo result for ${selectedVehicle.name}: the answers suggest checking battery health and terminal condition first.`,
      });
      setActiveDiagnosis({
        cause: 'Weak battery / terminal oxidation',
        confidenceList: [
          { name: 'Weak battery cell', confidence: '82%' },
          { name: 'Loose or oxidized terminals', confidence: '61%' },
          { name: 'Fouled spark plug electrode', confidence: '34%' },
        ],
        difficulty: 'Green',
        repairTime: '15 mins',
        partCost: '₹1,400',
        laborCost: '₹50',
        canDrive: 'Yes, but complete the checks before a long ride.',
        warning: 'A weak battery can affect starting and ignition behavior. This demo cannot verify voltage or safety in your vehicle.',
        diySteps: [
          'Locate the battery with the engine off and side panel secured.',
          'Inspect terminal leads for looseness or blue/white corrosion.',
          'Measure resting voltage with a multimeter; use the vehicle manual for the correct threshold.',
          'Have a technician test the battery under load if the symptom remains.',
        ],
        tools: ['8mm spanner', 'Multimeter', 'Protective gloves'],
        demoAnswers: answers,
      });
    }, 900);
  };

  const handleQuestionAnswer = (answerText, isYes) => {
    if (loading) return;
    const currentQuestion = diagnosticQuestions[currentQuestionIndex];
    const nextAnswers = { ...answersLog, [currentQuestion.id]: isYes };
    setAnswersLog(nextAnswers);
    addMessage({ sender: 'user', text: answerText });

    if (currentQuestionIndex + 1 < diagnosticQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuestionFlow(nextAnswers);
    }
  };

  const handleSend = (textToSend = inputValue) => {
    const cleanText = textToSend.trim();
    if (!cleanText || loading) return;

    addMessage({ sender: 'user', text: cleanText });
    setInputValue('');
    setLoading(true);
    setActiveDiagnosis(null);
    setDiagnosticQuestions([]);

    queueTimer(() => {
      setLoading(false);
      const query = cleanText.toLowerCase();
      if (query.includes('start') || query.includes('crank') || query.includes('battery')) {
        startQuestionFlow();
        return;
      }

      addMessage({
        sender: 'ai',
        text: `Demo intake for ${selectedVehicle.name}: this pattern can relate to a dirty spark plug or intake filter. Start with a visual check before replacing parts.`,
      });
      setActiveDiagnosis({
        cause: 'Possible spark plug fouling',
        confidenceList: [
          { name: 'Fouled spark plug', confidence: '75%' },
          { name: 'Dirty air intake filter', confidence: '45%' },
        ],
        difficulty: 'Green',
        repairTime: '15 mins',
        partCost: '₹180',
        laborCost: '₹80',
        canDrive: 'Short local ride only if the engine runs smoothly.',
        warning: 'A remote demo cannot confirm a safe-to-drive condition. Stop if there is smoke, a fuel smell, loss of control, or worsening noise.',
        diySteps: [
          'Let the engine cool and locate the spark plug cap.',
          'Inspect the cap and plug area for moisture, damage, or heavy soot.',
          'Use the correct plug socket and vehicle specification for any adjustment.',
          'If the symptom returns, have ignition and intake systems tested.',
        ],
        tools: ['Correct spark-plug socket', 'Torch', 'Vehicle specification sheet'],
      });
    }, 700);
  };

  useEffect(() => {
    handleSendRef.current = handleSend;
  });

  const handleSaveRepair = () => {
    if (!activeDiagnosis) return;
    const tools = activeDiagnosis.tools || DEFAULT_TOOLS;
    onAddServiceRecord({
      id: Date.now(),
      title: `${activeDiagnosis.cause} (demo check)`,
      desc: `Added from this local session. Estimated parts: ${activeDiagnosis.partCost || 'not provided'}. Tools: ${tools.join(', ')}.`,
      date: new Date().toISOString().split('T')[0],
    });
    addMessage({
      sender: 'system',
      text: "Added this demo check to the current Digital Garage session. It is not a permanent or cloud-synced record.",
    });
  };

  const questionsActive = diagnosticQuestions.length > 0;
  const currentQuestion = diagnosticQuestions[currentQuestionIndex];
  const resultSteps = activeDiagnosis?.diySteps || DEFAULT_STEPS;
  const resultTools = activeDiagnosis?.tools || DEFAULT_TOOLS;

  return (
    <main className="tool-view">
      <div className="tool-page">
        <header className="tool-header">
          <div>
            <span className="ui-eyebrow">Local diagnostic workspace</span>
            <h1 className="ui-title">A calmer way to investigate a symptom</h1>
            <p className="ui-muted">{selectedVehicle.name} · Describe what you noticed and follow a transparent demo inspection path.</p>
          </div>
          <div className="tool-header-actions">
            <span className="ui-tag ui-tag-demo"><Sparkles size={14} /> Demo logic</span>
          </div>
        </header>

        <div className="tool-notice" role="note">
          <ClipboardList size={19} aria-hidden="true" />
          <div><strong>Local-only demo</strong> Results are deterministic guidance for learning and planning. No API key, live AI, sensor, or attachment service is connected.</div>
        </div>

        <div className="diagnose-layout" style={{ marginTop: 20 }}>
          <section className="diagnose-main" aria-label="Diagnostic conversation">
            <div className="ui-card diagnose-thread" aria-live="polite">
              {messages.length === 0 && (
                <div className="ui-empty">
                  <div>
                    <Sparkles size={30} aria-hidden="true" />
                    <p><strong>Start with a plain-language symptom</strong></p>
                    <p className="ui-muted">Mention a sound, vibration, starting issue, or change in handling.</p>
                  </div>
                </div>
              )}
              {messages.map((message) => (
                <div key={message.id} className={`diagnose-message ${message.sender === 'user' ? 'user' : message.sender === 'system' ? 'system' : ''}`}>
                  {message.text}
                </div>
              ))}
              {questionsActive && currentQuestion && (
                <div className="diagnose-step">
                  <span className="ui-tag ui-tag-demo">Demo step {currentQuestionIndex + 1} of {diagnosticQuestions.length}</span>
                  <p>{currentQuestion.text}</p>
                  <div className="diagnose-step-actions">
                    <button type="button" className="ui-btn ui-btn-primary" onClick={() => handleQuestionAnswer('Yes', true)} disabled={loading}>Yes</button>
                    <button type="button" className="ui-btn" onClick={() => handleQuestionAnswer('No', false)} disabled={loading}>No</button>
                  </div>
                </div>
              )}
              {loading && <div className="diagnose-message" role="status">Preparing the local demo result…</div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="ui-label" id="diagnose-composer-label">Describe the issue</div>
            <div className="diagnose-composer">
              <input
                className="ui-input"
                aria-labelledby="diagnose-composer-label"
                type="text"
                value={inputValue}
                placeholder="Example: a metallic rattle when I start the bike"
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => { if (event.key === 'Enter') handleSend(); }}
                disabled={loading}
              />
              <button type="button" className="ui-btn ui-btn-primary" onClick={() => handleSend()} disabled={loading || !inputValue.trim()}>
                <Send size={16} aria-hidden="true" /> Send
              </button>
            </div>
            <div className="quick-prompts" aria-label="Quick prompts">
              {['Slow to start', 'Metallic rattle', 'Poor pickup'].map((prompt) => (
                <button key={prompt} type="button" className="ui-btn ui-btn-quiet" onClick={() => handleSend(prompt)} disabled={loading}>{prompt}</button>
              ))}
            </div>
          </section>

          <aside className="diagnose-side ui-stack" aria-label="Diagnostic result">
            {activeDiagnosis ? (
              <section className="ui-card diagnose-result">
                <div className="diagnose-result-header">
                  <div>
                    <span className="ui-eyebrow">Demo result</span>
                    <h2>{activeDiagnosis.cause}</h2>
                  </div>
                  <span className="ui-tag ui-tag-success">{activeDiagnosis.difficulty || 'Review'}</span>
                </div>

                <div className="diagnose-stats">
                  <div className="diagnose-stat"><span className="ui-label">Time</span><strong>{activeDiagnosis.repairTime || 'Check'}</strong></div>
                  <div className="diagnose-stat"><span className="ui-label">Parts</span><strong>{activeDiagnosis.partCost || 'Ask a shop'}</strong></div>
                  <div className="diagnose-stat"><span className="ui-label">Drive note</span><strong>{activeDiagnosis.canDrive || 'Inspect first'}</strong></div>
                </div>

                {activeDiagnosis.confidenceList?.length > 0 && (
                  <div>
                    <span className="ui-label">Possible causes · not a measurement</span>
                    <ul className="diagnose-causes">
                      {activeDiagnosis.confidenceList.map((item) => <li key={item.name} className="diagnose-cause"><span>{item.name}</span><strong>{item.confidence}</strong></li>)}
                    </ul>
                  </div>
                )}

                <div>
                  <span className="ui-label">Suggested steps</span>
                  <ul className="diagnose-list">{resultSteps.map((step) => <li key={step}>{step}</li>)}</ul>
                </div>

                <div>
                  <span className="ui-label">Tools to have ready</span>
                  <p className="ui-muted"><Wrench size={15} aria-hidden="true" /> {resultTools.join(' · ')}</p>
                </div>

                {activeDiagnosis.warning && <div className="diagnose-warning"><strong><AlertTriangle size={15} aria-hidden="true" /> Safety context</strong>{activeDiagnosis.warning}</div>}
                <button type="button" className="ui-btn ui-btn-primary" onClick={handleSaveRepair}><CheckCircle2 size={16} aria-hidden="true" /> Add check to Digital Garage</button>
              </section>
            ) : (
              <div className="ui-card ui-empty"><div><Wrench size={28} aria-hidden="true" /><p><strong>Your result will appear here</strong></p><p className="ui-muted">The demo will keep possible causes, steps, and safety context together.</p></div></div>
            )}
            <div className="tool-unavailable">Photo, audio, and document attachments are unavailable in this local build. Describe the observation in text or use Acoustic for a separate sound-profile simulation.</div>
          </aside>
        </div>
      </div>
    </main>
  );
}
