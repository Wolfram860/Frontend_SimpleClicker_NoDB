import { useEffect, useRef, useState } from "react";
import Gauge from "./components/Gauge.jsx";
import PressButton from "./components/PressButton.jsx";
import UpgradeLever from "./components/UpgradeLever.jsx";
import { getStats, sendClick, upgradeAutoclick, upgradeMultiplier } from "./api.js";

// Autoclick interval per level, in milliseconds. The backend just executes
// one /Click per call -- the "every N seconds, N gets smaller per level"
// behaviour lives entirely on the frontend. Tweak freely.
const AUTOCLICK_INTERVAL_MS = { 1: 2000, 2: 1000, 3: 500 };

export default function App() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [autoPulse, setAutoPulse] = useState(false);
  const [shakeLever, setShakeLever] = useState(null); // "autoclick" | "multiplier" | null

  const statsRef = useRef(stats);
  statsRef.current = stats;

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  // Autoclick loop: re-arms whenever the level changes.
  useEffect(() => {
    const lvl = stats?.autoclickLvl;
    if (!lvl) return;

    const intervalMs = AUTOCLICK_INTERVAL_MS[lvl] ?? 2000;
    const id = setInterval(async () => {
      try {
        const fresh = await sendClick();
        setStats(fresh);
        setAutoPulse(true);
        setTimeout(() => setAutoPulse(false), 150);
      } catch (e) {
        setError(e.message);
      }
    }, intervalMs);

    return () => clearInterval(id);
  }, [stats?.autoclickLvl]);

  useEffect(() => {
    if (!error) return;
    const id = setTimeout(() => setError(null), 2500);
    return () => clearTimeout(id);
  }, [error]);

  const handlePress = async () => {
    // Optimistic bump so the button feels instant, then reconcile with server.
    setStats((s) =>
      s ? { ...s, clicks: s.clicks + 1, money: s.money + (s.multiplierLvl + 1) } : s
    );
    try {
      const fresh = await sendClick();
      setStats(fresh);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleUpgrade = async (type) => {
    const action = type === "autoclick" ? upgradeAutoclick : upgradeMultiplier;
    try {
      const fresh = await action();
      setStats(fresh);
    } catch (e) {
      setError(e.message);
      setShakeLever(type);
      setTimeout(() => setShakeLever(null), 400);
    }
  };

  if (!stats) {
    return (
      <div className="app app--loading">
        <p>{error ? `Не вдалося з'єднатися з бекендом: ${error}` : "Запуск преса…"}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>ПРЕС</h1>
        <span className={`app__auto-light ${stats.autoclickLvl > 0 ? "is-on" : ""} ${autoPulse ? "is-pulsing" : ""}`}>
          АВТО
        </span>
      </header>

      <main className="app__main">
        <section className="app__gauges">
          <Gauge label="КЛІКИ" value={stats.clicks} digits={7} />
          <Gauge label="ГРОШІ" value={stats.money} digits={7} suffix="₴" />
        </section>

        <section className="app__press">
          <PressButton onPress={handlePress} pulse={autoPulse} />
          <p className="app__press-hint">
            +{stats.multiplierLvl + 1} за натискання
          </p>
        </section>

        <section className="app__upgrades">
          <UpgradeLever
            label="Автоклікер"
            sublabel={
              stats.autoclickLvl > 0
                ? `Тиск кожні ${(AUTOCLICK_INTERVAL_MS[stats.autoclickLvl] ?? 0) / 1000}с`
                : "Не встановлено"
            }
            level={stats.autoclickLvl}
            onUpgrade={() => handleUpgrade("autoclick")}
            shake={shakeLever === "autoclick"}
          />
          <UpgradeLever
            label="Мультиплікатор"
            sublabel={`x${stats.multiplierLvl + 1} за клік`}
            level={stats.multiplierLvl}
            onUpgrade={() => handleUpgrade("multiplier")}
            shake={shakeLever === "multiplier"}
          />
        </section>
      </main>

      {error && <div className="app__toast">{error}</div>}
    </div>
  );
}
