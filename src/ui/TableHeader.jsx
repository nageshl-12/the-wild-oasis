import Table from './Table';

function TableHeader({ fields = [], widths = [] }) {
  return (
    <Table.Header>
      <Table.Row>
        {fields.map((header, index) => (
          <Table.Head key={header} width={widths[index]}>
            {header}
          </Table.Head>
        ))}
      </Table.Row>
    </Table.Header>
  );
}

export default TableHeader;
