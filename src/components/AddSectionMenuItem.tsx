import { MenuItem } from "@szhsin/react-menu";
import React from "react";
import { useParams } from "react-router-dom";
import { createSectionAPI } from "../apis/section";
import { useAppDispatch } from "../app/hooks";
import { addSection } from "../features/project/projectSlice";


const AddSectionMenuItem = (props: any): JSX.Element => {

  const { projectUuid }: any = useParams();
  const dispatch = useAppDispatch()

  const handleClick = async() => {
    const res: any = await createSectionAPI({ projectUuid });
    if(res.isSuccess){
      dispatch(addSection({newSection: res.data.section}))
    }
  };
  
  return (
    <MenuItem
      {...props}
      onClick={ handleClick }
    >
      セクションを追加
    </MenuItem>
  );
}

export default AddSectionMenuItem;