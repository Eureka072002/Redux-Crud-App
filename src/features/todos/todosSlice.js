import { createSlice } from "@reduxjs/toolkit";
import { userList } from "../../Data";

const todosSlice = createSlice({
    name: 'users',
    initialState: userList,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        },
        updateUser: (state, action) => {
            const { id, name, email } = action.payload;
            const existingUser = state.find(user => user.id === id);
            if (existingUser) {
                existingUser.name = name;
                existingUser.email = email;
            }
        },
        deleteUser: (state, action) => {
            return state.filter(user => user.id !== action.payload);
        }
    }
})

export const { addUser, updateUser, deleteUser } = todosSlice.actions;
export default todosSlice.reducer;
