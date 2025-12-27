export enum Direction {
  RTL = 'rtl',
  LTR = 'ltr'
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir: Direction;
}

export interface SocialLink {
  platform: string;
  username: string;
  url: string;
  icon: string;
}
