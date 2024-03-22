import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { userSlice } from "./apps/user";
import { roundSlice } from "./apps/round";
import { guessSlice } from "./apps/guess";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);
const persistedRoundReducer = persistReducer(persistConfig, roundSlice.reducer);
const persistedGuessReducer = persistReducer(persistConfig, guessSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    round: persistedRoundReducer,
    guess: persistedGuessReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
