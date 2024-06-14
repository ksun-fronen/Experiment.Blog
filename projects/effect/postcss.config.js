import tailwindConfig from "../../tailwind.config.js";

console.log('tailwindConfig',tailwindConfig);
export default {
  plugins: {
    tailwindcss: tailwindConfig,
    autoprefixer: {},
  }
}
