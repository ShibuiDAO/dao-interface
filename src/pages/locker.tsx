import LockForm from 'components/DAO/Locker/LockForm';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { useUserSHIBUIBalance } from 'hooks/contracts/useUserSHIBUIBalance';
import { useWeb3 } from 'hooks/useWeb3';
import { NextPage } from 'next';
import React from 'react';

const LockerPage: NextPage = () => {
	const [, , wallet] = useWeb3();
	const account = wallet ? wallet.account : null;

	const { data: shibuiBalance = 0 } = useUserSHIBUIBalance(account);

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
										<span className="relative top-1 text-4xl font-bold">{formatEther(BigNumber.from(shibuiBalance))}</span>
										<p className="pt-2 text-xl">My Shibui balance</p>
									</div>
									<div>
										<span className="text-4xl" role="img" aria-label="$SHIBUI">
											🌊{' '}
										</span>
										<span className="relative top-1 text-4xl font-bold">0</span>
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
						<div className="mx-14 mt-8">
							<div className="grid w-full grid-cols-4 grid-rows-1">
								<div>
									<span className="text-4xl" role="img" aria-label="$SHIBUI">
										🌊{' '}
									</span>
									<span className="relative top-1 text-4xl font-bold">0</span>
									<p className="pt-2 text-xl">Total Shibui vote-locked</p>
								</div>
								<div>
									<span className="text-4xl" role="img" aria-label="$SHIBUI">
										🌊{' '}
									</span>
									<span className="relative top-1 text-4xl font-bold">0</span>
									<p className="pt-2 text-xl">Percentage of total Shibui locked</p>
								</div>
								<div>
									<span className="text-4xl" role="img" aria-label="$SHIBUI">
										🌊{' '}
									</span>
									<span className="relative top-1 text-4xl font-bold">0</span>
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
