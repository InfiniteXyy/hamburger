import { Layout, VStack } from "hamburger-js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import "./index.css";

const blog = Layout("top-main-bottom")
  .top(Header)
  .main(Main)
  .bottom(Footer)
;


export default blog;
