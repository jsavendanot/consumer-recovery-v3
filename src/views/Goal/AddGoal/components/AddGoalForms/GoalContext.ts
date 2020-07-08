import React, { Dispatch, SetStateAction } from 'react';
import { GoalForm, StepForm } from 'types/goal';

export type ContextProps = {
  areaId: string;
  goal: GoalForm;
  setGoal: Dispatch<SetStateAction<GoalForm>>;
  step: StepForm;
  setStep: Dispatch<SetStateAction<StepForm>>;
  confirm: boolean;
  setConfirm: Dispatch<SetStateAction<boolean>>;
};

const GoalContext = React.createContext<ContextProps>({} as ContextProps);
export default GoalContext;
