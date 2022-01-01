import { useMenuState, applyStatics, MenuItem, ControlledMenu } from "@szhsin/react-menu";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../apis/base";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectProjectTitle, selectProjectUuid, setProjectTitle } from "../features/project/projectSlice";
import { useEnterBlur } from "../hooks/windowSize";
import RmNoteMenuItem from "./RmNoteMenuItem";

const SidebarHeader = (): JSX.Element => {

  const title: string = useAppSelector(selectProjectTitle);
  const uuid: string = useAppSelector(selectProjectUuid);
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const { inputRef, enterBlur } = useEnterBlur();
  const dispatch = useAppDispatch();
  const projectUuid = useAppSelector(selectProjectUuid);
  const navigate = useNavigate();

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
  
  const handleBlur = async(e: React.FocusEvent<HTMLInputElement>): Promise<void> => {
    const param = {
      projectTitle: e.target.value,
    }
    const res: any = await api.post(`v1/projects/${projectUuid}/update_title`, param)

    if(res.isSuccess){
      setIsEditting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setProjectTitle(e.target.value))
  };

  const handleClick = async(): Promise<void> => {
    const res: any = await api.post(`v1/projects/${projectUuid}/delete`, {})
    if(res.isSuccess){
      navigate('/projects');
    }
  };
  
  return (
    <div>
      {isEditting
        ? (
          <div className="pb-6">
            <input
              autoFocus
              ref={ inputRef }
              type="text"
              value={ title }
              onBlur={ handleBlur }
              onKeyDown={ enterBlur }
              onChange={ handleChange }
              className="text-xl text-gray-800 border border-gray-400 rounded-md py-1 px-2 max-w-full"
            />
          </div>
        )
        : (
          <Link
            to={`/project/${uuid}`}
            className="font-extrabold text-xl text-gray-800 pb-6 block"
            onContextMenu={ handleContextMenu }
          >
            { title }
          </Link>
        )
      }
      <ControlledMenu
        {...menuProps}
        anchorPoint={anchorPoint}
        onClose={() => toggleMenu(false)}
      >
        <MenuItem
          onClick={() => setIsEditting(true)}
        >
          プロジェクトのタイトルを編集
        </MenuItem>
        <MenuItem
          onClick={ handleClick }
        >
          プロジェクトを削除
        </MenuItem>
      </ControlledMenu>
    </div>
  );
};

export default SidebarHeader;