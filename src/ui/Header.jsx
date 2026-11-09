import { useState } from 'react';
import UserInfoMobile from './UserInfoMobile';
import Logo from './Logo';
import ProfileAvatar from './ProfileAvatar';
import { createPortal } from 'react-dom';

function Header() {
  const [showUser, setShowUser] = useState(false);

  return (
    <header className="relative flex h-16 items-center justify-between border-b border-gray-200 bg-white px-2 md:hidden">
      {showUser &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[2px]"
            onClick={() => setShowUser(false)}
            onTouchMove={() => setShowUser(false)}
          >
            <UserInfoMobile />
          </div>,
          document.body,
        )}

      <Logo />
      <span onClick={() => setShowUser((show) => !show)}>
        <ProfileAvatar />
      </span>
    </header>
  );
}

export default Header;
