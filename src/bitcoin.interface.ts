export interface GilfoyleFlags {
  fullLogging?: boolean;
}

export interface GilfoyleParameters {
  soundFilePath: string;
  threshold: number;
  delayInMs?: number;
  coinId?: number;
  flags: GilfoyleFlags;
}
export interface GilfoyleCheckCoinParameters
  extends Omit<GilfoyleParameters, "delayInMs"> { }
