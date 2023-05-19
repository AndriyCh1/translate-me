import { createSlice } from "@reduxjs/toolkit";
import { IState } from "./common";
import { exercisesReducer } from "./reducer";

const initialState: IState = {
  isLoading: false,
  error: "",
  exercise: null,
  exercises: [],
  trainExercise: null,
};

const { reducer, actions } = createSlice({
  name: "exercises",
  initialState,
  reducers: {},
  extraReducers: exercisesReducer,
});

export { reducer, actions };
