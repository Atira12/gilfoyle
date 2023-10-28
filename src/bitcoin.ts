import axios from "axios";
import { setTimeout } from "timers/promises";
import player from "play-sound";

let isDesired: boolean = true;
let prevCoinPrice: number = 0;
let coinPriceInUSD: number;
const playerInstance = player();

const playSound = (filePath: string) => {
  playerInstance.play(filePath);
};

const checkValue = async (
  treshhold: number,
  coinId: number,
  filePath: string,
) => {
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
    (coinPriceInUSD < treshhold && isDesired != false) ||
    (coinPriceInUSD >= treshhold && isDesired != true)
  ) {
    playSound(filePath);
    isDesired = !isDesired;
  }
};

export const gilfoyle = async (
  treshhold: number,
  coinId: number = 90,
  sleepTimeInMs: number = 5000,
  filePath: string = "../you-suffer.mp3",
) => {
  while (true) {
    await checkValue(treshhold, coinId, filePath);
    await setTimeout(sleepTimeInMs);
  }
};
playSound("you-suffer.mp3");
