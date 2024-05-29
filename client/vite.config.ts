import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import MillionLint from "@million/lint";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    MillionLint.vite(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
});
