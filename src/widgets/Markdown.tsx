import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState,  } from "../app/store";
import { selectNote } from "../features/project/projectSlice";
import CodeBlock from "./CodeBlock";

const Markdown = ({ onDoubleClick }: any): JSX.Element => {

  const { sectionUuid, noteUuid }: any = useParams();
  const note: any = useAppSelector((state: RootState) => selectNote(state, sectionUuid, noteUuid));
  
  return (
    <div
      className="text-left text-xl pt-16 px-10 md:px-16 lg:px-20 xl:px-40 w-full"
      onDoubleClick={ onDoubleClick }
    >
      <ReactMarkdown
        components={{
          code: CodeBlock,
          h1: ({ ...props }) => <h1 className="text-4xl text-gray-600">{ props.children }</h1>,
          h2: ({ ...props }) => <h2 className="text-3xl text-gray-600">{ props.children }</h2>,
          h3: ({ ...props }) => <h3 className="text-3xl text-gray-600">{ props.children }</h3>,
          h4: ({ ...props }) => <h4 className="text-2xl text-gray-600">{ props.children }</h4>,
          h5: ({ ...props }) => <h5 className="text-xl text-gray-600">{ props.children }</h5>,
          h6: ({ ...props }) => <h6 className="text-lg text-gray-600">{ props.children }</h6>,
          p: ({ ...props }) => <p className="text-base text-gray-600">{ props.children }</p>,
          a: ({ ...props }) => <a href={props.href} className="text-lg text-blue-600 hover:text-blue-400">{ props.children }</a>,
          li: ({ ...props }) => {
            return props.ordered 
              ? <li className="text-base text-gray-600 list-decimal">{ props.children }</li>
              : <li className="text-base text-gray-600 list-disc">{ props.children }</li>
          },
          // ol: ({node, ...props}) => <ol className="text-base text-gray-600 list-decimal">{ props.children }</ol>,
        }}
      >
        { note.body }
      </ReactMarkdown>
    </div>
  );
};

export default Markdown
