import { useState, useEffect, useRef } from "react";
import "./Counter.css";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000); // default 1 second
  const [step, setStep] = useState(1);

  const intervalRef = useRef(null);

  // Start counter
  const start = () => {
    if (intervalRef.current) return; // prevent multiple intervals

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setCount((prev) => prev + step);
    }, speed);
  };

  // Stop counter
  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  // Reset counter
  const reset = () => {
    stop();
    setCount(0);
  };

  // Restart interval when speed or step changes while running
  useEffect(() => {
    if (isRunning) {
      stop();
      start();
    }
  }, [speed, step]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="counter">
      <h2>Real-Time Counter</h2>

      <div className="count-display">{count}</div>

      {isRunning && <div className="running-indicator">● Running</div>}

      <div className="controls">
        <button onClick={() => setCount((prev) => prev - 1)}>-1</button>

        {!isRunning ? (
          <button onClick={start}>▶ Start</button>
        ) : (
          <button onClick={stop}>⏸ Stop</button>
        )}

        <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      </div>

      <div className="settings">
        <div>
          <label>Speed: </label>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          >
            <option value={2000}>Slow (2s)</option>
            <option value={1000}>Normal (1s)</option>
            <option value={500}>Fast (0.5s)</option>
          </select>
        </div>

        <div>
          <label>Step: </label>
          <select
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          >
            <option value={1}>+1</option>
            <option value={2}>+2</option>
            <option value={5}>+5</option>
          </select>
        </div>
      </div>

      <button className="reset-btn" onClick={reset}>
        🔄 Reset
      </button>
    </div>
  );
}