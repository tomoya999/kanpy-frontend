import { MenuItem } from "@szhsin/react-menu";
import React from "react"
import { useNavigate, useParams } from "react-router-dom";
import { rmNoteAPI } from "../apis/note";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { rmNote, selectProjectUuid, selectSectionByNoteUuid } from "../features/project/projectSlice";

const RmNoteMenuItem = (props: any): JSX.Element => {

  const { sectionUuid, noteUuid }: any = useParams();
  const section: any = useAppSelector((state: RootState) => selectSectionByNoteUuid(state, props.note.uuid));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const uuid: string = useAppSelector(selectProjectUuid);

  const handleClick = async(): Promise<void> => {
    
    let targetUuid: string = props.note
      ? props.note.uuid
      : noteUuid

    const res: any = await rmNoteAPI({noteUuid: targetUuid});
    if(res.isSuccess){
      
      const payload = {
        sectionUuid: section.uuid,
        noteUuid: targetUuid,
      };
      navigate(`/project/${uuid}`);
      dispatch(rmNote(payload));
    }
  };
  
  return props.note?.uuid || noteUuid 
    ? (
      <MenuItem
        {...props}
        onClick={ handleClick }
      >
        ノートを削除
      </MenuItem>
    )
    : <></>
};

export default RmNoteMenuItem;