import DatePickerFormik from 'components/forms/fields/DatePickerFormik';
import { votingEscrowContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { Form, Formik } from 'formik';
import { useApproveShibui } from 'hooks/contracts/useApproveShibui';
import { useCreateVotingEscrowLock } from 'hooks/contracts/useCreateVotingEscrowLock';
import useShibuiAllowance from 'hooks/contracts/useShibuiAllowance';
import useShibuiBalance from 'hooks/contracts/useShibuiBalance';
import { useWeb3 } from 'hooks/useWeb3';
import React from 'react';
import { Else, If, Then } from 'react-if';

const WEEK_MS = 604800000;

const LockForm: React.FC = () => {
	const [, , wallet] = useWeb3();
	const signer = wallet ? wallet.provider.getSigner() : undefined;
	const account = wallet ? wallet.account : null;

	const { mutate: createLock } = useCreateVotingEscrowLock(signer);
	const { mutate: approveShibui } = useApproveShibui(signer);
	const { data: shibuiBalance = 0 } = useShibuiBalance(account);
	const { data: shibuiAllowance = 0 } = useShibuiAllowance(account, votingEscrowContract.address);

	return (
		<>
			{/* eslint-disable-next-line no-alert */}
			<Formik
				initialValues={{ amount: 0, duration: new Date() }}
				onSubmit={(values) => {
					return createLock([
						BigNumber.from(parseEther(values.amount.toString())),
						Math.floor(values.duration.getTime() / 1000),
						{ gasLimit: 700_000 }
					]);
				}}
			>
				{(props) => (
					<Form>
						<>
							<div>
								<label htmlFor="amount" className="text-xl font-bold">
									Input the amount of Shibui you want to lock
								</label>
								<br />
								<div className="w-fit mt-4 inline-block rounded-lg border border-black px-6 py-4 font-inter">
									<input
										name="amount"
										onChange={props.handleChange}
										value={props.values.amount}
										type="number"
										className="bg-transparent"
									/>
									{/* eslint-disable-next-line no-alert */}
									<button
										type="button"
										className="border-r border-black pr-2 text-xs font-bold"
										onClick={() => props.setFieldValue('amount', Number(formatEther(shibuiBalance)))}
									>
										Max
									</button>
									<span className="pl-2">
										<span className="text-xs" role="img" aria-label="$SHIBUI">
											🌊{' '}
										</span>
										<span className="relative top-[0.05rem] text-xs font-bold">SHIBUI</span>
									</span>
								</div>
							</div>
							<div className="mt-12">
								<label htmlFor="duration" className="text-xl font-bold">
									Select the lock duration (cannot be unlocked)
								</label>
								<div className="inline-block pl-4">
									<DatePickerFormik
										name="duration"
										onChange={props.handleChange}
										value={props.values.duration}
										className="inline-block rounded-lg border border-black bg-transparent text-center"
										dateFormat="dd/MM/yyyy"
									/>
								</div>
								<div className="mt-4 flex gap-7">
									<button
										type="button"
										onClick={() => props.setFieldValue('duration', new Date(new Date().getTime() + WEEK_MS + 24 * 60 * 60))}
										className="btn border border-black bg-transparent text-base font-normal lowercase text-black hover:border-lights-300 hover:bg-transparent"
									>
										1 week
									</button>
									<button
										type="button"
										onClick={() => props.setFieldValue('duration', new Date(new Date().getTime() + WEEK_MS * 4))}
										className="btn border border-black bg-transparent text-base font-normal lowercase text-black hover:border-lights-300 hover:bg-transparent"
									>
										1 month
									</button>
									<button
										type="button"
										onClick={() => props.setFieldValue('duration', new Date(new Date().getTime() + WEEK_MS * 4 * 3))}
										className="btn border border-black bg-transparent text-base font-normal lowercase text-black hover:border-lights-300 hover:bg-transparent"
									>
										3 months
									</button>
									<button
										type="button"
										onClick={() => props.setFieldValue('duration', new Date(new Date().getTime() + WEEK_MS * 4 * 6))}
										className="btn border border-black bg-transparent text-base font-normal lowercase text-black hover:border-lights-300 hover:bg-transparent"
									>
										6 months
									</button>
								</div>
							</div>
							<div className="mt-12">
								<If
									condition={BigNumber.from(shibuiAllowance).gte(BigNumber.from(parseEther((props.values.amount || 0).toString())))}
								>
									<Then>
										<button
											type="submit"
											className="btn border border-white bg-lights-300 font-shibui text-sm lowercase text-white hover:bg-lights-400"
										>
											confirm
										</button>
									</Then>
									<Else>
										<button
											type="button"
											onClick={() => {
												return approveShibui([
													votingEscrowContract.address,
													BigNumber.from(parseEther(props.values.amount.toString())),
													{ gasLimit: 275_000 }
												]);
											}}
											className="btn border border-white bg-lights-300 font-shibui text-sm lowercase text-white hover:bg-lights-400"
										>
											approve
										</button>
									</Else>
								</If>
							</div>
						</>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default LockForm;
