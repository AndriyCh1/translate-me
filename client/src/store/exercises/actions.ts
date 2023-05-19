import { createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "./common";
import {
  ICreateExerciseRequest,
  IUpdateExerciseRequest,
} from "../../common/interfaces";
import {
  createExercise,
  deleteExercise,
  getAllExercises,
  getExercise,
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

export const getAll = createAsyncThunk(
  Action.GET_ALL,
  async (_, { rejectWithValue }) => {
    try {
      return await getAllExercises();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getById = createAsyncThunk(
  Action.GET,
  async (id: string, { rejectWithValue }) => {
    try {
      return await getExercise(id);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteById = createAsyncThunk(
  Action.DELETE,
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteExercise(id);
      return id;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
