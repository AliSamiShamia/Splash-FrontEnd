import { Colors } from "@/components/constant";
import Layout from "@/components/design/layout";
import GuessChart from "@/components/widgets/chart";
import Chat from "@/components/widgets/chat";
import Ranking from "@/components/widgets/rank";
import Result from "@/components/widgets/result";
import Round from "@/components/widgets/round";
import UserForm from "@/components/widgets/user";
import { useAuth } from "@/hooks/useAuth";
import { storeUser } from "@/store/apps/user";
import { RankingItemType } from "@/types";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { io } from "socket.io-client";

function Home() {
  const auth = useAuth();
  const [round, setRound] = useState<RankingItemType[]>([]);
  const [ranking, setRanking] = useState<RankingItemType[]>([]);
  const socket = io(process.env.socketIO ?? "", {
    transports: ["websocket"],
  });
  useEffect(() => {
    if (auth.user) {
      // socket.emit("rounds", { user_id: auth.user.id });

      socket.on("rounds", (data: any) => {
        let rounds = [] as RankingItemType[];
        let ranks = [] as RankingItemType[];
        data?.data.map((item: any, key: number) => {
          rounds.push({
            id: key + 1,
            name: item.user.name,
            points: item.points,
            multiplier: item.multiplier,
            score: item.score,
          });
        });
        ranks = rounds;
        setRound(rounds);
        setRanking(ranks.sort((a: any, b: any) => b.score - a.score));
        auth.setUser({ ...auth.user, score: data.score ?? 0 });
      });
    }
    return () => {
      socket.close();
    };
  }, [auth.user]);

  useEffect(() => {
    if (auth.user) {
      socket.emit("rounds", { user_id: auth.user.id });
    }
    return () => {
      socket.close();
    };
  }, []);
  return (
    <Layout>
      <Grid
        container
        border={1}
        borderColor={Colors.border}
        height={"100%"}
        maxWidth={"lg"}
        spacing={2}
        sx={{ backgroundColor: Colors.cardBackground }}
      >
        <Grid item md={4} xs={12}>
          {auth.user ? <Round data={round} /> : <UserForm />}
        </Grid>
        <Grid item md={8} xs={12}>
          <Result />
          <GuessChart />
        </Grid>

        <Grid mt={2} item md={7} xs={12}>
          <Ranking data={ranking} />
        </Grid>
        <Grid mt={3} item md={5} xs={12}>
          <Chat />
        </Grid>
      </Grid>
    </Layout>
  );
}
const mapStateToProps = (state: any) => ({
  user: state.user.auth,
});

export default connect(mapStateToProps)(Home);
