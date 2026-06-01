import { useEffect, useState } from "react";

function SplashScreen({ onStart }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 200);
    const t2 = setTimeout(() => setStage(2), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4 sm:px-6">

      {/* WRAPPER */}
      <div
        className={`
          flex flex-col items-center text-center w-full max-w-md
          transition-all duration-700 ease-out
          ${stage >= 2 ? "-translate-y-8 sm:-translate-y-10" : "translate-y-0"}
        `}
      >

        {/* TITLE */}
        <h1
          className={`
            text-4xl sm:text-5xl md:text-6xl font-bold
            tracking-[0.25em] sm:tracking-[0.35em]
            transition-opacity duration-700
            leading-tight
            ${stage >= 1 ? "opacity-100" : "opacity-0"}
          `}
        >
          VOCAB&nbsp;QUEST
        </h1>

        {/* LINE */}
        <div className="w-20 sm:w-28 md:w-32 h-[2px] bg-black my-5 sm:my-6"></div>

        {/* SUBTITLE */}
        <p className="text-[11px] sm:text-sm tracking-widest uppercase text-gray-700 px-2">
          Vocabulary Training System
        </p>

        {/* CONTENT */}
        <div
          className={`
            transition-all duration-700 ease-out
            w-full px-4
            ${stage >= 2 ? "opacity-100 mt-5 sm:mt-6" : "opacity-0 mt-0"}
          `}
        >

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            A structured method to build, test, and retain advanced vocabulary using repetition and recall.
          </p>

          <button
            onClick={onStart}
            className="
              mt-7 sm:mt-8
              w-full sm:w-auto
              border border-black
              px-5 sm:px-6 py-2
              text-xs sm:text-sm
              tracking-widest uppercase
              active:scale-95
              transition
              hover:bg-black hover:text-white
            "
          >
            Start
          </button>

        </div>

      </div>

      {/* FOOTER */}
      <p className="absolute bottom-4 sm:bottom-6 text-[10px] sm:text-xs text-gray-500 tracking-widest">
        v1.0 • offline learning system
      </p>

    </div>
  );
}

export default SplashScreen;