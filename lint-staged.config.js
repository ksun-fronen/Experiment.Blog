import micromatch from "micromatch";

export default {
  "*.{js,jsx,vue,ts,tsx}": (files) => {
    files = micromatch.not(files, "**/*.config.js");
    return `eslint --fix ${files.join(" --fix ")}`;
  },
};
