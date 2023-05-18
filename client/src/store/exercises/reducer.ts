import { IState } from "./common";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { exercisesActions } from "./";

export const exercisesReducer = (builder: ActionReducerMapBuilder<IState>) => {
  builder.addCase(exercisesActions.create.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(exercisesActions.create.rejected, (state) => {
    state.isLoading = false;
    state.isFailed = true;
  });
  builder.addCase(exercisesActions.create.fulfilled, (state, action) => {
    state.isLoading = false;
    state.id = action.payload._id;
    state.title = action.payload.title;
    state.description = action.payload.description;
    state.sentences = action.payload.sentences;
  });
};
