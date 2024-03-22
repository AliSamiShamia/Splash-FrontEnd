import { Colors } from "@/components/constant";
import { useAuth } from "@/hooks/useAuth";
import { RankingType } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect } from "react";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#222832",
    color: Colors.text,
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#191f27",
    color: Colors.text,
  },
  "& td, & th": {
    borderBottom: "none",
  },
}));
const StyledTableCell = styled(TableCell)({
  color: Colors.text,
  fontSize: 12,
  padding: 10,
  paddingRight: 16,
  paddingLeft: 16,
});
function CurrentRound({ data }: RankingType) {
  return (
    <Grid container>
      <Grid display={"flex"} alignItems={"center"} gap={2} p={1}>
        <Box
          src={"/static/images/trophy.png"}
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
          Current Round
        </Typography>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: Colors.background }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{ padding: 0.1, paddingLeft: 1, paddingRight: 1 }}
                component="th"
                scope="row"
              >
                Name
              </StyledTableCell>
              <StyledTableCell
                sx={{ padding: 0.1, paddingLeft: 1, paddingRight: 1 }}
                align="right"
              >
                Points
              </StyledTableCell>
              <StyledTableCell
                sx={{ padding: 0.1, paddingLeft: 1, paddingRight: 1 }}
                align="right"
              >
                Multiplier
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, key) => (
              <StyledTableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.points}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.multiplier}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default CurrentRound;
