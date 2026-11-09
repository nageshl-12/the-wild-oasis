import { useUser } from '../features/authentication/useUser';

function ProfileCard() {
  const { user } = useUser();

  return (
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold text-gray-900 capitalize">
        {user?.fullName}
      </p>
      <p className="text-xs text-gray-400">Administrator</p>
    </div>
  );
}

export default ProfileCard;
