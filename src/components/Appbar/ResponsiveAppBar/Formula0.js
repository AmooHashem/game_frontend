import React from 'react';

import AvatarComponent from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';
import LogoutButton from './components/LogoutButton';
import PlayerInfoComponent from './components/PlayerInfo';

const DashboardItems = () => {
  const logoButton = <LogoButton />;
  // todo: fix hard code
  const playerProblem = <DashboardButton name={'مسئله‌های من'} to={'/game/1/player_problems/'} />;
  const auction = <DashboardButton name={'تابلوی مزایده'} to={'/game/1/auction/'} />;
  const scoreBoard = <DashboardButton name={'جدول امتیازات'} to={'/game/1/scoreboard/'} />;
  const logoutButton = <LogoutButton />;
  const Avatar = <AvatarComponent />;
  const PlayerInfo = <PlayerInfoComponent />;

  return {
    desktopLeftItems: [scoreBoard, logoutButton, Avatar],
    desktopRightItems: [PlayerInfo, playerProblem],
    mobileLeftItems: [PlayerInfo],
    mobileRightItems: [],
    mobileMenuListItems: [playerProblem, logoutButton, scoreBoard],
  };
};

export default DashboardItems;
