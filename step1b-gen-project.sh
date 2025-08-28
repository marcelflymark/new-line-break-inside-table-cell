# Replace esbuild.config.mjs with a basic version
cat > esbuild.config.mjs << 'EOF'
import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["obsidian_plugin.ts"],
  bundle: true,
  external: ["obsidian"],
  format: "cjs",
  target: "es2018",
  outfile: "main.js",
  sourcemap: "inline"
}).catch(() => process.exit(1));
EOF
