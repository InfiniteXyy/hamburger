import { VStack, Text, Link } from "hamburger-js";

const Footer = VStack(
  Text("Blog template built for ", Link("Bootstrap"), " by ", Link("@mdo")),
  Text(Link("Back to top"))
).class("blog-footer");

export default Footer;
