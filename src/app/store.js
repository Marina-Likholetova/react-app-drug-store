import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";


import accountSlice from '../features/account/accountSlice';
import productsSlice from "../features/products/productsSlice";
import usersSlice from "../features/users/usersSlice";
import themeSlice from "../features/theme/themeSlice";


    const persistConfig = {
        key: "root",
        storage,
    };

    const rootReducer = combineReducers({
        account: accountSlice,
        products: productsSlice,
        users: usersSlice,
        theme: themeSlice
    });

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    export const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

    });
    export const persistor = persistStore(store);

