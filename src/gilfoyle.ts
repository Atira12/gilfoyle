#!/usr/bin/env node
import { coinChecker } from "./bitcoin";
const DELAY_PREFIX: string = "--delay";
const COIN_PREFIX: string = "--coin";
const THRESHOLD_PREFIX: string = "--threshold";
const FILE_PATH_PREFIX: string = "--file";
const FULL_LOGGING_PREFIX = "--full-logging";

export const setupGilfoyle = (argv: string[]) => {
  const delayInMsPos: number = argv.indexOf(DELAY_PREFIX);
  const thresholdPos: number = argv.indexOf(THRESHOLD_PREFIX);
  const coinIdPos: number = argv.indexOf(COIN_PREFIX);
  const filePathPos: number = argv.indexOf(FILE_PATH_PREFIX);

  const fullLoggingFlag: boolean = argv.indexOf(FULL_LOGGING_PREFIX) != -1;

  if (thresholdPos == -1) {
    console.log("Treshold is not specified");
    return 1;
  }
  if (filePathPos == -1) {
    console.log("Sound file not specified");
    return 1;
  }

  const threshold: number = Number(argv[thresholdPos + 1]);
  const coinId = coinIdPos > -1 ? Number(argv[coinIdPos + 1]) : undefined;
  const delayInMs =
    delayInMsPos > -1 ? Number(argv[delayInMsPos + 1]) : undefined;
  const filePath: string = argv[filePathPos + 1];

  coinChecker({
    threshold,
    soundFilePath: filePath,
    coinId,
    delayInMs,
    flags: { fullLogging: fullLoggingFlag },
  });
};

setupGilfoyle(process.argv);
