if [ -f obsidian_manifest.json ]
then
	echo updating manifest.json
	mv -v obsidian_manifest.json manifest.json 
fi
if [ -f obsidian_plugin.ts ]
then
	echo updating newline-within-table-cell-pplugin.ts
	mv -v obsidian_plugin.ts insert_newline_plugin.ts
fi

npm run build
