interface ISentence {
  _id: string;
  original: string;
  translated: string;
  position: number;
}

interface IExercise {
  _id: string;
  title: string;
  description: string;
  sentences: ISentence[];
}

export interface IState {
  exercise: IExercise | null;
  exercises: IExercise[];
  trainExercise: IExercise | null;
  isLoading: boolean;
  error: any;
}

export enum Action {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  GET_ALL = "GET_ALL",
  GET = "GET",
  DELETE = "DELETE",
}
