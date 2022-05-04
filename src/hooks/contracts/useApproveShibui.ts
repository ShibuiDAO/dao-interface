import { useSmartContractTransaction } from '@elementfi/react-query-typechain';
import { shibuiTokenContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { Shibui } from 'types/contracts/shibui';

export function useApproveShibui(signer: Signer | undefined): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<Shibui['approve']>> {
	return useSmartContractTransaction(shibuiTokenContract, 'approve', signer);
}
