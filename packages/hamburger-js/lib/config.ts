import { HamburgerPlatform } from './types';
import { DefaultPlatform } from './core/platform';

type HamburgerState = {
  platform: HamburgerPlatform;
};

const config: HamburgerState = {
  platform: new DefaultPlatform(),
};

export { config };
