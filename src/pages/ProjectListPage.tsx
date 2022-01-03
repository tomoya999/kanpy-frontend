import React, { useEffect, useState } from "react";
import { api } from "../apis/base";
import { ProjectFolder } from "../components";
import { AddProject } from "../widgets";

const ProjectListPage = (): JSX.Element => {

  const [projects, setProjects] = useState([]);
  const [unmounted, setUnmounted] = useState<boolean>(false);

  useEffect(() => {
    const setup = async(): Promise<void> => {
      const res: any = await api.get('/v1/projects');
      
      if(res.isSuccess){
        setProjects(res.data.projects);
      }
    };

    if(!unmounted){

      setup();
      
    }
    return () => {
      setUnmounted(true);
    }
  }, [unmounted]);
  
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-r from-violet-900 via-yellow-100 to-rose-300">
      <div className="border rounded-xl bg-white bg-opacity-90 p-20 h-auto w-4/6">
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-gray-600 font-sans text-center pb-8">
            プロジェクトを選択してください
          </div>
          <div className="grid grid-cols-4">
            {projects.map((project: any) => (
              <ProjectFolder project={ project } key={ project.uuid } />
            ))}
            <AddProject projects={ projects } setProjects={ setProjects } />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectListPage;