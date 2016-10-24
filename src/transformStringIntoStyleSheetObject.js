import assert from 'assert';
import gonzales from 'gonzales-pe';
import camelcase from 'camelcase';

export default function transformStringIntoStyleSheetObject(expr) {
  assert(typeof expr === 'string', 'must be a string');

  const cssTree = gonzales.parse(expr, {
    syntax: 'scss',
  });

  const result = {};
  let currentClass;
  cssTree.first('ruleset').forEach((node) => {
    switch (node.type) {
      case 'selector':
        currentClass = {};
        result[node.first('class').first('ident').content] = currentClass;
        break;
      case 'block':
        node.forEach('declaration', (declaration) => {
          const property = camelcase(declaration.first('property').toString());
          const value = declaration.first('value').toString();
          currentClass[property] = value;
        });
        break;
      default:
        // ignore remainder of unsupported scss
    }
  });

  return result;
}
