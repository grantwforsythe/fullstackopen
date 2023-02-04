import Header from './Header';
import Content from './Content';

const Course = ({ course }) => {
  const { name, parts } = course;
  const total = parts.reduce((total, part) => {
    return total + part.exercises
  }, 0);

  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <strong>total of {total} exercises</strong>
    </>
  );
};

export default Course;