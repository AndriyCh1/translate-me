import { createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "./common";
import { ICreateExerciseRequest } from "../../common/interfaces";
import { createExercise } from "../../services/exercises.service";

export const create = createAsyncThunk(
  Action.CREATE,
  async (data: ICreateExerciseRequest, { rejectWithValue }) => {
    try {
      return await createExercise(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
