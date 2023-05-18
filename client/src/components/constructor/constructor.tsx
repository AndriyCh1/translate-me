import React, { FormEvent, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  IconButton,
  Tooltip,
  colors,
} from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";

import SentenceInput from "./sentence-input/sentence-input";
import { splitTextIntoSentences } from "../../utils/split-text-into-sentences";
import { ISentenceData } from "./common/interfaces";
import { generateUniqueId } from "../../utils/generate-unique-id";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ICreateExerciseRequest } from "../../common/interfaces";
import { exercisesActions } from "../../store/exercises";
import Snackbar, { Alert } from "../common/snackbar/snackbar";

const DEFAULT_TEXT_ROWS_NUMBER = 10;
const LESS_TEXT_ROWS_NUMBER = 3;

interface IAlert {
  type: "success" | "warning" | "error" | "info";
  message: string;
}

// TODO: add fields validation
const Constructor: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useAppSelector((state) => state.exercisesReducer);

  const [showLessText, setShowLessText] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sentences, setSentences] = useState<ISentenceData[]>([]);
  const [alert, setAlert] = useState<IAlert | null>();

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleShowLessButtonClick = () => {
    setShowLessText((value) => !value);
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleConvertAndReplaceButtonClick = () => {
    const splitText = splitTextIntoSentences(text);

    const sentences = splitText.map((value, index) => ({
      id: generateUniqueId(),
      original: value,
      translated: "",
      position: index,
    }));

    setSentences(sentences);
  };

  const handleConvertAndAddButtonClick = () => {
    const splitText = splitTextIntoSentences(text);
    const lastSentenceIndex = sentences.length - 1;

    const sentencesToAdd = splitText.map((value, index) => ({
      id: generateUniqueId(),
      original: value,
      translated: "",
      position: lastSentenceIndex + index + 1,
    }));

    const updatedSentences = [...sentences, ...sentencesToAdd];

    updatedSentences.sort((a, b) => a.position - b.position);

    setSentences(updatedSentences);
  };

  const handleAddSentence = (previousItemPosition: number) => {
    const updatedPositions = increasePositionValueFrom(
      previousItemPosition,
      sentences
    );

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

  const handleDeleteSentence = (id: string) => {
    const deleteSentenceIndex = sentences.findIndex(
      (sentence) => sentence.id === id
    );

    sentences.splice(deleteSentenceIndex, 1);

    const updatedPositions = increasePositionValueFrom(
      deleteSentenceIndex,
      sentences,
      -1
    );

    setSentences(updatedPositions);
  };

  const handleUpdateSentence = (data: ISentenceData) => {
    const updatedSentences = sentences.map((sentence) =>
      sentence.id === data.id ? { ...sentence, ...data } : sentence
    );

    setSentences(updatedSentences);
  };

  const increasePositionValueFrom = (
    startPosition: number,
    sentences: ISentenceData[],
    increaseValue = 1
  ) => {
    return sentences.map((sentence) =>
      sentence.position > startPosition
        ? {
            ...sentence,
            position: sentence.position + increaseValue,
          }
        : sentence
    );
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: ICreateExerciseRequest = {
      title,
      description,
      sentences,
    };

    if (id) {
      dispatch(exercisesActions.update({ ...data, id }))
        .unwrap()
        .then(() =>
          setAlert({ type: "success", message: "Successfully updated" })
        )
        .catch((error) => setAlert({ type: "error", message: error.message }));
    } else {
      dispatch(exercisesActions.create(data))
        .unwrap()
        .then(() =>
          setAlert({ type: "success", message: "Successfully created" })
        )
        .catch((error) => setAlert({ type: "error", message: error.message }));
    }
  };

  const handleStartExercise = () => {};

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
              required
              fullWidth
              placeholder="Title"
              onChange={handleTitleInput}
              value={title}
              InputLabelProps={{ sx: { color: "text.primary" } }}
            />
            <TextField
              required
              fullWidth
              placeholder="Description"
              onChange={handleDescriptionInput}
              value={description}
              InputLabelProps={{ sx: { color: "text.primary" } }}
            />
          </Box>
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
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<VerticalSplitIcon />}
              onClick={handleConvertAndReplaceButtonClick}
            >
              Convert
            </Button>
            <Button
              variant="contained"
              startIcon={<VerticalSplitIcon />}
              onClick={handleConvertAndAddButtonClick}
            >
              Convert and add to the end
            </Button>
          </Box>
          {sentences.length
            ? sentences.map((item, index) => (
                <SentenceInput
                  key={item.id}
                  value={item}
                  onAdd={handleAddSentence}
                  onDelete={handleDeleteSentence}
                  onChange={handleUpdateSentence}
                />
              ))
            : null}
          {sentences.length ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <>
                <Button type="submit" variant="contained">
                  {id ? "Update" : "Save"}
                </Button>

                {id ? (
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleStartExercise}
                  >
                    Start
                  </Button>
                ) : null}
              </>
            </Box>
          ) : null}
        </Box>
      </Box>
      {alert ? (
        <Snackbar isOpen={true} onClose={() => setAlert(null)}>
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Snackbar>
      ) : null}
    </Container>
  );
};

export default Constructor;
