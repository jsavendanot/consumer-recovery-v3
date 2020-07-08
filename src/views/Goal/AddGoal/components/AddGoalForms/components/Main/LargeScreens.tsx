import React, { useContext } from 'react';
import GoalContext from '../../GoalContext';

import FormLargeScreen from '../Form/FormLargeScreen';
import GoalReviewLargeScreen from '../Review/GoalReviewLargeScreen';

const LargeScreens: React.FC = () => {
  const { confirm } = useContext(GoalContext);
  return !confirm ? <FormLargeScreen /> : <GoalReviewLargeScreen />;
};

export default LargeScreens;
