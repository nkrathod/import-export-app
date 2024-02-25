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

const AddOrder = () => {
  const date = new Date();
  const { authenticated, setAuthenticated, userDetails, setUserDeatils } =
    useContext(AuthContext);
  const [value, setValue] = React.useState(dayjs(date));
  const [formData, setFormData] = useState({
    date: dayjs(date),
    name: "",
    shipFrom: "",
    shipTo: "",
    paymentMethod: "",
    amount: "",
    createdBy: "rutulambe",
    timestamp: "1708079032",
    orderType: "",
  });
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    const timestamp = date.getTime();
    setFormData((prevState) => ({
      ...prevState,
      date: data.get("date"),
      paymentMethod: `VISA ${formData.paymentMethod}`,
      createdBy: userDetails.username,
      timestamp: timestamp,
    }));

    console.log("testSubmit ", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  console.log("formData", userDetails);

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
                  autoComplete="name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="shipFrom"
                  label="Ship From"
                  name="shipFrom"
                  autoComplete="shipFrom"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="shipTo"
                  label="Ship To"
                  name="shipTo"
                  autoComplete="shipTo"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="paymentMethod"
                  label="Payment Method"
                  name="paymentMethod"
                  placeholder="Enter card Number"
                  autoComplete="spaymentMethodhipTo"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="amount"
                  label="Cost"
                  name="amount"
                  placeholder="Enter Total Cost"
                  autoComplete="amount"
                  autoFocus
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
