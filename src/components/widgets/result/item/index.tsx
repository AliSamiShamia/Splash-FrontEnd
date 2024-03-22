import { Colors } from "@/components/constant";
import { ItemType } from "@/types";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

function Item({ icon, value }: ItemType) {
  return (
    <Grid
      display={"flex"}
      alignItems={"center"}
      p={1.5}
      borderRadius={2}
      sx={{
        background:
          "linear-gradient(to right, #171b21, #181c22, #181d23, #191e25, #191f26, #1a2027, #1a2029, #1b212a, #1c222c, #1d232e, #1e232f, #1f2431)",
      }}
    >
      <Box src={icon} component={"img"} width={30} alt="Icon" />
      <Typography width={1} textAlign={"center"} fontWeight={"bold"} color={Colors.white} variant="h6">{value}</Typography>
    </Grid>
  );
}

export default Item;
