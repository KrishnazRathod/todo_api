import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todo: []
    },
    reducers: {
        addtodo: (state, action) => {
            state.todo.push(action.payload)
        },

        deletetodo: (state, action) => {
            const indexToDelete = action.payload;
            state.todo = state.todo.filter((_, index) => index !== indexToDelete)
            //    const copyArray = [...state.todo];
            //    copyArray.splice(action.payload,1);
            //    state.todo = JSON.parse(JSON.stringify(copyArray))
        },

        edittodo: (state, action) => {
            state.todo[action.payload.id] = action.payload.values;
        },
        updatetodo: (state, action) => {
            const { id } = action.payload;
            const checkBoxItem = state.todo.find((item) => item.id === id);
            if (checkBoxItem) {
                checkBoxItem.completed = !checkBoxItem.completed;
            }
        },
    }
})

export const { addtodo, deletetodo, edittodo, updatetodo } = todoSlice.actions

export default todoSlice.reducer