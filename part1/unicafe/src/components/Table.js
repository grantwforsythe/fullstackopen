import TableRow from "./TableRow";

const Table = ({ body }) => {
  return (
    <>
      <table>
        <tbody>
          {body.map((row) => {
            return <TableRow key={row.id} item={row.component} />;
          })}
        </tbody>
      </table>
    </>
  )

};

export default Table;