import { ethers } from 'ethers'

/**
 * Deploy the given contract
 * @param {string} contractName name of the contract to deploy
 * @param {Array<any>} args list of constructor' parameters
 * @param {Number} accountIndex account index from the exposed account
 * @return {Contract} deployed contract
 */
export const deploy = async (contractName: string, args: Array<any>, accountIndex?: number): Promise<ethers.Contract> => {    

    console.log(`deploying ${contractName}`)
    // Note that the script needs the ABI which is generated from the compilation artifact.
    // Make sure contract is compiled and artifacts are generated
    const artifactsPath = `browser/github/The-Funding-Cooperative-DAO/MTOTM/contracts/NFT-Terminal/artifacts/${contractName}.json` // Change this for different path

    const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
    // 'web3Provider' is a remix global variable object
    
    const signer = (new ethers.providers.Web3Provider(web3Provider)).getSigner(accountIndex)

    //const contract = new ethers.Contract('0xd96ecf0E07eB197587Ad4A897933f78A00B21c9a', metadata.abi, signer)

    //const launch = await contract.projects()   

    //return launch

    const factory = new ethers.ContractFactory(metadata.abi, metadata.data.bytecode.object, signer)

    const contract = await factory.deploy(...args)   

    // The contract is NOT deployed yet; we must wait until it is mined
    await contract.deployed()
    return contract
}
