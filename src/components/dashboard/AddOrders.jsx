import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AuthContext from "../../authContext";

const AddOrder = () => {
  const { authenticated, setAuthenticated, userDetails, setUserDeatils } =
    useContext(AuthContext);
  const handleSubmit = () => {
    console.log("testSubmit");
  };
  return (
    <Paper sx={{ p: 4, display: "flex", flexDirection: "column" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Title>Add Import/Export Order</Title>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddOrder;
