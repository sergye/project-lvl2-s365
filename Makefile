install: 
		npm install

start: 
		npm run babel-node -- src/bin/gendiff.js --format json before.json after.json

lint: 
		npm run eslint .

publish: 
		npm publish

build:
		npm run build

test:
		npm test

test-watch:
		npm run test:watch