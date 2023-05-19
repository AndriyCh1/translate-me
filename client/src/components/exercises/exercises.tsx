import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { exercisesActions } from "../../store/exercises";
import Snackbar, { Alert } from "../common/snackbar/snackbar";
import ExerciseList from "./exercise-list/exercise-list";
import { useNavigate } from "react-router-dom";

interface IAlert {
  type: "success" | "warning" | "error" | "info";
  message: string;
}

const Exercises: React.FC = ({}) => {
  const { exercises } = useAppSelector((state) => state.exercises);
  const [alert, setAlert] = useState<IAlert | null>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(exercisesActions.getAll())
      .unwrap()
      .catch((error) => setAlert({ type: "error", message: error.message }));
  }, [dispatch]);

  const handleStartExercise = (id: string) => {
    navigate(`/exercise/${id}`);
  };

  const handleDeleteExercise = (id: string) => {
    navigate(`/exercise/${id}`);
  };

  return (
    <Container maxWidth="lg">
      <ExerciseList
        data={exercises}
        onStart={handleStartExercise}
        onDelete={handleDeleteExercise}
      />
      {alert ? (
        <Snackbar isOpen={true} onClose={() => setAlert(null)}>
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Snackbar>
      ) : null}
    </Container>
  );
};

export default Exercises;
