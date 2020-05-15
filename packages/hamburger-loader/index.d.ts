import { IBuildable } from '@hamburger/core/@types/common';

export function hbg(userArgs: object): (...source: TemplateStringsArray) => IBuildable;
export function hbg(...source: TemplateStringsArray): IBuildable;
