import { useConnectWallet } from '@web3-onboard/react';
import AccountName from 'components/Account/AccountName';
import { useWeb3 } from 'hooks/useWeb3';
import Link from 'next/link';
import React from 'react';
import { Else, If, Then } from 'react-if';

const Navbar: React.FC = () => {
	const [, connect] = useConnectWallet();
	const [, , wallet] = useWeb3();

	return (
		<>
			<header className="sticky top-0 z-20 w-full">
				<div className="border-b-2 font-semibold dark:border-darks-200 dark:bg-darks-400 dark:text-white">
					<div className="container mx-auto px-8 py-2">
						<div className="relative flex h-12 items-center justify-between">
							{/* Left */}
							<div className="flex flex-1 items-stretch justify-start pl-0">
								<div className="flex flex-shrink-0 items-center">
									<Link href="/">
										<img src="/wide.svg" alt="ShibuiDAO header wide logo." />
									</Link>
								</div>
							</div>

							{/* Right */}
							<div className="static inset-auto right-0 ml-6 flex items-center pr-0">
								<div className="ml-6 block w-full content-center">
									<div className="flex justify-end space-x-4">
										<If condition={Boolean(wallet)}>
											<Then>
												<AccountName className="btn cursor-pointer select-none rounded-md bg-lights-300 px-3 py-2 text-sm font-medium normal-case hover:bg-lights-400" />
											</Then>
											<Else>
												<button
													className="btn cursor-pointer select-none rounded-md bg-lights-300 px-3 py-2 text-sm font-medium normal-case hover:bg-lights-400"
													onClick={() => connect({})}
												>
													Connect wallet
												</button>
											</Else>
										</If>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;
