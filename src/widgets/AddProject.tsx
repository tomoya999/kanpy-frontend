import { FolderAddIcon } from "@heroicons/react/outline";
import React from "react";
import { api } from "../apis/base";

const AddProject = ({projects, setProjects}: any): JSX.Element => {

  const handleClick = async(): Promise<void> => {
    const res: any = await api.post('/v1/projects', {});
    if(res.isSuccess){
      setProjects([
        ...projects,
        res.data.project,
      ]);
    }
  };
  
  return (
    <div className="flex" onClick={ handleClick }>
      <div className="text-blue-500 hover:text-blue-200 basis-full">
        <div className="flex flex-col justify-center items-center">
          <div className="w-20">
            <FolderAddIcon />
          </div>
          <div className="text-center">
            追加する
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;