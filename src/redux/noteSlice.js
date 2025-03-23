import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    groups: JSON.parse(localStorage.getItem("groups")) || [],
    activeGroup: null,
    notes: JSON.parse(localStorage.getItem("notes")) || {},
  },
  reducers: {
    addGroup: (state, action) => {
      const newGroup = action.payload;
      const isDuplicate = state.groups.some(
        (group) => group.name === newGroup.name
      );
      if (!isDuplicate) {
        state.groups.push(newGroup);
        state.notes[newGroup.name] = [];
        localStorage.setItem("groups", JSON.stringify(state.groups));
        localStorage.setItem("notes", JSON.stringify(state.notes));
      }
    },
    setActiveGroup: (state, action) => {
      state.activeGroup = action.payload;
    },
    addNote: (state, action) => {
      const { groupName, noteText } = action.payload;
      if (groupName) {
        if (!state.notes[groupName]) {
          state.notes[groupName] = [];
        }
        const newNote = {
          text: noteText,
          timestamp: new Date().toISOString(),
        };
        state.notes[groupName].push(newNote);
        localStorage.setItem("notes", JSON.stringify(state.notes));
      }
    },
  },
});

export const { addGroup, setActiveGroup, addNote } = noteSlice.actions;
export default noteSlice.reducer;
