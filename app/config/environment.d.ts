export default config;

export type Theme = 'light' | 'dark' | 'gruvbox-light' | 'gruvbox-dark';
export type VideoKey = 'age' | 'sortableTitle' | 'duration';
export type ChannelKey = 'sortableTitle' | 'totalDuration' | 'itemCount';
export type Dir = 'asc' | 'desc';

interface Setting<T> {
  label: string;
  value: T;
}

declare const config: {
  environment: string;
  modulePrefix: string;
  podModulePrefix: string;
  locationType: string;
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
