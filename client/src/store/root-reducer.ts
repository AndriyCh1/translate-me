import { combineReducers } from "@reduxjs/toolkit";
import { exercisesReducer } from "./exercises";

export const rootReducer = combineReducers({
  exercises: exercisesReducer,
});
