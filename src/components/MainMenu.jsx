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
    <div className="min-h-screen bg-[#f6f3ed] flex items-center justify-center px-4 text-black">
      {/* MAIN CARD */}
      <div className="w-full max-w-md space-y-6 animate-[fadeIn_0.5s_ease]">
        {/* TITLE */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl tracking-[0.35em] font-semibold">
            VOCAB QUEST
          </h1>
          <div className="w-16 h-[1px] bg-black/40 mx-auto"></div>
          <p className="text-[10px] tracking-[0.3em] text-black/50 uppercase">
            training system
          </p>
        </div>

        {/* STATS */}
        <div className="border border-black/10 bg-white/40 backdrop-blur-sm p-4 text-center">
          <p className="text-[10px] tracking-widest text-black/50 uppercase">
            available words
          </p>
          <h2 className="text-3xl font-light mt-1">{availableWords}</h2>
        </div>

        {/* DATE MODE */}
        <div className="border border-black/10 bg-white/30 p-4 space-y-3">
          <p className="text-[10px] tracking-widest text-black/50 uppercase">
            time filter
          </p>

          <div className="grid grid-cols-3 gap-2">
            {["All", "Single", "Range"].map((m) => (
              <button
                key={m}
                onClick={() =>
                  setDateMode(
                    m === "All"
                      ? "All Dates"
                      : m === "Single"
                        ? "Single Date"
                        : "Date Range",
                  )
                }
                className={`text-[10px] py-2 border transition ${
                  dateMode.includes(m)
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {dateMode === "Single Date" && (
            <div className="w-full">
              <input
                type="date"
                value={singleDate}
                onChange={(e) => setSingleDate(e.target.value)}
                className="
        block
        w-full
        max-w-full
        min-w-0
        border
        border-black/20
        bg-transparent
        p-2
        text-xs
        box-border
      "
                style={{ width: "100%" }}
              />
            </div>
          )}

          {dateMode === "Date Range" && (
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-black/20 p-2 text-sm bg-transparent"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-black/20 p-2 text-sm bg-transparent"
              />
            </div>
          )}
        </div>

        {/* SESSION CONTROL */}
        <div className="border border-black/10 bg-white/30 p-4 space-y-3">
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-black/50">
            <span>session size</span>
            <span>{sessionLimit}</span>
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

        {/* ACTIONS */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleStart}
            disabled={!availableWords}
            className="w-full bg-black text-white py-3 text-xs tracking-[0.25em] uppercase hover:scale-[1.01] active:scale-95 transition"
          >
            start training
          </button>

          <button
            onClick={onOpenLibrary}
            className="w-full border border-black/20 py-3 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition"
          >
            word library
          </button>

          <button
            onClick={() => setShowAbout(true)}
            className="w-full text-xs tracking-widest uppercase text-black/60 hover:text-black transition"
          >
            about
          </button>
        </div>
      </div>

      {/* ABOUT MODAL */}
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
