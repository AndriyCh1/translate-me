import { api } from "./index";
import {
  ICreateExerciseRequest,
  ICreateExerciseResponse,
  IGetExerciseResponse,
  ISentenceData,
  IUpdateExerciseRequest,
  IUpdateExerciseResponse,
} from "../common/interfaces";
import { splitTextIntoSentences } from "../utils/split-text-into-sentences";
import { generateUniqueId } from "../utils/generate-unique-id";

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
    const response = await api.put(`/exercises/${body._id}`, body);
    return response.data as IUpdateExerciseResponse;
  } catch (error) {
    throw error;
  }
};

export const getAllExercises = async (): Promise<IGetExerciseResponse[]> => {
  try {
    const response = await api.get(`/exercises`, {});
    return response.data as IGetExerciseResponse[];
  } catch (error) {
    throw error;
  }
};

export const getExercise = async (
  id: string
): Promise<IGetExerciseResponse> => {
  try {
    const response = await api.get(`/exercises/${id}`, {});
    return response.data as IGetExerciseResponse;
  } catch (error) {
    throw error;
  }
};

export const convertTextToSentences = (text: string) => {
  const splitText = splitTextIntoSentences(text);

  return splitText.map((value, index) => ({
    _id: generateUniqueId(),
    original: value,
    translated: "",
    position: index,
  }));
};

export const concatNewSentences = (
  sentences: ISentenceData[],
  text: string
) => {
  const splitText = splitTextIntoSentences(text);
  const lastSentenceIndex = sentences.length - 1;

  const sentencesToAdd = splitText.map((value, index) => ({
    _id: generateUniqueId(),
    original: value,
    translated: "",
    position: lastSentenceIndex + index + 1,
  }));

  const updatedSentences = sortSentences([...sentences, ...sentencesToAdd]);

  return updatedSentences;
};

export const increasePositionValueFrom = (
  startPosition: number,
  sentences: ISentenceData[],
  increaseValue = 1
) => {
  return sentences.map((sentence) =>
    sentence.position > startPosition
      ? {
          ...sentence,
          position: sentence.position + increaseValue,
        }
      : sentence
  );
};

export const deleteSentenceById = (id: string, sentences: ISentenceData[]) => {
  const deleteSentenceIndex = sentences.findIndex(
    (sentence) => sentence._id === id
  );

  sentences.splice(deleteSentenceIndex, 1);

  const sentencesWithUpdatedPositions = increasePositionValueFrom(
    deleteSentenceIndex,
    sentences,
    -1
  );

  return sentencesWithUpdatedPositions;
};

export const sortSentences = (sentences: ISentenceData[]) => {
  return sentences.sort((a, b) => a.position - b.position);
};
