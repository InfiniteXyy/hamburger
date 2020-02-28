import { VStack, GridRow, Link, Button, Text, GridCol, HStack } from "hamburger-js";
import { Card } from "./Card";

const links = ["World", "U.S.", "Technology", "Design", "Culture", "Business", "Politics", "Opinion", "Science", "Health", "Style", "Travel"];
const JumbotronTitle = "Title of a longer featured blog post";
const JumbotronSubtitle = "Multiple lines of text that form the lede, informing new readers quickly and efficiently" +
  "about what’s most interesting in this post’s contents.";

function NavLink(text) {
  return Link(text).class("p-2", "text-muted");
}

const Title = VStack(
  GridRow(
    GridCol(Link("subscribe")),
    GridCol(Text("Blog").theme("h2")).class("text-center"),
    GridCol(Button("Sign up")).class("d-flex justify-content-end")
  ).class("flex-nowrap align-items-center")
).class("blog-header", "py-3");

const Nav = VStack(
  HStack(
    links.map(NavLink)
  ).expandItems().class("nav")
).class("nav-scroller", "py-1", "mb-2");


const Jumbotron = VStack(
  VStack(
    Text(JumbotronTitle).class("display-4 font-italic").tag("h1"),
    Text(JumbotronSubtitle).class("lead my-3"),
    Text(Link("continue reading...").class("text-white font-weight-bold")).class("lead mb-0")
  ).class("col-md-6 px-0")
).class("jumbotron p-4 p-md-5 text-white rounded bg-dark");

const Display = GridRow(
  GridCol(Card()),
  GridCol(Card())
).class("mb-2");


const Header = VStack(
  Title,
  Nav,
  Jumbotron,
  Display
).class("container");

export default Header;
