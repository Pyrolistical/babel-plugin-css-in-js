import assert from 'assert';
import { types as t } from 'babel-core';

import transformObjectExpressionIntoStyleSheetObject from './transformObjectExpressionIntoStyleSheetObject';
import transformFunctionExpressionIntoStyleSheetObject from './transformFunctionExpressionIntoStyleSheetObject';
import transformStringLiteralIntoStyleSheetObject from './transformStringLiteralIntoStyleSheetObject';

export default function transformIntoStyleSheetObject(expr, context, transformOptions) {
  if (t.isFunctionExpression(expr) || t.isArrowFunctionExpression(expr)) {
    return transformFunctionExpressionIntoStyleSheetObject(expr, context, transformOptions);
  } else if (t.isObjectExpression(expr)) {
    return transformObjectExpressionIntoStyleSheetObject(expr, context);
  } else if (t.isStringLiteral(expr)) {
    return transformStringLiteralIntoStyleSheetObject(expr, context);
  }

  assert(false, 'must be an object expression, a function expression or a string literal');
}
