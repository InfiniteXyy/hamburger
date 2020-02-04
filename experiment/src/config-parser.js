import config from './config';

// https://stackoverflow.com/questions/34513964/how-to-convert-this-nested-object-into-a-flat-object
function flatten(input, reference, output) {
  output = output || {};
  for (var key in input) {
    var value = input[key];
    key = reference ? reference + '-' + key : key;
    if (typeof value === 'object' && value !== null) {
      flatten(value, key, output);
    } else {
      output[key] = value;
    }
  }
  return output;
}

function parse(config) {
  const result = flatten(config);
  const resultCSS = [];
  for (let key in result) {
    resultCSS.push(`.${key} {${result[key]}}`);
  }
  return resultCSS.join('\n\n');
}

const styleResult = parse(config);

export { styleResult };
