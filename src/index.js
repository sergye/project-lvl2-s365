import fs from 'fs';
import path from 'path';
import parse from './parsers';
import getAST from './ast';
import render from './renderer';


const genDiff = (file1, file2) => {
  const data1 = fs.readFileSync(file1, 'utf8');
  const data2 = fs.readFileSync(file2, 'utf8');
  const extension = path.extname(file1);
  const obj1 = parse(extension)(data1);
  const obj2 = parse(extension)(data2);
  const ast = getAST(obj1, obj2);
  return render(ast);
};

export default genDiff;
