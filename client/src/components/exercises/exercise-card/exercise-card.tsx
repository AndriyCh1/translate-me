import React from "react";
import { Box, Button, ListItem, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

interface IProps {
  id: string;
  title: string;
  description: string;
  onStart: () => void;
  onDelete: () => void;
}

const ExerciseCard: React.FC<IProps> = ({
  id,
  title,
  description,
  onStart,
}) => {
  const handleStart = () => onStart();
  const handleDelete = () => onStart();

  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderColor: "info.main",
          alignItems: "center",
          borderWidth: 1,
          borderStyle: "solid",
          width: 1,
          px: 4,
          py: 2,
          gap: 1,
        }}
      >
        <Box sx={{ color: "text.primary" }}>
          <Typography>{title}</Typography>
          <Typography>{description}</Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, height: "35px" }}
        >
          <Button variant="outlined" sx={{ height: 1 }} onClick={handleStart}>
            Train
          </Button>
          <Button variant="outlined" sx={{ height: 1 }} onClick={handleDelete}>
            <Delete />
          </Button>
        </Box>
      </Box>
    </ListItem>
  );
};

export default ExerciseCard;
