import React from "react";
import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";

const Exercise: React.FC = ({}) => {
  const { id } = useParams();

  return (
    <Container maxWidth="xl">
      <Box sx={{ color: "text.secondary", padding: 1 }}>{id}</Box>
    </Container>
  );
};

export default Exercise;
