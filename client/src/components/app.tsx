import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";

import { AppRoute } from "../common/enums";

import Navbar from "./common/navbar/navbar";
import Exercise from "./exercise/exercise";
import Constructor from "./constructor/constructor";
import Exercises from "./exercise-list/exercises";

const App: React.FC = ({}) => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path={AppRoute.ANY} element={<Exercises />} />
        <Route path={AppRoute.EXERCISES} element={<Exercises />} />
        <Route path={AppRoute.EXERCISE_$ID} element={<Exercise />} />
        <Route path={AppRoute.CONSTRUCTOR} element={<Constructor />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
