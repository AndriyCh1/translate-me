import { api } from "./index";
import {
  ICreateExerciseRequest,
  ICreateExerciseResponse,
  IUpdateExerciseRequest,
  IUpdateExerciseResponse,
} from "../common/interfaces";

export const createExercise = async (
  body: ICreateExerciseRequest
): Promise<ICreateExerciseResponse> => {
  try {
    const response = await api.post("/exercises", body);
    return response.data as ICreateExerciseResponse;
  } catch (error) {
    throw error;
  }
};

export const updateExercise = async (
  body: IUpdateExerciseRequest
): Promise<IUpdateExerciseResponse> => {
  try {
    const response = await api.put(`/exercises/${body.id}`, body);
    return response.data as IUpdateExerciseResponse;
  } catch (error) {
    throw error;
  }
};
