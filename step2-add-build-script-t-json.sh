# Edit package.json to add these scripts
cat > package.json << 'EOF'
{
  "name": "inline-line-break",
  "version": "1.0.0",
  "description": "A shortkey and command to insert an inline line break",
  "main": "main.js",
  "scripts": {
    "dev": "node esbuild.config.mjs",
    "build": "node esbuild.config.mjs production"
  },
  "keywords": [],
  "author": "Marcel Flymark",
  "license": "MIT",
  "devDependencies": {
    "@types/node": "^16.11.6",
    "esbuild": "0.17.3",
    "obsidian": "latest",
    "tslib": "2.4.0",
    "typescript": "4.7.4"
  }
}
EOF
