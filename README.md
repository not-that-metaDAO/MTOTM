<p align="center">
 <img src="https://elinkling.net/wp-content/uploads/2022/06/What-Is-Atomic-Swap.webp">
</p>

<h1 align="center">Atomic Swap 💡</h1>

Smart Contracts to connect with JuiceBox contracts to facilitate an Atomic Swap of member tokens to index tokens.


## JuiceBox Contracts Needed - Rinkeby
JBController: 0xd96ecf0E07eB197587Ad4A897933f78A00B21c9a

JBTokenStore: 0x220468762c6cE4C05E8fda5cc68Ffaf0CC0B2A85

## Price Feed Initilization

#### Step 1 - Calculate Price of Token for Feed
- ($ value of tokens / $ETH price)  /  Project token amt  = Feed Price

#### Step 2 - Create ‘fake price’ Feed Contract
- Import IJBPriceFeed
- Set currentPrice() = Feed Price

#### Step 3 - Create Price Contract
- addFeedFor(2, 1, Feed Contract)
- Use 2 for currency param
- Use 1 for base_currency param

#### Step 4 - Create SingleTokenPaymentTerminalStore Contract
- Use Price contract in constructor

## Atomic Swap Implementation

#### Step 1 - Deploy ERC20Terminal – Done Via Remix/Hardhat
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






## Acknowledgements

Thanks to the [Juicebox Team](https://github.com/jbx-protocol) for providing the contracts to build the Atomic Swap.


## Support

For support, please join our [Discord](https://discord.gg/qHntazBA) channel.


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Licenses


[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://choosealicense.com/licenses/mit/)

