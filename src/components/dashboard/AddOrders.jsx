import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AuthContext from "../../authContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Divider } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { creditCardFormatter } from "../../helpers";

const AddOrder = () => {
  const date = new Date();
  const { userDetails } = useContext(AuthContext);
  const [value, setValue] = React.useState(dayjs(date));

  const [formData, setFormData] = useState({
    date: dayjs(date),
    name: "",
    shipFrom: "",
    shipTo: "",
    paymentMethod: "",
    amount: "",
    item: "",
    quantity: "",
    createdBy: "",
    timestamp: "",
    orderType: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const timestamp = date.getTime();

    const orderData = {
      date: dayjs(data.get("date")).format("ll"),
      name: data.get("name"),
      shipFrom: data.get("shipFrom"),
      shipTo: data.get("shipTo"),
      paymentMethod: creditCardFormatter(data.get("paymentMethod")),
      item: data.get("item"),
      quantity: data.get("quantity"),
      amount: data.get("amount"),
      createdBy: userDetails.username,
      timestamp: timestamp,
      orderType: data.get("orderType"),
    };

    if (
      formData &&
      formData.name &&
      formData.shipFrom &&
      formData.shipTo &&
      formData.paymentMethod &&
      formData.item &&
      formData.quantity &&
      formData.amount &&
      formData.orderType
    ) {
      axios
        .post("http://localhost:3003/import-export-data", orderData)
        .then((res) => {
          console.log("Success : ", res);
          setFormData((prev) => ({
            ...prev,
            date: "",
            name: "",
            shipFrom: "",
            shipTo: "",
            paymentMethod: "",
            amount: "",
            item: "",
            quantity: "",
            createdBy: "",
            timestamp: "",
            orderType: "",
          }));
          alert("Success");
        })
        .catch((error) => {
          console.log("Error : ", error);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Paper sx={{ p: 4, display: "flex", flexDirection: "column" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Title>Add Import/Export Order</Title>
          <Divider />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name="date"
                    fullWidth
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </LocalizationProvider>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={formData.name}
                  autoComplete="name"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="shipFrom"
                  label="Ship From"
                  name="shipFrom"
                  value={formData.shipFrom}
                  autoComplete="shipFrom"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="shipTo"
                  label="Ship To"
                  name="shipTo"
                  value={formData.shipTo}
                  autoComplete="shipTo"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="item"
                  label="Product"
                  name="item"
                  value={formData.item}
                  placeholder="Enter Total Cost"
                  autoComplete="item"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="quantity"
                  label="Quantity"
                  name="quantity"
                  value={formData.quantity}
                  placeholder="Enter Total quantity"
                  autoComplete="quantity"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="amount"
                  label="Cost"
                  name="amount"
                  value={formData.amount}
                  placeholder="Enter Total Cost"
                  autoComplete="amount"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="paymentMethod"
                  label="Payment Method"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  placeholder="Enter card Number"
                  autoComplete="spaymentMethodhipTo"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Order Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.orderType}
                    label="Order Type"
                    name="orderType"
                    onChange={(e) => handleChange(e)}
                  >
                    <MenuItem value="Import">Import</MenuItem>
                    <MenuItem value="Export">Export</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddOrder;
