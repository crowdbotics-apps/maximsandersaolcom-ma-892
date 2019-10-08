const profileIcon = require('./assets/Icon_user.png');
const todayIcon = require('./assets/icon_today.png');
const feedIcon = require('./assets/icon_feed.png');
const nutrationIcon = require('./assets/icon_nutration.png');
const programsIcon = require('./assets/icon_program.png');

export const drawerConfiguration = {
  initialRouteName: 'ProfileScreen',
  drawerPosition: 'right',
};

export const drawerConfigurationForProgram = {
  initialRouteName: 'ProgramScreen',
  drawerPosition: 'right',
};

export const TAB_ICONS_ENUM = {
  Today: { true: todayIcon, false: todayIcon },
  Nutrition: { true: nutrationIcon, false: nutrationIcon },
  Profile: { true: profileIcon, false: profileIcon },
  Feed: { true: feedIcon, false: feedIcon },
  Programs: { true: programsIcon, false: programsIcon }
};
