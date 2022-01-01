import { MenuItem } from "@szhsin/react-menu";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createNoteAPI } from "../apis/note";
import { useAppDispatch } from "../app/hooks";
import { addNote } from "../features/project/projectSlice";

const AddNoteMenuItem = (props: any): JSX.Element => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = async(): Promise<void> => {
    const res: any = await createNoteAPI({ sectionUuid: props.section.uuid });
    if(res.isSuccess){
      const note = res.data.note
      dispatch(addNote({ sectionUuid: props.section.uuid, note }));
      navigate(`section/${props.section.uuid}/note/${note.uuid}`)
    };
  };
  
  return (
    <MenuItem
      onClick={ handleClick }
      {...props}
    >
      ノートを追加
    </MenuItem>
  )
}

export default AddNoteMenuItem;