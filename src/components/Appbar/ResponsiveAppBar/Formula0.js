import React from 'react';

import AvatarComponent from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';
import LogoutButton from './components/LogoutButton';
import PlayerInfoComponent from './components/PlayerInfo';

const DashboardItems = () => {
  const logoButton = <LogoButton />;
  // todo: fix hard code
  const dashboard = <DashboardButton name={'رویداد'} to={'/event/1/0/'} />;
  const logoutButton = <LogoutButton />;
  const Avatar = <AvatarComponent />;
  const PlayerInfo = <PlayerInfoComponent />;

  return {
    desktopLeftItems: [logoutButton, Avatar],
    desktopRightItems: [PlayerInfo, dashboard],
    mobileLeftItems: [Avatar],
    mobileRightItems: [dashboard],
    mobileMenuListItems: [logoutButton],
  };
};

export default DashboardItems;
