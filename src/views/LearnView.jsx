import React, { useState } from 'react';
import { HelpCircle, ChevronRight, Zap, RefreshCw, Wind, Battery, Eye, ShieldAlert, Award, Search, BookOpen } from 'lucide-react';
import ThreeEngineViewer from '../components/ThreeEngineViewer';

export default function LearnView({ 
  selectedVehicle, 
  activeSegment, 
  setActiveSegment, 
  selectedPart, 
  setSelectedPart, 
  selectedModule, 
  setSelectedModule, 
  showQuizResult, 
  setShowQuizResult, 
  quizIndex, 
  setQuizIndex, 
  quizScore, 
  setQuizScore, 
  selectedAnswer, 
  setSelectedAnswer 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const modules = [
    {
      id: "engine",
      title: "Engine Basics (4-Stroke)",
      desc: "Learn about Piston, Cylinder head, Valves, and the Otto cycle.",
      progress: 78,
      quizzes: [
        {
          question: "What are the four strokes of a motorcycle engine in sequence?",
          options: [
            "Intake, Compression, Power, Exhaust",
            "Ignition, Combustion, Speed, Rebound",
            "Inlet, Spark, Drive, Cleanup"
          ],
          correct: 0
        },
        {
          question: "What regulates the opening of intake and exhaust valves?",
          options: [
            "Spark plug ignition timing",
            "The Camshaft lobes rotating on the timing chain",
            "Tire pressure expansion force"
          ],
          correct: 1
        }
      ]
    },
    {
      id: "brakes",
      title: "Brake Systems & Fluids",
      desc: "Friction materials, master cylinders, caliper pressure, and safety classification.",
      progress: 15,
      quizzes: [
        {
          question: "Why should you never clean brake discs with oil or grease?",
          options: [
            "It will dissolve the metal alloy",
            "It destroys friction coefficient, leading to complete brake failure",
            "It causes squeaking noises only"
          ],
          correct: 1
        }
      ]
    }
  ];

  const handleAnswerSelect = (optionIdx) => {
    setSelectedAnswer(optionIdx);
  };

  const handleNextQuiz = (module) => {
    if (selectedAnswer === module.quizzes[quizIndex].correct) {
      setQuizScore(quizScore + 1);
    }
    
    if (quizIndex + 1 < module.quizzes.length) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowQuizResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setShowQuizResult(false);
    setSelectedAnswer(null);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-4 h-4 text-cyan-400" />;
      case 'RefreshCw': return <RefreshCw className="w-4 h-4 text-cyan-400" />;
      case 'Wind': return <Wind className="w-4 h-4 text-cyan-400" />;
      case 'BatteryCharging': return <Battery className="w-4 h-4 text-cyan-400" />;
      default: return <HelpCircle className="w-4 h-4 text-cyan-400" />;
    }
  };

  // Filter parts based on category & search term
  const filteredParts = selectedVehicle.parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          part.function.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    if (categoryFilter === 'Engine') {
      matchesCategory = part.id === 'spark-plug' || part.id === 'air-filter' || part.id === 'engine-oil';
    } else if (categoryFilter === 'Electrical') {
      matchesCategory = part.id === 'battery' || part.id === 'spark-plug';
    } else if (categoryFilter === 'Brakes') {
      matchesCategory = part.id === 'brakes' || part.id === 'clutch-cable';
    }
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 flex flex-col p-4 pb-28 text-white space-y-5">
      
      {/* Segment Switcher (Teal highlight) */}
      <div className="flex bg-[#1A1A22] border border-zinc-800 p-1.5 rounded-xl">
        <button 
          onClick={() => { setActiveSegment('parts'); setSelectedModule(null); }}
          className={`flex-1 text-center py-2.5 text-xs font-bold rounded-lg transition-colors ${
            activeSegment === 'parts' ? 'bg-cyan-500 text-black' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Parts Explorer (3D)
        </button>
        <button 
          onClick={() => { setActiveSegment('educational'); }}
          className={`flex-1 text-center py-2.5 text-xs font-bold rounded-lg transition-colors ${
            activeSegment === 'educational' ? 'bg-cyan-500 text-black' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Learn Your Machine
        </button>
      </div>

      {activeSegment === 'parts' ? (
        <div className="space-y-4">
          
          {/* Search bar & Category tags */}
          <div className="space-y-2.5">
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs">
              <Search className="w-4 h-4 text-zinc-500 mr-2" />
              <input 
                type="text"
                placeholder="Search parts (e.g. Plug, Cable)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-white w-full placeholder-zinc-500"
              />
            </div>

            <div className="flex gap-1.5 text-[10px] overflow-x-auto pb-1 scrollbar-none font-bold uppercase tracking-wider">
              {['All', 'Engine', 'Electrical', 'Brakes'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    categoryFilter === cat ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-[#1A1A22] border-zinc-800 text-zinc-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive 3D Canvas Assembly */}
          <div className="space-y-2">
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-black block">Engine Parts Assembly</span>
            <ThreeEngineViewer 
              selectedPartId={selectedPart?.id} 
              onSelectPart={(id) => {
                const found = selectedVehicle.parts.find(p => p.id === id);
                if (found) setSelectedPart(found);
              }}
            />
          </div>

          {/* Selector Tags list */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {filteredParts.map((part) => (
              <button
                key={part.id}
                onClick={() => setSelectedPart(part)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                  selectedPart?.id === part.id 
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-lg' 
                    : 'bg-[#1A1A22] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                {part.name}
              </button>
            ))}
          </div>

          {/* Exploded Part detail pane */}
          {selectedPart && (
            <div className="bg-[#1A1A22] border border-zinc-800 rounded-2xl p-4 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                  {getIcon(selectedPart.icon)}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-zinc-200">{selectedPart.name}</h3>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Est. Replacement Time: 15-30 min • Cost: {selectedPart.cost}</p>
                </div>
              </div>

              {/* Function block */}
              <div className="bg-zinc-900 border border-zinc-850 p-3 rounded-xl">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Purpose</span>
                <p className="text-xs text-zinc-300 leading-normal mt-1">{selectedPart.function}</p>
              </div>

              {/* Specs parameters */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-850">
                  <span className="text-zinc-500 block text-[9px] uppercase font-bold">Failure Symptoms</span>
                  <span className="font-bold text-zinc-300 mt-1 block leading-tight">{selectedPart.symptoms}</span>
                </div>
                <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-850">
                  <span className="text-zinc-500 block text-[9px] uppercase font-bold">Interval Checks</span>
                  <span className="font-bold text-zinc-300 mt-1 block leading-tight">{selectedPart.interval}</span>
                </div>
              </div>

              {/* Safety Alerts */}
              {selectedPart.safety && (
                <div className="bg-[#EF4444]/10 border border-[#EF4444]/25 p-3 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-[#EF4444]">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-wider">Critical Safety Warning</span>
                  </div>
                  <p className="text-[10px] text-[#FCA5A5] leading-normal">{selectedPart.safety}</p>
                </div>
              )}

              {/* Step by step visual cards */}
              <div className="space-y-3.5 border-t border-zinc-800/60 pt-3">
                <h5 className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  View Repair Guide ({selectedPart.difficulty} DIY)
                </h5>
                <div className="space-y-2">
                  {selectedPart.diySteps.map((step, idx) => (
                    <div key={idx} className="bg-zinc-900/80 border border-zinc-850 rounded-xl p-3 flex gap-2.5 items-start">
                      <span className="w-5 h-5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-zinc-300 leading-normal">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg text-zinc-400 mt-2">
                  <span className="font-bold text-zinc-300">Required Tools:</span> {selectedPart.tools.join(', ')}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          
          {!selectedModule ? (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Available Topics</h4>
              <div className="grid gap-3">
                {modules.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => { setSelectedModule(mod); resetQuiz(); }}
                    className="bg-[#1A1A22] border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 text-left transition-all flex items-center justify-between group shadow-md"
                  >
                    <div className="space-y-2 pr-4 flex-1">
                      <h4 className="font-extrabold text-sm text-zinc-200 group-hover:text-cyan-400 transition-colors">{mod.title}</h4>
                      <p className="text-xs text-zinc-400 leading-normal">{mod.desc}</p>
                      
                      {/* Course progress bars */}
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                          <span>Progress</span>
                          <span>{mod.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500" style={{ width: `${mod.progress}%` }} />
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#1A1A22] border border-zinc-800 rounded-2xl p-4 space-y-4 shadow-xl">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800/60">
                <span className="text-[10px] text-zinc-400 font-bold uppercase">{selectedModule.title}</span>
                <button 
                  onClick={() => setSelectedModule(null)}
                  className="text-xs text-cyan-400 font-bold hover:text-cyan-300"
                >
                  Back to Modules
                </button>
              </div>

              {!showQuizResult ? (
                <div className="space-y-4">
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-0.5 rounded font-black uppercase tracking-wider">
                    Question {quizIndex + 1} of {selectedModule.quizzes.length}
                  </span>
                  <h4 className="font-bold text-xs text-zinc-200 leading-normal">{selectedModule.quizzes[quizIndex].question}</h4>

                  <div className="space-y-2.5">
                    {selectedModule.quizzes[quizIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`w-full text-left p-3 rounded-xl text-xs border leading-relaxed transition-all ${
                          selectedAnswer === idx 
                            ? 'bg-cyan-500/10 border-cyan-500 text-white font-bold' 
                            : 'bg-zinc-900 border-zinc-850 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={selectedAnswer === null}
                    onClick={() => handleNextQuiz(selectedModule)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                      selectedAnswer !== null 
                        ? 'bg-cyan-500 text-black hover:bg-cyan-600' 
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    Next Question
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <Award className="w-12 h-12 text-cyan-400 mx-auto animate-bounce" />
                  <div>
                    <h4 className="font-extrabold text-sm">Module Quiz Complete!</h4>
                    <p className="text-xs text-zinc-400 mt-1">You scored {quizScore} out of {selectedModule.quizzes.length} correctly.</p>
                  </div>
                  <button 
                    onClick={() => resetQuiz()}
                    className="bg-cyan-500 text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-cyan-600 transition-colors"
                  >
                    Retry Quiz
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
