#!/usr/bin/env node

const mathJs = require('mathjs');

const args = process.argv.slice(2, process.argv.length).join(' ').trim();

if(args === '') {
  console.error('\n[Calc CLI] Please input any fomulas. Aborted.');
  return process.exit(1);
}

const formulas = args
  .replace((/[０-９]/gu), str => String.fromCharCode(str.charCodeAt(0) - 65248))  // To half-width characters
  .replace((/＋/gu), '+')
  .replace((/ー/gu), '-')
  .replace((/[x×]/gu), '*')
  .replace((/÷/gu), '/')
  .replace((/（/gu), '(')
  .replace((/）/gu), ')')
  .replace((/．/gu), '.')
  .replace((/[\n　]/gu), ' ')  // To space
  .replace((/[,，]/gu), '');   // Remove comma

const math = mathJs.create(mathJs.all);
math.config({
  number: 'BigNumber'
});

try {
  const result = math.evaluate(formulas).toString();
  console.log(result);
}
catch(error) {
  console.error('\n[Calc CLI] Calculation failed.\n', error);
}
