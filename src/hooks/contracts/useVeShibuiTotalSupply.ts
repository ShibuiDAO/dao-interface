import { useSmartContractReadCall } from '@elementfi/react-query-typechain';
import { votingEscrowContract } from 'core/contracts';
import { BigNumberish } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useVeShibuiTotalSupply(): QueryObserverResult<BigNumberish> {
	return useSmartContractReadCall(votingEscrowContract, 'totalSupply()');
}
