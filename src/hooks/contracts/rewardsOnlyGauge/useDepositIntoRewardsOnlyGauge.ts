import { useSmartContractTransaction } from '@elementfi/react-query-typechain';
import { externalLPPairsRewardsOnlyGaugeContracts } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { RewardsOnlyGauge } from 'types/contracts/veShibui';

export function useDepositIntoRewardsOnlyGauge(
	signer: Signer | undefined,
	gauge: string
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<RewardsOnlyGauge['deposit(uint256)']>> {
	return useSmartContractTransaction(externalLPPairsRewardsOnlyGaugeContracts.get(gauge), 'deposit(uint256)', signer);
}
