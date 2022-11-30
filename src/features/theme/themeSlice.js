import { createSlice } from "@reduxjs/toolkit"

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: "light",
    },
    reducers: {
        toggleTheme: (state) => {
            switch (state.mode) {
                case ("light"):
                    state.mode = "dark";
                    break;
                case ("dark"):
                    state.mode = "light";
                    break;
                default:
            }
        }
    }
})

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;