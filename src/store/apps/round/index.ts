import { RoundType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  round: {} as RoundType,
};

export const roundSlice = createSlice({
  name: "round",
  initialState,
  reducers: {
    storeRound: (state, action) => {
      state.round = action.payload;
    },

    updateRound: (state, action) => {
      state.round = action.payload;
    },
    deleteRound: (state) => {
      state.round = {} as RoundType;
    },
  },
});

export const { storeRound, updateRound, deleteRound } = roundSlice.actions;
