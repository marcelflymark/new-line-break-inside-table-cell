cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Build output
main.js
*.js.map

# Development
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
EOF
