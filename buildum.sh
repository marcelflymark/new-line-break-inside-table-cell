if [ -f obsidian_manifest.json ]
then
	echo updating manifest.json
	mv -v obsidian_manifest.json manifest.json 
fi

npm run build
