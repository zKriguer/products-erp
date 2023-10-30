import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm"],
  platform: "node",
  clean: true,
  bundle: true,
  minify: true,
  splitting: true,
  outDir: "dist",
});
