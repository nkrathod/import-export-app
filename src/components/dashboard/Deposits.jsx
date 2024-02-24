import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from "axios";
import {todaysDate, currencyFormaters} from "../../helpers";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [data, setData] = React.useState([]);
  const [deposit, setDeposit] = React.useState(0);

  React.useEffect(() => {
    if (data.length === 0) {
      axios
        .get("http://localhost:3003/import-export-data")
        .then((res) => {
          if (res.data.length > 0) {
            console.log(res.data);
            setDeposit(0)
            res.data.forEach((order) => {
              setDeposit( amount => Number(amount) + Number(order.amount))
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
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        {currencyFormaters(deposit)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {todaysDate()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}