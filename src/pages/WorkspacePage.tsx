import { useMenuState, ControlledMenu, MenuItem, applyStatics } from "@szhsin/react-menu";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { api } from "../apis/base";
import { useAppDispatch } from "../app/hooks";
import { setProject } from "../features/project/projectSlice";
import { Sidebar } from "../sections";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import RmNoteMenuItem from "../components/RmNoteMenuItem";
import { useSetupWindowSize } from "../hooks/windowSize";

const WorkspacePage = (): JSX.Element => {

  const { projectUuid } = useParams();
  const dispatch = useAppDispatch();
  useSetupWindowSize();
  const { toggleMenu, ...menuProps } = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setup = async(): Promise<void> => {
      const res: any =  await api.get(`/v1/projects/${projectUuid}`);
      if(res.isSuccess){
        dispatch(setProject(res.data));
      }
    };
    setup();
  }, [projectUuid])

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
    // <div className="bg-gradient-to-r from-violet-300 via-yellow-900 to-rose-2300">
    <div className="bg-rose-100">
      <div className="grid grid-cols-12 bg-white bg-opacity-80">
        <div className="sm:col-span-4 md:col-span-3 xl:col-span-2">
          <Sidebar />
        </div>
        <div
          className="sm:col-span-8 md:col-span-9 xl:col-span-10"
          onContextMenu={ handleContextMenu }
        >
          < Outlet />
        </div>
        <ControlledMenu
          {...menuProps}
          anchorPoint={anchorPoint}
          onClose={() => toggleMenu(false)}
        >
          <MenuItem>Cut</MenuItem>
          <MenuItem>Copy</MenuItem>
          <MenuItem>Paste</MenuItem>
          {/* <RmNoteMenuItem /> */}
        </ControlledMenu>
      </div>
    </div>
  );
};

export default WorkspacePage;