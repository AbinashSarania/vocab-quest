function ResultScreen({ score, total, onRestart, onMenu }) {
  const accuracy = total ? Math.round((score / total) * 100) : 0;
  const wrong = total - score;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 text-center">

      {/* TITLE */}
      <h1 className="text-4xl font-bold tracking-[0.4em]">RESULT</h1>

      <div className="w-28 h-[2px] bg-black my-6"></div>

      {/* SUMMARY BOX */}
      <div className="border border-black p-6 w-full max-w-sm space-y-3 text-sm">

        <div className="flex justify-between">
          <span>Attempted</span>
          <span className="font-bold">{total}</span>
        </div>

        <div className="flex justify-between">
          <span>Correct Answers</span>
          <span className="font-bold">{score}</span>
        </div>

        <div className="flex justify-between">
          <span>Wrong Answers</span>
          <span className="font-bold">{wrong}</span>
        </div>

        <div className="flex justify-between">
          <span>Accuracy</span>
          <span className="font-bold">{accuracy}%</span>
        </div>

      </div>

      {/* PERFORMANCE MESSAGE */}
      <div className="mt-6 text-sm text-gray-600">
        {accuracy >= 80
          ? "Excellent retention"
          : accuracy >= 50
            ? "Good progress"
            : "Needs revision"}
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-10 w-full max-w-xs space-y-4">

        <button
          onClick={onRestart}
          className="w-full border border-black py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition"
        >
          Try Again
        </button>

        <button
          onClick={onMenu}
          className="w-full border border-black py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition"
        >
          Main Menu
        </button>

      </div>

      {/* FOOTER */}
      <p className="absolute bottom-6 text-xs text-gray-500 tracking-widest">
        learning report
      </p>

    </div>
  );
}

export default ResultScreen;