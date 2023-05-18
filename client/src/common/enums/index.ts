export enum AppRoute {
  ROOT = "/",
  ANY = "*",
  EXERCISES = "/exercises",
  CONSTRUCTOR = "/constructor",
  STORED = "/stored",
  EXERCISE_$ID = "/exercise/:id",
}

export const ENV = { API_PATH: process.env.REACT_APP_API_PATH };
