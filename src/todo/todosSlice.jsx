    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
    import axios from "axios"

    const initialState = {
        todos: [],
        loading: false,
        error: null,
    }

    export const getTodo = createAsyncThunk("getTodo", async () => {
        console.log('getTodo called')
        try {
            const response = await axios.get('https://65c1f6e6f7e6ea59682a2af8.mockapi.io/todo');
            return response.data;
        } catch (error) {
            throw error;
        }
    });

    export const createTodo = createAsyncThunk("createTodo", async (values) => {
        console.log('createtodo called')

        try {
            const response = await axios.post('https://65c1f6e6f7e6ea59682a2af8.mockapi.io/todo', values);
            return response.data;
        } catch (error) {
            throw error;
        }
    });

    export const editTodo = createAsyncThunk("editTodo", async ({ editId, obj }) => {
        console.log('editTodo', editId, obj)
        try {
            const response = await axios.put(`https://65c1f6e6f7e6ea59682a2af8.mockapi.io/todo/${editId}`, obj);
            return response.data;
        } catch (error) {
            throw error;
        }
    });

    export const checkTodo = createAsyncThunk("checkTodo", async ({ id, completed }) => {
        console.log('checkTodo', id, completed)
        try {
            const url = `https://65c1f6e6f7e6ea59682a2af8.mockapi.io/todo/${id}`;
            const response = await axios.get(url);
            const updateTodo = { ...response.data, completed: !completed };
            await axios.put(url, updateTodo)
            return updateTodo;
        } catch (error) {
            throw error;
        }
    });

    export const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
        console.log('getTodo called')
        try {
            await axios.delete(`https://65c1f6e6f7e6ea59682a2af8.mockapi.io/todo/${id}`);
            return id;
        } catch (error) {
            throw error;
        }
    });
    const todosSlice = createSlice({
        name: "todos",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(getTodo.pending, (state) => {
                state.loading = true;
            });
            builder.addCase(getTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = [...action.payload];
            });
            builder.addCase(getTodo.rejected, (state) => {
                state.loading = false;
            });

            // builder.addCase(createTodo.pending,(state)=> {
            //     state.loading = true;
            // });
            // builder.addCase(createTodo.fulfilled,(state,action)=> {
            //     state.loading = false;
            //     state.todos.push([...action.payload]);
            //     console.log("state todos",JSON.parse(JSON.stringify(state.todos)));
            // });
            // builder.addCase(createTodo.rejected,(state)=> {        
            //     state.loading = false;
            // });

            builder.addCase(editTodo.pending, (state) => {
                state.loading = true;
            });
            builder.addCase(editTodo.fulfilled, (state, action) => {
                state.loading = false;
                console.log('action.payload', action.payload)
                const { id, title, task, color, priority, date } = action.payload;
                state.todos = state.todos.map((item) => {
                    return item.id === id ? { ...item, title, task, color, priority, date } : item;
                });

            });
            builder.addCase(editTodo.rejected, (state) => {
                state.loading = false;
            });


            builder.addCase(checkTodo.pending, (state) => {
                state.loading = true;
            });
            builder.addCase(checkTodo.fulfilled, (state, action) => {
                state.loading = false;
                const updateTodos = state.todos.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, completed: !item.completed }
                    }
                    return item;
                })
                state.todos = updateTodos;
            });
            builder.addCase(checkTodo.rejected, (state) => {
                state.loading = false;
            });

            builder.addCase(deleteTodo.pending, (state) => {
                state.loading = true;
            });
            builder.addCase(deleteTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.filter((item) => item.id !== action.payload);
            });
            builder.addCase(deleteTodo.rejected, (state) => {
                state.loading = false;
            });
        }
    });

    export default todosSlice.reducer