import React from "react";
import { Box, ListItem, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { IExerciseCard } from "../common/interfaces";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  background: theme.palette.text.primary,
  borderRadius: 5,
  padding: "2px 10px",
  color: theme.palette.text.secondary,
}));

type Props = IExerciseCard;

const ExerciseCard: React.FC<Props> = ({ id, title, description, image }) => {
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
          alignItems: "center",
          backgroundColor: "info.main",
          width: 1,
          px: 4,
          py: 2,
          gap: 1,
        }}
      >
        <Box sx={{ color: "text.secondary" }}>
          <Typography>{title}</Typography>
          <Typography>{description}</Typography>
        </Box>
        <StyledLink to={`/exercise/${id}`}>Train</StyledLink>
      </Box>
    </ListItem>
  );
};

export default ExerciseCard;
