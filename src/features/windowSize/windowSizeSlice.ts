import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export interface WindowSizeState {
  width: string
  height: string
}

const initialState: WindowSizeState = {
  width: window.innerWidth.toString(),
  height: window.innerHeight.toString(),
};

export const windowSizeSlice = createSlice({
  name: 'windowSize',
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<string>) => {
      return {
        ...state,
          width: action.payload,
      };
    },
    setHeight: (state, action: PayloadAction<string>) => {
      return {
        ...state,
          height: action.payload,
      };
    },
  },
});

export const { setWidth, setHeight } = windowSizeSlice.actions;

export const selectWindowSize = (state: RootState) => state.windowSize;

export const selectWindowWidth = (state: RootState) => state.windowSize.width;

export const selectWindowHeight = (state: RootState) => state.windowSize.height;

export default windowSizeSlice.reducer;
