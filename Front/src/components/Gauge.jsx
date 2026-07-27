// Mechanical-counter style stat display: each digit sits in its own tile,
// tabular-nums monospace, and the whole strip gets a brief "tick" animation
// whenever the value changes -- like a factory odometer rolling over.
export default function Gauge({ label, value, digits = 6, suffix }) {
  const padded = String(value).padStart(digits, "0").slice(-digits);

  return (
    <div className="gauge">
      <div className="gauge__label">{label}</div>
      <div className="gauge__strip" key={padded}>
        {padded.split("").map((ch, i) => (
          <span className="digit-tile" key={i}>
            {ch}
          </span>
        ))}
        {suffix && <span className="gauge__suffix">{suffix}</span>}
      </div>
    </div>
  );
}
