import { useState } from 'react';

import Button from './components/Button';
import Section from './components/Section';
import Statistics from './components/Statistics';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Section text="Give Feedback" />
      <Button
        handleClick={() => setGood(good + 1)}
        text="good"
      />
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        text="neutral"
      />
      <Button
        handleClick={() => setBad(bad + 1)}
        text="bad"
      />
      <Section text="Statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={good + neutral + bad}
      />
    </div>
  );
};

export default App;
