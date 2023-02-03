import Part from './Part';

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(record => {
        return (
          <Part
            key={record.id}
            part={record.part}
            exercise={record.exercise}
          />
        );
      })}
    </div>
  );
}

export default Content;