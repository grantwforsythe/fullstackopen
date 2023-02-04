import Part from './Part';

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => {
        return (
          <Part
            key={part.id}
            part={part.name}
            exercise={part.exercises}
          />
        );
      })}
    </>
  );
}

export default Content;