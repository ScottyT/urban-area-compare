module.exports = {
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:vue/base',
        "prettier"
    ],
    rules: {
        "vue/max-attributes-per-line": ["error", {
            "singleline": {
                "max": 6
            },
            "multiline": {
                "max": 6
            }
        }],
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "always",
                "normal": "never",
                "component": "always"
            },
            "svg": "always",
            "math": "always"
        }],
        "vue/html-indent": ["error", type, {
            "type": 4,
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }]
    },
    parserOptions: {
        parser: "@babel/eslint-parser",
        ecmaVersion: 2020,
        ecmaFeatures: {
            "jsx": true
        }
    },
    env: {
        browser: true,
        node: true
    }
}