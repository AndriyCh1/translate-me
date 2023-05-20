import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  styled,
  MenuProps,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { ISentenceData } from "../../../common/interfaces";

interface IProps {
  value: ISentenceData;
  onAdd?: (position: number) => void;
  onDelete?: (id: string) => void;
  onChange?: (sentence: ISentenceData) => void;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "center",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "center",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    width: "auto",
    color: theme.palette.text.secondary,
    padding: "0",

    "& .MuiMenu-list": {
      padding: "0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
      },
    },
  },
}));

// TODO: come up with an idea how to get rid of repeated attributes
const SentenceInput: React.FC<IProps> = ({
  value,
  onAdd,
  onDelete,
  onChange,
}) => {
  const [originalValue, setOriginalValue] = useState(value.original);
  const [translatedValue, setTranslatedValue] = useState(value.translated);
  const [anchorOptionsElement, setAnchorOptionsElement] =
    useState<null | HTMLElement>(null);

  const handleOriginalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalValue(e.target.value);
  };

  const handleTranslatedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTranslatedValue(e.target.value);
  };

  const isOptionsOpened = Boolean(anchorOptionsElement);

  const handleClickMore = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorOptionsElement(e.currentTarget);
  };

  const handleCloseMore = () => {
    setAnchorOptionsElement(null);
  };

  const handleDelete = () => {
    onDelete?.(value._id);
  };

  const handleAdd = () => {
    onAdd?.(value.position);
  };

  const handleChange = () => {
    const data: ISentenceData = {
      ...value,
      original: originalValue,
      translated: translatedValue,
    };

    onChange?.(data);
  };

  useEffect(() => {
    handleChange();
  }, [originalValue, translatedValue]);

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <TextField
        required
        fullWidth
        InputLabelProps={{ sx: { color: "text.primary" } }}
        onChange={handleOriginalInput}
        value={originalValue}
      />
      <TextField
        required
        fullWidth
        InputLabelProps={{ sx: { color: "text.primary" } }}
        onChange={handleTranslatedInput}
        value={translatedValue}
      />
      <IconButton sx={{ borderRadius: 1 }} onClick={handleClickMore}>
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{ "aria-labelledby": "demo-customized-button" }}
        anchorEl={anchorOptionsElement}
        open={isOptionsOpened}
        onClose={handleCloseMore}
      >
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon />
        </MenuItem>
        <MenuItem onClick={handleAdd} disableRipple>
          <AddIcon />
        </MenuItem>
      </StyledMenu>
    </Box>
  );
};

const MemoizedSentenceInput = React.memo(SentenceInput);

export default MemoizedSentenceInput;
