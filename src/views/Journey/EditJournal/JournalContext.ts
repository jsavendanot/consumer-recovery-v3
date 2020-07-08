import React, { Dispatch, SetStateAction } from 'react';
import { JournalForm } from 'types/journey';

export type ContextProps = {
  journal: JournalForm;
  setJournal: Dispatch<SetStateAction<JournalForm>>;
};

const JournalContext = React.createContext<ContextProps>({} as ContextProps);
export default JournalContext;
