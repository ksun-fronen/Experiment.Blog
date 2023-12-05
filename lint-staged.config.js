import micromatch from "micromatch";

export default {
  "*.{js,jsx,vue,ts,tsx}": (files) => {
    files = micromatch.not(files, "**/*.config.js");
    console.log("files", files);
    return `eslint --fix ${files.join(" --fix ")}`;
  },
  /*
  "ignore": [
    "node_modules",
    "dist",
    "package-lock.json",
    ".config.js",
  ]
  */
};
