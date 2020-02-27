import { GridCol, GridRow, Button } from 'hamburger-js';
import hamburger from 'hamburger-js';

const Card = () => (
  /** @jsx hamburger.createElement */
  <div className="card" style={{ width: '100%', marginBottom: 16 }}>
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
        content.</p>
      <button className="btn btn-primary">Go somewhere</button>
    </div>
  </div>
);


const Grids = GridRow(
  GridCol(Card()).take(1 / 3),
  GridCol(Card()).take(2 / 3),
  GridCol(Card()).take(1 / 3),
  GridCol(Card()).take(1 / 3),
  GridCol(Card()).take(1 / 3),
)
  .margin({ vertical: 16 });

export default Grids;
