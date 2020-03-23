import { IBuildable } from 'hamburger-js/@types/common';

export function hbg(userArgs: object): (...source: TemplateStringsArray) => IBuildable;
export function hbg(...source: TemplateStringsArray): IBuildable;
