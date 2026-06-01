import { useEffect, useState } from "react";

function SplashScreen({ onStart }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1 → show title
    const t1 = setTimeout(() => setStage(1), 200);

    // Stage 2 → move up + show content
    const t2 = setTimeout(() => setStage(2), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-6">

      {/* MAIN WRAPPER (THIS MOVES AS ONE BLOCK) */}
      <div
        className={`
          flex flex-col items-center text-center
          transition-all duration-700 ease-out
          ${stage >= 2 ? "-translate-y-10" : "translate-y-0"}
        `}
      >

        {/* TITLE */}
        <h1
          className={`
            text-4xl sm:text-5xl md:text-7xl font-bold tracking-[0.35em]
            transition-opacity duration-700
            ${stage >= 1 ? "opacity-100" : "opacity-0"}
          `}
        >
          VOCAB&nbsp;&nbsp;QUEST
        </h1>

        {/* LINE */}
        <div className="w-24 sm:w-28 md:w-32 h-[2px] bg-black my-6"></div>

        {/* SUBTITLE */}
        <p className="text-xs sm:text-sm tracking-widest uppercase text-gray-700">
          Vocabulary Training System
        </p>

        {/* DESCRIPTION + BUTTON (ONLY AFTER STAGE 2) */}
        <div
          className={`
            transition-all duration-700 ease-out
            ${stage >= 2 ? "opacity-100 mt-6" : "opacity-0 mt-0"}
          `}
        >

          <p className="text-xs sm:text-sm text-gray-600 max-w-md leading-relaxed px-2">
            A structured method to build, test, and retain advanced vocabulary using repetition and recall.
          </p>

          <button
            onClick={onStart}
            className="mt-8 border border-black px-5 sm:px-6 py-2 text-xs sm:text-sm tracking-widest uppercase hover:bg-black hover:text-white transition"
          >
            Start
          </button>

        </div>

      </div>

      {/* FOOTER */}
      <p className="absolute bottom-6 text-[10px] sm:text-xs text-gray-500 tracking-widest">
        v1.0 • offline learning system
      </p>

    </div>
  );
}

export default SplashScreen;