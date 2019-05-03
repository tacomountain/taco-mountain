const inquirer = require('inquirer');
const { signInPrompt, signUpPrompt } = require('./inquirer/start');
const figlet = require('figlet');
const gradient = require('gradient-string');

const startQs = [
  {
    type: 'list',
    name: 'start',
    message: '\n\n\n' + gradient.pastel(figlet.textSync('Taco Mountain', { font: 'big' })) + '\n\n',
    choices: ['Sign In', 'Sign Up']
  }
];

const client = () => inquirer.prompt(startQs).then(response => {
  switch(response.start) {
    case 'Sign In': 
      signInPrompt();
      break;
    case 'Sign Up':
      signUpPrompt();
      break;
  }
});

module.exports = client;


// (gradient.pastel('
//     ..... .   .MNMMMMMMMMD    .. . ..... .\n
//   . .....  MM= NM +M...=MMMM,OM. . .. .. .\n
//    .....=M .+MN.M .7MN .   . .MM:   . .. .\n
//   .... M$.?M.. N$$M .... . . ....M+.......\n
//   ....M.?MM.DM..M=....?........   7M. .   \n
//   ...M.8M8..:M M.........M.....D?  .M .   \n
//   ..,M.MMNMN..M.... M.. ... . .     .M    \n
//   ..M.MM..+M M.. .  ...   N.... .....D? ..\n
//   ..M.M..NM.M,... D............  .....M   \n
//   ..M+M .M M=... . ....  . ..N.     ..M   \n
//   ..MM  MMMM . M...M .... ,......M ...N:..\n
//   ..MM .M:N  .   .  ...  .  ...     ..M.  \n
//   .. MMMMM......  ..=ZNMNMMMMMMMMMMMNM.. .\n
//   ....NMNMMO=.. ........... ...     . .   \n
//   .............................. .  .... .\n
//   ....  .    .   .  ...  .  ...     . . ')) + 
