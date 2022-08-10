// This script can be used to launch a basic MTOTM using Juicebox Contracts already deployed to Rinkeby.
// Please make sure to compile "JBController, ERC20Terminal, and Token" files before running this script.
// And use Right click -> "Run" from context menu of the file to run the script. Shortcut: Ctrl+Shift+S

import { deploy } from './launch'
import { launch } from './launch'


let owner = 'YOUR_ADDRESS';
var Token;
var Terminal;
let Operator    = '0xEDB2db4b82A4D4956C3B4aA474F7ddf3Ac73c5AB';
let Projects    = '0x2d8e361f8F1B5daF33fDb2C99971b33503E60EEE';
let Directory   = '0x1A9b04A9617ba5C9b7EBfF9668C30F41db6fC21a';
let SplitsStore = '0x767e488155030589c1833592E60876bbE64c1C74';
let Prices      = '0xd9745D73a01603Ff7bE6a0597e3A32f0Ee74f45c';
let SingleTokenStore = '0xb814D3d1a33449830018eC945e98ae03532A8a1f';


(async () => {
    try {
        const result = await deploy('Token', ['TEST', "T"])
        Token = result.address
        const terminal = await deploy('JBERC20PaymentTerminal', [Token,1,2,2,Operator,Projects,Directory,SplitsStore,Prices,SingleTokenStore,owner])
        Terminal = terminal.address
        const project = await launch('JBController', [owner,['QmbH96jj8RTJgC9526RdsFs5dPvcsRfiRuD9797JXzcvbw', 0],
        [0,1000000000000000,0,"0x0000000000000000000000000000000000000000"],[[false,false],0,10000,0,false,false,false,false,false,false,true,false,false,false,false,false,"0x0000000000000000000000000000000000000000"]
        0,[],[],["0x765A8b9a23F58Db6c8849315C04ACf32b2D55cF8", Terminal],'yes',])
        console.log(`project hash: ${project.hash}`)
    } catch (e) {
        console.log(e.message)
    }
  })()
