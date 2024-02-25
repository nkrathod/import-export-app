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

export default function Orders() {
  const [data, setData] = React.useState([]);
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
            console.log(res.data);
            setData(res.data);
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
        Recent Orders{" "}
        <Button
          variant="contained"
          style={{ float: "right" }}
          onClick={handleAdd}
        >
          Add new
        </Button>
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship From</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Order Type</TableCell>
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
              <TableCell>{row.orderType}</TableCell>
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
  );
}
