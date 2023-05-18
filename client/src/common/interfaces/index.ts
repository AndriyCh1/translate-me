export interface ICreateExerciseRequest {
  title: string;
  description: string;
  sentences: {
    original: string;
    translated: string;
    position: number;
  }[];
}

export interface ICreateExerciseResponse {
  _id: string;
  title: string;
  description: string;
  sentences: {
    _id: string;
    original: string;
    translated: string;
    position: number;
  }[];
}

export interface IUpdateExerciseRequest {
  id: string;
  title: string;
  description: string;
  sentences: {
    original: string;
    translated: string;
    position: number;
  }[];
}

export interface IUpdateExerciseResponse {
  _id: string;
  title: string;
  description: string;
  sentences: {
    _id: string;
    original: string;
    translated: string;
    position: number;
  }[];
}

export interface ISentenceData {
  id: string;
  original: string;
  translated: string;
  position: number;
}
