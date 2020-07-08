import React, { useContext } from 'react';
import GoalContext from '../../GoalContext';

import FormSmallScreen from '../Form/FormSmallScreen';
import GoalReviewSmallScreen from '../Review/GoalReviewSmallScreen';

const SmallScreens: React.FC = () => {
  const { confirm } = useContext(GoalContext);
  return !confirm ? <FormSmallScreen /> : <GoalReviewSmallScreen />;
};

export default SmallScreens;
