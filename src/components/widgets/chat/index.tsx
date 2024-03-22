import { Colors } from "@/components/constant";
import { useAuth } from "@/hooks/useAuth";
import { MessageType } from "@/types";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

function Chat() {
  const auth = useAuth();
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
  const socket = io(process.env.socketIO ?? "", {
    transports: ["websocket"],
  });

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = () => {
    if (message) {
      socket.emit("send-msg", { msg: message, token: auth.user?.token });
      setMessage("");
    }
  };

  useEffect(() => {
    if (auth.user) {
      socket.emit("prev-chat", { message: "Hello from client!" });

      socket.on("chats", (data) => {
        const chats = data.chats;
        const messagesList = chats.map((item: any) => ({
          msg: item.msg,
          name: item.user.name,
        }));
        setChatMessages(messagesList);
      });
    }
    return () => {
      socket.close();
    };
  }, [auth.user]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <Grid mx={1}>
      <Grid display={"flex"} alignItems={"center"} gap={2} p={1}>
        <Box
          src={"/static/images/chat.png"}
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
          Chat
        </Typography>
      </Grid>
      <Paper
        elevation={3}
        style={{
          padding: 16,
          // marginTop: 16,
          backgroundColor: Colors.chatBackground,
          borderRadius: 4,
        }}
      >
        <Box
          ref={chatBoxRef}
          sx={{
            overflowY: "auto",
            height: 120,
            width: 1,
            justifyContent: "flex-end",
            pb: 1,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888", // Change scrollbar thumb color
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555", // Change scrollbar thumb color on hover
            },
          }}
        >
          {chatMessages.map((chat, key) => (
            <Grid key={key} display={"flex"} gap={1} alignItems={"center"}>
              <Typography
                variant="subtitle2"
                style={{ color: Colors.textColored }}
              >
                {chat.name}:
              </Typography>
              <Typography variant="caption" style={{ color: Colors.white }}>
                {chat.msg}
              </Typography>
            </Grid>
          ))}
        </Box>
        <Grid display={"flex"} alignItems={"center"} gap={1}>
          <TextField
            variant="standard"
            fullWidth
            value={message}
            size="small"
            onChange={handleMessageChange}
            placeholder="Message"
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
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            sx={{
              color: Colors.white,
              width: 150,
              p: 0,
              height: 32,
              background: "linear-gradient(to right, #ff9999, #cc3333,#cc3333)",
            }}
          >
            Start
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user.auth,
});

export default connect(mapStateToProps)(Chat);
