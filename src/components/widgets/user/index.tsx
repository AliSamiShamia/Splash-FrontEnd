import { Colors, Routes } from "@/components/constant";
import { post } from "@/handler/api.handler";
import { useAuth } from "@/hooks/useAuth";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

function UserForm() {
  const auth = useAuth();
  const [name, setName] = useState("");
  const handleLogin = async () => {
    if (name.trim() != "") {
      const userData = { name: name };
      // const res = await post(Routes.user.store, userData, null);
      // if (res && res.status_code == 200) {
      //   auth.setUser(res.data);
      // }
      auth.register(userData);
    } else {
      // clearUser();

      toast("Kindly provide your name to begin.");
    }
  };

  return (
    <Card
      sx={{
        height: { md: 500, xs: "auto" },
        backgroundColor: Colors.background,
        border: 1,
        borderRadius: 4,
        borderColor: Colors.border,
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Grid
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          flexDirection={"column"}
          height={"100%"}
        >
          <Typography sx={{ color: Colors.text }} variant="h5">
            Welcome
          </Typography>
          <Grid
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
            width={1}
          >
            <Typography variant="caption" sx={{ color: Colors.text_light }}>
              Please Insert Your Name
            </Typography>
            <Grid width={1} display={"flex"} gap={1} flexDirection={"column"}>
              <TextField
                value={name}
                variant="standard"
                placeholder="Enter Your Name"
                fullWidth
                inputProps={{
                  style: { color: Colors.white, padding: 12, fontSize: 16 },
                }}
                sx={{
                  backgroundColor: Colors.input_background,
                  color: "#fff",
                  borderRadius: 2,
                  boxShadow: Colors.shadow,
                  borderColor: Colors.border,
                }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Button
                fullWidth
                onClick={handleLogin}
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
                  Accept
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user.auth,
});

export default connect(mapStateToProps)(UserForm);
