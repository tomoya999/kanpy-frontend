import { MenuItem } from "@szhsin/react-menu";
import React from "react";

const EditSectionNameMenuItem = (props: any): JSX.Element => {
  return (
    <MenuItem
      {...props}
      onClick={ props.onClick }
    >
      セクションの名前を変更
    </MenuItem>
  );
}

export default EditSectionNameMenuItem;