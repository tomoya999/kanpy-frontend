import { FolderIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";

const ProjectFolder = ({ project }: any): JSX.Element => {

  return (
    <div className="flex">
      <Link to={`/project/${project.uuid}`} className="text-gray-500 hover:text-blue-200 basis-full">
        <div className="flex flex-col justify-center items-center">
          <div className="w-20">
            <FolderIcon />
          </div>
          <div className="text-center">
            { project.title }
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectFolder;