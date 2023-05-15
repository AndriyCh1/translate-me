import { Container, List } from "@mui/material";
import ExerciseCard from "./exercise-card/exercise-card";

const mockExercisesData = [
  { id: "72763762", title: "t1", description: "d1", image: null },
  { id: "83487348", title: "t2", description: "d2", image: null },
];

const ExerciseList = () => {
  return (
    <Container maxWidth="lg">
      <List>
        {mockExercisesData.map((exercise) => (
          <ExerciseCard key={exercise.id} {...exercise} />
        ))}
      </List>
    </Container>
  );
};

export default ExerciseList;
