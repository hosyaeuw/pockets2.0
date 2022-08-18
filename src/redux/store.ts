import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./slices/categories";
import transactions from "./slices/transactions";
import globalTransactions from "./slices/globalTransactions";
import goals from "./slices/goals";
import storage from "redux-persist/lib/storage";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const reducersObj = {
    categories,
    transactions,
    globalTransactions,
    goals,
};

const reducers = combineReducers(reducersObj);

const persistConfig = {
    key: "@app",
    storage,
    whitelist: Object.keys(reducersObj),
    version: 0,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
