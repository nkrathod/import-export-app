import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AuthContext from "../authContext";
import DummyAvatar from "../assets/dummy-avatar.jpg";

export default function Profile() {
  const { authenticated, setAuthenticated, userDetails, setUserDeatils } =
    useContext(AuthContext);

  const handleLogout = () => {
    setAuthenticated(false);
    setUserDeatils({});
    localStorage.setItem("userDetails", "{}");
    window.location = "/";
  };

  return (
    <div style={{ padding: "50px" }}>
      <Card sx={12}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="240"
          image={DummyAvatar}
        />
        <CardContent>
          {userDetails && userDetails.name && (
            <Typography gutterBottom variant="h5" component="div">
              {userDetails.name}
            </Typography>
          )}
          {userDetails && userDetails.email && (
            <Typography variant="body2" color="text.secondary">
              Email: {userDetails.email}
            </Typography>
          )}
          {userDetails && userDetails.username && (
            <Typography variant="body2" color="text.secondary">
              Username: {userDetails.username}
            </Typography>
          )}
          {userDetails && userDetails.usertype && (
            <Typography variant="body2" color="text.secondary">
              Role: {userDetails.usertype}
            </Typography>
          )}
          {userDetails && userDetails.name && (
            <Typography variant="body2" color="text.secondary">
              You can update your profile here also you can change your email
              address and password.
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button size="small">Update</Button>
          <Button size="small" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
