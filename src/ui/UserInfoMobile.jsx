import { LogOut, Settings } from 'lucide-react';
import { useLogout } from '../features/authentication/useLogout';
import IconButton from './IconButton';
import ProfileCard from './ProfileCard';
import ProfileAvatar from './ProfileAvatar';
import { useLocation, useNavigate } from 'react-router-dom';

function UserInfoMobile() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  const { logout, isPending } = useLogout();
  function handleLogout() {
    logout();
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className=" w-46 right-2 top-2 rounded-lg absolute border border-gray-200 bg-white p-2 shadow-xl animate-duration-200 animate-fade-in"
    >
      <div className="flex items-center gap-2">
        <ProfileAvatar />
        <ProfileCard />
      </div>

      <div className="my-1.5 border-t border-gray-100 " />

      <IconButton
        title="settings"
        style="w-full text-sm"
        disabled={pathname === '/account'}
        onClick={() => navigate('account')}
      >
        <Settings size={15} /> Settings
      </IconButton>
      <IconButton
        title="logout"
        style="w-full text-sm"
        onClick={handleLogout}
        disabled={isPending}
      >
        <LogOut size={15} /> Logout
      </IconButton>
    </div>
  );
}

export default UserInfoMobile;
