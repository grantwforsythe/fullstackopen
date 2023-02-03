import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts:  [
      {
        "id": 1,
        "part": 'Fundamentals of React',
        "exercise": 10
      },
      {
        "id": 2,
        "part": 'Using props to pass data',
        "exercise": 7
      },
      {
        "id": 3,
        "part": 'StatisticLinee of a component',
        "exercise": 14
      },
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;
