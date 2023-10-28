import { gilfoyle } from "./src/gilfoyle";
const DELAY_PREFIX: string = "--delay";
const COIN_PREFIX: string = "--coin";
const THRESHOLD_PREFIX: string = "--treshold";
const FILE_PATH_PREFIX: string = "--file";

const delayInMsPos: number = process.argv.indexOf(DELAY_PREFIX);
const thresholdPos: number = process.argv.indexOf(THRESHOLD_PREFIX);
const coinIdPos: number = process.argv.indexOf(COIN_PREFIX);
const filePathPos: number = process.argv.indexOf(FILE_PATH_PREFIX);

if (thresholdPos == -1) {
  throw Error("Treshold is not specified");
}

const threshold: number = Number(process.argv[thresholdPos + 1]);
const coinId = coinIdPos > -1 ? Number(process.argv[coinIdPos + 1]) : undefined;
const delayInMs =
  delayInMsPos > -1 ? Number(process.argv[delayInMsPos + 1]) : undefined;
const filePath = filePathPos > -1 ? process.argv[filePathPos + 1] : undefined;

gilfoyle(threshold, coinId, delayInMs, filePath);
