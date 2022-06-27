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
  const result = props.parts.map((part) => (
    <Part key={part.id} nombre={part.name} num={part.exercises} />
  ));

  return <>{result}</>;
};
const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, part) => {
    //console.log("what is happening", accumulator, part.exercises);
    return accumulator + part.exercises;
  }, 0); // el 0 es el valor inicial del accumulator

  return <p>Number of exercises {total}</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const coursesList = courses.map((course) => {
    return <Course key={course.id} course={course} />;
  });

  return <div>{coursesList}</div>;
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
