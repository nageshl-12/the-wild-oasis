import Filter from '../../ui/Filter';

function DashboardFIlterOperations() {
  return (
    <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-1">
      <Filter
        field="last"
        options={[
          { value: '7', label: 'Last 7 Days' },
          { value: '30', label: 'Last 30 Days' },
          { value: '90', label: 'Last 90 Days' },
        ]}
      />
    </div>
  );
}

export default DashboardFIlterOperations;
