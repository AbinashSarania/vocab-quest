import { useMemo, useState } from "react";
import wordsData from "../data/words.json";

/* =========================
   HELPERS
========================= */

function getRandomOptions(correct, pool) {
  const wrong = pool
    .filter((w) => w.meaning !== correct.meaning)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((w) => w.meaning);

  return [...wrong, correct.meaning].sort(() => Math.random() - 0.5);
}

function buildWeightedPool(words, stats) {
  let pool = [];

  words.forEach((w) => {
    const record = stats[w.word] || { correct: 0, wrong: 0 };

    let weight = 1;

    if (record.wrong > record.correct) weight = 3;
    if (record.correct > 3) weight = 1;

    for (let i = 0; i < weight; i++) {
      pool.push(w);
    }
  });

  return pool;
}

/* =========================
   COMPONENT
========================= */

function BattleScreen({ limit = 10, onBackToMenu, onFinish }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);

  const [showHint, setShowHint] = useState(false);
  const [stats, setStats] = useState({});

  // 🔥 VISUAL RESULT STATE
  const [result, setResult] = useState(null);

  /* =========================
     POOL (RANDOM + ADAPTIVE)
  ========================= */

  const pool = useMemo(() => {
    const weighted = buildWeightedPool(wordsData, stats);
    return [...weighted].sort(() => Math.random() - 0.5);
  }, [stats]);

  const currentWord = pool[index % pool.length];

  /* =========================
     OPTIONS
  ========================= */

  const options = useMemo(() => {
    if (!currentWord) return [];
    return getRandomOptions(currentWord, wordsData);
  }, [currentWord, index]);

  /* =========================
     ANSWER HANDLER
  ========================= */

  const handleAnswer = (option) => {
    const isCorrect = option === currentWord.meaning;

    const prev = stats[currentWord.word] || {
      correct: 0,
      wrong: 0,
    };

    setStats({
      ...stats,
      [currentWord.word]: {
        correct: prev.correct + (isCorrect ? 1 : 0),
        wrong: prev.wrong + (isCorrect ? 0 : 1),
      },
    });

    // 🔥 SHOW VISUAL RESULT INSTANTLY
    setResult({
      type: isCorrect ? "correct" : "wrong",
      correctAnswer: currentWord.meaning,
    });

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);

      setScore((s) => s + 1);
      setXp((x) => x + 10 * newStreak);
    } else {
      setStreak(0);
    }

    setShowHint(false);

    // ⏱ auto move next after short delay
    setTimeout(() => {
      setResult(null);

      if (index < limit - 1) {
        setIndex((i) => i + 1);
      } else {
        onFinish(score + (isCorrect ? 1 : 0), xp);
      }
    }, 700);
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 text-center relative">

      {/* TOP HUD */}
      <div className="absolute top-6 text-xs tracking-widest text-gray-600 flex gap-6">
        <span>Q {index + 1}/{limit}</span>
        <span>Score {score}</span>
        <span>Streak {streak}</span>
        <span>XP {xp}</span>
      </div>

      {/* MENU BUTTON */}
      <button
        onClick={onBackToMenu}
        className="absolute top-6 left-6 text-xs border border-black px-3 py-1 hover:bg-black hover:text-white"
      >
        Menu
      </button>

      {/* WORD */}
      <h1 className="text-5xl font-bold tracking-[0.3em]">
        {currentWord?.word}
      </h1>

      <p className="mt-4 text-sm text-gray-600">
        Select the correct meaning
      </p>

      {/* OPTIONS */}
      <div className="mt-10 w-full max-w-md space-y-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            className="w-full border border-black py-3 text-sm hover:bg-black hover:text-white transition"
          >
            {opt}
          </button>
        ))}
      </div>

      {/* HINT */}
      <button
        onClick={() => setShowHint(!showHint)}
        className="mt-8 text-xs uppercase tracking-widest underline text-gray-600"
      >
        {showHint ? "Hide Notes" : "Show Notes"}
      </button>

      {showHint && (
        <div className="mt-6 text-sm text-gray-700 space-y-2 max-w-md">
          <p className="italic">"{currentWord?.example}"</p>
          <p>
            <b>Synonyms:</b> {currentWord?.synonyms?.join(", ")}
          </p>
          <p>
            <b>Antonyms:</b> {currentWord?.antonyms?.join(", ")}
          </p>
        </div>
      )}

      {/* 🔥 VISUAL RESULT OVERLAY */}
      {result && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">

          {result.type === "correct" ? (
            <>
              <h1 className="text-6xl font-bold text-black tracking-widest">
                CORRECT
              </h1>
              <p className="mt-4 text-gray-600 text-sm">
                Good memory
              </p>
            </>
          ) : (
            <>
              <h1 className="text-6xl font-bold text-black tracking-widest">
                WRONG
              </h1>
              <p className="mt-4 text-gray-600 text-sm">
                Correct Answer:
              </p>
              <p className="mt-2 text-lg font-bold">
                {result.correctAnswer}
              </p>
            </>
          )}

        </div>
      )}

    </div>
  );
}

export default BattleScreen;