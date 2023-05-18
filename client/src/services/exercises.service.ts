import { api } from "./index";
import {
  ICreateExerciseRequest,
  ICreateExerciseResponse,
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
