import { ChevronDownIcon, PlusIcon } from "@heroicons/react/outline";
import React, { useState, useRef } from "react";
import { useAppSelector } from "../app/hooks";
import { AccordionButton, SidebarHeader } from "../components";
import { selectSections } from "../features/project/projectSlice";
import { Accordion } from "../widgets";

const Sidebar = (): JSX.Element => {

  const sections = useAppSelector(selectSections);

  return (
    <div className="h-screen border-r border-gray-200 py-5 px-10">
      <SidebarHeader />
      {sections.map((section: any) => (
        <Accordion section={ section } key={ section.uuid} />
      ))}
    </div>
  )
};

export default Sidebar;