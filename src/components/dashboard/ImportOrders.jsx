import * as React from "react";
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
import { useNavigate } from "react-router-dom";

function preventDefault(event) {
  event.preventDefault();
}

export default function ImportOrders() {
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();

  const str = "2022-04-26";

  const date = new Date(str);

  // ✅ Get timestamp in Milliseconds
  const timestamp = date.getTime();
  console.log(timestamp); // 👉️ 1650931200000

  // ✅ If you need to convert milliseconds to seconds
  // divide by 1000
  const unixTimestamp = Math.floor(date.getTime() / 1000);
  console.log(unixTimestamp); // 👉️ 1650931200

  console.log(
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timestamp)
  );

  const handleAdd = () => {
    navigate("/dashboard/add");
  };

  React.useEffect(() => {
    if (data.length === 0) {
      axios
        .get("http://localhost:3003/import-export-data")
        .then((res) => {
          if (res.data.length > 0) {
            console.log(res.data);
            const importedOrd = res.data.filter((order) => order.orderType === "Import")
            setData(importedOrd);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
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
          {data.map((row) => (
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
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </Paper>
  );
}
