
test/out.js: dialog.js dialog.css
	component build package.json test/out

clean:
	rm -f test/out.{js,css}

.PHONY: clean