import { useState } from 'react';

import Button from './components/Button';
import Section from './components/Section';
import Paragraph from './components/Paragraph';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const handleAnecdotes = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVotes = () => {
    const copy = {...votes};
    copy[selected]++;
    setVotes(copy);
  };

  return (
    <div>
      <Section text="Anecdote of the day" />
      <Paragraph text={anecdotes[selected]} />
      <Paragraph text={`has ${votes[selected]} votes`} />
      <Button
        handleClick={handleVotes}
        text="vote"
      />
      <Button
        handleClick={handleAnecdotes}
        text="next anecdote"
      />
      <Section text="Anecdote with most votes" />
      {Object.values(votes).reduce((sum, value) => sum + value) === 0 ? (
        <Paragraph text="Vote for your favourite anecdote!" />
      ) : (
        // Display the anecdote with the most votes
        <Paragraph text={anecdotes[Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b)]} />
      )}
    </div>
  )
}

export default App;