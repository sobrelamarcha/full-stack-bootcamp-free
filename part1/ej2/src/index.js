import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleBtnGood = () => {
    setGood(good + 1);
  };

  const handleBtnNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBtnBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleBtnGood}>good</button>
      <button onClick={handleBtnNeutral}>neutral</button>
      <button onClick={handleBtnBad}>bad</button>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
