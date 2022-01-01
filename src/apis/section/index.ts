import { AxiosResponse } from "axios";
import { api } from "../base";

type rmSectionAPIArg = {
  sectionUuid: string
};

type updateSectionTitleAPIArg = {
  sectionUuid: string
  sectionTitle: string
};

type createSectionAPIArg = {
  projectUuid: string
};

const rmSectionAPI = async({ sectionUuid }: rmSectionAPIArg): Promise<AxiosResponse> => {
  const url = `/v1/sections/${sectionUuid}/delete`;
  const param = {};
  return await api.post(url, param);
};

const updateSectionTitleAPI = async({ sectionUuid, sectionTitle }: updateSectionTitleAPIArg): Promise<AxiosResponse> => {
  const url = `/v1/sections/${sectionUuid}/update_title`;
  const param = { sectionTitle };
  return await api.post(url, param);
};

const createSectionAPI = async({ projectUuid }: createSectionAPIArg): Promise<AxiosResponse> => {
  const url = `/v1/projects/${projectUuid}/section/create`;
  const param = {};
  return await api.post(url, param);
};

export { rmSectionAPI, updateSectionTitleAPI, createSectionAPI };