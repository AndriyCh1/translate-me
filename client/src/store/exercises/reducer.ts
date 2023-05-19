import { IState } from "./common";
import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { exercisesActions } from "./";
import exercise from "../../components/exercise/exercise";

export const exercisesReducer = (builder: ActionReducerMapBuilder<IState>) => {
  builder.addCase(exercisesActions.getAll.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(exercisesActions.getAll.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
  builder.addCase(exercisesActions.getAll.fulfilled, (state, action) => {
    state.isLoading = false;
    state.exercises = action.payload;
  });
  builder.addCase(exercisesActions.getById.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(exercisesActions.getById.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
  builder.addCase(exercisesActions.getById.fulfilled, (state, action) => {
    state.isLoading = false;
    state.trainExercise = action.payload;
  });
  builder.addCase(exercisesActions.deleteById.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
  builder.addCase(exercisesActions.deleteById.fulfilled, (state, action) => {
    state.isLoading = false;

    const exerciseId = action.payload;
    state.exercises = state.exercises.filter(
      (exercise) => exercise._id !== exerciseId
    );
  });
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
      state.exercise = null;
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
