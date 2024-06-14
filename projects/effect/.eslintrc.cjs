module.exports = {
  extends: [
    "plugin:@szjyp226/vue3-typescript",
  ],
  ignorePatterns: [
    "*.d.ts",
    "tsconfig.json",
    "*.config.js",
  ],
  rules:{
    "no-undef": "off"
  }
};
