import React from "react";
import { Box, TextField } from "@mui/material";

interface IProps {
  defaultOriginalValue?: string;
}

const SentenceInput: React.FC<IProps> = ({ defaultOriginalValue = "" }) => {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <TextField
        required
        defaultValue={defaultOriginalValue}
        fullWidth
        InputLabelProps={{ sx: { color: "text.primary" } }}
      />
      <TextField
        required
        fullWidth
        InputLabelProps={{ sx: { color: "text.primary" } }}
      />
    </Box>
  );
};

const MemoizedSentenceInput = React.memo(SentenceInput);

export default MemoizedSentenceInput;
