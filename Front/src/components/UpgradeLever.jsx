const MAX_LEVEL = 3;

export default function UpgradeLever({ label, sublabel, level, onUpgrade, shake }) {
  const maxed = level >= MAX_LEVEL;

  return (
    <div className={`lever ${shake ? "lever--shake" : ""}`}>
      <div className="lever__info">
        <div className="lever__label">{label}</div>
        <div className="lever__sublabel">{sublabel}</div>
      </div>
      <div className="lever__pips">
        {Array.from({ length: MAX_LEVEL }).map((_, i) => (
          <span
            key={i}
            className={`lever__pip ${i < level ? "lever__pip--lit" : ""}`}
          />
        ))}
      </div>
      <button
        className="lever__switch"
        onClick={onUpgrade}
        disabled={maxed}
      >
        {maxed ? "МАКС" : "ПОКРАЩИТИ"}
      </button>
    </div>
  );
}
