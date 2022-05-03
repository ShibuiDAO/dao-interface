import React from 'react';
import { Form, Formik } from 'formik';

const LockForm: React.FC = () => {
	return (
		<>
			{/* eslint-disable-next-line no-alert */}
			<Formik initialValues={{ amount: 0 }} onSubmit={(values) => alert(values)}>
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
									<button className="border-r border-black pr-2 text-xs font-bold" onClick={() => alert('hi')}>
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
						</>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default LockForm;
