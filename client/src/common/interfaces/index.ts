export interface ICreateExerciseRequest {
  title: string;
  description: string;
  sentences: ISentenceRequest[];
}

interface ISentenceRequest {
  original: string;
  translated: string;
  position: number;
}

export interface ICreateExerciseResponse {
  _id: string;
  title: string;
  description: string;
  sentences: ISentenceResponse[];
}

interface ISentenceResponse {
  _id: string;
  original: string;
  translated: string;
  position: number;
}
