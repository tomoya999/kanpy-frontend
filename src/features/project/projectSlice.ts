import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

// export interface ProjectState {
//   value: number;
//   status: "idle" | "loading" | "failed";
// }

const initialState = {
  status: "idle",
  sections: [],
  title: '',
  uuid: ''
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<any>) => {
      const { project } = action.payload;
      project.sections = project.sections.map((section: any) => {
        return {
          ...section,
            isActive: false,
        };
      })
      return {
        ...state,
          ...project,
      };
    },
    setProjectTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    toggleIsActive: (state, action: PayloadAction<any>) => {
      const { uuid }: any = action.payload;
      let section: any = state.sections.find((section: any) => section.uuid === uuid);
      section.isActive = !section.isActive
    },
    setNoteBody: (state, action: PayloadAction<any>) => {
      const { sectionUuid, noteUuid, newBody }: any = action.payload;
      let note = getNote({state, sectionUuid, noteUuid})
      note.body = newBody
    },
    setNoteTitle: (state, action: PayloadAction<any>) => {
      const { sectionUuid, noteUuid, newTitle }: any = action.payload;
      let note = getNote({state, sectionUuid, noteUuid})
      note.title = newTitle
    },
    addNote: (state, action: PayloadAction<any>) => {
      const { sectionUuid, note }: any = action.payload;
      let section = getSection({ state, sectionUuid });
      section.notes = [
        ...section.notes,
        note
      ];
    },
    addSection: (state, action: PayloadAction<any>): any => {
      const { newSection }: any = action.payload;
      return {
        ...state,
          sections: [
            ...state.sections,
            newSection,
          ]
      }
    },
    rmNote: (state, action: PayloadAction<any>) => {
      const { sectionUuid, noteUuid }: any = action.payload;
      let section = getSection({ state, sectionUuid });
      section.notes = section.notes.filter((note: any) => {
        return note.uuid !== noteUuid
      });
    },
    setSectionName: (state, action: PayloadAction<any>) => {
      const { sectionUuid, newTitle }: any = action.payload;
      let section = getSection({ state, sectionUuid });
      section.title = newTitle;
    },
    rmSection: (state, action: PayloadAction<any>) => {
      const { sectionUuid }: any = action.payload;
      return {
        ...state,
          sections : state.sections.filter((section: any) => section.uuid !== sectionUuid),
      }
    },
  },
});

const getSection = ({ state, sectionUuid }: any) => {
  return state.sections.find((section: any) => {
    return section.uuid === sectionUuid
  });
};

const getNote = ({ state, sectionUuid, noteUuid }: any) => {
  const section: any = getSection({ state, sectionUuid });
  return section.notes.find((note: any) => note.uuid === noteUuid);
};

export const {
  setProject,
  toggleIsActive,
  setNoteBody,
  setNoteTitle,
  setSectionName,
  rmSection,
  addNote,
  rmNote,
  addSection,
  setProjectTitle,
} = projectSlice.actions;

export const selectProject = (state: RootState): any => state.project;

export const selectSections = (state: RootState): any => state.project.sections;

export const selectSectionByNoteUuid = (state: RootState, noteUuid: string): any => {
  let selectedSection;
  state.project.sections.forEach((section: any) => {
    section.notes.forEach((note: any) => {
      if(note.uuid === noteUuid){
        selectedSection = section
      }
    });
  });
  return selectedSection;
};

export const selectNote = (
    state: RootState, sectionUuid: string, noteUuid: string
  ): any => {
    
  const section: any = state.project.sections.find((section: any) => {
    return section.uuid === sectionUuid
  });
  
  return section?.notes
    ? section.notes.find((note: any) => note.uuid === noteUuid)
    : {}
};

export const selectProjectTitle = (state: RootState): string => state.project.title;
export const selectProjectUuid = (state: RootState): string => state.project.uuid;

export default projectSlice.reducer;
