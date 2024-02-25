import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import axios from "axios";
import { todaysDate, dateFormaters } from "../../helpers";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [deposit, setDeposit] = useState(0);

  useEffect(() => {
    if (data.length === 0) {
      axios
        .get("http://localhost:3003/import-export-data")
        .then((res) => {
          if (res.data.length > 0) {
            setDeposit(0);
            res.data.forEach((order) => {
              if (todaysDate() === dateFormaters(order.date)) {
                setDeposit((amount) => Number(amount) + Number(order.amount));
              }
            });
            setData(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Deposits deposit={deposit} title="Recent Deposits" />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Orders />
      </Grid>
    </Grid>
  );
}
