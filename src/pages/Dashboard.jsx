import DashboardFIlterOperations from '../features/dashboard/DashboardFIlterOperations';
import DashBoardLayout from '../features/dashboard/DashBoardLayout';
import Heading from '../ui/Heading';
function Dashboard() {
  return (
    <div className="relative animate-fade-in-up flex h-[calc(100dvh-9.625rem)] flex-col overflow-hidden bg-gray-50 px-2 md:h-dvh md:px-2">
      {/* Header - Original Position */}
      <div className="shrink-0 space-y-3 py-3">
        <Heading fieldName="Dashboard" validate={false} />
      </div>
      <DashboardFIlterOperations />
      <DashBoardLayout />
    </div>
  );
}

export default Dashboard;
