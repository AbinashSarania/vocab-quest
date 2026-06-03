import Confetti from "react-confetti";

function ResultScreen({ score, total, onRestart, onMenu }) {
  const accuracy = total ? Math.round((score / total) * 100) : 0;
  const wrong = total - score;

  const rank =
    accuracy >= 90
      ? "S"
      : accuracy >= 80
        ? "A"
        : accuracy >= 70
          ? "B"
          : accuracy >= 60
            ? "C"
            : "D";

  const showConfetti = accuracy >= 90;

  return (
    <div className="min-h-screen bg-[#f6f3ed] text-black flex items-center justify-center px-6 py-6 relative overflow-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <div className="w-full max-w-md text-center">
        {/* HEADER */}
        <p className="text-[10px] tracking-[0.35em] uppercase text-gray-500">
          Session Complete
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-[0.25em] mt-2">
          RESULT
        </h1>

        <div className="w-20 h-[2px] bg-black mx-auto my-4"></div>

        {/* RANK */}
        <div className="border border-black py-4 px-6 inline-block">
          <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500">
            Rank
          </p>

          <p className="text-3xl font-bold mt-1">{rank}</p>
        </div>

        {/* MESSAGE */}
        <p className="mt-4 text-xs text-gray-600 italic">
          {accuracy >= 80
            ? "Excellent retention"
            : accuracy >= 50
              ? "Good progress"
              : "Needs revision"}
        </p>

        {/* STATS */}
        <div className="mt-5 border border-black p-5">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Attempted</span>
              <span className="font-bold">{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Correct</span>
              <span className="font-bold">{score}</span>
            </div>

            <div className="flex justify-between">
              <span>Wrong</span>
              <span className="font-bold">{wrong}</span>
            </div>

            <div className="flex justify-between">
              <span>Accuracy</span>
              <span className="font-bold">{accuracy}%</span>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-5">
            <div className="flex justify-between text-[10px] tracking-widest uppercase text-gray-500 mb-2">
              <span>Performance</span>
              <span>{accuracy}%</span>
            </div>

            <div className="h-[6px] border border-black">
              <div
                className="h-full bg-black transition-all duration-1000"
                style={{
                  width: `${accuracy}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-5 space-y-3">
          <button
            onClick={onRestart}
            className="
              w-full
              border border-black
              py-3
              text-xs
              tracking-[0.25em]
              uppercase
              transition
              hover:bg-black
              hover:text-white
            "
          >
            Retry Session
          </button>

          <button
            onClick={onMenu}
            className="
              w-full
              border border-black
              py-3
              text-xs
              tracking-[0.25em]
              uppercase
              transition
              hover:bg-black
              hover:text-white
            "
          >
            Main Menu
          </button>
        </div>

        {/* FOOTER */}
        <p className="mt-6 text-[10px] tracking-[0.3em] uppercase text-gray-500">
          Vocabulary Progress Report
        </p>
      </div>
    </div>
  );
}

export default ResultScreen;
