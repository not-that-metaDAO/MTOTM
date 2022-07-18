// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@paulrberg/contracts/math/PRBMath.sol';
import "https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/interfaces/IJBPriceFeed.sol";
/** 
  @notice 
  Manages and normalizes price feeds.
  @dev
  Adheres to -
  IJBPrices: General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.
  @dev
  Inherits from -
  Ownable: Includes convenience functionality for checking a message sender's permissions before executing certain transactions.
*/
contract PriceFeed is IJBPriceFeed {

    function currentPrice(uint256 _decimals) public pure override returns (uint256) {
            uint256 price = 100000000000000;
            return price;
    }

  }
