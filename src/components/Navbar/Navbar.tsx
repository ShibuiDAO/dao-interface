import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
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
									<div className="flex justify-end space-x-4"></div>
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
