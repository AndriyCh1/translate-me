import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { exercisesActions } from "../../store/exercises";
import ExerciseSentence from "./exercise-sentence/exercise-sentence";

const Exercise: React.FC = ({}) => {
  const { id } = useParams();

  const { isLoading, trainExercise } = useAppSelector(
    (state) => state.exercises
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(exercisesActions.getById(id));
    }
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{ paddingY: 3, display: "flex", flexDirection: "column", gap: 1 }}
      >
        {!isLoading && trainExercise && (
          <Box sx={{ textAlign: "center", marginBottom: 1 }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
              {trainExercise.title}
            </Typography>
            <Typography variant="h6" component="h2">
              {trainExercise.description}
            </Typography>
          </Box>
        )}

        {!isLoading && trainExercise
          ? trainExercise.sentences.map((sentence) => (
              <ExerciseSentence key={sentence._id} data={sentence} />
            ))
          : null}
      </Box>
    </Container>
  );
};

export default Exercise;
