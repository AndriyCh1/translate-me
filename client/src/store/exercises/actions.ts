import { createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "./common";
import {
  ICreateExerciseRequest,
  IUpdateExerciseRequest,
} from "../../common/interfaces";
import {
  createExercise,
  updateExercise,
} from "../../services/exercises.service";

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

export const update = createAsyncThunk(
  Action.UPDATE,
  async (data: IUpdateExerciseRequest, { rejectWithValue }) => {
    try {
      return await updateExercise(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
