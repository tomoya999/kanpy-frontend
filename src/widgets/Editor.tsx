import React, { useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";
import { useAppSelector } from "../app/hooks";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-xcode";

import { selectWindowHeight } from "../features/windowSize/windowSizeSlice";
import { IAceEditor } from "react-ace/lib/types";
import { useParams } from "react-router-dom";
import { RootState } from "../app/store";
import { selectNote } from "../features/project/projectSlice";

const Editor = ({ onBlur }: any): JSX.Element => {

  const { sectionUuid, noteUuid }: any = useParams();
  const note: any = useAppSelector((state: RootState) => selectNote(state, sectionUuid, noteUuid));
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [editorHeight, setEditorHeight] = useState<string>('');
  const windowHeight = useAppSelector(selectWindowHeight);

  useEffect(() => {
    const currentHeight: string | undefined = wrapperRef.current?.clientHeight.toString();
    if(currentHeight !== undefined){
      setEditorHeight(currentHeight);
    }
  }, [windowHeight])
  
  const onChange = (): void => {
  }
  
  const handleOnLoad = (editor: IAceEditor): void => {
    editor.setShowPrintMargin(false);
    
  }
  
  return (
    <div ref={ wrapperRef } className="px-24 basis-full">
      <AceEditor
        className="h-full bg-blue-50 rounded-xl"
        height={ editorHeight }
        width=""
        fontSize={16}
        value={ note.body }
        mode="markdown"
        // theme="monotheme-monokai"
        onChange={ onChange }
        onBlur={ onBlur }
        onLoad={ handleOnLoad }
        name="UNIQUE_ID_OF_DIV"
        focus={true}
        tabSize={2}
        showGutter={false}
        editorProps={{ $blockScrolling: true }}
        commands={[{   // commands is array of key bindings.
          name: 'commandName', //name for the key binding.
          bindKey: {win: 'Ctrl-Shift-k', mac: 'Command-Shift-k'}, //key combination used for the command.
          exec: 'removeline'  //function to execute when keys are pressed.
        }]}
      />
    </div>
  )
}

export default Editor;