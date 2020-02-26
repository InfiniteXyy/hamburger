// setup file
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// set theme to default bootstrap
// const hamburger = require('hamburger-js')
// hamburger.applyTheme(hamburger.bootstrapTheme)

configure({ adapter: new Adapter() });
