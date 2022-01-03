import React from "react";
import { updateSectionTitleAPI } from "../apis/section";
import { useAppDispatch } from "../app/hooks";
import { setSectionName } from "../features/project/projectSlice";
import { useEnterBlur } from "../hooks/windowSize";

const SectionTitleInput = ({ section, toggleIsEditting }: any): JSX.Element => {
  
  const dispatch = useAppDispatch();
  const { inputRef, enterBlur } = useEnterBlur();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = {
      sectionUuid: section.uuid,
      newTitle: e.target.value
    };
    dispatch(setSectionName(payload));
  };

  const handleBlur = async(e: React.FocusEvent<HTMLInputElement>): Promise<void> => {
    const param = {
      sectionTitle: e.target.value,
      sectionUuid: section.uuid,
    }
    const res: any = await updateSectionTitleAPI(param);
    if(res.isSuccess){
      toggleIsEditting();
    }
  };

  return (
    <input
      autoFocus
      ref={ inputRef }
      type="text"
      value={ section.title }
      onKeyDown={ enterBlur }
      onChange={ handleChange }
      onBlur={ handleBlur }
      className="text-xl border border-gray-400 rounded-md py-1 px-2 max-w-full"
    />
  );
};

export default SectionTitleInput;