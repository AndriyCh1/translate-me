interface ISentence {
  original: string;
  translated: string;
  position: number;
}

export interface IState {
  isLoading: boolean;
  isFailed: boolean;
  id: string | null;
  title: string | null;
  description: string | null;
  sentences: ISentence[] | null;
}

export enum Action {
  CREATE = "CREATE",
}
