import React, { useRef } from "react";

const useEnterBlur = () => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const enterBlur = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if(e.keyCode === 13) {
      inputRef.current.blur();
    }
  };

  return { inputRef, enterBlur}
}

export default useEnterBlur;