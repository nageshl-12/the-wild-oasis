import { useUser } from '../features/authentication/useUser';

function ProfileAvatar({ height = '50', width = '50' }) {
  const { user } = useUser();

  return (
    <img
      src={user?.avatar || 'https://i.pravatar.cc/100?img=12'}
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
      alt="ProfileAvatar"
      className={` border-stone-800 p-0.5 border  rounded-full object-cover cursor-pointer`}
    />
  );
}

export default ProfileAvatar;
