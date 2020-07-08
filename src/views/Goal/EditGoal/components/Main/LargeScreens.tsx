import React, { useContext } from 'react';
import GoalContext from '../../GoalContext';

import FormLargeScreen from '../Form/FormLargeScreen';
import GoalReviewLargeScreen from '../Review/GoalReviewLargeScreen';

export default function LargeScreens() {
  const { confirm } = useContext(GoalContext);
  return !confirm ? <FormLargeScreen /> : <GoalReviewLargeScreen />;
}
