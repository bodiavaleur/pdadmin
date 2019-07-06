const axios = require("axios");

const axs = axios.create({
  baseURL: "https://api.prime.date",
  mode: "cors",
  withCredentials: true,
  referrer: "https://prime.date/",
  "X-Remote-IP": "127.0.0.1",
  referrerPolicy: "no-referrer-when-downgrade",
  headers: { accept: "application/json", "content-type": "application/json" }
});

export const getStatistics = cb => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  let todayDate = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getHours() < 3 ? today.getDate() - 1 : today.getDate()
  };

  let tomorrowDate = {
    year: tomorrow.getFullYear(),
    month: tomorrow.getMonth() + 1,
    day: tomorrow.getDate()
  };

  axs({
    url: `/statistic/agency?dateFrom=${todayDate.year}-${todayDate.month}-${
      todayDate.day
    }&dateTo=${tomorrowDate.year}-${tomorrowDate.month}-${
      tomorrowDate.day
    }&groupByDate=1`,
    method: "GET"
  }).then(response => cb(response.data.data));
};
