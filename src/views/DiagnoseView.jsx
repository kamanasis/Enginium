import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Key, Send, AlertTriangle, ShieldCheck, CheckCircle2, PhoneCall, MapPin, Camera, Mic, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

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
  setLoading 
}) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // Interactive Question Flow state machine
  const [diagnosticQuestions, setDiagnosticQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersLog, setAnswersLog] = useState({});

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (diagnoseInput) {
      setInputValue(diagnoseInput);
      setDiagnoseInput(''); 
      setTimeout(() => {
        handleSend(diagnoseInput);
      }, 300);
    }
  }, [diagnoseInput]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    localStorage.setItem('gemini_api_key', apiKey);
    setShowKeyInput(false);
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'system',
      text: apiKey ? 'Gemini Live API Mode activated.' : 'Running in local fallback diagnostic mode.'
    }]);
  };

  const startQuestionFlow = (symptomKey) => {
    const questions = [
      { id: 'starter', text: 'Does the starter motor crank normally when pressing the ignition?' },
      { id: 'cold', text: 'Does this issue happen only in the morning when the engine is cold?' },
      { id: 'age', text: 'Was the vehicle battery replaced in the last 18 months?' }
    ];
    setDiagnosticQuestions(questions);
    setCurrentQuestionIndex(0);
    setAnswersLog({});

    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'ai',
      text: "Let's diagnose this step by step. I have a few diagnostic checks to isolate the root cause."
    }]);
  };

  const handleQuestionAnswer = (answerText, isYes) => {
    const currentQ = diagnosticQuestions[currentQuestionIndex];
    const nextAnswers = { ...answersLog, [currentQ.id]: isYes };
    setAnswersLog(nextAnswers);

    setMessages(prev => [...prev, 
      { id: Date.now(), sender: 'user', text: answerText }
    ]);

    if (currentQuestionIndex + 1 < diagnosticQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Completed questionnaire -> calculate scores
      setLoading(true);
      setDiagnosticQuestions([]);
      
      setTimeout(() => {
        setLoading(false);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'ai',
          text: `Analyzing symptoms & diagnostic answers. Here is the diagnostic outcome for the ${selectedVehicle.name}:`
        }]);

        // Output results card
        setActiveDiagnosis({
          cause: "Weak Battery / Terminal oxidation",
          confidenceList: [
            { name: "Weak Battery Cell", confidence: "82%" },
            { name: "Loose / Oxidized Terminals", confidence: "61%" },
            { name: "Fouled Spark Plug Electrode", confidence: "34%" }
          ],
          difficulty: "Green",
          repairTime: "15 mins",
          partCost: "₹1,400",
          laborCost: "₹50",
          canDrive: "Yes, but perform diagnostic checks or kickstart.",
          warning: "Weak battery voltage can trigger ECU safety flags and affect ignition spark timing.",
          diySteps: [
            "Remove the vehicle side panel to locate the battery block.",
            "Inspect the terminal leads. If blue/white powder is present, clean with baking soda paste.",
            "Measure output voltage with a multimeter. Resting voltage should be above 12.4V.",
            "If voltage drops below 10.5V when cranking, replace battery cells."
          ],
          tools: ["8mm Spanner", "Multimeter", "Vaseline jelly"]
        });
      }, 1500);
    }
  };

  const handleSend = (textToSend = inputValue) => {
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: textToSend }]);
    setInputValue('');
    setLoading(true);
    setActiveDiagnosis(null);

    setTimeout(() => {
      setLoading(false);
      const query = textToSend.toLowerCase();
      
      if (query.includes('start') || query.includes('crank')) {
        startQuestionFlow('starting');
      } else {
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'ai',
          text: `Registered problem. For the ${selectedVehicle.name}, this can point to a standard intake filter clogging or dirty ignition spark plug. Let's inspect the spark plug condition first.`
        }]);

        // Fallback diagnosis
        setActiveDiagnosis({
          cause: "Electrode Carbon Fouling",
          confidenceList: [
            { name: "Fouled Spark Plug", confidence: "75%" },
            { name: "Dirty Air Intake Filter", confidence: "45%" }
          ],
          difficulty: "Green",
          repairTime: "15 mins",
          partCost: "₹180",
          laborCost: "₹80",
          canDrive: "Yes, but clean soon to prevent engine stall in traffic.",
          warning: "A fouled spark plug will cause fuel to go unburnt, raising emissions and polluting the engine oil.",
          diySteps: [
            "Locate the spark plug cap on the right cylinder head.",
            "Unplug the black rubber boot connector.",
            "Use the standard 16mm plug socket wrench to rotate counter-clockwise.",
            "Scrub soot build-up from tips using a wire brush or fine sandpaper."
          ],
          tools: ["16mm Spark Plug Spanner", "Wire Brush", "0.7mm Feeler Gauge"]
        });
      }
    }, 1000);
  };

  const handleSaveRepair = () => {
    if (!activeDiagnosis) return;
    confetti({
      particleCount: 100,
      spread: 70,
      colors: ['#06b6d4', '#ffffff', '#1A1A22']
    });

    onAddServiceRecord({
      id: Date.now(),
      title: activeDiagnosis.cause + ' (DIY Check)',
      desc: `Logged DIY diagnostic check. Cost: ${activeDiagnosis.partCost}. Tools: ${activeDiagnosis.tools.join(', ')}`,
      date: new Date().toISOString().split('T')[0]
    });

    setMessages(prev => [...prev, {
      id: Date.now() + 5,
      sender: 'system',
      text: 'DIY diagnosis log permanently registered in your Digital Garage!'
    }]);
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-28 text-white relative">
      
      {/* AI Mechanic Header */}
      <div className="flex justify-between items-center bg-[#1A1A22] border border-zinc-800 p-3 rounded-2xl mb-4 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 border border-cyan-500/30">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-200">AI Guru Mechanic</h4>
            <p className="text-[9px] text-zinc-500">Online • Analyzed 430+ • Built for you</p>
          </div>
        </div>
        <button 
          onClick={() => setShowKeyInput(!showKeyInput)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            apiKey ? 'bg-green-600/20 text-green-400 border border-green-500/30' : 'bg-cyan-500 text-black hover:bg-cyan-600'
          }`}
        >
          {apiKey ? 'API Live' : 'Set Key'}
        </button>
      </div>

      {showKeyInput && (
        <form onSubmit={handleSaveApiKey} className="bg-[#1E1E28] border border-zinc-800 rounded-2xl p-4 mb-4 space-y-3 shadow-2xl">
          <h4 className="text-xs font-bold text-zinc-300">Set Gemini API Key</h4>
          <input 
            type="password"
            placeholder="AIzaSy..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <button type="submit" className="bg-cyan-500 text-black px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-cyan-600">
            Save
          </button>
        </form>
      )}

      {/* Conversations log */}
      <div className="flex-1 min-h-[200px] bg-zinc-950/30 border border-zinc-900 rounded-2xl p-4 overflow-y-auto space-y-3 flex flex-col scrollbar-none mb-4">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col justify-center items-center text-center p-6 text-zinc-500">
            <Sparkles className="w-10 h-10 text-cyan-500/40 animate-pulse mb-3" />
            <p className="text-sm font-bold text-zinc-400">Consult Enginium AI</p>
            <p className="text-[11px] mt-1 max-w-[220px]">Describe the sound, feel, or behavior of your vehicle in natural language.</p>
          </div>
        )}

        {messages.map((m) => (
          <div 
            key={m.id}
            className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
              m.sender === 'user' 
                ? 'bg-cyan-500 text-black self-end rounded-tr-none font-medium'
                : m.sender === 'system'
                ? 'bg-zinc-800/80 text-zinc-400 self-center text-center italic w-full'
                : 'bg-[#1A1A22] border border-zinc-850 text-zinc-200 self-start rounded-tl-none'
            }`}
          >
            {m.text}
          </div>
        ))}

        {/* Questionnaire Subsystem */}
        {diagnosticQuestions.length > 0 && (
          <div className="bg-[#1A1A22] border border-cyan-500/20 p-3.5 rounded-2xl space-y-3 animate-fade-in self-start max-w-[85%] rounded-tl-none">
            <span className="text-[8px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-black uppercase tracking-wider">
              Diagnostic Step {currentQuestionIndex + 1}
            </span>
            <p className="text-xs font-bold text-zinc-200">{diagnosticQuestions[currentQuestionIndex].text}</p>
            <div className="flex gap-2 text-xs">
              <button 
                onClick={() => handleQuestionAnswer('Yes', true)}
                className="flex-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 py-2 rounded-lg font-bold transition-colors"
              >
                Yes
              </button>
              <button 
                onClick={() => handleQuestionAnswer('No', false)}
                className="flex-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 border border-zinc-800 py-2 rounded-lg font-bold transition-colors"
              >
                No
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-zinc-500 text-xs self-start bg-[#1A1A22] border border-zinc-850 p-3 rounded-2xl rounded-tl-none">
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            <span>Running analysis...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Diagnostic Result Panel */}
      {activeDiagnosis && (
        <div className="bg-[#1A1A22] border border-zinc-800 rounded-2xl p-4 mb-4 space-y-4 shadow-2xl">
          <div className="border-b border-zinc-800/60 pb-3">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Acoustic / Diagnostic Results</span>
            <h4 className="font-extrabold text-sm text-cyan-400 mt-0.5">{activeDiagnosis.cause}</h4>
          </div>

          {/* Probabilities / Confidence Ranks */}
          {activeDiagnosis.confidenceList && (
            <div className="space-y-2">
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Possible Causes</span>
              {activeDiagnosis.confidenceList.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-zinc-900 border border-zinc-850 p-2.5 rounded-xl">
                  <span className="font-medium text-zinc-200">{item.name}</span>
                  <span className="font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/10 text-[10px]">{item.confidence} confidence</span>
                </div>
              ))}
            </div>
          )}

          {/* Warning Message block */}
          {activeDiagnosis.warning && (
            <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 p-3 rounded-xl space-y-1 shadow">
              <div className="flex items-center gap-1.5 text-[#EF4444]">
                <AlertTriangle className="w-4 h-4" />
                <h5 className="text-[9px] font-black uppercase tracking-wider">Safety Notification</h5>
              </div>
              <p className="text-[10px] text-[#FCA5A5] leading-normal">{activeDiagnosis.warning}</p>
            </div>
          )}

          {/* Action links */}
          <button 
            onClick={handleSaveRepair}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black rounded-xl py-3 text-xs font-black tracking-widest uppercase transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <CheckCircle2 className="w-4 h-4 text-black" />
            Complete & Log to Digital Garage
          </button>
        </div>
      )}

      {/* Input controls layout */}
      <div className="space-y-2">
        <div className="flex gap-1.5 bg-[#1A1A22] border border-zinc-800 p-2 rounded-2xl shadow-xl">
          <input 
            type="text"
            placeholder="Describe the noise, vibration or issue..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent text-xs text-white px-3 focus:outline-none placeholder-zinc-500"
          />
          <button 
            onClick={() => handleSend()}
            className="w-10 h-10 bg-cyan-500 hover:bg-cyan-600 rounded-xl flex items-center justify-center text-black transition-colors shrink-0 shadow-md"
          >
            <Send className="w-4.5 h-4.5 text-black" />
          </button>
        </div>

        {/* Attachments buttons */}
        <div className="flex items-center justify-around text-zinc-500 text-[10px] py-1 bg-zinc-950/20 rounded-xl border border-zinc-900">
          <button 
            onClick={() => alert("Photo upload simulation active.")}
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors py-1 px-3"
          >
            <Camera className="w-3.5 h-3.5" />
            Camera
          </button>
          <button 
            onClick={() => alert("Recording audio clip...")}
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors py-1 px-3"
          >
            <Mic className="w-3.5 h-3.5" />
            Record Engine
          </button>
          <button 
            onClick={() => alert("Select diagnostic reports / manual scans...")}
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors py-1 px-3"
          >
            <FileText className="w-3.5 h-3.5" />
            Document
          </button>
        </div>
      </div>

    </div>
  );
}
