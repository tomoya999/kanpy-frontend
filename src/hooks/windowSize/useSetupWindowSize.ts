import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectWindowSize, setHeight, setWidth, WindowSizeState } from "../../features/windowSize/windowSizeSlice";


const useSetupWindowSize = () => {

  const windowSize: WindowSizeState = useAppSelector(selectWindowSize);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const handleResize = () => {
      const innerHeight = window.innerHeight.toString();
      const innerWidth = window.innerWidth.toString();
      if(windowSize.height !== innerHeight){
        dispatch(setHeight(innerHeight));
      }
      if(windowSize.width !== innerWidth){
        dispatch(setWidth(innerWidth));
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useSetupWindowSize;