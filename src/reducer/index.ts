import { combineReducers } from '@reduxjs/toolkit';

import authReducer from 'slices/auth/authSlice';
import goalCombinedRootReducer from 'slices/goal/goalSlice';

import safetyCombinedRootReducer from 'slices/safety/safetySlice';
import profileReducer from 'slices/profile/profileSlice';
import journeyCombinedRootReducer from 'slices/journey/journeySlice';
import storyReducer from 'slices/story/storySlice';
import networkCombinedRootReducer from 'slices/network/networkSlice';
import otherReducer from 'slices/other/otherSlice';
import galleryReducer from 'slices/gallery/gallerySlice';
import exportReducer from 'slices/export/exportSlice';
import suggestionReducer from 'slices/suggestion/suggestionSlice';
import settingsReducer from 'slices/settings/settingsSlice';
import notificationsReducer from 'slices/notifications/notificationsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  goalRoot: goalCombinedRootReducer,
  safetyRoot: safetyCombinedRootReducer,
  journeyRoot: journeyCombinedRootReducer,
  profile: profileReducer,
  story: storyReducer,
  networkRoot: networkCombinedRootReducer,
  other: otherReducer,
  gallery: galleryReducer,
  export: exportReducer,
  suggestion: suggestionReducer,
  settings: settingsReducer,
  notifications: notificationsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
