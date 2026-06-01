import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import MainMenu from "./components/MainMenu";
import BattleScreen from "./components/BattleScreen";
import WordLibrary from "./components/WordLibrary";
import ResultScreen from "./components/ResultScreen";

function App() {
  const [screen, setScreen] = useState("splash");
  const [gameLimit, setGameLimit] = useState(10);

  const [finalStats, setFinalStats] = useState({
    score: 0,
    xp: 0,
  });

  if (screen === "splash") {
    return <SplashScreen onStart={() => setScreen("menu")} />;
  }

  if (screen === "menu") {
    return (
      <MainMenu
        onStartGame={(count) => {
          setGameLimit(count);
          setScreen("battle");
        }}
        onOpenLibrary={() => setScreen("library")}
      />
    );
  }

  if (screen === "battle") {
    return (
      <BattleScreen
        limit={gameLimit}
        onBackToMenu={() => setScreen("menu")}
        onFinish={(score, xp) => {
          setFinalStats({ score, xp });
          setScreen("result");
        }}
      />
    );
  }

  if (screen === "library") {
    return <WordLibrary onBack={() => setScreen("menu")} />;
  }

  if (screen === "result") {
    return (
      <ResultScreen
        score={finalStats.score}
        total={gameLimit}
        xp={finalStats.xp}
        onRestart={() => setScreen("menu")}
        onMenu={() => setScreen("menu")}
      />
    );
  }

  return null;
}

export default App;