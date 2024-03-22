import { Colors } from "@/components/constant";
import { useAuth } from "@/hooks/useAuth";
import { updateRound } from "@/store/apps/round";
import { useAppSelector } from "@/store/hooks";
import { Box, Grid, Slider, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const marks = [
  {
    value: 0,
    label: "1x",
  },
  {
    value: 25,
    label: "2x",
  },
  {
    value: 50,
    label: "3x",
  },
  {
    value: 75,
    label: "4x",
  },
  {
    value: 100,
    label: "5x",
  },
];

function valuetext(value: number) {
  return `${value}x`;
}
function Speed() {
  const dispatch = useDispatch();
  const round = useAppSelector((state) => state.round.round);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      dispatch(updateRound({ ...round, speed: newValue }));
    }
  };

  return (
    <Grid container>
      <Grid display={"flex"} alignItems={"center"} gap={2} p={1}>
        <Box
          src={"/static/images/quick.png"}
          component={"img"}
          width={25}
          alt="Icon"
        />
        <Typography
          textAlign={"center"}
          fontWeight={"bold"}
          color={Colors.white}
          variant="subtitle1"
        >
          Speed
        </Typography>
      </Grid>
      <Slider
        aria-label="Speed"
        defaultValue={25}
        getAriaValueText={valuetext}
        onChange={handleChange}
        step={25}
        min={0}
        max={100}
        valueLabelDisplay="off"
        marks={marks}
        sx={{
          color: Colors.textColored,
          "& .MuiSlider-markLabel": { color: Colors.textColored },
        }} // Change color to blue
      />
    </Grid>
  );
}

export default Speed;
