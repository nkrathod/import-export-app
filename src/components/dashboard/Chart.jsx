import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import Title from "./Title";
import { getMonths, chartDataValue } from "../../helpers";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00"),
];

const chartDataFormat = [
  { month: "Jan", amount: 0 },
  { month: "Feb", amount: 0 },
  { month: "Mar", amount: 0 },
  { month: "Apr", amount: 0 },
  { month: "May", amount: 0 },
  { month: "Jun", amount: 0 },
  { month: "Jul", amount: 0 },
  { month: "Aug", amount: 0 },
  { month: "Sep", amount: 0 },
  { month: "Oct", amount: 0 },
  { month: "Nov", amount: 0 },
  { month: "Dec", amount: 0 },
];

export default function Chart(props) {
  const [chartData, setChartData] = React.useState(chartDataFormat);
  const theme = useTheme();

  React.useEffect(() => {
    if(props.data && props.data.length > 0) {
      setChartData(chartDataValue(props.data))
    }
  },[props.data])

  return (
    <React.Fragment>
      <Title>Today</Title>
      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <LineChart
          dataset={chartData}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "month",
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: "Sales ($)",
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 15000,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: "amount",
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: {
              stroke: theme.palette.text.secondary,
            },
            [`.${axisClasses.root} text`]: {
              fill: theme.palette.text.secondary,
            },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translateX(-25px)",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
