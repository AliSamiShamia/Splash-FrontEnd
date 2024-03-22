import { RoundItemType } from "@/types";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Colors } from "@/components/constant";
function RoundItem({ title, value, step, action }: RoundItemType) {
  return (
    <Grid
      sx={{
        backgroundColor: Colors.background,
        border: 1,
        borderColor: Colors.cardBackground,
        borderRadius: 2,
        pb: 0.7,
      }}
    >
      <Grid display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography
          variant="caption"
          fontSize={10}
          textAlign={"center"}
          color={Colors.text}
        >
          {title}
        </Typography>
      </Grid>
      <Grid
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={0.6}
      >
        <Grid>
          <IconButton
            onClick={() => {
              action(value - step);
            }}
            aria-label="decrease"
            size="small"
            sx={{
              border: 1,
              borderRadius: 2,
              borderColor: Colors.border,
              p: 0,
            }}
          >
            <ArrowDropDownIcon sx={{ color: Colors.white }} />
          </IconButton>
        </Grid>
        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Box
            sx={{
              border: 1,
              borderRadius: 2,
              borderColor: Colors.cardBackground,
              backgroundColor: Colors.cardBackground,
              width: 70,
              px: 1,
            }}
          >
            <Typography
              textAlign={"center"}
              variant="subtitle1"
              color={Colors.white}
            >
              {value}
            </Typography>
          </Box>
        </Grid>
        <Grid>
          <IconButton
            onClick={() => {
              action(value + step);
            }}
            aria-label="increase"
            size="small"
            sx={{
              border: 1,
              borderRadius: 2,
              borderColor: Colors.border,
              p: 0,
            }}
          >
            <ArrowDropUpIcon sx={{ color: Colors.white }} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RoundItem;
