import { IBuildable } from '@hamburger/core/@types/types';

export function hbg(userArgs: object): (source: TemplateStringsArray) => IBuildable;
export function hbg(source: TemplateStringsArray): IBuildable;
