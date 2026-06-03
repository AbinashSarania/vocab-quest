import { useMemo, useState } from "react";
import words from "../data/words.json";

function MainMenu({ onStartGame, onOpenLibrary }) {
  const [showAbout, setShowAbout] = useState(false);

  const [limit, setLimit] = useState(10);

  const [dateMode, setDateMode] = useState("All Dates");
  const [singleDate, setSingleDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredWords = useMemo(() => {
    let result = [...words];

    if (dateMode === "Single Date" && singleDate) {
      result = result.filter((w) => w.date === singleDate);
    }

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

  const handleStart = () => {
    if (!availableWords) return;

    const sessionWords = [...filteredWords]
      .sort(() => Math.random() - 0.5)
      .slice(0, sessionLimit);

    onStartGame(sessionWords);
  };

  return (
    <div className="min-h-screen bg-[#f6f3ed] text-black px-5 py-10 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1
            className="
    text-4xl
    tracking-[0.35em]
    font-semibold
    animate-pulse
  "
          >
            VOCAB QUEST
          </h1>

          <div className="w-20 h-[1px] bg-black mx-auto mt-4 mb-3"></div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-black/50">
            Vocabulary Training System
          </p>
        </div>

        {/* WORD COUNT */}
        <div className="border border-black p-5 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-black/50">
            Available Words
          </p>

          <h2 className="text-4xl font-light mt-2">{availableWords}</h2>
        </div>

        {/* FILTERS */}
        <div className="border border-black mt-4 p-5">
          <p className="text-[10px] uppercase tracking-[0.25em] text-black/50 mb-4">
            Word Selection
          </p>

          <div className="space-y-2">
            <button
              onClick={() => setDateMode("All Dates")}
              className={`w-full border py-3 text-xs uppercase tracking-widest transition ${
                dateMode === "All Dates"
                  ? "bg-black text-white border-black"
                  : "border-black hover:bg-black hover:text-white"
              }`}
            >
              All Words
            </button>

            <button
              onClick={() => setDateMode("Single Date")}
              className={`w-full border py-3 text-xs uppercase tracking-widest transition ${
                dateMode === "Single Date"
                  ? "bg-black text-white border-black"
                  : "border-black hover:bg-black hover:text-white"
              }`}
            >
              Single Day
            </button>

            {dateMode === "Single Date" && (
              <input
                type="date"
                value={singleDate}
                onChange={(e) => setSingleDate(e.target.value)}
                className="
                  w-full mt-2
                  border border-black
                  px-3 py-3
                  text-sm
                  bg-transparent
                  box-border
                "
              />
            )}

            <button
              onClick={() => setDateMode("Date Range")}
              className={`w-full border py-3 text-xs uppercase tracking-widest transition ${
                dateMode === "Date Range"
                  ? "bg-black text-white border-black"
                  : "border-black hover:bg-black hover:text-white"
              }`}
            >
              Date Range
            </button>

            {dateMode === "Date Range" && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="
                    w-full
                    border border-black
                    px-2 py-3
                    text-sm
                    bg-transparent
                    box-border
                  "
                />

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="
                    w-full
                    border border-black
                    px-2 py-3
                    text-sm
                    bg-transparent
                    box-border
                  "
                />
              </div>
            )}
          </div>
        </div>

        {/* SESSION SIZE */}
        <div className="border border-black mt-4 p-5">
          <div className="flex justify-between mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-black/50">
              Session Size
            </span>

            <span className="text-sm">{sessionLimit}</span>
          </div>

          <input
            type="range"
            min="1"
            max={Math.max(availableWords, 1)}
            value={sessionLimit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full accent-black"
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-5 space-y-3">
          <button
            onClick={handleStart}
            disabled={!availableWords}
            className="
              w-full
              bg-black
              text-white
              py-4
              text-xs
              uppercase
              tracking-[0.3em]
              transition
              hover:opacity-90
              disabled:opacity-40
            "
          >
            Start Training
          </button>

          <button
            onClick={onOpenLibrary}
            className="
              w-full
              border border-black
              py-3
              text-xs
              uppercase
              tracking-widest
              hover:bg-black
              hover:text-white
              transition
            "
          >
            Word Library
          </button>

          <button
            onClick={() => setShowAbout(true)}
            className="
              w-full
              border border-black
              py-3
              text-xs
              uppercase
              tracking-widest
              hover:bg-black
              hover:text-white
              transition
            "
          >
            About
          </button>
        </div>
      </div>

      {/* ABOUT MODAL */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-[#f6f3ed] border border-black p-6 text-center">
            <h2 className="text-2xl tracking-[0.25em] font-semibold">ABOUT</h2>

            <div className="w-20 h-[1px] bg-black mx-auto my-4"></div>

            <p className="text-sm text-black/70 leading-relaxed">
              I built this because reading vocabulary from PDFs felt boring and
              didn’t stick. So I turned it into an active recall system where
              you actually test yourself instead of just reading.
            </p>

            <p className="mt-4 text-xs tracking-widest text-black/50 uppercase">
              Built for memory, retention and exam preparation
            </p>

            <div className="border-t border-black mt-5 pt-5">
              <p className="text-[10px] tracking-[0.25em] uppercase text-black/50">
                Suggestions
              </p>

              <a
                href="mailto:abinashsarania@gmail.com"
                className="inline-block mt-2 underline"
              >
                abinashsarania@gmail.com
              </a>
            </div>

            <button
              onClick={() => setShowAbout(false)}
              className="
                w-full
                border border-black
                py-3
                mt-6
                text-xs
                uppercase
                tracking-widest
                hover:bg-black
                hover:text-white
                transition
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
