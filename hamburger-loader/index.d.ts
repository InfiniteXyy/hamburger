import { IBuildable } from 'hamburger-js/@types/common';
import { hbgObj } from 'hamburger-loader';

interface hbgObj {
  data(obj: object): this;
}

export function hbg(...source: TemplateStringsArray): IBuildable & hbgObj

