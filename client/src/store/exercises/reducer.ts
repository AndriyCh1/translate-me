import { IState } from "./common";
import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { exercisesActions } from "./";

export const exercisesReducer = (builder: ActionReducerMapBuilder<IState>) => {
  builder.addMatcher(
    isAnyOf(exercisesActions.create.pending, exercisesActions.update.pending),
    (state) => {
      state.isLoading = true;
    }
  );
  builder.addMatcher(
    isAnyOf(exercisesActions.create.rejected, exercisesActions.update.rejected),
    (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  );
  builder.addMatcher(
    isAnyOf(
      exercisesActions.create.fulfilled,
      exercisesActions.update.fulfilled
    ),
    (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.exercise = action.payload;
    }
  );
};
