import React from "react";
import { ISentenceData } from "../common/interfaces";
import SentenceInput from "../sentence-input/sentence-input";

interface IProps {
  data: ISentenceData[];
  onAdd?: (position: number) => void;
  onDelete?: (id: string) => void;
  onChange?: (sentence: ISentenceData) => void;
}

const SentenceInputContainer: React.FC<IProps> = ({
  data,
  onDelete,
  onChange,
  onAdd,
}) => {
  if (data.length) {
    return (
      <>
        {data.map((item) => (
          <SentenceInput
            key={item.id}
            value={item}
            onAdd={onAdd}
            onDelete={onDelete}
            onChange={onChange}
          />
        ))}
      </>
    );
  }

  return null;
};

export default SentenceInputContainer;
