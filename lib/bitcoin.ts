import axios from "axios";
import { setTimeout } from "timers/promises";
import player from "play-sound";
import { GilfoyleFlags, GilfoyleParameters } from "./bitcoin.interface";

const DEFAULT_API_PATH = "https://api.coinlore.net/api/ticker";

let isDesired: boolean = true;
let prevCoinValue: number = -1;

const playerInstance = player();

const getCoinValue = async (coinId: number) => {
  const {
    data: [coinResponse],
  } = await axios({
    method: "get",
    url: `${DEFAULT_API_PATH}/?id=${coinId}`,
    responseType: "json",
  });

  const { price_usd: coinValueString } = coinResponse;

  return Number(coinValueString);
};

const logCoinValue = (coinValue: number, flags: GilfoyleFlags) => {
  const { fullLogging, enableLogging } = flags;
  if (enableLogging) {
    if (fullLogging || coinValue != prevCoinValue) {
      console.log(coinValue);
    }
  }
};

const checkCoinValue = (
  coinValue: number,
  threshold: number,
  soundFile: string,
) => {
  if (prevCoinValue != coinValue) {
    prevCoinValue = coinValue;
  }
  if (
    (coinValue < threshold && isDesired) ||
    (coinValue >= threshold && !isDesired)
  ) {
    playerInstance.play(soundFile);
    isDesired = !isDesired;
  }
};

export const coinChecker = async ({
  threshold,
  coinId = 90,
  soundFile,
  delayInMs = 5000,
  flags,
}: GilfoyleParameters) => {
  while (true) {
    await getCoinValue(coinId)
      .then((coinValue) => {
        logCoinValue(coinValue, flags);
        checkCoinValue(coinValue, threshold, soundFile);
      })
      .then(() => setTimeout(delayInMs));
  }
};
