import assert from 'assert';
import { types as t } from 'babel-core';
import gonzales from 'gonzales-pe';
import camelcase from 'camelcase';

export default function transformStringLiteralIntoStyleSheetObject(expr) {
  assert(t.isStringLiteral(expr), 'must be a string literal');

  const cssTree = gonzales.parse(expr.value, {
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
