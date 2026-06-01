import { useState } from "react";
import words from "../data/words.json";

function MainMenu({ onStartGame, onOpenLibrary }) {
  const maxWords = words.length;
  const [limit, setLimit] = useState(10);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6">

      {/* TITLE */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-[0.4em]">
        VOCAB QUEST
      </h1>

      <div className="w-28 h-[2px] bg-black my-6"></div>

      <p className="text-xs tracking-widest text-gray-600 uppercase">
        Learning System
      </p>

      {/* TOTAL WORDS */}
      <div className="mt-8 text-sm tracking-widest">
        TOTAL WORDS: <span className="font-bold">{maxWords}</span>
      </div>

      {/* SLIDER */}
      <div className="mt-8 w-full max-w-md border border-black p-6">

        <div className="flex justify-between text-xs tracking-widest mb-4">
          <span>WORDS PER SESSION</span>
          <span>{limit}</span>
        </div>

        <input
          type="range"
          min="10"
          max={maxWords}
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="w-full accent-black"
        />

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>10</span>
          <span>{Math.floor(maxWords / 2)}</span>
          <span>{maxWords}</span>
        </div>

      </div>

      {/* BUTTONS */}
      <div className="mt-10 w-full max-w-xs space-y-4">

        <button
          onClick={() => onStartGame(limit)}
          className="w-full border border-black py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition"
        >
          Start Practice
        </button>

        <button
          onClick={onOpenLibrary}
          className="w-full border border-black py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition"
        >
          Word Library
        </button>

        <button
          onClick={() => setShowAbout(true)}
          className="w-full border border-black py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition"
        >
          About Us
        </button>

      </div>

      {/* ABOUT MODAL */}
      {showAbout && (
        <div className="absolute inset-0 bg-white flex items-center justify-center px-6">

          <div className="border border-black p-6 max-w-md text-center">

            <h2 className="text-2xl font-bold tracking-widest">
              ABOUT
            </h2>

            <div className="w-20 h-[2px] bg-black my-4 mx-auto"></div>

            <p className="text-sm text-gray-700 leading-relaxed">
              I built this because reading vocabulary from PDFs felt boring and
              ineffective for me.
            </p>

            <p className="mt-3 text-sm text-gray-700 leading-relaxed">
              So I turned it into an active recall system where you actually test
              yourself instead of just reading.
            </p>

            <p className="mt-4 text-xs text-gray-500">
              Built for better memory and real retention.
            </p>

            {/* EMAIL */}
            <div className="mt-5 border-t border-black pt-4">
              <p className="text-xs tracking-widest text-gray-600">
                SUGGESTIONS / FEEDBACK
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
              className="mt-6 border border-black px-4 py-2 text-xs uppercase hover:bg-black hover:text-white transition"
            >
              Close
            </button>

          </div>

        </div>
      )}

      {/* FOOTER */}
      <p className="absolute bottom-6 text-xs text-gray-500 tracking-widest">
        adaptive learning system
      </p>

    </div>
  );
}

export default MainMenu;