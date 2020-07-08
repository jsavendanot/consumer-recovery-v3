import React, { useContext } from 'react';
import GoalContext from '../../GoalContext';

import FormSmallScreen from '../Form/FormSmallScreen';
import GoalReviewSmallScreen from '../Review/GoalReviewSmallScreen';

export default function SmallScreens() {
  const { confirm } = useContext(GoalContext);
  return !confirm ? <FormSmallScreen /> : <GoalReviewSmallScreen />;
}
