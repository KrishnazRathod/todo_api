import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
    name: 'mode',
    initialState: {
        color: 'dark'
    },
    reducers: {
        colorMode: (state) => {
            state.color = state.color === 'light' ? "dark" : "light";
        },
    },
})

export const { colorMode } = modeSlice.actions
export default modeSlice.reducer