import { GuessType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guess: {} as GuessType,
};

export const guessSlice = createSlice({
  name: "guess",
  initialState,
  reducers: {
    storeGuess: (state, action) => {
      state.guess = action.payload;
    },

    updateGuess: (state, action) => {
      state.guess = action.payload;
    },
    deleteGuess: (state) => {
      state.guess = {} as GuessType;
    },
  },
});

export const { storeGuess, updateGuess, deleteGuess } = guessSlice.actions;
