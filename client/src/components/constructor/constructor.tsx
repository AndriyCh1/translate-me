import React, { FormEvent, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  IconButton,
  Tooltip,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import SentenceInputContainer from "./sentence-input-container/sentence-input-container";
import Radio from "@mui/material/Radio";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { generateUniqueId } from "../../utils/generate-unique-id";
import { exercisesActions } from "../../store/exercises";
import Snackbar, { Alert } from "../common/snackbar/snackbar";
import * as exerciseService from "../../services/exercises.service";
import { ICreateExerciseRequest, ISentenceData } from "../../common/interfaces";
import { useNavigate } from "react-router-dom";

const DEFAULT_TEXT_ROWS_NUMBER = 10;
const LESS_TEXT_ROWS_NUMBER = 3;

interface IAlert {
  type: "success" | "warning" | "error" | "info";
  message: string;
}

enum TextType {
  TRANSLATED = "translated",
  ORIGINAL = "original",
}

// TODO: add fields validation
const Constructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const exercise = useAppSelector((state) => state.exercises.exercise);

  const [showLessText, setShowLessText] = useState(false);
  const [text, setText] = useState("");
  const [textType, setTextType] = useState<TextType>(TextType.ORIGINAL);
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

  const handleChangeTextType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextType((e.target as HTMLInputElement).value as TextType);
  };

  const handleConvertAndReplaceButtonClick = () => {
    const isOriginal = textType === TextType.ORIGINAL;

    if (!sentences.length) {
      const convertedSentences = exerciseService.convertTextToSentences(
        text,
        isOriginal
      );
      setSentences(convertedSentences);
    } else {
      const updatedSentences = exerciseService.updateSentences(
        sentences,
        text,
        isOriginal
      );
      setSentences(updatedSentences);
    }
  };

  const handleAddSentence = (previousItemPosition: number) => {
    const updatedPositions = exerciseService.increasePositionValueFrom(
      previousItemPosition,
      sentences
    );

    const newSentence = {
      _id: generateUniqueId(),
      original: "",
      translated: "",
      position: previousItemPosition + 1,
    };

    const updatedSentences = exerciseService.sortSentences([
      ...updatedPositions,
      newSentence,
    ]);

    setSentences(updatedSentences);
  };

  const handleDeleteSentence = (id: string) => {
    const updatedSentences = exerciseService.deleteSentenceById(id, sentences);

    setSentences(updatedSentences);
  };

  const handleUpdateSentence = (data: ISentenceData) => {
    const updatedSentences = sentences.map((sentence) =>
      sentence._id === data._id ? { ...sentence, ...data } : sentence
    );

    setSentences(updatedSentences);
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: ICreateExerciseRequest = {
      title,
      description,
      sentences: sentences.map((item) => ({ ...item, _id: undefined })),
    };

    try {
      if (exercise) {
        await dispatch(
          exercisesActions.update({ ...data, _id: exercise._id })
        ).unwrap();
        setAlert({ type: "success", message: "Successfully updated" });
      } else {
        await dispatch(exercisesActions.create(data)).unwrap();
        setAlert({ type: "success", message: "Successfully created" });
      }
    } catch (error) {
      // @ts-ignore
      setAlert({ type: "error", message: error.message });
    }
  };

  const handleStartExercise = () => {
    if (exercise?._id) {
      navigate(`/exercise/${exercise._id}`);
    }

    setAlert({ type: "info", message: "Cannot start training" });
  };

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
            <RadioGroup
              value={textType}
              onChange={handleChangeTextType}
              sx={{ display: "flex", flexDirection: "row", gap: 1 }}
            >
              <FormControlLabel
                value={TextType.ORIGINAL}
                control={<Radio />}
                label="Original"
              />
              <FormControlLabel
                value={TextType.TRANSLATED}
                control={<Radio />}
                label="Translated"
              />
            </RadioGroup>
            <Button
              variant="contained"
              startIcon={<VerticalSplitIcon />}
              onClick={handleConvertAndReplaceButtonClick}
            >
              Convert
            </Button>
          </Box>
          <SentenceInputContainer
            data={sentences}
            onAdd={handleAddSentence}
            onDelete={handleDeleteSentence}
            onChange={handleUpdateSentence}
          />

          {sentences.length ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <>
                <Button type="submit" variant="contained">
                  {exercise?._id ? "Update" : "Save"}
                </Button>

                {exercise?._id ? (
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
