import DepositRewardsOnlyGaugeForm from 'components/DAO/Farm/DepositRewardsOnlyGaugeForm';
import WithdrawRewardsOnlyGaugeForm from 'components/DAO/Farm/WithdrawRewardsOnlyGaugeForm';
import { externalLPPairsRewardsOnlyGauges } from 'core/contracts';
import useClaimableRewardsOnlyGaugeRewards from 'hooks/contracts/rewardsOnlyGauge/useClaimableRewardsOnlyGaugeRewards';
import { useClaimRewards } from 'hooks/contracts/rewardsOnlyGauge/useClaimRewards';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import useTokenTotalSupply from 'hooks/contracts/useTokenTotalSupply';
import { useWeb3 } from 'hooks/useWeb3';
import { NextPage } from 'next';
import React from 'react';
import { calculate18DecimalPercentage, format18DecimalBalance } from 'utils/utils';

const WAGMIFarmPage: NextPage = () => {
	const gaugeName = 'SHIBUI-USDT<>WAGMIv3';
	const gaugeAddress = externalLPPairsRewardsOnlyGauges.get(gaugeName)!;
	const shibuiUSDT = '0x3f714fe1380ee2204ca499d1d8a171cbdfc39eaa';
	const WAGMIv3 = '0xC6158B1989f89977bcc3150fC1F2eB2260F6cabE';

	const [, , wallet] = useWeb3();
	const account = wallet ? wallet.account : null;
	const signer = wallet ? wallet.provider.getSigner() : undefined;

	const { data: lpPairBalance = 0 } = useTokenBalance(account, shibuiUSDT);
	const { data: gaugeDepositBalance = 0 } = useTokenBalance(account, gaugeAddress);
	const { data: gaugeTotalSupply = 0 } = useTokenTotalSupply(gaugeAddress);
	const { data: claimableRewards = 0 } = useClaimableRewardsOnlyGaugeRewards(account, WAGMIv3, gaugeAddress);

	const { mutate: claimRewards } = useClaimRewards(signer, gaugeAddress);

	return (
		<>
			<div className="container">
				<div className="w-full pt-20">
					<div>
						<h1 className="text-5xl font-bold">Shibui WAGMIv3 farming</h1>
						<p className="pt-5 text-xl">
							Deposit your{' '}
							<span role="img" aria-label="Shibui-USDT">
								🌊💲
							</span>{' '}
							in the rewards gauge to receive WAGMIv3.
						</p>
					</div>
					<div className="pt-16">
						<h2 className="text-3xl font-bold">My balances</h2>
						<p className="pt-5 text-xl">These numbers represent .....</p>
						<div className="mx-14 mt-8">
							<div className="grid w-full grid-cols-3 grid-rows-2 gap-6 gap-y-12">
								<div>
									<span className="text-4xl" role="img" aria-label="$SHIBUI">
										🌊💲{' '}
									</span>
									<span className="relative top-1 text-4xl font-bold">{format18DecimalBalance(lpPairBalance)}</span>
									<p className="pt-2 text-xl">
										My{' '}
										<a
											href="https://oolongswap.com/#/add/0xF08AD7C3f6b1c6843ba027AD54Ed8DDB6D71169b/0x5DE1677344D3Cb0D7D465c10b72A8f60699C062d"
											className="border-b border-dotted border-black"
											target="_blank"
											rel="noreferrer"
										>
											ShibuiUSDT LP
										</a>{' '}
										balance
									</p>
								</div>
								<div>
									<span className="text-4xl" role="img" aria-label="$SHIBUI">
										🌊💲🏦{' '}
									</span>
									<span className="relative top-1 text-4xl font-bold">{format18DecimalBalance(gaugeDepositBalance)}</span>
									<p className="pt-2 text-xl">My deposited ShibuiUSDT LP tokens</p>
								</div>
								<div>
									<span className="relative top-1 text-4xl font-bold">
										{calculate18DecimalPercentage(gaugeTotalSupply, gaugeDepositBalance).toLocaleString('fullwide', {
											maximumFractionDigits: 5
										})}{' '}
										%
									</span>
									<p className="pt-2 text-xl">Share of gauge</p>
								</div>

								<div>
									<span className="relative top-1 text-4xl font-bold">{format18DecimalBalance(claimableRewards)} WAGMIv3</span>
									<p className="pt-2 text-xl">Claimable rewards</p>
								</div>
							</div>
						</div>
					</div>
					<div className="pt-20">
						<div className="grid w-full grid-cols-2 divide-x divide-black rounded-lg border-2 border-black">
							<div className="py-11 px-20">
								<DepositRewardsOnlyGaugeForm gaugeAddress={gaugeAddress} lpPairName="ShibuiUSDT" lpPairAddress={shibuiUSDT} />
							</div>
							<div className="py-11 px-20">
								<WithdrawRewardsOnlyGaugeForm gaugeAddress={gaugeAddress} />
							</div>
						</div>

						<div className="mt-8 w-full">
							<button
								type="button"
								className="btn w-full border border-white bg-lights-300 font-shibui text-sm lowercase text-white hover:bg-lights-400 disabled:text-darks-200"
								disabled={!Boolean(signer)}
								onClick={() => claimRewards([account || '', account || '', { gasLimit: 5_000_00 }])}
							>
								{Boolean(signer) ? 'claim rewards' : 'connect wallet'}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="py-16" />
		</>
	);
};

export default WAGMIFarmPage;
