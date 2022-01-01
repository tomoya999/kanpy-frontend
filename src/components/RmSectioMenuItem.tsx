import { MenuItem } from "@szhsin/react-menu";
import React from "react";
import { useNavigate } from "react-router-dom";
import { rmSectionAPI } from "../apis/section";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { rmSection, selectProjectUuid } from "../features/project/projectSlice";

const RmSectioMenuItem = (props: any): JSX.Element => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const uuid: string = useAppSelector(selectProjectUuid);
  const { sectionuuid }: any = props;

  const handleClick = async(): Promise<void> => {
    const res: any = await rmSectionAPI({ sectionUuid: sectionuuid });
    if(res.isSuccess){
      dispatch(rmSection({ sectionUuid: sectionuuid }));
      navigate(`/project/${uuid}`);
    }
  }
  
  return (
    <MenuItem
      {...props}
      onClick={ handleClick }
    >
      セクションを削除
    </MenuItem>
  );
}

export default RmSectioMenuItem;