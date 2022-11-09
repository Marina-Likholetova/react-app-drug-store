import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../db/productsDb";

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        value: products,
    },
    reducer: {},
});

export default productsSlice.reducer;
