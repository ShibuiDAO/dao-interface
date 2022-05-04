import { useSmartContractReadCall } from '@elementfi/react-query-typechain';
import { shibuiTokenContract } from 'core/contracts';
import { BigNumberish } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useShibuiTotalSupply(): QueryObserverResult<BigNumberish> {
	return useSmartContractReadCall(shibuiTokenContract, 'totalSupply');
}
