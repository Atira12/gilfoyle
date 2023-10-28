#!/usr/bin/env node
import { gilfoyle } from "./src/bitcoin";
const DELAY_PREFIX: string = "--delay";
const COIN_PREFIX: string = "--coin";
const THRESHOLD_PREFIX: string = "--threshold";
const FILE_PATH_PREFIX: string = "--file";

const setupGilfoyle = (argv: string[]) => {
  const delayInMsPos: number = argv.indexOf(DELAY_PREFIX);
  const thresholdPos: number = argv.indexOf(THRESHOLD_PREFIX);
  const coinIdPos: number = argv.indexOf(COIN_PREFIX);
  const filePathPos: number = argv.indexOf(FILE_PATH_PREFIX);

  if (thresholdPos == -1) {
    throw Error("Treshold is not specified");
  }

  const threshold: number = Number(argv[thresholdPos + 1]);
  const coinId = coinIdPos > -1 ? Number(argv[coinIdPos + 1]) : undefined;
  const delayInMs =
    delayInMsPos > -1 ? Number(argv[delayInMsPos + 1]) : undefined;
  const filePath = filePathPos > -1 ? argv[filePathPos + 1] : undefined;

  gilfoyle(threshold, coinId, delayInMs, filePath);
};

setupGilfoyle(process.argv);
