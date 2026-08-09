import { useEffect, useState } from "react";

export default function App() {
    // здесь твое состояние
  const [count, setCount] = useState(0);
  const [money, setMoney] = useState(0);
  const [multiplier, setMultiplier]  = useState(1);
  const [autoClick, setAutoClick] = useState(false);
  const [autoLevel, setAutoLevel] = useState(1);

  const upgraderCost = multiplier * 10;
  const clickReward = multiplier;
  const interval = 2000 / (2 ** (autoLevel - 1));
 
    // здесь функция клика
  function handleClick() {
    setCount(c => c + 1);
    setMoney(m => m + clickReward);
  }
  
  function handleUpgrade() {
    if(money >= upgraderCost) {
      setMoney(m => m - upgraderCost);
      setMultiplier(s => s + 1);
    }
  }

  function autoClicker() {
    setAutoClick(a => !a);
  }

  function handleAutoLevelUp() {
    if(autoLevel < 3) {
      setAutoLevel(a => a + 1);
    }
  }

  useEffect(() => {
    if(autoClick){
      const id = setInterval(handleClick, interval)

      return() => {
        clearInterval(id);
      };
    }
  }, [autoClick, multiplier, autoLevel]);

    return ( // здесь интерфейс
      <div>
        <button onClick={handleClick}>
          Button
        </button>
        <br />

        <label> 
          Click: {count}
        </label>
        <br />
              
        <label> 
          Money: {money}
        </label>
        <br />

        <label> 
          Multiplier: {multiplier}
        </label>
        <br />
        
        <label> 
          За клик: {clickReward}
        </label>
        <br />

        <button onClick={handleUpgrade}>
          Upgrade: {upgraderCost}
        </button>
        <br />

        <button onClick={autoClicker}>
          AutoClicker
        </button>
        <br />

        <button onClick={handleAutoLevelUp}>
          AutoClickerLevelUp: {autoLevel}
        </button>
        <br />
        
      </div>
    );
}