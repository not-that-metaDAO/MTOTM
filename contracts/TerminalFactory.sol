// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import 'https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBERC20PaymentTerminal.sol';

contract MultiTerminal {
    JBERC20PaymentTerminal[] public _ERC;
    
    function createTerminal(
        IERC20Metadata[] calldata _tokens
    ) public {
        uint256 i;

        IJBOperatorStore _operatorStore = IJBOperatorStore(0xEDB2db4b82A4D4956C3B4aA474F7ddf3Ac73c5AB);
        IJBProjects _projects = IJBProjects(0x2d8e361f8F1B5daF33fDb2C99971b33503E60EEE);
        IJBDirectory _directory = IJBDirectory(0x1A9b04A9617ba5C9b7EBfF9668C30F41db6fC21a);
        IJBSplitsStore _splitsStore = IJBSplitsStore(0x767e488155030589c1833592E60876bbE64c1C74);
        IJBPrices _prices = IJBPrices(0xd9745D73a01603Ff7bE6a0597e3A32f0Ee74f45c);
        IJBSingleTokenPaymentTerminalStore _store = IJBSingleTokenPaymentTerminalStore(0xb814D3d1a33449830018eC945e98ae03532A8a1f);

        for(i=0; i< _tokens.length; i++)
        {
                JBERC20PaymentTerminal ERC = new JBERC20PaymentTerminal(
                _tokens[i],
                1,
                2,
                2,
                _operatorStore,
                _projects,
                _directory,
                _splitsStore,
                _prices,
                _store,
                msg.sender
                );

                _ERC.push(ERC);
        }


    }

    function allTerminals()
        public
        view
        returns (JBERC20PaymentTerminal[] memory terminals)
    {
        terminals = _ERC;
        return terminals;
    }
}
