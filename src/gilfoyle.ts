import { coinChecker } from "./bitcoin";
import path from "path";

const DELAY_PREFIX: string = "--delay";
const COIN_PREFIX: string = "--coin";
const THRESHOLD_PREFIX: string = "--threshold";
const FILE_PATH_PREFIX: string = "--file";
const FULL_LOGGING_PREFIX = "--full-logging";
const HELP_PREFIX = "--help";

const DEFAULT_SOUND_PATH = path.resolve(__dirname, "../you-suffer.mp3");
export const setup = (argv: string[]) => {
  const delayInMsPos: number = argv.indexOf(DELAY_PREFIX);
  const thresholdPos: number = argv.indexOf(THRESHOLD_PREFIX);
  const coinIdPos: number = argv.indexOf(COIN_PREFIX);
  const filePathPos: number = argv.indexOf(FILE_PATH_PREFIX);
  const helpPos: number = argv.indexOf(HELP_PREFIX);

  if (helpPos > -1) {
    console.log(`
      * - required 

      Parameters:
       --help       Show help information
       --threshold* Specify threshold for the current coin price  
       --coin       Specify coin id  (Default is 90 a.k.a Bitcoin)
       --file       Specify alternative sound file path (Default "You Suffer by Napalm death") 
       --delay      Specify alternative delay between coin check (Default is 5 seconds) 
  
      Flags:
       --full-logging Enable logging of each value for bitcoin (Default is false)
   `);
    return;
  }
  const fullLoggingFlag: boolean = argv.indexOf(FULL_LOGGING_PREFIX) != -1;

  if (thresholdPos == -1) {
    console.log("Treshold is not specified");
    return 1;
  }

  const threshold: number = Number(argv[thresholdPos + 1]);
  const coinId = coinIdPos > -1 ? Number(argv[coinIdPos + 1]) : undefined;
  const delayInMs =
    delayInMsPos > -1 ? Number(argv[delayInMsPos + 1]) : undefined;
  const filePath: string =
    filePathPos > -1 ? argv[filePathPos + 1] : DEFAULT_SOUND_PATH;

  coinChecker({
    threshold,
    soundFilePath: filePath,
    coinId,
    delayInMs,
    flags: { fullLogging: fullLoggingFlag },
  });
};
