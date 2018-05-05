module.exports = {
  "extends": "google",
  "env": {
    "node": true,
    "es6": true
  },
  "rules": {
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": false,
        "ClassDeclaration": false,
        "ArrowFunctionExpression": false,
        "FunctionExpression": false
      }
    }]
  }
};