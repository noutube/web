export default config;

export type Theme = 'light' | 'dark' | 'gruvbox-light' | 'gruvbox-dark';
export type VideoKey = 'age' | 'sortableTitle' | 'duration';
export type ChannelKey = 'sortableTitle' | 'totalDuration' | 'videoCount';
export type Dir = 'asc' | 'desc';

export interface Setting<T> {
  label: string;
  value: T;
}

declare const config: {
  environment: string;
  modulePrefix: string;
  podModulePrefix: string;
  locationType: 'history' | 'hash' | 'none' | 'auto';
  rootURL: string;
  APP: Record<string, unknown>;

  backendOrigin: string;
  themes: Setting<Theme>[];
  sizes: number[];
  videoKeys: Setting<VideoKey>[];
  channelKeys: Setting<ChannelKey>[];
  dirs: Setting<Dir>[];
  defaultChannelGroup: boolean;
  defaultAutoplay: boolean;
  speeds: number[];
  defaultSpeed: number;
};
