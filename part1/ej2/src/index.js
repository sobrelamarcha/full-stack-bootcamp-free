import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = ({
  good,
  neutral,
  bad,
  all,
  averagePositive,
  percentPositive,
}) => {
  if (all === 0) {
    return <h1>No feedback given</h1>;
  }

  return (
    <>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {averagePositive}</p>
      <p>positive {percentPositive}%</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  //

  const handleBtnGood = () => {
    setGood(good + 1);
  };

  const handleBtnNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBtnBad = () => {
    setBad(bad + 1);
  };

  const all = good + neutral + bad;

  const percentPositive = all === 0 ? 0 : (good / all) * 100;

  const averagePositive = all === 0 ? 0 : (good - bad) / all;

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleBtnGood}>good</button>
      <button onClick={handleBtnNeutral}>neutral</button>
      <button onClick={handleBtnBad}>bad</button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        percentPositive={percentPositive}
        averagePositive={averagePositive}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
