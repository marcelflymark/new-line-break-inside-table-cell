import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["insert_newline_plugin.ts"],
  bundle: true,
  external: ["obsidian"],
  format: "cjs",
  target: "es2018",
  outfile: "main.js",
  sourcemap: "inline"
}).catch(() => process.exit(1));
