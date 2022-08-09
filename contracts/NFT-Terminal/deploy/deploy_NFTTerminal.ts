// This script can be used to deploy the "Storage" contract using ethers.js library.
// Please make sure to compile "./contracts/1_Storage.sol" file before running this script.
// And use Right click -> "Run" from context menu of the file to run the script. Shortcut: Ctrl+Shift+S

import { deploy } from './ethers-lib'

(async () => {
    try {
        const result = await deploy('NFTPaymentTerminal', ['0x2d8160c04E03a6eaD57e6266bF1872115274F073',1,2,2,
        '0xEDB2db4b82A4D4956C3B4aA474F7ddf3Ac73c5AB','0x2d8e361f8F1B5daF33fDb2C99971b33503E60EEE', '0x1A9b04A9617ba5C9b7EBfF9668C30F41db6fC21a',
        '0x767e488155030589c1833592E60876bbE64c1C74', '0xA08f7331c6c7dD39097f2cf2E356Ce25Bd47896e', '0x96307B04362E809B2E10a6be4A99bf404Ab590a5','0xE11152395A2AC1E93eC5b70BB64fC3385048E06f'])
        console.log(`address: ${result}`)
    } catch (e) {
        console.log(e.message)
    }
  })()
