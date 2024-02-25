export const currencyFormaters = (value) => {
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
  return amount;
};

export const dateFormaters = (dates) => {
  const date = new Date(dates);
  // ✅ Get timestamp in Milliseconds
  const timestamp = date.getTime();

  const todaysDate = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(timestamp);

  return todaysDate;
};

export const getMonths = (dates) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(dates);
  const month = months[date.getMonth()];

  return month;
};

export const todaysDate = () => {
  const date = new Date();
  const timestamp = date.getTime();
  const todaysDate = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(timestamp);

  return todaysDate;
};

export const creditCardFormatter = (value) => {
  const newValue = "VISA " + value.match(new RegExp(".{1,4}", "g")).join("-");
  return newValue;
};

export const chartDataValue = (data) => {
  let chartDataFormat = [
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

  data.forEach((order) => {
    const newData = chartDataFormat.map((cdata) => {
      if (getMonths(order.date) === cdata.month) {
        const value = Number(cdata.amount) + Number(order.amount);
        return { ...cdata, amount: Number(value.toFixed(2)) };
      }
      return cdata;
    });
    chartDataFormat = newData;
  });

  return chartDataFormat;
}
