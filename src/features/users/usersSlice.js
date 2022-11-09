import { createSlice } from "@reduxjs/toolkit";
import users from "../../db/usersDb";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        value: users,
    },
    reducers: {
        addNewUser: (state, action) => {
            const isUserExist = state.value.find(
                (el) => el.email === action.payload.email
            );

            if (!isUserExist) {
                state.value = [
                    ...state.value,
                    {
                        name: action.payload.name,
                        email: action.payload.email,
                        password: action.payload.password,
                        shoppingCarts: [],
                        orders: [],
                        status: false,
                    },
                ];
            }
        },
    },
});

export const { addNewUser } = usersSlice.actions;

export default usersSlice.reducer;