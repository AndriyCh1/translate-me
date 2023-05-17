import React, { FormEvent, useState } from "react";
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
import { ISentenceData } from "./common/interfaces";
import { generateUniqueId } from "../../utils/generate-unique-id";

const DEFAULT_TEXT_ROWS_NUMBER = 10;
const LESS_TEXT_ROWS_NUMBER = 3;

// TODO: add fields validation
const Constructor: React.FC = () => {
  const [showLessText, setShowLessText] = useState(false);
  const [text, setText] = useState("");
  const [sentences, setSentences] = useState<ISentenceData[]>([]);

  const handleShowLessButtonClick = () => {
    setShowLessText((value) => !value);
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleConvertButtonClick = () => {
    const splitText = splitTextIntoSentences(text);
    const sentences = splitText.map((value, index) => ({
      id: generateUniqueId(),
      original: `${index + value}`,
      translated: "",
      position: index,
    }));

    setSentences(sentences);
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {};

  const handleAddSentence = (previousItemPosition: number) => {
    const updatedPositions = updatePositions(previousItemPosition, sentences);

    const newSentence = {
      id: generateUniqueId(),
      original: "",
      translated: "",
      position: previousItemPosition + 1,
    };

    const updatedSentences = [...updatedPositions, newSentence];

    updatedSentences.sort((a, b) => a.position - b.position);

    setSentences(updatedSentences);
  };

  const updatePositions = (
    startPosition: number,
    sentences: ISentenceData[]
  ) => {
    return sentences.map((sentence) => {
      if (sentence.position > startPosition) {
        return { ...sentence, position: sentence.position + 1 };
      }

      return { ...sentence };
    });
  };

  const handleDeleteSentence = () => {};

  return (
    <Container maxWidth="lg">
      <Box
        component="form"
        autoComplete="off"
        sx={{ paddingY: 3 }}
        onSubmit={handleSubmitForm}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
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
              variant="contained"
              startIcon={<VerticalSplitIcon />}
              onClick={handleConvertButtonClick}
            >
              Convert into sentences
            </Button>
          </Tooltip>
          {sentences
            ? sentences.map((item, index) => (
                <SentenceInput
                  key={item.id}
                  defaultOriginalValue={item.original}
                  onAdd={() => handleAddSentence(index)}
                  onDelete={handleDeleteSentence}
                />
              ))
            : null}
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: "flex-end" }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Constructor;
