// This script can be used to deploy the "Storage" contract using ethers.js library.
// Please make sure to compile "./contracts/1_Storage.sol" file before running this script.
// And use Right click -> "Run" from context menu of the file to run the script. Shortcut: Ctrl+Shift+S

import { deploy } from './launch_Terminal'

var Token;
let Operator    = '0xEDB2db4b82A4D4956C3B4aA474F7ddf3Ac73c5AB';
let Projects    = '0x2d8e361f8F1B5daF33fDb2C99971b33503E60EEE';
let Directory   = '0x1A9b04A9617ba5C9b7EBfF9668C30F41db6fC21a';
let SplitsStore = '0x767e488155030589c1833592E60876bbE64c1C74';
let Prices      = '0xd9745D73a01603Ff7bE6a0597e3A32f0Ee74f45c';
let SingleTokenStore = '0xb814D3d1a33449830018eC945e98ae03532A8a1f';
let owner = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';

(async () => {
    try {
        const result = await deploy('Token', ['TEST', "T"])
        console.log(`address: ${result.address}`)
        Token = result.address
        console.log(Token)
        const terminal = await deploy('JBERC20PaymentTerminal', [Token,1,2,2,Operator,Projects,Directory,SplitsStore,Prices,SingleTokenStore,owner])
        
    } catch (e) {
        console.log(e.message)
    }
  })()
