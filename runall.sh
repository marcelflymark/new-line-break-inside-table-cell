set -x
sh step1-gen-project.sh
sh step1b-gen-project.sh
sh step2-add-build-script-t-json.sh
sh step2b-install-missing-modules.sh
sh step3-run-build.sh
