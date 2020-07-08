import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { JourneyRootType, JournalChart, Journal } from 'types/journey';
import journeyShareReducer from './share/shareSlice';
import journeyCommentReducer from './comment/commentSlice';

const initialState: JourneyRootType = {
  journals: [],
  journalsChart: [],
  loading: false
};

const journeySlice = createSlice({
  name: 'journey',
  initialState: initialState,
  reducers: {
    fetchJournals(state, action: PayloadAction<{ journals: Journal[] }>) {
      const { journals } = action.payload;
      state.journals = journals;
    },
    fetchJournalsChart(
      state,
      action: PayloadAction<{ journalsChart: JournalChart[] }>
    ) {
      const { journalsChart } = action.payload;
      state.journalsChart = journalsChart;
    },
    addJournal(state, action: PayloadAction<{ journal: Journal }>) {
      const { journal } = action.payload;
      state.journals.push(journal);
    },
    removeFromJournals(state, action: PayloadAction<{ journalId: string }>) {
      const { journalId } = action.payload;
      const updatedJournals = state.journals.filter(
        item => item.Id !== journalId
      );
      state.journals = updatedJournals;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    updateNetwork(state, action: PayloadAction<{ journals: Journal[] }>) {
      const { journals } = action.payload;
      state.journals = journals;
    }
  }
});

export const {
  fetchJournals,
  addJournal,
  removeFromJournals,
  startLoading,
  stopLoading,
  updateNetwork,
  fetchJournalsChart
} = journeySlice.actions;

const journeyCombinedRootReducer = combineReducers({
  journey: journeySlice.reducer,
  journeyShare: journeyShareReducer,
  journeyComment: journeyCommentReducer
});

export default journeyCombinedRootReducer;
