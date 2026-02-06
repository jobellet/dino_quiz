import React, { useState, useEffect } from 'react';
import { Volume2, Trophy, ArrowRight, RotateCcw, Egg, Footprints, Smile, Frown, Lightbulb, Cloud, Mountain, Snowflake, Waves, Flame, Leaf } from 'lucide-react';

// --- THEME DEFINITIONS ---
const THEMES = {
  JUNGLE: 'jungle',
  OCEAN: 'ocean',
  ICE: 'ice',
  VOLCANO: 'volcano',
  SKY: 'sky'
};

// --- DATA ---
const QUESTION_DATA = [
  {
    question: "Warum würden ein Kentrosaurus und ein Stegosaurus miteinander kämpfen?",
    options: ["Sie sind beste Freunde", "Einer ist Fleischfresser", "Sie gehören zur selben Familie"],
    correct: "Sie gehören zur selben Familie",
    hint: "Denk daran, dass Geschwister sich auch manchmal streiten.",
    explanation: "Sie sind wie Cousins! Manchmal streiten sich Familienmitglieder darum, wer der Stärkste ist oder wer den besten Platz bekommt.",
    theme: THEMES.JUNGLE
  },
  {
    question: "Welches Tier gilt als der größte Hai, der je gelebt hat?",
    options: ["Der Weiße Hai", "Der Mosasaurus", "Der Megalodon"],
    correct: "Der Megalodon",
    hint: "Er war viel, viel größer als jeder Hai heute.",
    explanation: "Der Megalodon war so riesig wie ein ganzer Schulbus und hatte Zähne so groß wie deine Hand!",
    theme: THEMES.OCEAN
  },
  {
    question: "Was machen Dinosauriermütter manchmal mit ihren Eiern, bevor sie schlüpfen?",
    options: ["Sie rollen sie ins Wasser", "Sie malen sie an", "Sie sprechen mit ihnen"],
    correct: "Sie sprechen mit ihnen",
    hint: "Sie machen Geräusche, damit die Babys ihre Stimme kennenlernen.",
    explanation: "Die Mama brummt oder gluckst sanft, damit die Babys im Ei schon wissen: 'Hier draußen ist jemand, der mich lieb hat!'",
    theme: THEMES.JUNGLE
  },
  {
    question: "Welche Dinosaurier gelten als besonders schlau, haben gute Nasen und arbeiten im Team?",
    options: ["Ein T. Rex", "Ein Pterodactylus", "Ein Rudel Troodons"],
    correct: "Ein Rudel Troodons",
    hint: "Diese Dinos sind sehr schlau und arbeiten im Team.",
    explanation: "Troodons sind super schlau und haben gute Nasen. Sie arbeiten zusammen wie ein Suchtrupp der Polizei.",
    theme: THEMES.JUNGLE
  },
  {
    question: "Welches spezielle Merkmal besitzt der Incisivosaurus, das auch moderne Vögel haben?",
    options: ["Scharfe Zähne", "Große Klauen", "Federn"],
    correct: "Federn",
    hint: "Vögel haben diese auch am Körper.",
    explanation: "Viele Dinosaurier sahen eigentlich aus wie große, gefährliche Hühner, weil sie Federn hatten, genau wie Vögel heute.",
    theme: THEMES.JUNGLE
  },
  {
    question: "Welcher sehr kleine Dinosaurier verteidigt sein Revier oft mutig gegen Eindringlinge?",
    options: ["Ein Dromaeosaurus", "Ein Velociraptor", "Ein Microraptor"],
    correct: "Ein Microraptor",
    hint: "Er ist ein sehr kleiner Dinosaurier.",
    explanation: "Der Microraptor ist winzig, aber er verteidigt sein Zuhause, auch wenn die 'Eindringlinge' viel größer sind als er!",
    theme: THEMES.JUNGLE
  },
  {
    question: "Welches ungewöhnliche Verhalten könnte ein T. Rex gezeigt haben, um Stärke zu demonstrieren?",
    options: ["Er schwimmt", "Er fliegt", "Er tanzt"],
    correct: "Er tanzt",
    hint: "Er bewegt sich rhythmisch, fast wie bei Musik.",
    explanation: "Vielleicht wollte er einem anderen T. Rex zeigen, wie stark und toll er ist – fast wie bei einem Wettbewerb!",
    theme: THEMES.VOLCANO
  },
  {
    question: "Wovor könnte ein Brachiosaurus aufgrund seiner enormen Größe Angst haben?",
    options: ["Angst im Dunkeln", "Lauten Geräuschen", "Höhenangst"],
    correct: "Höhenangst",
    hint: "Er mag es nicht, wenn sein Kopf so weit oben ist.",
    explanation: "Das ist lustig, weil er so einen langen Hals hat! Aber auch Riesen können sich manchmal fürchten, wenn sie nach unten schauen.",
    theme: THEMES.SKY
  },
  {
    question: "Welche Dinosaurierfamilie ist dafür bekannt, sich gut um ihre Babys zu kümmern?",
    options: ["Spinosaurus-Familie", "Triceratops-Familie", "Die Maiasaura-Familie"],
    correct: "Die Maiasaura-Familie",
    hint: "Ihr Name bedeutet 'Gute Mutter-Echse'.",
    explanation: "Maiasauras haben Nester gebaut und ihre Babys gefüttert und beschützt, bis sie groß genug waren, um selbst zu laufen.",
    theme: THEMES.JUNGLE
  },
  {
    question: "Welches riesige prähistorische Tier lebte zur gleichen Zeit wie die „Höhlenmenschen“?",
    options: ["Säbelzahntiger", "Riesenfaultier", "Das Mammut"],
    correct: "Das Mammut",
    hint: "Es sieht aus wie ein Elefant mit viel Fell.",
    explanation: "Die Menschen damals haben Mammuts sogar an ihre Höhlenwände gemalt, weil sie sie so beeindruckend fanden.",
    theme: THEMES.ICE
  },
  {
    question: "Welcher Dinosaurier ist ein naher Verwandter des Stegosaurus?",
    options: ["Der Kentrosaurus", "Der T. Rex", "Der Triceratops"],
    correct: "Der Kentrosaurus",
    hint: "Er hat auch Stacheln, genau wie der Stegosaurus.",
    explanation: "Beide tragen eine coole Rüstung aus Platten und Stacheln auf dem Rücken, um sich vor dem T. Rex zu schützen.",
    theme: THEMES.JUNGLE
  },
  {
    question: "Welcher dieser Dinosaurier ist ein Fleischfresser (Karnivore)?",
    options: ["Der Maiasaura", "Der Albertosaurus", "Der Kentrosaurus"],
    correct: "Der Albertosaurus",
    hint: "Er ist ein Jäger mit scharfen Zähnen.",
    explanation: "Der Albertosaurus sieht fast aus wie ein T. Rex. Er braucht Fleisch, um satt zu werden, Salat schmeckt ihm nicht!",
    theme: THEMES.VOLCANO
  },
  {
    question: "Welches dieser prähistorischen Tiere kann fliegen?",
    options: ["Der Pterodactylus", "Der Deinosuchus", "Der Spinosaurus"],
    correct: "Der Pterodactylus",
    hint: "Er hat große Flügel und gleitet durch die Luft.",
    explanation: "Er ist eigentlich kein Dinosaurier, sondern ein Flugsaurier. Er segelte durch die Luft wie ein riesiger Drachen.",
    theme: THEMES.SKY
  },
  {
    question: "Welcher dieser Dinosaurier jagt bekanntermaßen im Rudel?",
    options: ["Der Troodon", "Der Brachiosaurus", "Der Ankylosaurus"],
    correct: "Der Troodon",
    hint: "Einer allein ist schwach, aber viele zusammen sind stark.",
    explanation: "Alleine sind sie klein, aber zusammen sind sie stark genug, um viel größere Dinos zu überlisten.",
    theme: THEMES.JUNGLE
  },
  {
    question: "Was für eine Art von Tier ist der Deinosuchus?",
    options: ["Prähistorisches Krokodil", "Ein riesiger Fisch", "Langhals-Dino"],
    correct: "Prähistorisches Krokodil",
    hint: "Er sieht aus wie ein Krokodil, nur viel größer.",
    explanation: "Er war ein Urzeit-Krokodil, so groß, dass er sogar Dinosaurier schnappen konnte, die zum Trinken an den Fluss kamen.",
    theme: THEMES.OCEAN
  },
  {
    question: "Wie könnten einige prähistorische Tiere Schnee und Kälte überlebt haben?",
    options: ["Nach Süden ziehen", "Dickere Schuppen", "Eingraben in die Erde"],
    correct: "Eingraben in die Erde",
    hint: "Unter der Erde ist es wärmer als draußen.",
    explanation: "Tief unter der Erde ist es gemütlich warm, wie unter einer dicken Bettdecke, während draußen der Schneesturm tobt.",
    theme: THEMES.ICE
  },
  {
    question: "Was fressen Pflanzenfresser (Herbivoren) wie der Triceratops gerne?",
    options: ["Insekten und Käfer", "Fleisch und Fisch", "Pflanzen und Paprika"],
    correct: "Pflanzen und Paprika",
    hint: "Sie mögen kein Fleisch, sondern Grünes.",
    explanation: "Sie haben flache Zähne, um harte Blätter, Farne und Zweige zu zermalmen – wie eine lebendige Salatschleuder!",
    theme: THEMES.JUNGLE
  },
  {
    question: "Mit welchen modernen Tiergruppen sind Dinosaurier am engsten verwandt?",
    options: ["Vögel und Reptilien", "Katzen und Hunde", "Fische und Haie"],
    correct: "Vögel und Reptilien",
    hint: "Denk an Tiere, die Eier legen und Schuppen oder Federn haben.",
    explanation: "Wenn du heute ein Huhn oder eine Eidechse siehst, guckst du eigentlich einen winzigen Verwandten der Dinosaurier an.",
    theme: THEMES.JUNGLE
  },
  {
    question: "In welcher Umgebung lebt der Plesiosaurier?",
    options: ["In der Wüste", "Im Ozean", "Im Wald"],
    correct: "Im Ozean",
    hint: "Er schwimmt gerne im tiefen Wasser.",
    explanation: "Er hatte Paddel statt Füße und schwamm durch das Meer wie eine riesige Schildkröte mit langem Hals.",
    theme: THEMES.OCEAN
  },
  {
    question: "Warum entwickelten Dinosaurier verschiedene Arten von Sehvermögen?",
    options: ["Um Bücher zu lesen", "Um Sonne zu meiden", "Um besser jagen zu können"],
    correct: "Um besser jagen zu können",
    hint: "Damit sie ihre Beute oder Feinde schneller sehen.",
    explanation: "Jäger brauchten Augen, die nach vorne schauen, um Beute zu finden. Pflanzenfresser mussten zur Seite schauen, um sich anzuschleichen!",
    theme: THEMES.JUNGLE
  }
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- VISUAL COMPONENTS ---

const HappyDinoImage = () => (
  <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-xl animate-bounce-slow">
    {/* Body */}
    <path d="M40,160 Q30,180 50,180 L70,180 Q80,180 80,160 L80,140 Q140,140 160,100 Q180,60 160,40 Q140,20 120,40 Q110,50 110,70 Q60,70 50,110 Z" fill="#4ade80" stroke="#16a34a" strokeWidth="4" />
    {/* Tail */}
    <path d="M40,140 Q10,140 10,110" fill="none" stroke="#4ade80" strokeWidth="15" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="140" cy="50" r="5" fill="black" />
    <circle cx="142" cy="48" r="2" fill="white" />
    {/* Smile */}
    <path d="M140,70 Q150,80 160,70" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
    {/* Spots */}
    <circle cx="80" cy="100" r="8" fill="#86efac" />
    <circle cx="110" cy="120" r="6" fill="#86efac" />
    {/* Arms */}
    <path d="M110,100 Q120,110 130,100" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const BackgroundGenerator = ({ theme, isStartScreen }) => {
  if (isStartScreen) {
    return (
      <div className="absolute inset-0 bg-[#4ade80] overflow-hidden -z-10 flex items-center justify-center">
        {/* Large Leaf Watermark Right */}
        <div className="absolute top-[10%] right-0 text-[#86efac] opacity-50 transform translate-x-1/4">
          <Leaf size={400} strokeWidth={1} />
        </div>
        {/* Small Leaf Watermark Left */}
        <div className="absolute bottom-[10%] left-0 text-[#86efac] opacity-50 transform -translate-x-1/4 -rotate-45">
          <Leaf size={300} strokeWidth={1} />
        </div>
        {/* Faint Lightbulb */}
        <div className="absolute top-1/2 left-[10%] text-yellow-200 opacity-60">
          <Lightbulb size={60} />
        </div>
      </div>
    );
  }

  const renderTheme = () => {
    switch (theme) {
      case THEMES.OCEAN:
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-900 overflow-hidden -z-10">
            <div className="absolute top-10 left-10 text-blue-300 opacity-50 animate-pulse"><Waves size={64} /></div>
            <div className="absolute bottom-20 right-20 text-blue-300 opacity-50 animate-bounce-slow"><Waves size={96} /></div>
            <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"></div>
            {/* Bubbles */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute bg-white rounded-full opacity-20 animate-float"
                style={{
                  width: Math.random() * 20 + 10 + 'px',
                  height: Math.random() * 20 + 10 + 'px',
                  left: Math.random() * 100 + '%',
                  bottom: '-20px',
                  animationDuration: Math.random() * 5 + 5 + 's',
                  animationDelay: Math.random() * 2 + 's'
                }}
              />
            ))}
          </div>
        );
      case THEMES.ICE:
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-200 to-blue-200 overflow-hidden -z-10">
            <div className="absolute top-5 right-10 text-white opacity-80"><Cloud size={80} /></div>
            <div className="absolute top-20 left-10 text-white opacity-60"><Cloud size={60} /></div>
            <div className="absolute bottom-0 w-full h-32 bg-white/40 rounded-t-[100%] blur-xl"></div>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute text-blue-400 opacity-40 animate-spin-slow"
                style={{
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDuration: Math.random() * 10 + 10 + 's'
                }}>
                <Snowflake size={Math.random() * 30 + 20} />
              </div>
            ))}
          </div>
        );
      case THEMES.VOLCANO:
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-orange-100 to-red-200 overflow-hidden -z-10">
            <div className="absolute bottom-0 left-[-10%] text-red-900 opacity-20"><Mountain size={300} /></div>
            <div className="absolute top-10 right-20 text-orange-500 opacity-40 animate-pulse"><Flame size={64} /></div>
            {/* Floating Ash/Embers */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute bg-orange-500 rounded-full opacity-40"
                style={{
                  width: Math.random() * 10 + 5 + 'px',
                  height: Math.random() * 10 + 5 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animation: `float ${Math.random() * 4 + 3}s infinite ease-in-out`
                }}
              />
            ))}
          </div>
        );
      case THEMES.SKY:
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-blue-100 overflow-hidden -z-10">
            <div className="absolute top-10 left-10 text-white opacity-90 animate-float"><Cloud size={100} /></div>
            <div className="absolute top-40 right-20 text-white opacity-80 animate-float" style={{ animationDelay: '1s' }}><Cloud size={80} /></div>
            <div className="absolute bottom-10 left-1/2 text-white opacity-40"><Cloud size={150} /></div>
          </div>
        );
      case THEMES.JUNGLE:
      default:
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-green-200 to-emerald-400 overflow-hidden -z-10">
            <div className="absolute -bottom-10 -left-10 text-green-800 opacity-20 rotate-12"><Leaf size={200} /></div>
            <div className="absolute top-0 right-0 text-green-900 opacity-10 -rotate-45"><Leaf size={150} /></div>
            <div className="absolute top-1/2 left-10 text-yellow-500 opacity-30 animate-pulse"><Lightbulb size={40} /></div>
            {/* Vines effect via CSS shapes */}
            <div className="absolute h-full w-2 bg-green-700/10 left-20"></div>
            <div className="absolute h-full w-4 bg-green-700/10 right-40"></div>
          </div>
        );
    }
  };

  return renderTheme();
};

export default function DinoQuiz() {
  const [gameState, setGameState] = useState('start'); // start, playing, feedback, end
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // TTS & Highlighting State
  const [speaking, setSpeaking] = useState(false);
  const [highlightTarget, setHighlightTarget] = useState(null); // 'question', 0, 1, 2, or null

  // Initialize question and start sequence
  useEffect(() => {
    if (gameState === 'playing') {
      const currentQ = QUESTION_DATA[currentQIndex];
      // Create options array including correct and distractors, then shuffle
      const newOptions = shuffleArray(currentQ.options);
      setShuffledOptions(newOptions);
      setShowHint(false);

      // Start the audio sequence: Question -> Option 1 -> Option 2 -> Option 3
      playSequence(currentQ.question, newOptions);
    } else {
      // If we leave playing state (e.g. feedback or end), stop highlighting and speech
      if (gameState !== 'playing') {
        setHighlightTarget(null);
        window.speechSynthesis.cancel();
        setSpeaking(false);
      }
    }
  }, [gameState, currentQIndex]);

  const playSequence = (questionText, options) => {
    // 1. Cancel existing speech
    window.speechSynthesis.cancel();

    // 2. Queue Question
    const uQ = new SpeechSynthesisUtterance(questionText);
    uQ.lang = 'de-DE'; uQ.rate = 0.9; uQ.pitch = 1.1;
    uQ.onstart = () => { setSpeaking(true); setHighlightTarget('question'); };
    // No specific onEnd for question needed, as the next utterance start will override highlightTarget, 
    // but we can set to null briefly if desired. We rely on the queue.

    window.speechSynthesis.speak(uQ);

    // 3. Queue Options
    options.forEach((opt, idx) => {
      const uOpt = new SpeechSynthesisUtterance(opt);
      uOpt.lang = 'de-DE'; uOpt.rate = 0.9; uOpt.pitch = 1.1;

      uOpt.onstart = () => {
        setHighlightTarget(idx); // Highlight the specific option button
      };

      // If it's the last option, clean up when done
      if (idx === options.length - 1) {
        uOpt.onend = () => {
          setSpeaking(false);
          setHighlightTarget(null);
        };
      }
      window.speechSynthesis.speak(uOpt);
    });
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop previous sequence
      setHighlightTarget(null); // Clear automatic highlights when manual speak is triggered

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStart = () => {
    setScore(0);
    setCurrentQIndex(0);
    setGameState('playing');
  };

  const handleOptionClick = (option) => {
    if (gameState !== 'playing') return;

    // Stop the automatic sequence immediately
    window.speechSynthesis.cancel();
    setHighlightTarget(null);
    setSpeaking(false);

    const currentQ = QUESTION_DATA[currentQIndex];
    const correct = option === currentQ.correct;
    setSelectedOption(option);
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 1);
      // Read "Correct!" then the explanation
      speakText(`Richtig! ${currentQ.explanation}`);
    } else {
      // Read "Wrong", the correct answer, then the explanation
      speakText(`Schade. Die richtige Antwort ist: ${currentQ.correct}. ${currentQ.explanation}`);
    }

    setGameState('feedback');
  };

  const handleNext = () => {
    window.speechSynthesis.cancel();
    setSelectedOption(null);
    setShowHint(false);
    setHighlightTarget(null);
    setSpeaking(false);

    if (currentQIndex < QUESTION_DATA.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setGameState('playing');
    } else {
      setGameState('end');
      speakText(`Quiz beendet! Du hast ${score} von ${QUESTION_DATA.length} Fragen richtig beantwortet.`);
    }
  };

  const handleHintClick = () => {
    setShowHint(true);
    speakText(QUESTION_DATA[currentQIndex].hint);
  };

  // --- RENDER HELPERS ---

  const Progress = () => (
    <div className="w-full max-w-2xl bg-white/30 rounded-full h-4 mb-6 relative overflow-hidden border border-white/40">
      <div
        className="bg-gradient-to-r from-green-400 to-green-300 h-full transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"
        style={{ width: `${((currentQIndex) / QUESTION_DATA.length) * 100}%` }}
      />
    </div>
  );

  // --- SCREENS ---

  if (gameState === 'start') {
    return (
      <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 font-sans text-center">
        {/* Customized Start Screen Background */}
        <BackgroundGenerator isStartScreen={true} />

        <div className="bg-white p-10 rounded-[2rem] shadow-xl max-w-sm w-full relative z-10 flex flex-col items-center">
          <div className="mb-4">
            <Trophy size={60} className="text-yellow-500" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-extrabold text-green-700 mb-2 tracking-tight">Dino Quiz</h1>
          <p className="text-sm text-gray-500 mb-8 font-medium">Bist du ein echter Dino-Experte?</p>

          <button
            onClick={handleStart}
            className="w-full bg-[#10b981] hover:bg-[#059669] text-white text-2xl font-bold py-4 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Footprints size={24} />
            Starten
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'end') {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center p-4 text-center">
        <BackgroundGenerator theme={THEMES.SKY} />

        <div className="bg-white/90 backdrop-blur-md p-8 rounded-[3rem] shadow-2xl max-w-lg w-full border-4 border-white/50 animate-bounce-slow">
          <div className="flex justify-center mb-6">
            <Egg size={80} className="text-orange-500" />
          </div>
          <h2 className="text-4xl font-extrabold text-orange-600 mb-4">Gut gemacht!</h2>
          <div className="text-2xl text-gray-700 mb-8 space-y-2">
            <p>Du hast</p>
            <p className="text-6xl font-black text-green-600">{score} / {QUESTION_DATA.length}</p>
            <p>Fragen richtig!</p>
          </div>
          <button
            onClick={handleStart}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold py-5 px-8 rounded-2xl shadow-[0_6px_0_rgb(29,78,216)] active:shadow-none active:translate-y-2 transition-all flex items-center justify-center gap-3"
          >
            <RotateCcw />
            Nochmal spielen
          </button>
        </div>
      </div>
    );
  }

  // PLAYING & FEEDBACK STATES
  const currentQ = QUESTION_DATA[currentQIndex];

  return (
    <div className="min-h-screen relative flex flex-col items-center p-4 md:p-8 overflow-x-hidden">
      {/* Dynamic Background based on Question Theme */}
      <BackgroundGenerator theme={currentQ.theme} />

      {/* Header */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-4 z-10">
        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-md font-bold text-green-700 text-lg flex items-center gap-2">
          <Trophy size={20} className="text-yellow-500" />
          {score}
        </div>
        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-md font-bold text-blue-600 text-lg">
          Frage {currentQIndex + 1} / {QUESTION_DATA.length}
        </div>
      </div>

      <Progress />

      {/* Question Card */}
      <div className={`
        w-full max-w-3xl bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-xl p-6 md:p-10 mb-6 relative border-b-8 z-10 transition-all duration-300
        ${highlightTarget === 'question' ? 'border-yellow-400 ring-4 ring-yellow-200 scale-[1.02]' : 'border-gray-200/50'}
      `}>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleHintClick}
            className={`p-3 rounded-full transition-colors shadow-sm ${showHint ? 'bg-yellow-200 text-yellow-700' : 'bg-yellow-100 text-yellow-500 hover:bg-yellow-200'}`}
            aria-label="Hinweis"
            title="Hinweis geben"
          >
            <Lightbulb size={32} />
          </button>
          <button
            onClick={() => speakText(currentQ.question)}
            className={`p-3 rounded-full transition-colors shadow-sm ${speaking ? 'bg-green-100 text-green-600 animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            aria-label="Vorlesen"
          >
            <Volume2 size={32} />
          </button>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 pr-24 leading-tight text-center md:text-left drop-shadow-sm">
          {currentQ.question}
        </h2>

        {/* Hint Display */}
        {showHint && (
          <div className="mt-6 p-4 bg-yellow-50/90 border-2 border-yellow-300 rounded-xl flex items-start gap-3 animate-fade-in text-yellow-900">
            <Lightbulb className="flex-shrink-0 mt-1" size={24} />
            <p className="text-lg md:text-xl font-medium">{currentQ.hint}</p>
          </div>
        )}
      </div>

      {/* Options Grid */}
      <div className="w-full max-w-3xl grid gap-4 z-10">
        {shuffledOptions.map((option, idx) => {
          let btnClass = "bg-white/90 hover:bg-blue-50 border-gray-200 text-gray-700"; // Default
          let transformClass = "";

          // --- FEEDBACK STATE STYLES ---
          if (gameState === 'feedback') {
            if (option === currentQ.correct) {
              btnClass = "bg-green-100/95 text-green-800 border-green-500 ring-4 ring-green-300"; // Correct Answer
            } else if (option === selectedOption && option !== currentQ.correct) {
              btnClass = "bg-red-100/90 text-red-800 border-red-500 opacity-60"; // Wrong Selection
            } else {
              btnClass = "bg-gray-50/50 text-gray-400 border-gray-100 opacity-50"; // Others
            }
          }
          // --- PLAYING STATE (HIGHLIGHTING) STYLES ---
          else if (gameState === 'playing') {
            if (highlightTarget === idx) {
              // ** This is the active reading highlight **
              // "Stick out" effect: Larger scale, lift up (-translate-y-2), vivid yellow w/ strong shadow
              btnClass = "bg-[#fef9c3] border-yellow-400 ring-4 ring-yellow-200 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] z-50";
              transformClass = "scale-110 -translate-y-2";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              disabled={gameState === 'feedback'}
              className={`
                w-full text-left p-6 md:p-8 rounded-2xl text-xl md:text-2xl font-bold transition-all duration-300 border-b-8
                flex items-center gap-4 relative
                ${btnClass}
                ${transformClass}
                ${/* Normal hover behavior if NOT active highlight */ ''}
                ${gameState === 'playing' && highlightTarget !== idx ? 'bg-white/90 text-gray-700 border-gray-200 shadow-lg hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 active:translate-y-1 active:border-b-0' : ''}
              `}
            >
              <span className={`
                flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-inner
                ${gameState === 'feedback' && option === currentQ.correct ? 'bg-green-600 text-white' :
                  (highlightTarget === idx ? 'bg-yellow-300 text-yellow-800' : 'bg-gray-100 text-gray-400')}
              `}>
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback / Next Button Overlay */}
      {gameState === 'feedback' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-2xl mx-auto rounded-[2.5rem] shadow-2xl p-8 md:p-10 flex flex-col items-center gap-6 border-8 transform transition-all scale-100 ${isCorrect ? 'bg-green-50 border-green-400' : 'bg-orange-50 border-orange-400'}`}>

            {/* The Generated Correct Image OR The Frown Icon */}
            {isCorrect ? (
              <div className="flex flex-col items-center">
                <HappyDinoImage />
                <h3 className="text-4xl font-black text-green-600 mt-4">Richtig!</h3>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Frown size={120} className="text-orange-400 animate-pulse" />
                <h3 className="text-4xl font-black text-orange-600 mt-4">Fast...</h3>
              </div>
            )}

            <div className="text-center w-full">
              {/* Explanation Box */}
              <div className="bg-white/60 p-5 rounded-2xl mb-4 text-center border-2 border-white/50 shadow-inner">
                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-snug">
                  {currentQ.explanation}
                </p>
              </div>

              {!isCorrect && (
                <div className="bg-orange-100/80 p-3 rounded-xl inline-block">
                  <p className="text-orange-900 font-medium text-lg">Die richtige Antwort ist:</p>
                  <p className="text-xl font-bold text-orange-800 mt-1">{currentQ.correct}</p>
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              className={`
                w-full py-5 rounded-2xl font-bold text-2xl text-white shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-3
                ${isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'}
              `}
            >
              Weiter <ArrowRight size={28} />
            </button>
          </div>
        </div>
      )}

      {/* Spacer for bottom overlay */}
      <div className="h-32"></div>
    </div>
  );
}
