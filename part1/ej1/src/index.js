import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};
const Content = (props) => {
  const part1 = "Fundamentals of React";
  const part2 = "Using props to pass data";
  const part3 = "State of a component";

  return (
    <>
      <p>
        {part1} {props.exercides1}
      </p>
      <p>
        {part2} {props.exercides2}
      </p>
      <p>
        {part3} {props.exercides3}
      </p>
    </>
  );
};
const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const course = "Half Stack application development";

  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total num={exercises1 + exercises2 + exercises3} />

      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
