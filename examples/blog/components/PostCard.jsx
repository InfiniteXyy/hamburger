import hamburger from '@hamburger/core';

const React = {
  createElement: hamburger.createElement,
};

function Card(post) {
  return (
    <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <strong className="d-inline-block mb-2 text-success">{post.tag}</strong>
        <h3 className="mb-0">{post.title}</h3>
        <div className="my-1 text-muted">{post.time}</div>
        <p className="card-text mb-auto">{post.description}</p>
        <a href={`post/${post.title}.html`} className="stretched-link">
          继续阅读
        </a>
      </div>
      <div className="col-auto d-none d-lg-block" style={{ width: 200, height: 250 }}>
        <img src={post.img} className="img-fluid" />
      </div>
    </div>
  );
}

export { Card };
