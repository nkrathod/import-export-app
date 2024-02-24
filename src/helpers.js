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

  // ✅ If you need to convert milliseconds to seconds
  // divide by 1000
  const unixTimestamp = Math.floor(date.getTime() / 1000);

  const todaysDate = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(timestamp);

  return todaysDate;
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
