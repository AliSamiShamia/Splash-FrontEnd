import { Colors, Routes } from "@/components/constant";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import RoundItem from "./item";
import CurrentRound from "./current";
import { storeRound, updateRound } from "@/store/apps/round";
import { useDispatch } from "react-redux";
import { RankingType } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { io } from "socket.io-client";
import Speed from "./speed";
import { useAppSelector } from "@/store/hooks";

function Round({ data }: RankingType) {
  const dispatch = useDispatch();
  const round = useAppSelector((state) => state.round.round);
  const [points, setPoints] = useState(50);
  const [multiplier, setMultiplier] = useState(1.0);

  const start = () => {
    if (points > 0 && multiplier > 0) {
      dispatch(
        updateRound({
          ...round,
          points: points,
          multiplier: multiplier,
        })
      );
    }
  };

  return (
    <Card
      sx={{
        minHeight: { md: 500, xs: "auto" },
        backgroundColor: Colors.transparent,
        borderRadius: 4,
        borderColor: Colors.border,
      }}
      elevation={0}
    >
      <CardContent sx={{ height: "100%" }}>
        <Grid
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          height={"100%"}
          gap={2}
        >
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <RoundItem
                title={"Points"}
                value={points}
                step={25}
                action={setPoints}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <RoundItem
                title={"Multiplier"}
                value={multiplier}
                step={0.15}
                action={setMultiplier}
              />
            </Grid>
          </Grid>
          <Grid
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
            width={1}
          >
            <Button
              fullWidth
              onClick={start}
              sx={{
                color: Colors.white,
                py: 1,

                background: "linear-gradient(to left, #ff9999, #cc3333)",
              }}
            >
              <Typography
                color={Colors.white}
                textTransform={"capitalize"}
                variant="subtitle1"
              >
                Start
              </Typography>
            </Button>
          </Grid>
          <Grid
            display={"flex"}
            flexDirection={"column"}
            // justifyContent={"center"}
            alignItems={"center"}
            gap={1}
            width={1}
            minHeight={200}
          >
            <CurrentRound data={data} />
          </Grid>
          <Grid
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
            width={1}
          >
            <Speed />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user.auth,
});

export default connect(mapStateToProps)(Round);
