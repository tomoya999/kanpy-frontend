import React, { useEffect, useRef, useState } from "react";
import { AccordionHeader, AccordionItem } from "../components";

const Accordion = ({ section }: any): JSX.Element => {
  const contentSpace = useRef<any>(null);
  const [height, setHeight] = useState<string>('0px')

  useEffect(() => {
    const height: string = section.isActive
      ? `${contentSpace.current.scrollHeight}px`
      : '0px'
    setHeight(height);
  }, [section.isActive])
  
  return (
    <div className="flex flex-col">
      <AccordionHeader section={ section } />
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-100 ease-in-out"
      >
        {section.notes.map((note: any, i: number) => (
          <AccordionItem
            key={ note.uuid }
            section={ section }
            note={ note }
            i={ i }
          />
        ))}
      </div>
    </div>
  );
};

export default Accordion;