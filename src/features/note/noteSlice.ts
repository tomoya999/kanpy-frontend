import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


const initialBody: string = `
# タイトル1\n\n
## タイトル2\n\n
### タイトル3\n\n
#### タイトル4\n\n
##### タイトル5\n\n
###### タイトル6\n\n
おはよう\n\n
こんにちは\n\n
こんばんは\n\n
- 「#」はタイトル\n\n
- 「#」の後に、スペースを1つあけて、タイトルの文字を書く\n\n
- 「#」の個数で大きさが変わる（個数が多くなるほど小さくなる）\n\n

1. Lorem ipsum dolor sit amet\n\n
2. Consectetur adipiscing elit\n\n
3. Integer molestie lorem at massa\n\n
URL: [Just Python](https://just-python.com)\n\n

これはインラインの\`code\`です\n\n

\`\`\`js
alert("Hello World!");
\`\`\`
`

export interface NoteState {
  status: "idle" | "loading" | "failed";
  isEditting: boolean
  body: string
}

const initialState: NoteState = {
  status: "idle",
  isEditting: true,
  body: initialBody,
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const {  } = noteSlice.actions;

export const selectNote = (state: RootState): NoteState => state.note;

export default noteSlice.reducer;
