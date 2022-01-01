import { ChevronDownIcon } from "@heroicons/react/outline";
import React from "react";
import { useAppDispatch } from "../app/hooks";
import { toggleIsActive } from "../features/project/projectSlice";

const AccordionButton = ({ section, handleContextMenu }: any): JSX.Element => {

  const dispatch = useAppDispatch();
  const rotateClassName = section.isActive
    ? 'transform duration-700 ease'
    : 'transform duration-700 ease rotate-180';
  const padding = section.isActive
    ? 'pb-3'
    : 'pb-4'
  const toggleAccordion = (): void => {
    dispatch(toggleIsActive({uuid: section.uuid}));
  };
  
  return (
    <button
      className={`${padding} box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between`}
      onClick={toggleAccordion}
      onContextMenu={ handleContextMenu }
    >
      <p className="inline-block text-footnote light font-bold text-xl text-gray-800">{ section.title }</p>
      <ChevronDownIcon className={`${rotateClassName} inline-block w-7`} />
    </button>
  )
}

export default AccordionButton