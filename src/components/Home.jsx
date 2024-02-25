import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import AuthContext from "../authContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import containerImage from "../assets/container.jpg";
import portImage from "../assets/port.jpg";
import shipImage from "../assets/ship-export.jpg";
import unsplashPhoto1 from "../assets/cargo-ship.jpg";
import unsplashPhoto2 from "../assets/cargo-air.jpg";
import unsplashPhoto3 from "../assets/truck.jpg";
import "../App.css";
import { Divider } from "@mui/material";

export default function Home() {
  const { userDetails } = useContext(AuthContext);
  const cardArray = [
    {
      id: 1,
      title: "Cargo Ship",
      url: unsplashPhoto1,
      description:
        "A cargo ship or freighter is a merchant ship that carries cargo, goods, and materials from one port to another.",
    },
    {
      id: 2,
      title: "Cargo Air",
      url: unsplashPhoto2,
      description:
        "Cargo aircraft are dedicated for the job—they carry freight on the main deck and in the belly by means of nose-loading or side loading. Combi aircraft carry cargo on part of the main deck, before or after a passengers' section, with side loading, and in the belly.",
    },
    {
      id: 3,
      title: "Cargo Truck",
      url: unsplashPhoto3,
      description:
        "Cargo trucks are transport vehicles for cargo that doesn't require much space or horsepower to haul. It consists of a hauling truck with a cargo bed on its chassis. These trucks are the driving force behind many industrial sectors – literally.",
    },
  ];

  return (
    <div>
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              style={{ height: "400px" }}
              src={containerImage}
              alt="First slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              style={{ height: "400px" }}
              src={portImage}
              alt="Second slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              style={{ height: "400px" }}
              src={shipImage}
              alt="Third slide"
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <div style={{ padding: "40px 100px" }}>
        <h1>
          Hi {userDetails && userDetails.name}, Welcome to Import Export Portals
        </h1>

        <p>Check your Import and Export records in Dashboard Page</p>
      </div>
      <div style={{ padding: "20px 100px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" component="div">
              Our Services
            </Typography>
            <Divider />
          </Grid>
          {cardArray.map((item) => (
            <Grid item xs={12} md={4}>
              <Card sx={{ maxWidth: 370 }} key={item.id}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.url}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
