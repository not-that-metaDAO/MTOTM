// This script can be used to deploy the "Storage" contract using ethers.js library.
// Please make sure to compile "./contracts/1_Storage.sol" file before running this script.
// And use Right click -> "Run" from context menu of the file to run the script. Shortcut: Ctrl+Shift+S

import { launch } from './launch_Project'

(async () => {
    try {
        const result = await launch('JBController', ['0xE11152395A2AC1E93eC5b70BB64fC3385048E06f',['QmbH96jj8RTJgC9526RdsFs5dPvcsRfiRuD9797JXzcvbw', 0],
        [0,1000000000000000,0,"0x0000000000000000000000000000000000000000"],[[false,false],0,10000,0,false,false,false,false,false,false,true,false,false,false,false,false,"0x0000000000000000000000000000000000000000"]
        0,[],[],["0x765A8b9a23F58Db6c8849315C04ACf32b2D55cF8", "0xf5A7a0f313495AaC1d73e3113d502b6bD65c9D4e"],'yes',])
        console.log(`address: ${result}`)
    } catch (e) {
        console.log(e.message)
    }
  })()
