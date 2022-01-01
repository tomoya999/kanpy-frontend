import { AxiosResponse } from "axios";
import { api } from "../base";

type UpdateNoteTitleArg = {
  noteUuid: string
  title: string
};

type UpdateNoteBodyArg = {
  noteUuid: string
  body: string
};

type CreateNoteBodyArg = {
  sectionUuid: string
};

const updateNoteTitleAPI = async({ noteUuid, title }: UpdateNoteTitleArg): Promise<AxiosResponse> => {
  const url = `/v1/notes/${noteUuid}/update_title`;
  const param = { title };
  return await api.post(url, param);
};

const updateNoteBodyAPI = async({ noteUuid, body }: UpdateNoteBodyArg): Promise<AxiosResponse> => {
  const url = `/v1/notes/${noteUuid}/update_body`;
  const param = { body };
  return await api.post(url, param);
};

const rmNoteAPI = async({ noteUuid }: any): Promise<AxiosResponse> => {
  const url = `/v1/notes/${noteUuid}/delete`;
  const param = {};
  return await api.post(url, param);
};

const createNoteAPI = async({ sectionUuid }: CreateNoteBodyArg): Promise<AxiosResponse> => {
  const url = `/v1/section/${sectionUuid}/note/create`;
  const param = {};
  return await api.post(url, param);
};

export { updateNoteTitleAPI, updateNoteBodyAPI, createNoteAPI, rmNoteAPI };