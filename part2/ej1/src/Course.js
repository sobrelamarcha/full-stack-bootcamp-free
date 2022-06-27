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

export const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
