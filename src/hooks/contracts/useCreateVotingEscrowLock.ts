import { useSmartContractTransaction } from '@elementfi/react-query-typechain';
import { votingEscrowContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { VotingEscrow } from 'types/contracts/veShibui';

export function useCreateVotingEscrowLock(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<VotingEscrow['create_lock']>> {
	return useSmartContractTransaction(votingEscrowContract, 'create_lock', signer);
}
