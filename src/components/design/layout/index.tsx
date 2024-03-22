import { useAuth } from "@/hooks/useAuth";
import { storeUser } from "@/store/apps/user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LayoutProp } from "@/types";
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children }: LayoutProp) {
  const auth = useAppSelector((state) => state.user.auth);
  const context = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (document.readyState === "complete") {
      if (context.user && !auth.id) {
        if (context.user) {
          dispatch(storeUser(context.user));
        } else {
          context.setUser(auth);
        }
      }
    }
  }, []);

  return (
    <Grid
      display={"flex"}
      width={"100vw"}
      minHeight={"100vh"}
      py={2}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ background: "#0e0e0e" }}
    >
      {children}
      <ToastContainer />
    </Grid>
  );
}

export default Layout;
