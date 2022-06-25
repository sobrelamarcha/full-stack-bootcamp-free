import React from "react";
import ReactDOM from "react-dom";

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
      <Part nombre={props.part1} num={props.exercises1} />
      <Part nombre={props.part2} num={props.exercises2} />
      <Part nombre={props.part3} num={props.exercises3} />
    </>
  );
};
const Total = (props) => {
  return <p>Number of exercises {props.num}</p>;
};

const App = () => {
  const course = "Half Stack application development";

  const part1 = "Fundamentals of React";
  const part2 = "Using props to pass data";
  const part3 = "State of a component";

  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total num={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
