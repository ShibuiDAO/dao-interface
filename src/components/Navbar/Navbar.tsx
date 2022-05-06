import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure } from '@headlessui/react';
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
				<Disclosure as="nav" className="border-b-2 font-semibold dark:border-darks-200 dark:bg-darks-400 dark:text-white">
					{({ open }) => (
						<>
							<div className="container mx-auto px-8 py-2">
								<div className="relative flex h-12 items-center justify-between">
									{/* Left */}
									<div className="flex items-stretch justify-start pl-0">
										<div className="flex flex-shrink-0 items-center">
											<Link href="/">
												<img src="/wide.svg" alt="ShibuiDAO header wide logo." className="cursor-pointer" />
											</Link>
										</div>
									</div>

									{/* Center */}
									<div className="flex gap-16 justify-self-center">
										<Link href="/locker">Locker</Link>
										<Link href="/farm">Farm</Link>
									</div>

									{/* Right */}
									<div className="static inset-auto right-0 ml-6 flex items-center pr-0">
										<div className="ml-6 block w-full content-center">
											<div className="hidden md:block">
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
										<div className="block md:hidden">
											<Disclosure.Button className="focus:outline-none inline-flex items-center justify-center rounded-md p-2 focus:ring-2 focus:ring-inset focus:ring-white">
												<span className="sr-only">Open main menu</span>
												{open ? (
													/* @ts-expect-error This is quite odd */
													<FontAwesomeIcon icon={faTimes} className="block h-6 w-6" aria-hidden="true" />
												) : (
													/* @ts-expect-error This is quite odd */
													<FontAwesomeIcon icon={faBars} className="block h-6 w-6" aria-hidden="true" />
												)}
											</Disclosure.Button>
										</div>
									</div>
								</div>
							</div>

							<Disclosure.Panel className="md:hidden">
								<div className="space-y-1 px-2 pt-2 pb-3 shadow-lg">
									<If condition={Boolean(wallet)}>
										<Then>
											<AccountName className="btn w-full cursor-pointer select-none rounded-md bg-lights-300 px-3 py-2 text-sm font-medium normal-case hover:bg-lights-400" />
										</Then>
										<Else>
											<button
												className="btn w-full cursor-pointer select-none rounded-md bg-lights-300 px-3 py-2 text-sm font-medium normal-case hover:bg-lights-400"
												onClick={() => connect({})}
											>
												Connect wallet
											</button>
										</Else>
									</If>
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</header>
		</>
	);
};

export default Navbar;
