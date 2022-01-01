import React, { useState } from "react";
import { IAceEditor } from "react-ace/lib/types";
import { useParams } from "react-router-dom";
import { Markdown } from ".";
import { updateNoteBodyAPI } from "../apis/note";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { NoteTitle } from "../components";
import { selectNote, setNoteBody } from "../features/project/projectSlice";
import { selectWindowHeight } from "../features/windowSize/windowSizeSlice";
import { Editor } from "../widgets";

const MainContent = (): JSX.Element => {
  
  const height: string = useAppSelector(selectWindowHeight);
  const { sectionUuid, noteUuid }: any = useParams();
  const note = useAppSelector((state: RootState) => selectNote(state, sectionUuid, noteUuid));
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  
  const toggleIsEditting= () => setIsEditting(!isEditting);

  const handleBlur = async(_: any, editor: IAceEditor): Promise<void> => {
    toggleIsEditting();
    const param = {
      noteUuid,
      body: editor.getValue(),
    }
    const res: any = await updateNoteBodyAPI(param);
    if(res.isSuccess){
      const payload: any = {
        sectionUuid,
        noteUuid,
        newBody: editor.getValue(),
      }
      dispatch(setNoteBody(payload));
    }
  };

  return (
    <main className="py-12" style={ {height: `${height}px`} }>
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-center content-center py-10">
          <NoteTitle title={ note.title } />
        </div>
        {isEditting
          ? (
            <Editor
              onBlur={ handleBlur }
            />
          )
          : (
            <Markdown onDoubleClick={ toggleIsEditting } />
          )
        }
      </div>
    </main>
  );
};

export default MainContent;