import React, { useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import SubtitlesIcon from "@mui/icons-material/Subtitles";
import SubtitlesOffIcon from "@mui/icons-material/SubtitlesOff";

interface IProps {
  data: {
    _id: string;
    original: string;
    translated: string;
    position: number;
  };
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#eeeeee",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#b5b5b5",
  padding: theme.spacing(1),
  overflowY: "auto",
}));

const ExerciseSentence: React.FC<IProps> = ({ data }) => {
  const [showTranslation, setShowTranslation] = useState(false);

  const [currentInputValue, setCurrentInputValue] = useState("");

  const handleToggleTranslation = () => {
    setShowTranslation((value) => !value);
  };

  const handleCurrentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInputValue(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <IconButton
        sx={{
          width: "30px",
          height: "30px",
          borderRadius: 1,
        }}
        onClick={handleToggleTranslation}
      >
        {showTranslation ? (
          <SubtitlesOffIcon sx={{ fontSize: 21, color: "background.paper" }} />
        ) : (
          <SubtitlesIcon sx={{ fontSize: 21 }} />
        )}
      </IconButton>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: 1 }}>
        <Box sx={{ display: "flex", gap: 1, width: 1 }}>
          <TextField
            fullWidth
            multiline={true}
            InputLabelProps={{ sx: { color: "text.primary" } }}
            maxRows={9}
            sx={{ width: 0.5 }}
            onChange={handleCurrentInput}
            value={currentInputValue}
          />
          <StyledPaper
            elevation={0}
            sx={{
              width: 0.5,
              maxHeight: "240px",
            }}
          >
            <Typography>{data.original}</Typography>
          </StyledPaper>
        </Box>
        {showTranslation && (
          <StyledPaper
            elevation={0}
            sx={{
              width: 1,
              maxHeight: "100px",
            }}
          >
            <Typography>{data.translated}</Typography>
          </StyledPaper>
        )}
      </Box>
    </Box>
  );
};

export default ExerciseSentence;
