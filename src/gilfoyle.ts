import axios from "axios";
import * as sound from "sound-play";
import { setTimeout } from "timers/promises";

let isDesired: boolean = true;
let prevCoinPrice: number = 0;
let coinPriceInUSD: number;

const playSound = (filePath: string) => {
  sound.play(filePath);
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
  filePath: string = "you-suffer.mp3",
) => {
  while (true) {
    await checkValue(treshhold, coinId, filePath);
    await setTimeout(sleepTimeInMs);
  }
};
