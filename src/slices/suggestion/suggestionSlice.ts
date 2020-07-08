import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SuggestionRootType } from 'types/suggestion';
import { Goal, Step } from 'types/goal';
import { Strength } from 'types/story';
import { FocusArea } from 'types/other';
import { Item, Unwell } from 'types/safety';
import { Network } from 'types/network';

const initialState: SuggestionRootType = {
  goals: [],
  steps: [],
  strengths: [],
  focusAreas: [],
  stayWell: [],
  stressMe: [],
  difficulties: [],
  strategies: [],
  unwellHappens: [],
  unwellNotHappens: [],
  people: [],
  organisations: []
};

const suggestionSlice = createSlice({
  name: 'suggest',
  initialState: initialState,
  reducers: {
    fetchGoals(state, action: PayloadAction<{ goals: Goal[] }>) {
      const { goals } = action.payload;
      state.goals = goals;
    },
    fetchSteps(state, action: PayloadAction<{ steps: Step[] }>) {
      const { steps } = action.payload;
      state.steps = steps;
    },
    fetchStrengths(state, action: PayloadAction<{ strengths: Strength[] }>) {
      const { strengths } = action.payload;
      state.strengths = strengths;
    },
    fetchFocusAreas(state, action: PayloadAction<{ focusAreas: FocusArea[] }>) {
      const { focusAreas } = action.payload;
      state.focusAreas = focusAreas;
    },
    fetchStayWell(state, action: PayloadAction<{ items: Item[] }>) {
      const { items } = action.payload;
      state.stayWell = items;
    },
    fetchStressMe(state, action: PayloadAction<{ items: Item[] }>) {
      const { items } = action.payload;
      state.stressMe = items;
    },
    fetchDifficulties(state, action: PayloadAction<{ items: Item[] }>) {
      const { items } = action.payload;
      state.difficulties = items;
    },
    fetchStrategies(state, action: PayloadAction<{ items: Item[] }>) {
      const { items } = action.payload;
      state.strategies = items;
    },
    fetchUnwellHappens(
      state,
      action: PayloadAction<{ unwellHappens: Unwell[] }>
    ) {
      const { unwellHappens } = action.payload;
      state.unwellHappens = unwellHappens;
    },
    fetchUnwellNotHappens(
      state,
      action: PayloadAction<{ unwellNotHappens: Unwell[] }>
    ) {
      const { unwellNotHappens } = action.payload;
      state.unwellNotHappens = unwellNotHappens;
    },
    fetchPeople(state, action: PayloadAction<{ people: Network[] }>) {
      const { people } = action.payload;
      state.people = people;
    },
    fetchOrgs(state, action: PayloadAction<{ organisations: Network[] }>) {
      const { organisations } = action.payload;
      state.organisations = organisations;
    }
  }
});

export const {
  fetchGoals,
  fetchSteps,
  fetchStrengths,
  fetchFocusAreas,
  fetchStayWell,
  fetchStressMe,
  fetchDifficulties,
  fetchStrategies,
  fetchUnwellHappens,
  fetchUnwellNotHappens,
  fetchPeople,
  fetchOrgs
} = suggestionSlice.actions;
export default suggestionSlice.reducer;
