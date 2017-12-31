module.exports = {
    "extends": "standard",
    "parserOptions": {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    "env": {
        "node": true,
        "browser": true
    },
    "rules": {
        "semi": 1,
        "arrow-parens": [ 1, "as-needed" ],
        "no-unused-vars": 0,
        "no-template-curly-in-string": 0
    }
};