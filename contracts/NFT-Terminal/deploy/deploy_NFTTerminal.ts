// This script can be used to deploy the "Storage" contract using ethers.js library.
// Please make sure to compile "./contracts/1_Storage.sol" file before running this script.
// And use Right click -> "Run" from context menu of the file to run the script. Shortcut: Ctrl+Shift+S

import { deploy } from './launch'
import { launch } from './launch'


let owner = '0xE11152395A2AC1E93eC5b70BB64fC3385048E06f';
var Token;
var Terminal;
let Operator    = '0xEDB2db4b82A4D4956C3B4aA474F7ddf3Ac73c5AB';
let Projects    = '0x2d8e361f8F1B5daF33fDb2C99971b33503E60EEE';
let Directory   = '0x1A9b04A9617ba5C9b7EBfF9668C30F41db6fC21a';
let SplitsStore = '0x767e488155030589c1833592E60876bbE64c1C74';
let Prices      = '0xA08f7331c6c7dD39097f2cf2E356Ce25Bd47896e';
let SingleTokenStore = '0x1e64933ee7233D4e675E66b765323898568F46AC';


(async () => {
    try {
      /*  const result = await deploy('Token', ['TEST', "T"])
        console.log(`address: ${result.address}`)
        Token = result.address*/
        const terminal = await deploy('ERC721PaymentTerminal', ["0x2d8160c04E03a6eaD57e6266bF1872115274F073",1,2,2,Operator,Projects,Directory,SplitsStore,Prices,SingleTokenStore,owner])
        console.log(`address: ${terminal.address}`)
        Terminal = terminal.address
        const project = await launch('JBController', [owner,['QmbH96jj8RTJgC9526RdsFs5dPvcsRfiRuD9797JXzcvbw', 0],
        [0,1000000000000000,0,"0x0000000000000000000000000000000000000000"],[[false,false],0,10000,0,false,false,false,false,false,false,true,false,false,false,false,false,"0x0000000000000000000000000000000000000000"]
        0,[],[],["0x765A8b9a23F58Db6c8849315C04ACf32b2D55cF8", Terminal],'yes',])
        console.log(`hash: ${project.hash}`)
    } catch (e) {
        console.log(e.message)
    }
  })()
