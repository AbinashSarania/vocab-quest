import { useMemo, useState } from "react";
import words from "../data/words.json";

function MainMenu({ onStartGame, onOpenLibrary }) {
  const [showAbout, setShowAbout] = useState(false);

  const [limit, setLimit] = useState(10);

  const [dateMode, setDateMode] = useState("All Dates");
  const [singleDate, setSingleDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* =========================
     FILTER LOGIC
  ========================= */

  const filteredWords = useMemo(() => {
    let result = [...words];

    // ALL DATES
    if (dateMode === "All Dates") {
      return result;
    }

    // SINGLE DATE
    if (dateMode === "Single Date" && singleDate) {
      result = result.filter((w) => w.date === singleDate);
    }

    // RANGE DATE
    if (dateMode === "Date Range" && fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);

      result = result.filter((w) => {
        if (!w.date) return false;

        const d = new Date(w.date);
        return d >= from && d <= to;
      });
    }

    return result;
  }, [dateMode, singleDate, fromDate, toDate]);

  const availableWords = filteredWords.length;
  const sessionLimit = Math.min(limit, availableWords || 0);

  /* =========================
     START GAME
  ========================= */

  const handleStart = () => {
    if (!availableWords) return;

    const shuffled = [...filteredWords].sort(() => Math.random() - 0.5);

    const sessionWords = shuffled.slice(0, sessionLimit);

    onStartGame(sessionWords);
  };

  return (
    <div className="min-h-screen bg-white text-black px-4 py-8 flex flex-col">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
        {/* TITLE */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-[0.3em]">VOCAB QUEST</h1>

          <div className="w-20 h-[2px] bg-black mx-auto mt-4 mb-4"></div>

          <p className="text-xs tracking-widest text-gray-500 uppercase">
            Training System
          </p>
        </div>

        {/* WORD COUNT */}
        <div className="mt-6 border border-black p-5 text-center">
          <p className="text-xs uppercase text-gray-500">Available Words</p>
          <h2 className="text-3xl font-bold mt-2">{availableWords}</h2>
        </div>

        {/* DATE MODE */}
        <div className="mt-5 border border-black p-5">
          <p className="text-xs uppercase text-gray-500 mb-3">Date Mode</p>

          <div className="grid grid-cols-3 gap-2">
            {["All Dates", "Single Date", "Date Range"].map((mode) => (
              <button
                key={mode}
                onClick={() => setDateMode(mode)}
                className={`text-xs py-2 border ${
                  dateMode === mode
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* SINGLE DATE */}
          {dateMode === "Single Date" && (
            <input
              type="date"
              value={singleDate}
              onChange={(e) => setSingleDate(e.target.value)}
              className="mt-3 w-full border border-black p-2 text-sm"
            />
          )}

          {/* RANGE */}
          {dateMode === "Date Range" && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-black p-2 text-sm"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-black p-2 text-sm"
              />
            </div>
          )}
        </div>

        {/* SESSION SIZE */}
        <div className="mt-5 border border-black p-5">
          <p className="text-xs uppercase text-gray-500">
            Session Size: {sessionLimit}
          </p>

          <input
            type="range"
            min="1"
            max={Math.max(availableWords, 1)}
            value={sessionLimit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full mt-3 accent-black"
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleStart}
            disabled={!availableWords}
            className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest disabled:opacity-40"
          >
            Start Training
          </button>

          <button
            onClick={onOpenLibrary}
            className="w-full border border-black py-3 text-sm uppercase hover:bg-black hover:text-white"
          >
            Word Library
          </button>

          <button
            onClick={() => setShowAbout(true)}
            className="w-full border border-black py-3 text-sm uppercase hover:bg-black hover:text-white"
          >
            About
          </button>
        </div>
      </div>

      {/* ABOUT */}
      {showAbout && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white border border-black p-5 sm:p-6 text-center shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold tracking-widest">
              ABOUT
            </h2>

            <div className="w-16 sm:w-20 h-[2px] bg-black my-4 mx-auto"></div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              I built this because reading vocabulary from PDFs felt boring and
              didn’t stick. So I turned it into an active recall system where
              you actually test yourself instead of just reading.
            </p>

            <p className="mt-4 text-[11px] sm:text-xs text-gray-500">
              Built for memory, retention, and real exam prep.
            </p>

            {/* EMAIL */}
            <div className="mt-5 border-t border-black pt-4">
              <p className="text-[10px] sm:text-xs tracking-widest text-gray-600">
                SUGGESTIONS
              </p>

              <a
                href="mailto:abinashsarania@gmail.com"
                className="text-sm font-bold underline mt-1 inline-block"
              >
                abinashsarania@gmail.com
              </a>
            </div>

            <button
              onClick={() => setShowAbout(false)}
              className="
          mt-6 w-full border border-black
          py-2 text-xs tracking-widest uppercase
          active:scale-95 transition
          hover:bg-black hover:text-white
        "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainMenu;
