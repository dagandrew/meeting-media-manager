export type FontName = 'JW-Icons' | 'WT-ClearText-Bold';
export interface UrlVariables {
  base: string;
  mediator: string;
  pubMedia: string;
}

export interface CacheList<T = unknown> {
  list: T[];
  updated: Date;
}
