import { useEffect, useMemo, useRef, useState } from "react";
import wordsData from "../data/words.json";

/* =========================
   HELPERS
========================= */

function getOptions(correct, pool) {
  const wrong = pool
    .filter((w) => w.meaning !== correct.meaning)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((w) => w.meaning);

  return [...wrong, correct.meaning].sort(() => Math.random() - 0.5);
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/* =========================
   COMPONENT
========================= */

function BattleScreen({ limit = 10, onBackToMenu, onFinish }) {
  const [index, setIndex] = useState(0);

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);

  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const [showHint, setShowHint] = useState(false);

  const wordQueueRef = useRef(shuffle(wordsData));

  const [currentWord, setCurrentWord] = useState(
    wordQueueRef.current[0]
  );

  /* =========================
     MINIMAL ANIMATION CONTROL
  ========================= */

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);

    const t = requestAnimationFrame(() => {
      setAnimate(true);
    });

    return () => cancelAnimationFrame(t);
  }, [currentWord]);

  /* =========================
     OPTIONS
  ========================= */

  const options = useMemo(() => {
    return getOptions(currentWord, wordsData);
  }, [currentWord]);

  /* =========================
     ANSWER
  ========================= */

  const handleAnswer = (opt) => {
    if (selected) return;

    const correct = opt === currentWord.meaning;

    setSelected(opt);
    setIsCorrect(correct);

    if (correct) {
      setCorrectCount((c) => c + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore((s) => s + 1);
      setXp((x) => x + 10 * newStreak);
    } else {
      setWrongCount((w) => w + 1);
      setStreak(0);
    }
  };

  /* =========================
     NEXT
  ========================= */

  const goNext = () => {
    if (index + 1 >= limit) {
      onFinish(score, xp);
      return;
    }

    const nextIndex = index + 1;
    setIndex(nextIndex);

    setCurrentWord(
      wordQueueRef.current[nextIndex % wordQueueRef.current.length]
    );

    setSelected(null);
    setIsCorrect(null);
    setShowHint(false);
  };

  /* =========================
     PREV
  ========================= */

  const goPrev = () => {
    if (index === 0) return;

    const prevIndex = index - 1;
    setIndex(prevIndex);

    setCurrentWord(
      wordQueueRef.current[prevIndex % wordQueueRef.current.length]
    );

    setSelected(null);
    setIsCorrect(null);
    setShowHint(false);
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 text-center relative">

      {/* TOP */}
      <div className="absolute top-6 text-xs tracking-widest text-gray-600 flex gap-6">
        <span>Q {index + 1}/{limit}</span>
        <span>Correct: {correctCount}</span>
        <span>Wrong: {wrongCount}</span>
      </div>

      <button
        onClick={onBackToMenu}
        className="absolute top-6 left-6 text-xs border border-black px-3 py-1 hover:bg-black hover:text-white"
      >
        Menu
      </button>

      {/* WORD (MINIMAL SMOOTH ANIMATION + RESPONSIVE FIX) */}
      <h1
        className={`
          font-bold tracking-[0.25em] text-center px-4 break-words
          transition-all duration-500 ease-out

          text-3xl sm:text-4xl md:text-5xl lg:text-6xl

          ${animate
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-3 scale-[0.98]"
          }
        `}
      >
        {currentWord?.word}
      </h1>

      <p className="mt-4 text-sm text-gray-600">
        Choose the correct meaning
      </p>

      {/* OPTIONS */}
      <div className="mt-10 w-full max-w-md space-y-3">
        {options.map((opt, i) => {
          let style =
            "w-full border border-black py-3 text-sm transition duration-200";

          if (selected) {
            if (opt === currentWord.meaning) {
              style += " bg-green-100 border-green-500";
            } else if (opt === selected && !isCorrect) {
              style += " bg-red-100 border-red-500";
            }
          }

          return (
            <button
              key={i}
              disabled={!!selected}
              onClick={() => handleAnswer(opt)}
              className={style}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* HINT */}
      <button
        onClick={() => setShowHint((h) => !h)}
        className="mt-8 text-xs underline tracking-widest text-gray-600"
      >
        {showHint ? "Hide Hint" : "Show Hint"}
      </button>

      {showHint && (
        <div className="mt-6 text-sm text-gray-700 max-w-md space-y-2">
          <p className="italic">"{currentWord?.example}"</p>
          <p>
            <b>Synonyms:</b> {currentWord?.synonyms?.join(", ")}
          </p>
        </div>
      )}

      {/* NAV */}
      <div className="mt-8 flex gap-4">

        <button
          onClick={goPrev}
          disabled={index === 0}
          className="border border-black px-5 py-2 text-sm tracking-widest uppercase hover:bg-black hover:text-white disabled:opacity-30"
        >
          Prev
        </button>

        <button
          onClick={goNext}
          className="border border-black px-5 py-2 text-sm tracking-widest uppercase hover:bg-black hover:text-white"
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default BattleScreen;