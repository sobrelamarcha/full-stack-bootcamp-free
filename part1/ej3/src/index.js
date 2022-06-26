import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

let lastRandomNumber = 0;

const getRandomIntWithoutRepeating = (last) => {
  let randomNumber = getRandomInt(6);

  while (last === randomNumber) {
    randomNumber = getRandomIntWithoutRepeating(lastRandomNumber);
  }

  return randomNumber;
};

const NewAnecdoteButton = ({ handler }) => {
  return <button onClick={handler}>Give me a new anecdote</button>;
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const App = (props) => {
  const [selected, setSelected] = useState(0);

  const handleRandomAnecdote = () => {
    setSelected(getRandomIntWithoutRepeating(selected));
  };

  return (
    <>
      <div>{props.anecdotes[selected]}</div>
      <NewAnecdoteButton handler={handleRandomAnecdote} />
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App anecdotes={anecdotes} />);
