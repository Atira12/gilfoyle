import axios from "axios";
import { setTimeout } from "timers/promises";
import player from "play-sound";
import {
  GilfoyleCheckCoinParameters,
  GilfoyleParameters,
} from "./bitcoin.interface";

const DEFAULT_API_PATH = "https://api.coinlore.net/api/ticker";

let isDesired: boolean = true;
let prevCoinPrice: number = 0;
let coinPrice: number = 0;

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
  const {
    data: [coinResponse],
  } = await axios({
    method: "get",
    url: `${DEFAULT_API_PATH}/?id=${coinId}`,
    responseType: "json",
  });

  const { price_usd: coinPriceString } = coinResponse;
  coinPrice = Number(coinPriceString);

  if (prevCoinPrice != coinPrice || fullLogging) {
    console.log(coinPrice);
    prevCoinPrice = coinPrice;
  }
  if (
    (coinPrice < threshold && isDesired) ||
    (coinPrice >= threshold && !isDesired)
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
    await checkCoinValue({ threshold, coinId, soundFilePath, flags }).then(() =>
      setTimeout(delayInMs),
    );
  }
};
