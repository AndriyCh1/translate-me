interface ISentence {
  original: string;
  translated: string;
  position: number;
}

export interface IState {
  isLoading: boolean;
  error: any;
  id: string | null;
  title: string | null;
  description: string | null;
  sentences: ISentence[] | null;
}

export enum Action {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}
