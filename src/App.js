import React, { useState, useEffect } from 'react';

const PomodoroClock = () => {
  const [timer, setTimer] = useState(25 * 60); // Initial countdown time in seconds
  const [cycleLimit, setCycleLimit] = useState(2); // Default cycle limit
  const [cycleCount, setCycleCount] = useState(0); // Current cycle count

  useEffect(() => {
    let interval = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (cycleCount < cycleLimit) {
        setCycleCount((prevCycleCount) => prevCycleCount + 1);
        if (cycleCount % 2 === 0) {
          setTimer(5 * 60); // Break time in seconds
        } else {
          setTimer(25 * 60); // Work time in seconds
        }
      }
    }

    return () => clearInterval(interval);
  }, [timer, cycleCount, cycleLimit]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleCycleLimitChange = (e) => {
    const limit = parseInt(e.target.value);
    setCycleLimit(limit);
    setCycleCount(0);
    setTimer(25 * 60);
  };

  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <div>
        <label htmlFor="cycleLimit">Cycle Limit: </label>
        <input
          type="number"
          id="cycleLimit"
          min="1"
          value={cycleLimit}
          onChange={handleCycleLimitChange}
        />
      </div>
      <div>
        <h2>Time Remaining: {formatTime(timer)}</h2>
        <h3>Cycle Count: {cycleCount}</h3>
      </div>
    </div>
  );
};

export default PomodoroClock;
