const inquirer = require('inquirer');
const { signInPrompt, signUpPrompt } = require('./inquirer/start');
const figlet = require('figlet');
const gradient = require('gradient-string');

const taco = 
    `
    .. ...... . ..... . ..... . ..... . ..... . ..... . ..... . .. .
    .. ...... . ..... .   .MNMMMMMMMMD    .. . ..... . ..... . .. .
    .. ...... . . .....  MM= NM +M...=MMMM,OM. . .. .. ...... . .. .
    .. ...... .  .....=M .+MN.M .7MN .   . .MM:   . .. ...... . .. .
    .. ...... . .... M$.?M.. N$$M .... . . ....M+............ . .. .
    .. ...... . ....M.?MM.DM..M=....?........   7M. .  ..... . .. .
    .. . ..... . ...M.8M8..:M M.........M.....D?  .M . ..... . .. .  
    .. . ..... .  ..,M.MMNMN..M.... M.. ... . .     .M  ..... ... .   
    .. ...... .  ..M.MM..+M M.. .  ...   N.... .....D? ...... . ... .
    .. ...... .  ..M.M..NM.M,... D............  .....M ..... . .. .  
    .. ...... . ..M+M .M M=... . ....  . ..N.     ..M ..... . .. .  
    .. ...... . ..MM  MMMM . M...M .... ,......M ...N:....... . .. .
    .. ...... . ..MM .M:N  .   .  ...  .  ...     ..M. ..... .  .. .
    .. ...... . .. MMMMM......  ..=ZNMNMMMMMMMMMMMNM.. ..... . ... .
    .. ...... . ....NMNMMO=.. ........... ...     . . ..... . .. .  
    .. ...... .  .............................. .  .... ...... . .. .
    `;

const startQs = [
  {
    type: 'list',
    name: 'start',
    message: '\n\n\n' + gradient.pastel(figlet.textSync('Taco Mountain', { font: 'big' })) + gradient.pastel(taco) + '\n\n',
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


