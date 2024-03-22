import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
} from "chart.js";
import { connect } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { Colors } from "@/components/constant";
import { useDispatch } from "react-redux";
import { storeGuess } from "@/store/apps/guess";
import { io } from "socket.io-client";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const socket = io(process.env.socketIO ?? "", {
  transports: ["websocket"],
});
const GuessChart = (props: any) => {
  const auth = useAuth();
  const round = useSelector((state: any) => state.round.round);
  const guess = useSelector((state: any) => state.guess.value);
  const dispatch = useDispatch();
  const [multiplier, setMultiplier] = useState("0.0");
  const [complete, setComplete] = useState(false);
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        data: [],
        fill: true,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  });

  const generateData = () => {
    const labels: string[] = [];
    const data: number[] = [];
    const step = 0.4;
    const peakValue = Math.random() * 10;
    let i = 0;

    const addDataPoint = () => {
      if (i <= peakValue) {
        labels.push(i.toFixed(1));
        const y = Math.exp(i) * 0.01; // Change the formula here

        data.push(y);
        const guess = i.toFixed(2);
        dispatch(storeGuess(guess));
        setMultiplier(guess);

        const totalDataPoints = data.length;
        const pointBackgroundColors = data.map((_, index) => {
          return index === totalDataPoints - 1
            ? "orange"
            : Colors.cardBackground;
        });
        const pointRadius = data.map((_, index) => {
          return index === totalDataPoints - 1 ? 8 : 0;
        });
        setChartData({
          ...chartData,
          labels: labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: data,
              tension: 0.5,

              pointBackgroundColor: pointBackgroundColors,
              pointRadius: pointRadius,
              borderColor: "#fd5553",
            },
          ],
        });

        i += step;
        requestAnimationFrame(addDataPoint);
      } else {
        setComplete(!complete);
      }
    };
    addDataPoint();
  };
  useEffect(() => {
    if (props.round.points) {
      generateData();
    }
  }, [props.round]);

  useEffect(() => {
    emit();
  }, [complete]);
  const emit = () => {
    if (parseFloat(multiplier) > 0) {
      const score = round.points * round.multiplier;
      const earn =
        round.multiplier <= parseFloat(multiplier)
          ? round.multiplier == parseFloat(multiplier)
            ? score
            : score - 100
          : 0;

      socket.emit("round", {
        user_id: auth.user?.id,
        points: round.points,
        multiplier: round.multiplier,
        guess: parseFloat(multiplier),
        score: earn,
      });
    }
  };

  return (
    <Grid position={"relative"}>
      <Grid
        zIndex={1}
        sx={{ backgroundColor: Colors.overly }}
        position={"absolute"}
        top={0}
        left={0}
        bottom={0}
        right={0}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography color={Colors.white} variant="h3">
          {multiplier + "x"}
        </Typography>
      </Grid>
      <Line
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
          interaction: {
            intersect: false,
          },
          animation: {
            duration: 300, // Adjust duration as needed
            easing: "linear",

            onProgress: (animation) => {
              const chartInstance = animation.chart;
              chartInstance.update();
            },
          },

          scales: {
            x: {
              type: "linear",
              position: "bottom",
              min: 0,
              max: 10,
            },
            y: {
              ticks: {
                display: false,
              },
            },
          },
        }}
      />
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  round: state.round.round,
});

export default connect(mapStateToProps)(GuessChart);
