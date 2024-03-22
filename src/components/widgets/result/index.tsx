import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Item from "./item";
import { useAuth } from "@/hooks/useAuth";

function Result() {
  const auth = useAuth();
  const [time, setTime] = useState("0:00");
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.getHours().toString().padStart(2, "0") +
          ":" +
          now.getMinutes().toString().padStart(2, "0")
      );
    };
    // Update time immediately
    updateClock();

    // Set interval to update time every minute
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item md={4}>
        <Item
          icon={"/static/images/medal.png"}
          value={auth.user?.score?.toString() ?? "0"}
        />
      </Grid>
      <Grid item md={4}>
        <Item icon={"/static/images/man.png"} value={auth.user?.name ?? ""} />
      </Grid>
      <Grid item md={4}>
        <Item icon={"/static/images/clock.png"} value={time} />
      </Grid>
    </Grid>
  );
}

export default Result;
