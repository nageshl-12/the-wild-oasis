import ActivityList from '../../ui/ActivityList';
import Heading from '../../ui/Heading';
import NoActivity from '../../ui/NoActivity';
import Spinner from '../../ui/Spinner';
import { useTodayActivity } from '../checked-in-out/useTodayActivity';

function TodayActivity() {
  const { activities, isPending } = useTodayActivity();

  return (
    <div className="bg-white rounded-lg px-3 py-5 shadow-sm h-full">
      <div className="flex items-center justify-between mb-5">
        <Heading fieldName="Today's Activity" validate={false} />

        <span className="text-sm text-gray-500">
          {activities?.data?.length} activities
        </span>
      </div>

      {isPending ? (
        <Spinner />
      ) : activities?.data?.length > 0 ? (
        <div className="divide-y divide-gray-100 max-h-100 overflow-y-auto">
          {activities?.data?.map((activity) => (
            <>
              <ActivityList activity={activity} />
            </>
          ))}
        </div>
      ) : (
        <NoActivity />
      )}
    </div>
  );
}

export default TodayActivity;
