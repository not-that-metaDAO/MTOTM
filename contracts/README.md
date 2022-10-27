## Quick Start

#### MTOTM Params
- 100% of ETH paid into terminal is routed to member DAOs, split equally
- 1,000,000 meta-governance index tokens minted per ETH
- Each member DAO pays 100 ETH worth of their tokens (members will each receive 100,000,000 meta tokens)
- No redemptions allowed, no meta tokens reserved
#### Remix IDE
- Load ERC20Terminal.sol, JBController.sol, and Token.sol contracts and scripts folder via load from Github on Remix IDE Homepage.
- Compile contracts and enable optimization of 200 in Compiler tab.
- Make sure your Deploy environment is set to 'Injected Provider-Metamask' and network says Goerli.
- Right-click => Run 'Quick_Launch.ts' script, accept all three transcations, note the tx-hash of the project to load into Etherscan to obtain the Project ID.
- Skip to 'MTOTM Swap Implementation' below to complete the MTOTM swap. Approve the terminal, then pay and redeem tokens using the terminal. Interacting with JBController and JBTokenStore can be done by clicking the etherscan links below.


## JuiceBox Contracts Needed - Goerli
**JBController**: [0x7Cb86D43B665196BC719b6974D320bf674AFb395](https://goerli.etherscan.io/address/0x7Cb86D43B665196BC719b6974D320bf674AFb395#writeContract)

**JBTokenStore**: [0x1246a50e3aDaF684Ac566f0c40816fF738F309B3](https://goerli.etherscan.io/address/0x1246a50e3aDaF684Ac566f0c40816fF738F309B3#writeContract)

## Price Feed Initilization

For the MTOTM to work, there needs to be a Price Feed set up for each payment terminal. Normally, an oracle grabs current price data from a DEX like Uniswap, but we are mostly working with early-stage member projects without a liquid token. The following steps are needed pre-terminal deployment to create a 'price' of the project token that the terminal will use to mint meta tokens at a rate specified by the 'price' represented in ETH. (i.e. 'Price' of .1 ETH per DAO token, at a mint rate of 100 meta-index tokens per ETH, would mint 10 meta-index tokens for every DAO token swapped.

#### Step 1 - Calculate Price of Token for Feed
- We start with a value agreed to between DAOs and not-that-metaDAO to use for swap
- (Value of DAO tokens in ETH)  /  DAO token amt  = Feed Price

#### Step 2 - Deploy ‘fake price’ [Feed](https://github.com/not-that-metaDAO/MTOTM/blob/main/contracts/PriceFeed.sol) Contract
- Have currentPrice() return Feed Price calculated in Step 1

#### Step 3 - Deploy [Price](https://github.com/not-that-metaDAO/MTOTM/blob/main/contracts/Prices.sol) Contract
- Execute addFeedFor(2, 1, Feed Contract)

#### Step 4 - Deploy [SingleTokenPaymentTerminalStore](https://github.com/not-that-metaDAO/MTOTM/blob/main/contracts/SingleTokenPaymentTerminalStore.sol) Contract
- Constructor params {

    *Directory* [0x8E05bcD2812E1449f0EC3aE24E2C395F533d9A99](https://goerli.etherscan.io/address/0x8E05bcD2812E1449f0EC3aE24E2C395F533d9A99)
    
    *FundingCycleStore* [0xB9Ee9d8203467f6EC0eAC81163d210bd1a7d3b55](https://goerli.etherscan.io/address/0xB9Ee9d8203467f6EC0eAC81163d210bd1a7d3b55)
    
    *Use Price contract from Step 3*
    
    }

## MTOTM Initialization

After Price Feed Initilization has been completed, Terminals need to be deployed for each DAO in the MTOTM swap. Terminals handle DAO tokens coming in and meta tokens going out. They communicate with a Juicebox project that is launched to define the terms of the swap (mint rates, redemptions, allocations). Lastly, the terminals will distribute DAO tokens to the metaDAO mult-sig to complete the swap.

#### Step 1 - Deploy [ERC20Terminal](https://github.com/not-that-metaDAO/MTOTM/blob/main/contracts/ERC20Terminal.sol) – Done Via Remix/Hardhat
- One Terminal per token, allows members to pay tokens into index project and receive index tokens
- Use Price and SingleTokenPaymentTerminalStore contracts in constructor
- use 1 for currency param
- use 2 for base_currency param


#### Step 2 - Create Index Project Template - Etherscan
- JBController.launchProjectFor()
- Can also be done with Juicebox.money site
- Add terminal(s) deployed for projects

## MTOTM Swap Implementation

These steps provide Terminal contracts for member projects to swap their tokens for an index token which represents a cohort of projects participating in the funding cycle. Each member project needs a terminal to handle swaps and perform 'rage quit' redemptions.  Other contracts used to issue an ERC-20 for the index and claim tokens are Juicebox contracts JBController and JBTokenStore, stated above.   
#### Step 1 - Issue token for index - Use Project ID created in Step 2
- JBController.issueTokenFor()

#### Step 2 - Pay function on ERC20Terminal
- Done after user approves Terminal to send token – Token.approve(ERC20Terminal)
- ERC20Terminal.pay()
- pay.params {<br />
_project_ID = created in step 2 <br />
_amount  = token amount approved above<br />
_token  = token address<br />
_beneficiary = your address<br />
_minReturnedTokens = 0<br />
_preferClaimedTokens = false<br />
_memo = any string<br />
_metadata = 0x0000<br />
}

#### Step 3 -  Projects claim tokens from project
- JBTokenStore.claimFor(JBTokenStore.unclaimedBalance())

#### Step 4 - If Rage Quit is allowed, redeem index tokens set up for Terminal to send back project tokens
- ERC20Terminal.redeemTokensOf()
- Token count used to redeem is project's index token balance

#### If reserved tokens are set, send reserved tokens to designated address(s)
- JBController.distributeReservedTokensOf()



## What's Next??

#### Multi-Token Terminals
In development is a Multi-Token terminal. This will eliminate the need for a terminal to be deployed for each member DAO in a cohort, instead deploying one terminal for all cohort members while reducing gas costs and optimizing deployments. Please see [Multi-Token](https://github.com/not-that-metaDAO/MTOTM/blob/main/contracts/Multi-Token%20Terminal) for more details.

#### ERC-721 and ERC-1155 Terminals
Currently, our MTOTM only supports ERC-20 token swaps. There are many interesting cases for semi and non fungible token indexes, and we plan to build this functionality. Check out [NFT-Terminal](https://github.com/not-that-metaDAO/MTOTM/blob/main/contracts/NFT-Terminal) and the [ERC-1555 Terminal](https://github.com/not-that-metaDAO/MTOTM/blob/main/contracts/ERC-1155).


## Acknowledgements

Thanks to the [Juicebox Team](https://github.com/jbx-protocol) for providing the contracts to build the Many to one to Many Swap.