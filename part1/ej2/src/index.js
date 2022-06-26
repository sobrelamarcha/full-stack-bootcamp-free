import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const Button = ({ handler, text }) => {
  return <button onClick={handler}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

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
      <table>
        <thead>
          <tr>
            <th scope="col">Stat</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={averagePositive} />
          <Statistic text="positive" value={percentPositive} />
        </tbody>
      </table>
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

      <Button handler={handleBtnGood} text="good" />
      <Button handler={handleBtnNeutral} text="neutral" />
      <Button handler={handleBtnBad} text="bad" />
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

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
