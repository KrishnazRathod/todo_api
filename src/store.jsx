import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo/todoSlice";
import todosSlice from "./todo/todosSlice";
import modeSlice from "./colorMode/modeSlice";

const rootReducer = combineReducers({
    todoSlice,
    modeSlice,
    todosSlice
})

const Store = configureStore({reducer: rootReducer});

export default Store;