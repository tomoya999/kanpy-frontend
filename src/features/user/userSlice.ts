import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { refreshAPI } from '../../apis/account';
import { RootState } from '../../app/store';

type UserState = {
  accessToken: string
  status: string
  email: string
  uuid: string
}

const initialState: UserState = {
  accessToken: '',
  status: 'idle',
  email: '',
  uuid: '',
}

export const setAccessTokenAsync = createAsyncThunk(
  'user/setAccessTokenAsync',
  async () => {
    const res = await refreshAPI();
    return res.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action) => {
      return {
        ...state,
          ...action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAccessTokenAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setAccessTokenAsync.fulfilled, (state, action) => {
        const resData = action.payload;
        if(resData){
          state.status = 'idle';
          state.accessToken = action.payload.access_token;
        }else{
          state.status = 'rejected';
        }
      })
      .addCase(setAccessTokenAsync.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const { setAccessToken, setUser } = userSlice.actions;

export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectStatus = (state: RootState) => state.user.status;
export const selectUser = (state: RootState) => {
  return {
    email: state.user.email,
    uuid: state.user.uuid,
  }
}

export default userSlice.reducer;
