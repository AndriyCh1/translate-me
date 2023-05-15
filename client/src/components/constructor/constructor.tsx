import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";

import SentenceInput from "./sentence-input/sentence-input";
import { splitTextIntoSentences } from "../../utils/split-text-into-sentences";

const DEFAULT_TEXT_ROWS_NUMBER = 10;
const LESS_TEXT_ROWS_NUMBER = 3;

// TODO: add fields validation
const Constructor: React.FC = () => {
  const [showLessText, setShowLessText] = useState(false);
  const [text, setText] = useState("");
  const [sentences, setSentences] = useState<string[] | null>();

  const handleShowLessButtonClick = () => {
    setShowLessText((value) => !value);
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleConvertButtonClick = () => {
    const splitText = splitTextIntoSentences(text);
    setSentences(splitText);
  };

  return (
    <Container maxWidth="lg">
      <Box component="form" autoComplete="off" sx={{ paddingY: 3 }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", width: 1, gap: 1 }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <TextField
              id="text-input"
              label="Text"
              multiline
              placeholder="Type text here..."
              variant="filled"
              value={text}
              rows={
                showLessText ? LESS_TEXT_ROWS_NUMBER : DEFAULT_TEXT_ROWS_NUMBER
              }
              sx={{ width: 1 }}
              InputLabelProps={{ sx: { color: "text.primary" } }}
              onChange={handleTextInput}
            />
            {/*<FormHelperText id="component-error-text">Error</FormHelperText>*/}
            <Tooltip title="See less" enterDelay={500}>
              <IconButton
                color="primary"
                sx={{ width: "40px", height: "40px", borderRadius: 1 }}
                onClick={handleShowLessButtonClick}
              >
                {showLessText ? <UnfoldMoreIcon /> : <UnfoldLessIcon />}
              </IconButton>
            </Tooltip>
          </Box>
          <Tooltip title="Convert text into sentences" enterDelay={500}>
            <Button
              variant="outlined"
              startIcon={<VerticalSplitIcon />}
              onClick={handleConvertButtonClick}
            >
              Convert into sentences
            </Button>
          </Tooltip>
          {sentences
            ? sentences.map((item, index) => (
                <SentenceInput key={item + index} defaultOriginalValue={item} />
              ))
            : null}
          {/*<Button variant="contained" startIcon={<UnfoldMoreIcon />}></Button>*/}
        </Box>
      </Box>
    </Container>
  );
};

export default Constructor;
