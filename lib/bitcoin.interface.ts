export interface GilfoyleFlags {
  fullLogging?: boolean;
  enableLogging?: boolean;
}

export interface GilfoyleParameters {
  soundFile: string;
  threshold: number;
  delayInMs?: number;
  coinId?: number;
  flags: GilfoyleFlags;
}
