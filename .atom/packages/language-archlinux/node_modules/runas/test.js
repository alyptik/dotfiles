var runas = require('./lib/runas')
console.log(runas('rm', ['output'], {admin: true}));
// console.log(runas('ls', ['.'], {stdin: 'haha', admin: true, catchOutput: true}));
