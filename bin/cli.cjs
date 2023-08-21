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
if (process.argv[3] === 'lib') {
  if (!run(`git clone --depth 1 -b webpack-tlib https://github.com/lufffer/webpack ${process.argv[2]}`)) {
    process.exit(-1);
  }
} else if (process.argv[3] === undefined) {
  if (!run(`git clone --depth 1 https://github.com/lufffer/webpack ${process.argv[2]}`)) {
    process.exit(-1);
  }
}

console.log('Installing dependencies...');
if (!run(`cd ${process.argv[2]} && pnpm install`)) process.exit(-1);

run('rm -rf ../bin');
if (!run(`cd ${process.argv[2]} && git remote remove origin`)) {
  console.log('Warning: Do you have git installed? origin was not removed.\nRemove it with: git remote remove origin');
};

console.log('Congratulations! You are ready. Follow the following commands to start');
console.log('pnpm run dev');
