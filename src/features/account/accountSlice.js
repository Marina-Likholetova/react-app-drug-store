import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: "account",
    initialState: {
        value: {
            name: "",
            email: "",
            status: false,
            shoppingCarts: [],
            orders: []
        }
    },
    reducers: {
        logout: (state) => {
            state.value = {
                name: "",
                email: "",
                status: false,
                shoppingCarts: [],
                orders: []
            }
        },

        incrementByAmount: (state, action) => {
            let card = state.value.shoppingCarts.find(item => +item.id === +action.payload.id);
            if (card) {
                const newCard = {...card, count: +card.count + +action.payload.count}
                state.value.shoppingCarts = [...state.value.shoppingCarts.filter(item => +item.id !== +action.payload.id), newCard]
            } else {
                state.value.shoppingCarts = [...state.value.shoppingCarts, action.payload]
            } 
        },

        removeShoppingCart: (state, action) => {
            state.value.shoppingCarts = [...state.value.shoppingCarts.filter(item => +item.id !== +action.payload)]
        },

        increment: (state, action) => {
            let card = state.value.shoppingCarts.find(item => +item.id === +action.payload);
            const newCard = { ...card, count: +card.count + 1 }
            state.value.shoppingCarts = [...state.value.shoppingCarts.filter(item => +item.id !== +action.payload), newCard]
        },

        decrement: (state, action) => {
            let card = state.value.shoppingCarts.find(item => +item.id === +action.payload);
            const newCard = { ...card, count: +card.count - 1 }
            state.value.shoppingCarts = [...state.value.shoppingCarts.filter(item => +item.id !== +action.payload), newCard]
        },

        login: (state, action) => {
            state.value = {
                name: action.payload.name,
                email: action.payload.email,
                shoppingCarts: action.payload.shoppingCarts,
                status: true,
                orders: action.payload.orders
            }
        }
    }
})

export const { login, logout, incrementByAmount, increment, decrement, removeShoppingCart } = accountSlice.actions;

export default accountSlice.reducer;