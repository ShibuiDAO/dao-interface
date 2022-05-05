import LockForm from 'components/DAO/Locker/LockForm';
import { shibuiTokenContract, votingEscrowContract } from 'core/contracts';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import useTokenTotalSupply from 'hooks/contracts/useTokenTotalSupply';
import { useWeb3 } from 'hooks/useWeb3';
import { NextPage } from 'next';
import React from 'react';
import { calculate18DecimalPercentage, format18DecimalBalance } from 'utils/utils';

const LockerPage: NextPage = () => {
	const [, , wallet] = useWeb3();
	const account = wallet ? wallet.account : null;

	const { data: shibuiBalance = 0 } = useTokenBalance(account, shibuiTokenContract.address);
	const { data: shibuiEscrowed = 0 } = useTokenBalance(votingEscrowContract.address, shibuiTokenContract.address);
	const { data: veShibuiBalance = 0 } = useTokenBalance(account, votingEscrowContract.address);
	const { data: veShibuiTotalSupply = 0 } = useTokenTotalSupply(votingEscrowContract.address);
	const { data: shibuiTotalSupply = 0 } = useTokenTotalSupply(shibuiTokenContract.address);

	return (
		<>
			<div className="container">
				<div className="w-full pt-20">
					<div>
						<h1 className="text-5xl font-bold">
							ShibuiDAO (
							<span role="img" aria-label="$SHIBUI">
								🌊
							</span>
							,
							<span role="img" aria-label="$SHIBUI">
								🌊
							</span>
							) locking
						</h1>
						<p className="pt-5 text-xl">
							Lock your{' '}
							<span role="img" aria-label="$SHIBUI">
								🌊
							</span>{' '}
							in the Shibui DAO to show your longerm belief and commitment to the project.
						</p>
					</div>
					<div className="pt-16">
						<h2 className="text-3xl font-bold">My voting power</h2>
						<p className="pt-5 text-xl">These numbers represent .....</p>
						<div className="mx-14 mt-8">
							<div className="grid w-full grid-cols-2 grid-rows-1">
								<div className="grid w-full grid-cols-2 grid-rows-1">
									<div>
										<span className="text-4xl" role="img" aria-label="$SHIBUI">
											🌊{' '}
										</span>
										<span className="relative top-1 text-4xl font-bold">{format18DecimalBalance(shibuiBalance)}</span>
										<p className="pt-2 text-xl">My Shibui balance</p>
									</div>
									<div>
										<span className="text-4xl" role="img" aria-label="$SHIBUI">
											🌊{' '}
										</span>
										<span className="relative top-1 text-4xl font-bold">{format18DecimalBalance(veShibuiBalance)}</span>
										<p className="pt-2 text-xl">My locked Shibui</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="pt-20">
						<h2 className="text-3xl font-bold">Lock Shibui tokens</h2>
						<p className="pt-5 text-xl">
							By locking tokens you support the long-term vision of the project while still retaining voting power.{' '}
						</p>
						<div className="mt-6 w-full rounded-lg border-2 border-black">
							<div className="py-11 px-20">
								<LockForm />
							</div>
						</div>
					</div>
					<div className="pt-20">
						<h2 className="text-3xl font-bold">Total voting power</h2>
						<p className="pt-5 text-xl">General stats about the ShibuiDAO voting power</p>
						<div className="mx-14 mt-16">
							<div className="grid w-full grid-cols-3 grid-rows-2 gap-6 gap-y-12">
								<div>
									<span className="text-4xl" role="img" aria-label="$SHIBUI">
										🌊{' '}
									</span>
									<span className="relative top-1 text-4xl font-bold">{format18DecimalBalance(shibuiEscrowed)}</span>
									<p className="pt-2 text-xl">Total Shibui vote-locked</p>
								</div>
								<div>
									<span className="text-4xl" role="img" aria-label="$SHIBUI">
										🌊{' '}
									</span>
									<span className="relative top-1 text-4xl font-bold">
										{calculate18DecimalPercentage(shibuiTotalSupply, shibuiEscrowed).toLocaleString('fullwide', {
											maximumFractionDigits: 5
										})}{' '}
										%
									</span>
									<p className="pt-2 text-xl">
										Percentage of total
										<br />
										Shibui locked
									</p>
								</div>
								<div>
									<span className="text-4xl" role="img" aria-label="$SHIBUI">
										🌊{' '}
									</span>
									<span className="relative top-1 text-4xl font-bold">{format18DecimalBalance(veShibuiTotalSupply)}</span>
									<p className="pt-2 text-xl">Total veShibui</p>
								</div>
								<div>
									<span className="relative top-1 text-4xl font-bold">0 months</span>
									<p className="pt-2 text-xl">Average lock time</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="py-16" />
		</>
	);
};

export default LockerPage;
