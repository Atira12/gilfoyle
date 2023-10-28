var player = require("play-sound")((opts = {}));
const axios = require("axios").default;
const { setTimeout } = require("node:timers/promises");

let desired = true;
let prevCoinPrice = 0;
const playSound = (filePath) => {
  player.play(filePath, function (err) {
    if (err) throw err;
  });
};

const checkValue = async (treshhold, coinId, filePath) => {
  const { data: coinResponse } = await axios({
    method: "get",
    url: `https://api.coinlore.net/api/ticker/?id=${coinId}`,
    responseType: "json",
  });

  const { price_usd: coinPrice } = coinResponse[0];
  coinPriceInUSD = Number(coinPrice);

  if (prevCoinPrice != coinPriceInUSD) {
    console.log(coinPriceInUSD);
    prevCoinPrice = coinPriceInUSD;
  }
  if (
    (coinPriceInUSD < treshhold && desired != false) ||
    (coinPriceInUSD >= treshhold && desired != true)
  ) {
    playSound(filePath);
    desired = !desired;
  }
};

const wait = async (treshhold, coinId, sleepTimeInMs, filePath) => {
  while (true) {
    await checkValue(treshhold, coinId, filePath);
    await setTimeout(sleepTimeInMs, "result");
  }
};

wait(34100, 90, 5000, "you-suffer.mp3");
