import axios from "axios";
import { setTimeout } from "timers/promises";
import player from "play-sound";
import {
  GilfoyleCheckCoinParameters,
  GilfoyleParameters,
} from "./bitcoin.interface";

let isDesired: boolean = true;
let prevCoinPrice: number = 0;
let coinPriceInUSD: number = 0;
const playerInstance = player();

const playSound = (soundFilePath: string) => {
  playerInstance.play(soundFilePath);
};

const checkCoinValue = async ({
  threshold,
  coinId,
  soundFilePath,
  flags: { fullLogging },
}: GilfoyleCheckCoinParameters) => {
  const { data: coinResponse } = await axios({
    method: "get",
    url: `https://api.coinlore.net/api/ticker/?id=${coinId}`,
    responseType: "json",
  });

  const { price_usd: coinPrice } = coinResponse[0];
  coinPriceInUSD = Number(coinPrice);

  if (prevCoinPrice != coinPriceInUSD || fullLogging) {
    console.log(coinPriceInUSD);
    prevCoinPrice = coinPriceInUSD;
  }
  if (
    (coinPriceInUSD < threshold && isDesired != false) ||
    (coinPriceInUSD >= threshold && isDesired != true)
  ) {
    playSound(soundFilePath);
    isDesired = !isDesired;
  }
};

export const coinChecker = async ({
  threshold,
  coinId = 90,
  soundFilePath,
  delayInMs = 5000,
  flags,
}: GilfoyleParameters) => {
  while (true) {
    await checkCoinValue({ threshold, coinId, soundFilePath, flags });
    await setTimeout(delayInMs);
  }
};
