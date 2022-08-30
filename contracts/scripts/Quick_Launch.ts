// This script can be used to deploy the "Storage" contract using ethers.js library.
// Please make sure to compile "./Token.sol, ./ERC20Terminal, and ./JBController" file before running this script.
// And use Right click -> "Run" from context menu of the file to run the script. Shortcut: Ctrl+Shift+S

import { deploy } from './launch'
import { launch } from './launch'
import {owner} from './launch'
//import {amount} from './launch'
//import { approve } from './launch'

export let Token;
//var Token;
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
        console.log(`address: ${result.address}`)
        Token = result.address
        const terminal = await deploy('JBERC20PaymentTerminal', [Token,1,2,1,Operator,Projects,Directory,SplitsStore,Prices,SingleTokenStore,owner])
        console.log(`address: ${terminal.address}`)
        Terminal = terminal.address
        const project = await launch('JBController', [owner,['QmbH96jj8RTJgC9526RdsFs5dPvcsRfiRuD9797JXzcvbw', 0], //IPFS Hash
        [0,1000000000000000,0,"0x0000000000000000000000000000000000000000"], //Token amount per ETH
        [[false,false],0,8000,0,false,false,false,false,false,false,true,false,false,false,false,false,"0x0000000000000000000000000000000000000000"], //Funding cycle metadata (reserve amt, redemption amt)
        0, //Timestamp
        [
        [1, [[false,false,1000000000,0,"0x6eD8B3d76c3ffAE797029f8fB2f7DBd34b6Bd9eC",0,"0x0000000000000000000000000000000000000000"]]],  
        [2, [[false,false,1000000000,0,"0x6eD8B3d76c3ffAE797029f8fB2f7DBd34b6Bd9eC",0,"0x0000000000000000000000000000000000000000"]]]
        ], //Splits
        [[Terminal,Token,BigInt(1000000000000000000000000000),1,0,0]], //Provides routing from terminal to split number provided in terminal deploy
        ["0x765A8b9a23F58Db6c8849315C04ACf32b2D55cF8",Terminal],'yes',]) //Terminals
        console.log(`hash: ${project.hash}`)

       // const approval = await approve('Token', [Terminal, amount])
        // console.log(`hash: ${approval.hash}`)
    } catch (e) {
        console.log(e.message)
    }
  })()
