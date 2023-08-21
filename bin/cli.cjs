#!/usr/bin/env node

const {execSync} = require('child_process');

const run = cmd => {
  try {
    execSync(`${cmd}`, {stdio: 'inherit'});
  } catch (e) {
    console.error(`Failed to execute ${cmd}`, e);
    return false;
  }
  return true;
};

console.log('Cloning the repository...');
if (!run(`git clone --depth 1 https://github.com/lufffer/webpack ${process.argv[2]}`)) process.exit(-1);

console.log('Installing dependencies...');
if (!run(`cd ${process.argv[2]} && pnpm install`)) process.exit(-1);

run('rm -rf ../bin');

console.log('Congratulations! You are ready. Follow the following commands to start');
console.log(`cd ${process.argv[2]} && pnpm run dev`);
