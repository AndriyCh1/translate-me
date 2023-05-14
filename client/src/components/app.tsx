import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";

import { AppRoute } from "../common/enums";
import Navbar from "./common/navbar/navbar";
import ExerciseList from "./exercise-list/exercise-list";
import Exercise from "./exercise/exercise";

const App: React.FC = ({}) => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path={AppRoute.ANY} element={<ExerciseList />} />
        <Route path={AppRoute.EXERCISES} element={<ExerciseList />} />
        <Route path={AppRoute.EXERCISE_$ID} element={<Exercise />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
