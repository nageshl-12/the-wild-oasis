import { LogOut, Settings } from 'lucide-react';
import { useLogout } from '../features/authentication/useLogout';
import IconButton from './IconButton';
import ProfileCard from './ProfileCard';
import ProfileAvatar from './ProfileAvatar';
import { useLocation, useNavigate } from 'react-router-dom';

function UserInfoDesktop({ collapsed, setCollapsed }) {
  const { logout, isPending } = useLogout();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
  }
  return (
    <div
      className={`flex items-center gap-3 ${collapsed ? 'justify-center relative cursor-pointer' : ''}`}
    >
      <span onClick={() => collapsed && setCollapsed(false)}>
        <ProfileAvatar />
      </span>

      {!collapsed && (
        <>
          <ProfileCard />

          <IconButton
            onClick={() => navigate('account')}
            title="settings"
            disabled={pathname === '/account'}
          >
            <Settings size={18} />
          </IconButton>

          <IconButton
            title="logout"
            onClick={handleLogout}
            disabled={isPending}
          >
            <LogOut size={18} />
          </IconButton>
        </>
      )}
    </div>
  );
}

export default UserInfoDesktop;
