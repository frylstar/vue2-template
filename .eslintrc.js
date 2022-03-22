// https://eslint.vuejs.org/user-guide/#usage
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // add more generic rulesets here, such as:
    "plugin:vue/essential", // Use this if you are using Vue.js 2.x.
    // 'plugin:vue/vue3-recommended', // Vue3.x
    "eslint:recommended",
    "plugin:prettier/recommended",
    // Make sure "prettier" is the last element in this list.
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    // override/add rules settings here (0-ignore 1-warn 2-error), such as:
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-var": "error", //不得申明var用let
    // 禁止 function 定义中出现重名参数
    "no-dupe-args": 2,
    // 禁止重复的函数声明
    "no-func-assign": 2,
    "no-alert": 1,
    // 禁用 eval()
    "no-eval": 2,
    // 禁用 with 语句
    "no-with": 2,
    // 不允许 catch 子句的参数与外层作用域中的变量同名
    "no-catch-shadow": 0,
    // 禁止删除变量
    "no-delete-var": 2,
    // 不允许标签与变量同名
    "no-label-var": 2,
    // 禁用特定的全局变量
    "no-restricted-globals": 2,
    // 禁止覆盖受限制的标识符
    "no-shadow-restricted-names": 2,
    // 禁止 var 声明 与外层作用域的变量同名
    "no-shadow": 0,
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    "no-undef": 2,
    // 禁止将变量初始化为 undefined
    "no-undef-init": 2,
    // 禁止将 undefined 作为标识符
    "no-undefined": 2,
    // 禁止出现未使用过的变量
    "no-unused-vars": [1, { vars: "all", args: "none" }],
    // 不允许在变量定义之前使用它们
    "no-use-before-define": 1,
    // 强制一行的最大长度
    // "max-len": [1, 160],
    // 文件末尾强制换行
    "eol-last": 0,
    // 禁止修改 const 声明的变量
    "no-const-assign": 2,
    // 禁止标识符中有悬空下划线_bar，这里忽略
    "no-underscore-dangle": 0,
    // 禁用行尾空格
    "no-trailing-spaces": 2,
    // 禁用不必要的嵌套块
    "no-lone-blocks": 2,
    // 强制在 JSX 属性中一致地使用双引号或单引号
    "jsx-quotes": 0,
    // 函数定义时括号前面要不要有空格
    "space-before-function-paren": [1, "never"],
    //对象字面量项尾不能有逗号 这里忽略
    "comma-dangle": [0, "always"],
    // 在对象字面量属性中实现键和值之间的一致间隔 {key: value}
    // "key-spacing": [1, { mode: "strict" }],
    // 允许对象所有键和值在同一行上
    "object-property-newline": [0, { allowMultiplePropertiesPerLine: true }],
    // promise reject 参数设置为 * 任意类型
    "prefer-promise-reject-errors": [0, { allowEmptyReject: true }],
    // 要求或禁止使用严格模式指令
    strict: 2,
    // 要求或禁止 var 声明中的初始化(初值)
    "init-declarations": 2,
    // 缩进4空格 禁用2 忽悠注释部分
    indent: [1, 2, { ignoreComments: true }],
    "arrow-parens": 0, // 箭头函数用小括号括起来
    "no-tabs": "off",
    quotes: ["error", "double"],
    "generator-star-spacing": "off", // allow async-await
    camelcase: [
      "error",
      {
        properties: "never",
      },
    ], //强制驼峰法命名
    // 使用 === 和 !==
    eqeqeq: [2, "allow-null"],
    "no-extend-native": 2, //禁止扩展native对象
    "no-mixed-spaces-and-tabs": [2, false], //禁止混用tab和空格
    "no-multi-spaces": 1, //不能用多余的空格
    "no-multiple-empty-lines": [
      1,
      {
        max: 2,
      },
    ], //空行最多不能超过2行
    "no-native-reassign": 2, //不能重写native对象
    "vue/no-parsing-error": [
      2,
      {
        "x-invalid-end-tag": false,
      },
    ],
    "no-dupe-keys": 2, //在创建对象字面量时不允许键重复 {a:1, a:1}
    "prefer-template": "error", //以编程方式构建字符串时，使用模板字符串而不是连接符 例:How are you, ${name}?
    "prefer-arrow-callback": "error", //当你必须要使用匿名函数（如在传递内联回调时），请使用箭头函数
    "no-dupe-class-members": "error", //避免重复的类成员
    "no-duplicate-imports": "error", //同一个路径只使用一次import
    // 在对象文字的大括号内执行一致的间距
    // "object-curly-spacing": ["error", "never", { objectsInObjects: true }],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never", //.单行元素的配置禁止在右括号前换行
        multiline: "always", //多行元素的配置要求在右方括号前换行。
      },
    ],
    // require or disallow a space before tag's closing brackets
    "vue/html-closing-bracket-spacing": [
      "error",
      {
        startTag: "never",
      },
    ],
  },
}
