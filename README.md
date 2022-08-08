<p align="center">
 <img src="https://elinkling.net/wp-content/uploads/2022/06/What-Is-Atomic-Swap.webp">
</p>

<h1 align="center">MTOTM 💡</h1>

These smart contracts extend JuiceBox contracts to facilitate a Many to One to Many ("MTOTM") atomic swap of member tokens to index tokens. 

This allows for many DAOs to do a swap together, thereby creating a shared token that can be used for governance of a meta governance DAO and can be used for diversification by each of the DAOs as well.

With our protocol, MTOTM provides the FDCAO platform a one-stop-shop for fundraising and indexation with minimal friction.

## JuiceBox Contracts Needed - Rinkeby
JBController: 0xd96ecf0E07eB197587Ad4A897933f78A00B21c9a

JBTokenStore: 0x220468762c6cE4C05E8fda5cc68Ffaf0CC0B2A85

## Price Feed Initilization

For the MTOTM to work, there needs to be a Price Feed set up for each payment terminal. Normally, an oracle grabs current price data from a DEX like Uniswap, but we are mostly working with early-stage member projects without a liquid token. The following steps are needed pre-terminal deployment to create a 'price' the terminal will use to mint index tokens at a rate specified by the 'price'.

#### Step 1 - Calculate Price of Token for Feed
- ($ value of tokens / $ETH price)  /  Project token amt  = Feed Price

#### Step 2 - Create ‘fake price’ Feed Contract
- Import IJBPriceFeed
- Set currentPrice() = Feed Price

#### Step 3 - Create [Price](https://github.com/The-Funding-Cooperative-DAO/MTOTM/blob/main/contracts/Prices.sol) Contract
- addFeedFor(2, 1, Feed Contract)
- Use 2 for currency param
- Use 1 for base_currency param

#### Step 4 - Create [SingleTokenPaymentTerminalStore](https://github.com/The-Funding-Cooperative-DAO/MTOTM/blob/main/contracts/SingleTokenPaymentTerminalStore.sol) Contract
- Use Price contract in constructor

## Many to One to Many swap implementation

These steps provide Terminal contracts for member projects to swap their tokens for an index token which represents a cohort of projects participating in the funding cycle. Each member project needs to a terminal to handle swaps and perform 'rage quit' redemptions.  Other contracts used to issue an ERC-20 for the index and claim tokens are Juicebox contracts JBController and JBTokenStore, stated above.   

#### Step 1 - Deploy [ERC20Terminal](https://github.com/The-Funding-Cooperative-DAO/MTOTM/blob/main/contracts/ERC20Terminal.sol) – Done Via Remix/Hardhat
- One Terminal per token, allows members to pay tokens into index project and receive index tokens
- Use Price and SingleTokenPaymentTerminalStore contracts in constructor
- use 1 for currency param
- use 2 for base_currency param


#### Step 2 - Create Index Project Template - Etherscan
- JBController.launchProjectFor()
- Can also be done with Juicebox.money site
- Add terminal(s) deployed for projects 

#### Step 3 - Issue token for index
- JBController.issueTokenFor()

#### Step 4 - Pay function on ERC20Terminal
- Done after user approves Terminal to send token – ProjectToken.approve(ERC20Terminal)
- ERC20Terminal.pay()

#### Step 5 -  Projects claim tokens from project
- JBTokenStore.claimFor(JBTokenStore.unclaimedBalance())

#### If Rage Quit is allowed, redeem index tokens set up for Terminal to send back project tokens
- ERC20Terminal.redeemTokensOf()
- Token count used to redeem is project's index token balance

#### If reserved tokens are set, send reserved tokens to designated address(s)
- JBController.distributeReservedTokensOf()



## What's Next??

#### Multi-Token Terminals
In development is a Multi-Token terminal. This will eliminate the need for a terminal to be deployed for each member DAO in a cohort, instead deploying one terminal for all cohort members while reducing gas costs and optimizing deployments. Please see [Multi-Token](https://github.com/The-Funding-Cooperative-DAO/MTOTM/tree/main/contracts/Multi-Token%20Terminal) for more details.

#### ERC-721 and ERC-1155 Terminals
Currently, our MTOTM only supports ERC-20 token swaps. There are many interesting cases for semi and non fungible token indexes, and we plan to build this functionality. Check out [NFT-Terminal](https://github.com/The-Funding-Cooperative-DAO/MTOTM/tree/main/contracts/NFT-Terminal).


## Acknowledgements

Thanks to the [Juicebox Team](https://github.com/jbx-protocol) for providing the contracts to build the Many to one to Many Swap.


## Support

For support, please join our [Discord](https://discord.gg/qHntazBA) channel.


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Licenses


[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://choosealicense.com/licenses/mit/)

