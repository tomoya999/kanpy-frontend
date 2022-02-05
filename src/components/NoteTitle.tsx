import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { updateNoteTitleAPI } from "../apis/note";
import { useAppDispatch } from "../app/hooks";
import { setNoteTitle } from "../features/project/projectSlice";
import { useEnterBlur } from "../hooks/windowSize";

type Props = {
  title: string
};

const NoteTitle = ({ title }: Props): JSX.Element => {

  const [isEditting, setIsEditting] = useState<boolean>(false);
  const { sectionUuid, noteUuid }: any = useParams();
  const dispatch = useAppDispatch();
  const { inputRef, enterBlur } = useEnterBlur();

  const toggleIsEditting= () => setIsEditting(!isEditting);

  const handleChange = async(e:React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const param = {
      sectionUuid,
      noteUuid,
      newTitle: e.target.value
    }
    dispatch(setNoteTitle(param))
  };

  const handleBlur = async(e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    await updateNoteTitleAPI({ noteUuid, title: e.target.value });
    toggleIsEditting();
  };

  return isEditting
  ?  (
      <input
        ref={ inputRef }
        autoFocus
        type="text"
        value={ title }
        onBlur={ handleBlur }
        onChange={ handleChange }
        onKeyDown={ enterBlur }
        className="font-bold text-4xl p-3"
      />
  )
  : (
    <div
      className="font-bold text-4xl"
      onDoubleClick={ toggleIsEditting }
    >
      { title }
    </div>
  )
};

export default NoteTitle;