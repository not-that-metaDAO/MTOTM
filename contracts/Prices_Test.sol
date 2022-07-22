// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@paulrberg/contracts/math/PRBMath.sol';
import 'https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/interfaces/IJBPrices.sol';
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
contract Prices is Ownable, IJBPrices {
  //*********************************************************************//
  // --------------------------- custom errors ------------------------- //
  //*********************************************************************//
  error PRICE_FEED_ALREADY_EXISTS();
  error PRICE_FEED_NOT_FOUND();

  //*********************************************************************//
  // --------------------- public stored properties -------------------- //
  //*********************************************************************//

  /** 
    @notice 
    The available price feeds.
    @dev
    The feed returns the number of `_currency` units that can be converted to 1 `_base` unit.
    _currency The currency units the feed's resulting price is in terms of.
    _base The base currency unit being priced by the feed.
  */
  mapping(uint256 => mapping(uint256 => IJBPriceFeed)) public override feedFor;

  IJBPrices prices = IJBPrices(0xFF1D73AB28140b574Bb7A90e9fBCeD1eDAFce5c1);

  uint256 tokenValue;

  uint256 tokenAmt;

  //*********************************************************************//
  // ------------------------- external views -------------------------- //
  //*********************************************************************//

  /** 
    @notice
    Gets the number of `_currency` units that can be converted to 1 `_base` unit.
    @param _currency The currency units the resulting price is in terms of.
    @param _base The base currency unit being priced.
    @param _decimals The number of decimals the returned fixed point price should include.
    
    @return The price of the currency in terms of the base, as a fixed point number with the specified number of decimals.
  */
  function priceFor(
    uint256 _currency,
    uint256 _base,
    uint256 _decimals
  ) external view override returns (uint256) {
    return currentPrice();
  }

  function currentPrice()
    internal
    view
    returns (uint256 price) {
    uint256 ETHprice = prices.priceFor(2,1,18);
    price = ((tokenValue * 10**18 / ETHprice) * 10**18) / tokenAmt;
  }

  function updateValue(uint256 _value) 
    public
    onlyOwner {
    tokenValue = _value;
  }

  function updateAmt(uint256 _amt)
    public
    onlyOwner {
    tokenAmt = _amt;
  }
  //*********************************************************************//
  // ---------------------------- constructor -------------------------- //
  //*********************************************************************//

  /** 
    @param _owner The address that will own the contract.
  */
  constructor(address _owner) {
    // Transfer the ownership.
    transferOwnership(_owner);
  }

  //*********************************************************************//
  // ---------------------- external transactions ---------------------- //
  //*********************************************************************//

  /** 
    @notice 
    Add a price feed for a currency in terms of the provided base currency.
    @dev
    Current feeds can't be modified.
    @param _currency The currency units the feed's resulting price is in terms of.
    @param _base The base currency unit being priced by the feed.
    @param _feed The price feed being added.
  */
  function addFeedFor(
    uint256 _currency,
    uint256 _base,
    IJBPriceFeed _feed
  ) external override onlyOwner {
    // There can't already be a feed for the specified currency.
    if (feedFor[_currency][_base] != IJBPriceFeed(address(0))) revert PRICE_FEED_ALREADY_EXISTS();

    // Store the feed.
    feedFor[_currency][_base] = _feed;

    emit AddFeed(_currency, _base, _feed);
  }
}
