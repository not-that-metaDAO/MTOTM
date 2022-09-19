// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@jbx-protocol/contracts-v2/contracts/interfaces/IJBFundingCycleDataSource.sol';
import '@paulrberg/contracts/math/PRBMath.sol';
import  '@jbx-protocol/contracts-v2/contracts/libraries/JBConstants.sol';

contract DataSource is IJBFundingCycleDataSource {

address ETH = 0x000000000000000000000000000000000000EEEe;
uint256 rate = 9000;

  function payParams(JBPayParamsData calldata _data)
    external
    pure
    override
    returns (
      uint256 weight,
      string memory memo,
      IJBPayDelegate delegate
    )
  {

    // Forward the recieved weight and memo, and use no delegate.
    return (_data.weight, _data.memo, IJBPayDelegate(address(0)));
  }
  
  // This is unused but needs to be included to fulfill IJBFundingCycleDataSource.
  function redeemParams(JBRedeemParamsData calldata _data)
    external
    view
    override
    returns (
      uint256 reclaimAmount,
      string memory memo,
      IJBRedemptionDelegate delegate
    )
  {
    if(_data.reclaimAmount.token == ETH)
     return (PRBMath.mulDiv(_data.reclaimAmount.value, rate, JBConstants.MAX_REDEMPTION_RATE), memo, delegate);  // ie do nothing/use the fc rr of 50%
    else

     return (_data.reclaimAmount.value, memo, delegate); // 25%


  }

    function supportsInterface(bytes4 _interfaceId)
    public
    view
    virtual
    override
    returns (bool)
  {
    return
      true;
  }
}
