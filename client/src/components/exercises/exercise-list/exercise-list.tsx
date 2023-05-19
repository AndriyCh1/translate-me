import React from "react";
import { List } from "@mui/material";
import ExerciseCard from "../exercise-card/exercise-card";

interface IProps {
  data: { _id: string; title: string; description: string }[];
  onStart: (id: string) => void;
  onDelete: (id: string) => void;
}

const ExerciseList: React.FC<IProps> = ({ data, onStart, onDelete }) => {
  const handleStart = (id: string) => {
    onStart(id);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  return (
    <List>
      {data.map(({ _id, title, description }) => (
        <ExerciseCard
          key={_id}
          id={_id}
          title={title}
          description={description}
          onStart={() => handleStart(_id)}
          onDelete={() => handleDelete(_id)}
        />
      ))}
    </List>
  );
};

export default ExerciseList;
