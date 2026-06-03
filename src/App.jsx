import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import MainMenu from "./components/MainMenu";
import BattleScreen from "./components/BattleScreen";
import WordLibrary from "./components/WordLibrary";
import ResultScreen from "./components/ResultScreen";

function App() {
  const [screen, setScreen] = useState("splash");

  // now we store actual words, not just limit
  const [sessionWords, setSessionWords] = useState([]);

  const [finalStats, setFinalStats] = useState({
    score: 0,
    xp: 0,
  });

  /* =========================
     SPLASH
  ========================= */
  if (screen === "splash") {
    return <SplashScreen onStart={() => setScreen("menu")} />;
  }

  /* =========================
     MENU
  ========================= */
  if (screen === "menu") {
    return (
      <MainMenu
        onStartGame={(words) => {
          setSessionWords(words); // 👈 IMPORTANT CHANGE
          setScreen("battle");
        }}
        onOpenLibrary={() => setScreen("library")}
      />
    );
  }

  /* =========================
     BATTLE
  ========================= */
  if (screen === "battle") {
    return (
      <BattleScreen
        words={sessionWords} // 👈 NEW: pass filtered words
        onBackToMenu={() => setScreen("menu")}
        onFinish={(score, xp) => {
          setFinalStats({ score, xp });
          setScreen("result");
        }}
      />
    );
  }

  /* =========================
     LIBRARY
  ========================= */
  if (screen === "library") {
    return <WordLibrary onBack={() => setScreen("menu")} />;
  }

  /* =========================
     RESULT
  ========================= */
  if (screen === "result") {
    return (
      <ResultScreen
        score={finalStats.score}
        total={sessionWords.length}
        xp={finalStats.xp}
        onRestart={() => setScreen("menu")}
        onMenu={() => setScreen("menu")}
      />
    );
  }

  return null;
}

export default App;
