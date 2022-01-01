import React, { useState } from "react"
import {
  applyStatics,
  ControlledMenu,
  MenuItem,
  useMenuState,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { AccordionButton, AddNoteMenuItem, AddSectionMenuItem, EditSectionNameMenuItem, RmSectioMenuItem, SectionTitleInput } from ".";

const AccordionHeader = ({ section }: any): JSX.Element => {
  
  const [isEditting, setIsEditting] = useState<boolean>(false);
  
  const { toggleMenu, ...menuProps } = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    
  const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    toggleMenu(true);
  };

  const toggleIsEditting = (): void => setIsEditting(!isEditting);
  const menuItems = [
    AddNoteMenuItem,
    EditSectionNameMenuItem,
    AddSectionMenuItem,
    RmSectioMenuItem,
  ];
  menuItems.forEach(item => {
    applyStatics(MenuItem)(item);
  });
  
  return (
    <>
      {isEditting
        ? (
          <div className="py-5">
            <SectionTitleInput
              toggleIsEditting={ toggleIsEditting }
              section={ section }
            />
          </div>
        )
        : (
          <AccordionButton
            section={ section }
            handleContextMenu={ handleContextMenu }
          />
        )
      }
      <ControlledMenu
        {...menuProps}
        anchorPoint={anchorPoint}
        onClose={() => toggleMenu(false)}
      >
        <AddNoteMenuItem section={ section } />
        <EditSectionNameMenuItem onClick={ toggleIsEditting } />
        <AddSectionMenuItem />
        <RmSectioMenuItem sectionuuid={ section.uuid } />
      </ControlledMenu>
    </>
  );
};

export default AccordionHeader;