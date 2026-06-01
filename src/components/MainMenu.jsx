import { useState } from "react";
import words from "../data/words.json";

function MainMenu({ onStartGame, onOpenLibrary }) {
  const maxWords = words.length;
  const [limit, setLimit] = useState(10);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4 sm:px-6 relative">

      {/* WRAPPER */}
      <div className="w-full max-w-md flex flex-col items-center text-center">

        {/* TITLE */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.25em] sm:tracking-[0.35em] leading-tight">
          VOCAB&nbsp;QUEST
        </h1>

        <div className="w-20 sm:w-28 h-[2px] bg-black my-5 sm:my-6"></div>

        <p className="text-[11px] sm:text-xs tracking-widest text-gray-600 uppercase">
          Learning System
        </p>

        {/* TOTAL WORDS */}
        <div className="mt-6 sm:mt-8 text-xs sm:text-sm tracking-widest">
          TOTAL WORDS: <span className="font-bold">{maxWords}</span>
        </div>

        {/* SLIDER CARD */}
        <div className="mt-8 w-full border border-black p-4 sm:p-6">

          <div className="flex justify-between text-[10px] sm:text-xs tracking-widest mb-4">
            <span>WORDS PER SESSION</span>
            <span className="font-bold">{limit}</span>
          </div>

          <input
            type="range"
            min="10"
            max={maxWords}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full accent-black cursor-pointer"
          />

          <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-3">
            <span>10</span>
            <span>{Math.floor(maxWords / 2)}</span>
            <span>{maxWords}</span>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-10 w-full space-y-3">

          <button
            onClick={() => onStartGame(limit)}
            className="
              w-full border border-black
              py-3 sm:py-3
              text-xs sm:text-sm tracking-widest uppercase
              active:scale-[0.98]
              transition
              hover:bg-black hover:text-white
            "
          >
            Start Practice
          </button>

          <button
            onClick={onOpenLibrary}
            className="
              w-full border border-black
              py-3 sm:py-3
              text-xs sm:text-sm tracking-widest uppercase
              active:scale-[0.98]
              transition
              hover:bg-black hover:text-white
            "
          >
            Word Library
          </button>

          <button
            onClick={() => setShowAbout(true)}
            className="
              w-full border border-black
              py-3 sm:py-3
              text-xs sm:text-sm tracking-widest uppercase
              active:scale-[0.98]
              transition
              hover:bg-black hover:text-white
            "
          >
            About
          </button>

        </div>

      </div>

      {/* FOOTER */}
      <p className="absolute bottom-4 sm:bottom-6 text-[10px] sm:text-xs text-gray-500 tracking-widest">
        adaptive learning system
      </p>

      {/* ABOUT MODAL (CENTERED FIXED VERSION) */}
      {showAbout && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="w-full max-w-md bg-white border border-black p-5 sm:p-6 text-center shadow-xl">

            <h2 className="text-xl sm:text-2xl font-bold tracking-widest">
              ABOUT
            </h2>

            <div className="w-16 sm:w-20 h-[2px] bg-black my-4 mx-auto"></div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              I built this because reading vocabulary from PDFs felt boring and didn’t stick.
              So I turned it into an active recall system where you actually test yourself instead of just reading.
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