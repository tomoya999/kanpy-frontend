import { useMenuState, applyStatics, MenuItem, ControlledMenu } from "@szhsin/react-menu";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import RmNoteMenuItem from "./RmNoteMenuItem";

const AccordionItem = ({ section, note, i }: any): JSX.Element => {

  const { toggleMenu, ...menuProps } = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    toggleMenu(true);
  };

  const menuItems = [
    RmNoteMenuItem,
  ];
  menuItems.forEach(item => {
    applyStatics(MenuItem)(item);
  });

  return (
    <>
      <NavLink
        to={`section/${section.uuid}/note/${note.uuid}`}
        // isActiveを引数にして、アロー関数を書く。
        // isActiveで三項演算子を使い、trueの場合にclass名が適用されるようにする。
        className={({ isActive }) => (isActive ? "active" : "")}
        onContextMenu={ handleContextMenu }
        key={ note.uuid }
      >
        <div className={`py-2 hover:bg-gray-100 ${section.notes.length - 1 === i && 'mb-4'}`}>{note.title}</div>
      </NavLink>
      <ControlledMenu
        {...menuProps}
        anchorPoint={anchorPoint}
        onClose={() => toggleMenu(false)}
      >
        <RmNoteMenuItem note={ note } />
      </ControlledMenu>
    </>
  );
};

export default AccordionItem;