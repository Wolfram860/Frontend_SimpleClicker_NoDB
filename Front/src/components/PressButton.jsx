import { useState } from "react";

export default function PressButton({ onPress, pulse }) {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    onPress();
    window.setTimeout(() => setPressed(false), 90);
  };

  return (
    <button
      className={`press-button ${pressed ? "press-button--down" : ""} ${
        pulse ? "press-button--pulse" : ""
      }`}
      onClick={handlePress}
      aria-label="Натиснути"
    >
      <span className="press-button__ring" />
      <span className="press-button__face">
        <span className="press-button__label">ТИСНИ</span>
      </span>
    </button>
  );
}
