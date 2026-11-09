function Table({ children, height }) {
  return (
    <div
      className={`w-full overflow-y-auto rounded-xl border border-gray-200 bg-white ${height}`}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm">
          {children}
        </table>
      </div>
    </div>
  );
}

function Header({ children }) {
  return (
    <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
      {children}
    </thead>
  );
}

function Body({ children }) {
  return <tbody className="divide-y divide-gray-100">{children}</tbody>;
}

function Row({ children }) {
  return <tr className="transition-colors hover:bg-gray-50 ">{children}</tr>;
}

function Head({ children, width }) {
  return (
    <th style={{ width }} className="whitespace-nowrap px-5 py-4 font-semibold">
      {children}
    </th>
  );
}
function Cell({ children }) {
  return <td className="whitespace-nowrap px-5 py-4">{children}</td>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Head = Head;
Table.Cell = Cell;

export default Table;
