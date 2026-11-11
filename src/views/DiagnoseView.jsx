import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Crosshair, Send, Sparkles, Wrench } from 'lucide-react';
import { UNKNOWN_SYMPTOM_HELP, buildDiagnosis, buildStopResult, classifySymptom } from '../data/diagnosis';
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
  onInspectPart,
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
    setLoading(false);
  }, [setLoading]);

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

  const familyRef = useRef(null);

  const startQuestionFlow = (family) => {
    familyRef.current = family;
    setDiagnosticQuestions(family.questions);
    setCurrentQuestionIndex(0);
    setAnswersLog({});
    addMessage({
      sender: 'ai',
      text: `This sounds like ${family.label.toLowerCase()} on your ${selectedVehicle.name}. Several causes are possible, so a few quick questions will help rank what to check first. Answer "Not sure" if you do not know.`,
    });
  };

  const completeQuestionFlow = (answers) => {
    setLoading(true);
    setDiagnosticQuestions([]);
    queueTimer(() => {
      setLoading(false);
      const diagnosis = buildDiagnosis(familyRef.current, answers, selectedVehicle);
      if (!diagnosis) {
        addMessage({
          sender: 'ai',
          text: `The parts list for ${selectedVehicle.name} does not include anything I can point to for this symptom yet. Please have a qualified mechanic look at it.`,
        });
        return;
      }
      addMessage({
        sender: 'ai',
        text: `Based on your answers, the first thing worth inspecting on your ${selectedVehicle.name} is the ${diagnosis.confidenceList[0].name.toLowerCase()}. This is a ranked possibility from simple rules, not a confirmed fault.`,
      });
      setActiveDiagnosis({ ...diagnosis, demoAnswers: answers });
    }, 600);
  };

  const handleQuestionAnswer = (answerText, answerValue) => {
    if (loading) return;
    const currentQuestion = diagnosticQuestions[currentQuestionIndex];
    const nextAnswers = { ...answersLog, [currentQuestion.id]: answerValue };
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
      const outcome = classifySymptom(cleanText);

      if (outcome.type === 'stop') {
        addMessage({ sender: 'ai', text: outcome.stop.message });
        setActiveDiagnosis(buildStopResult(outcome.stop));
        return;
      }

      if (outcome.type === 'family') {
        startQuestionFlow(outcome.family);
        return;
      }

      addMessage({ sender: 'ai', text: UNKNOWN_SYMPTOM_HELP });
    }, 500);
  };

  useEffect(() => {
    handleSendRef.current = handleSend;
  });

  const handleSaveRepair = () => {
    if (!activeDiagnosis) return;
    const tools = activeDiagnosis.tools || DEFAULT_TOOLS;
    onAddServiceRecord({
      id: Date.now(),
      title: `${activeDiagnosis.cause} (rule-based check)`,
      desc: `Added from this local session. Estimated parts: ${activeDiagnosis.partCost || 'not provided'}. Tools: ${tools.join(', ')}.`,
      date: new Date().toISOString().split('T')[0],
    });
    addMessage({
      sender: 'system',
      text: "Added this check to the current Digital Garage session. It is not a permanent or cloud-synced record.",
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
            <span className="ui-eyebrow">Diagnosis</span>
            <h1 className="ui-title">Investigate a symptom</h1>
            <p className="ui-muted">{selectedVehicle.name} · Describe what you noticed and see which part to inspect first.</p>
          </div>
        </header>

        <div className="tool-notice" role="note">
          <Sparkles size={19} aria-hidden="true" />
          <div><strong>Rule-based guide</strong> Results come from fixed rules and your answers, not a live AI model or live vehicle data. Photo, audio and document attachments are unavailable; describe the symptom in text. Do not rely on the result to confirm riding safety.</div>
        </div>

        <div className="diagnose-layout">
          <section className="diagnose-main" aria-label="Diagnostic conversation">
            <div className="ui-card diagnose-thread" aria-live="polite">
              {messages.length === 0 && (
                <div className="diagnose-thread-empty">
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
                   <span className="ui-label">Question {currentQuestionIndex + 1} of {diagnosticQuestions.length}</span>
                  <p>{currentQuestion.text}</p>
                  <div className="diagnose-step-actions">
                    <button type="button" className="ui-btn ui-btn-primary" onClick={() => handleQuestionAnswer('Yes', true)} disabled={loading}>Yes</button>
                    <button type="button" className="ui-btn" onClick={() => handleQuestionAnswer('No', false)} disabled={loading}>No</button>
                    <button type="button" className="ui-btn ui-btn-quiet diagnose-step-unsure" onClick={() => handleQuestionAnswer('Not sure', null)} disabled={loading}>Not sure</button>
                  </div>
                </div>
              )}
              {loading && <div className="diagnose-message" role="status">Working through the symptom…</div>}
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
                     <span className="ui-eyebrow">{activeDiagnosis.familyLabel || 'Rule-based result'}</span>
                    <h2>{activeDiagnosis.cause}</h2>
                  </div>
                  <span className="ui-tag ui-tag-success">{activeDiagnosis.difficulty || 'Review'}</span>
                </div>

                <div className="diagnose-stats">
                  <div className="diagnose-stat"><span className="ui-label">Time</span><strong>{activeDiagnosis.repairTime || 'Not estimated'}</strong></div>
                  <div className="diagnose-stat"><span className="ui-label">Parts</span><strong>{activeDiagnosis.partCost || 'Ask a shop'}</strong></div>
                  <div className="diagnose-stat"><span className="ui-label">Drive note</span><strong>{activeDiagnosis.canDrive || 'Inspect first'}</strong></div>
                </div>

                {activeDiagnosis.confidenceList?.length > 0 && (
                  <div>
                    <span className="ui-label">Possible causes · rule match, not a probability</span>
                    <ul className="diagnose-causes">
                      {activeDiagnosis.confidenceList.map((item) => (
                        <li key={item.partId} className="diagnose-cause diagnose-cause-rich">
                          <div>
                            <span>{item.name}</span>
                            {item.reason && <small className="ui-muted">{item.reason}</small>}
                          </div>
                          <div className="diagnose-cause-actions">
                            <strong>{item.confidence}</strong>
                            {onInspectPart && (
                              <button
                                type="button"
                                className="ui-btn ui-btn-quiet"
                                aria-label={`Locate ${item.name} in 3D`}
                                onClick={() => onInspectPart({
                                  vehicleId: selectedVehicle.id,
                                  targetPartId: item.partId,
                                  reason: item.reason,
                                  inspectionLevel: 'component',
                                  relatedPartIds: activeDiagnosis.confidenceList.filter((other) => other.partId !== item.partId).map((other) => other.partId),
                                })}
                              >
                                <Crosshair size={14} aria-hidden="true" /> Locate
                              </button>
                            )}
                          </div>
                        </li>
                      ))}
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
                {activeDiagnosis.inspectionRequest && onInspectPart && (
                  <button type="button" className="ui-btn ui-btn-primary" onClick={() => onInspectPart(activeDiagnosis.inspectionRequest)}>
                    <Crosshair size={16} aria-hidden="true" /> Locate {activeDiagnosis.confidenceList[0].name} in 3D
                  </button>
                )}
                <button type="button" className="ui-btn" onClick={handleSaveRepair}><CheckCircle2 size={16} aria-hidden="true" /> Add check to Digital Garage</button>
              </section>
            ) : (
               <div className="diagnose-placeholder"><Wrench size={22} aria-hidden="true" /><p className="ui-muted">Your result, steps and safety notes will appear here.</p></div>
             )}
          </aside>
        </div>
      </div>
    </main>
  );
}
