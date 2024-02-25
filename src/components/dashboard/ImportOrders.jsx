import * as React from "react";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import axios from "axios";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Deposits from "./Deposits";
import { useNavigate } from "react-router-dom";

function preventDefault(event) {
  event.preventDefault();
}

export default function ImportOrders() {
  const [data, setData] = React.useState([]);
  const [deposit, setDeposit] = React.useState(0);
  const [row, setRow] = React.useState(5);
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/dashboard/add");
  };

  const showMore = () => {
    setRow(data.length);
  };

  const showLess = () => {
    setRow(5);
  };

  React.useEffect(() => {
    if (data.length === 0) {
      axios
        .get("http://localhost:3003/import-export-data")
        .then((res) => {
          if (res.data.length > 0) {
            setDeposit(0);
            const importedOrd = res.data.filter((order) => {
              if (order.orderType === "Import") {
                setDeposit((amount) => Number(amount) + Number(order.amount));
                return order;
              }
            });
            setData(importedOrd);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Deposits deposit={deposit} title="Total Import value" />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title>
            Imported Orders{" "}
            <Button
              variant="contained"
              style={{ float: "right" }}
              onClick={handleAdd}
            >
              Add new Import Order
            </Button>
          </Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ship From</TableCell>
                <TableCell>Ship To</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Sale Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, row).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shipFrom}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell align="right">{`$${row.amount}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {row === 5 ? (
            <Link color="primary" href="#" onClick={showMore} sx={{ mt: 3 }}>
              See more orders
            </Link>
          ) : (
            <Link color="primary" href="#" onClick={showLess} sx={{ mt: 3 }}>
              See less orders
            </Link>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
