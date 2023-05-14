import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { AppRoute } from "../common/enums";
import Navbar from "./common/navbar/navbar";
import Exercises from "./exercises/exercises";
import { theme } from "../styles/theme";

const App: React.FC = ({}) => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path={AppRoute.ANY} element={<Exercises />} />
        <Route path={AppRoute.EXERCISES} element={<Exercises />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
