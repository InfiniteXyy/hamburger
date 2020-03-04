import { IBuildable } from "../common";
import { createElement } from "../core";

class PureHTMLClass implements IBuildable {
  constructor(private html: string) {
  }

  build() {
    return createElement("div", { dangerouslySetInnerHTML: { __html: this.html } });
  }
}

export function PureHTML(html: string) {
  return new PureHTMLClass(html);

}
