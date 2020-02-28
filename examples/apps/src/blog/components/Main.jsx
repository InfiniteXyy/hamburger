import hamburger from "hamburger-js";
import { GridCol, GridRow, VStack } from "hamburger-js";

const Aside = GridCol(
  <div className="p-4 mb-3 bg-light rounded">
    <h4 className="font-italic">About</h4>
    <p className="mb-0">Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit
      amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
  </div>,
  <div className="p-4">
    <h4 className="font-italic">Archives</h4>
    <ol className="list-unstyled mb-0">
      <li><a href="#">March 2014</a></li>
      <li><a href="#">February 2014</a></li>
    </ol>
  </div>,
  <div className="p-4">
    <h4 className="font-italic">Elsewhere</h4>
    <ol className="list-unstyled">
      <li><a href="#">GitHub</a></li>
      <li><a href="#">Twitter</a></li>
      <li><a href="#">Facebook</a></li>
    </ol>
  </div>
).take(1 / 3).class("blog-sidebar");


const Blogs = GridCol(
  <h3 className="pb-4 mb-4 font-italic border-bottom">
    From the Firehose
  </h3>,

  <div className="blog-post">
    <h2 className="blog-post-title">Sample blog post</h2>
    <p className="blog-post-meta">January 1, 2014 by <a href="#">Mark</a></p>

    <p>This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic
      typography, images, and code are all supported.</p>
    <hr/>
    <p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus.
      Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est
      at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
    <blockquote>
      <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu
        leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
    </blockquote>
    <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum.
      Aenean lacinia bibendum nulla sed consectetur.</p>
    <h2>Heading</h2>
    <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus,
      nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac,
      vestibulum at eros.</p>
    <h3>Sub-heading</h3>
    <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
    <pre><code>Example code block</code></pre>
  </div>,

  <nav className="blog-pagination">
    <a className="btn btn-outline-primary mr-2" href="#">Older</a>
    <a className="btn btn-outline-secondary disabled" href="#" tabIndex="-1" aria-disabled="true">Newer</a>
  </nav>
).take(2 / 3).class("blog-main");

const Main = VStack(
  GridRow(
    Blogs,
    Aside
  )
).class("container");

export default Main;
