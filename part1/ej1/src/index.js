import React from "react";
import { createRoot } from "react-dom/client";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.nombre} {props.num}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part nombre={props.parts[0].name} num={props.parts[0].exercises} />
      <Part nombre={props.parts[1].name} num={props.parts[1].exercises} />
      <Part nombre={props.parts[2].name} num={props.parts[2].exercises} />
    </>
  );
};
const Total = (props) => {
  const total =
    props.parts[0].exercises +
    props.parts[1].exercises +
    props.parts[2].exercises;

  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
