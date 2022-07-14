# Atomic-Swap

## Contracts to connect with JuiceBox contracts to facilitate an Atomic Swap of Member tokens to Index Tokens.

Step 1. Deploy ERC20Terminal – Done Via Remix/Hardhat
•	One Terminal per token, allows members to pay tokens into index project and receive index tokens
•	Must interact with JBPrices contract to compute member token for index token (1:1) value


Step 2.  Create Index Project Template - Etherscan
•	JBController.launchProjectFor()
•	Can also be done with Juicebox.money site
•	Add terminal(s) deployed for projects

_owner (address) 
_projectMetadata (tuple) 
_data (tuple) 
_metadata (tuple) 
_mustStartAtOrAfter (uint256) 
_groupedSplits (tuple[]) 
_fundAccessConstraints (tuple[]) 
_terminals (address[]) 
_memo (string) 

Step 4.  Issue token for index
•	JBController.issueTokenFor()
¬¬
Step 5. Pay function on ERC20Terminal
•	Done after user approves Terminal to send token – ProjectToken.approve(ERCTerminal)
•	JBERC20PaymentTerminal.pay()

Step 6. Projects claim tokens from project
•	JBTokenStore.claimFor(JBTokenStore.unclaimedBalance())

Step 7. Redeem tokens set up for Terminal to send back in a specific time frame if Rage Quit is allowed
•	JBERC20PaymentTerminal.redeemTokensOf()


