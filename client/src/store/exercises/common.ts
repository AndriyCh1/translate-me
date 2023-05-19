interface ISentence {
  _id: string;
  original: string;
  translated: string;
  position: number;
}

interface IExercise {
  _id: string | null;
  title: string | null;
  description: string | null;
  sentences: ISentence[] | null;
}

export interface IState {
  exercise: IExercise;
  isLoading: boolean;
  error: any;
}

export enum Action {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  GET_ALL = "GET_ALL",
}
