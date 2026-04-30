#!/bin/bash

DT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../.."
if [ "$1" = "debug" ]; then
	DEBUG="debug"
else
	OUT_DIR=$1
	DEBUG=$2
fi

# If not run from DataTables build script, redirect to there
if [ -z "$DT_BUILD" ]; then
	cd $DT_DIR/build
	./make.sh extension Select $DEBUG
	cd -
	exit
fi

# Change into script's own dir
cd $(dirname $0)

DT_SRC=$(dirname $(dirname $(pwd)))
DT_BUILT="${DT_SRC}/built/DataTables"
. $DT_SRC/build/include.sh

# Create OUT_DIR
if [ ! -d $OUT_DIR ]; then
	mkdir $OUT_DIR
fi

# Copy CSS
if [ -d $OUT_DIR/css ]; then
	rm -r $OUT_DIR/css
fi
cp -r css $OUT_DIR
css_frameworks select $OUT_DIR/css

# Copy JS
if [ -d $OUT_DIR/js ]; then
	rm -r $OUT_DIR/js		
fi
cp -r js $OUT_DIR
js_wrap $OUT_DIR/js/dataTables.select.js "jquery datatables.net"
js_frameworks select $OUT_DIR/js "jquery datatables.net-FW datatables.net-select"

# Copy Types
if [ -d $OUT_DIR/types ]; then
	rm -r $OUT_DIR/types
fi
mkdir $OUT_DIR/types

if [ -d types/ ]; then
	cp types/* $OUT_DIR/types
else
	if [ -f types.d.ts ]; then
		cp types.d.ts $OUT_DIR/types
	fi
fi

# Copy and build examples
if [ -d $OUT_DIR/examples ]; then
	rm -r $OUT_DIR/examples		
fi
cp -r examples $OUT_DIR
examples_process $OUT_DIR/examples

# Readme and license
cp Readme.md $OUT_DIR
cp License.txt $OUT_DIR

