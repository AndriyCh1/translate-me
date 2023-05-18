import { createSlice } from "@reduxjs/toolkit";
import { IState } from "./common";
import { exercisesReducer } from "./reducer";

const initialState: IState = {
  isLoading: false,
  isFailed: false,
  id: null,
  title: null,
  description: null,
  sentences: null,
};

const { reducer, actions } = createSlice({
  name: "exercises",
  initialState,
  reducers: {},
  extraReducers: exercisesReducer,
});

export { reducer, actions };
