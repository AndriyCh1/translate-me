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

export const deleteExercise = async (id: string): Promise<void> => {
  try {
    await api.delete(`/exercises/${id}`, {});
  } catch (error) {
    throw error;
  }
};

export const convertTextToSentences = (text: string, original = true) => {
  const splitText = splitTextIntoSentences(text);

  return splitText.map((value, index) => ({
    _id: generateUniqueId(),
    original: original ? value : "",
    translated: original ? "" : value,
    position: index,
  }));
};

export const updateSentences = (
  sentences: ISentenceData[],
  text: string,
  original = true
) => {
  const splitText = splitTextIntoSentences(text);
  const textLength = splitText.length;
  const sentencesLength = sentences.length;
  const updatedSentences = [];

  const totalLength =
    textLength > sentencesLength ? textLength : sentencesLength;

  for (let i = 0; i < totalLength; i++) {
    if (textLength > sentencesLength) {
      const value = splitText[i];

      const sentenceBase = {
        _id: generateUniqueId(),
        ...(original && { originalValue: value }),
        ...(!original && { translated: value }),
      };

      let sentenceToUpdate;

      if (i <= sentencesLength - 1) {
        sentenceToUpdate = sentences[i];
      } else {
        sentenceToUpdate = {
          original: "",
          translated: "",
          position: i,
        };
      }

      updatedSentences.push({ ...sentenceToUpdate, ...sentenceBase });
    } else {
      let sentenceToUpdate;

      if (i <= textLength - 1) {
        const value = splitText[i];
        const sentenceBase = {
          _id: generateUniqueId(),
          ...(original && { original: value }),
          ...(!original && { translated: value }),
        };

        sentenceToUpdate = { ...sentences[i], ...sentenceBase };
      } else {
        const sentenceBase = {
          _id: generateUniqueId(),
          ...(original && { original: "" }),
          ...(!original && { translated: "" }),
        };

        sentenceToUpdate = { ...sentences[i], ...sentenceBase };
      }
      updatedSentences.push(sentenceToUpdate);
    }
  }

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
