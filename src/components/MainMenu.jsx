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
    <div className="min-h-[100dvh] bg-[#f6f3ed] flex items-center justify-center p-4 sm:p-6 text-black selection:bg-black/20">
      {/* MAIN CARD */}
      <div className="w-full max-w-md space-y-5 sm:space-y-6 animate-[fadeIn_0.5s_ease]">
        {/* TITLE */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl sm:text-3xl tracking-[0.35em] font-semibold ml-[0.35em]">
            VOCAB QUEST
          </h1>
          <div className="w-16 h-[1px] bg-black/40 mx-auto"></div>
          <p className="text-[9px] sm:text-[10px] tracking-[0.3em] text-black/50 uppercase ml-[0.3em]">
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
        <div className="border border-black/10 bg-white/30 p-4 sm:p-5 space-y-4">
          <p className="text-[10px] tracking-widest text-black/50 uppercase text-center sm:text-left">
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
                className={`text-[10px] py-2.5 border transition-colors ${
                  dateMode.includes(m)
                    ? "bg-black text-white border-black"
                    : "border-black/20 hover:bg-black/5 hover:border-black/40"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* SINGLE DATE */}
          {dateMode === "Single Date" && (
            <div className="relative mt-2 animate-[fadeIn_0.2s_ease]">
              <button
                onClick={() =>
                  document.getElementById("singleDatePicker")?.showPicker?.()
                }
                className="w-full border border-black/20 py-2.5 px-3 text-sm text-left bg-transparent hover:border-black/40 transition-colors focus:outline-none focus:border-black/60"
              >
                {singleDate || "Select Date..."}
              </button>

              <input
                id="singleDatePicker"
                type="date"
                value={singleDate}
                onChange={(e) => setSingleDate(e.target.value)}
                className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"
              />
            </div>
          )}

          {/* DATE RANGE - Fixed Mobile Overflow */}
          {dateMode === "Date Range" && (
            <div className="grid grid-cols-2 gap-2 mt-2 animate-[fadeIn_0.2s_ease]">
              {/* FROM DATE */}
              <div className="relative">
                <button
                  onClick={() =>
                    document.getElementById("fromDatePicker")?.showPicker?.()
                  }
                  className="w-full border border-black/20 py-2.5 px-2 sm:px-3 text-xs sm:text-sm text-center sm:text-left bg-transparent hover:border-black/40 transition-colors focus:outline-none focus:border-black/60 truncate"
                >
                  {fromDate || "From Date"}
                </button>
                <input
                  id="fromDatePicker"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"
                />
              </div>

              {/* TO DATE */}
              <div className="relative">
                <button
                  onClick={() =>
                    document.getElementById("toDatePicker")?.showPicker?.()
                  }
                  className="w-full border border-black/20 py-2.5 px-2 sm:px-3 text-xs sm:text-sm text-center sm:text-left bg-transparent hover:border-black/40 transition-colors focus:outline-none focus:border-black/60 truncate"
                >
                  {toDate || "To Date"}
                </button>
                <input
                  id="toDatePicker"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* SESSION CONTROL */}
        <div className="border border-black/10 bg-white/30 p-4 sm:p-5 space-y-4">
          <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-black/50">
            <span>session size</span>
            <span className="text-black font-medium text-xs">
              {sessionLimit}
            </span>
          </div>

          <input
            type="range"
            min="1"
            max={Math.max(availableWords, 1)}
            value={sessionLimit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full accent-black cursor-pointer"
          />
        </div>

        {/* ACTIONS */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={handleStart}
            disabled={!availableWords}
            className="w-full bg-black text-white py-3.5 text-xs tracking-[0.25em] uppercase hover:bg-black/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            start training
          </button>

          <button
            onClick={onOpenLibrary}
            className="w-full border border-black/20 py-3 text-xs tracking-widest uppercase hover:border-black hover:bg-black/5 transition-colors active:scale-[0.98]"
          >
            word library
          </button>

          <button
            onClick={() => setShowAbout(true)}
            className="w-full py-2 text-[10px] tracking-widest uppercase text-black/40 hover:text-black transition-colors"
          >
            about
          </button>
        </div>
      </div>

      {/* ABOUT MODAL */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-[fadeIn_0.2s_ease]">
          <div className="w-full max-w-sm bg-[#f6f3ed] border border-black/20 p-6 sm:p-8 text-center shadow-2xl relative">
            <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] ml-[0.2em]">
              ABOUT
            </h2>

            <div className="w-12 h-[1px] bg-black/40 my-5 mx-auto"></div>

            <p className="text-sm text-black/80 leading-relaxed font-light">
              I built this because reading vocabulary from PDFs felt boring and
              didn’t stick. So I turned it into an active recall system where
              you actually test yourself instead of just reading.
            </p>

            <p className="mt-5 text-[10px] uppercase tracking-widest text-black/50">
              Built for memory, retention, & real exam prep.
            </p>

            {/* EMAIL */}
            <div className="mt-8 pt-6 border-t border-black/10">
              <p className="text-[9px] tracking-widest text-black/40 uppercase mb-1">
                SUGGESTIONS
              </p>
              <a
                href="mailto:abinashsarania@gmail.com"
                className="text-xs tracking-wider text-black/80 hover:text-black hover:underline transition-colors"
              >
                abinashsarania@gmail.com
              </a>
            </div>

            <button
              onClick={() => setShowAbout(false)}
              className="mt-8 w-full border border-black/20 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors active:scale-[0.98]"
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
