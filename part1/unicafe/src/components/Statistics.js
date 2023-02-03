import StatisticLine from "./StatisticLine";
import Table from "./Table";

const round = (value, numberOfDigits = 2) => value.toFixed(numberOfDigits);

const Statistics = ({ good, neutral, bad, total }) => {
  const stats = [
    {
      id: 1,
      component: <StatisticLine text="Good" value={good} />,
    },
    {
      id: 2, 
      component: <StatisticLine text="Neutral" value={neutral} />,
    },
    {
      id: 3,
      component: <StatisticLine text="Bad" value={bad} />,
    },
    {
      id: 4,
      component: <StatisticLine text="All" value={total} />,
    },
    {
      id: 5,
      component: <StatisticLine text="Average" value={round((good - bad) / total)} />,
    },
    {
      id: 6,
      component: <StatisticLine text="Positive" value={round(good / total * 100) + '%'} />,
    },
  ];

  return good + neutral + bad === 0 ?
    <div>No feedback given</div> :
    <Table body={stats} />;
};

export default Statistics;