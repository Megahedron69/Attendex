/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default function FeaturesBlocks() {
	return (
		<section className="relative" id="techStack">
			{/* Section background (needs .relative class on parent and next sibling elements) */}
			<div
				className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none"
				aria-hidden="true"
			></div>
			<div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

			<div className="relative max-w-6xl mx-auto px-4 sm:px-6">
				<div className="py-12 md:py-20">
					{/* Section header */}
					<div className="max-w-3xl mx-auto text-center pb-12 md:pb-20 mt-96 md:mt-32 lg:mt-10">
						<h2 className="h2 mb-4">Explore the stack</h2>
						<p className="text-xl text-gray-600">
							Attendex leverages state-of-the-art technologies, cutting-edge
							databases, robust server infrastructure, and modern frameworks,
							ensuring unparalleled efficiency and performance.
						</p>
					</div>

					{/* Items */}
					<div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
						{/* 1st item */}
						<div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
							<svg
								className="w-16 h-16 p-1 -mt-1 mb-2"
								viewBox="0 0 64 64"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g fill="none" fillRule="evenodd">
									<rect
										className="fill-current text-blue-600"
										width="64"
										height="64"
										rx="32"
									/>
									<g strokeWidth="2">
										<path
											className="stroke-current text-blue-300"
											d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"
										/>
										<path
											className="stroke-current text-white"
											d="M20.571 37.714h5.715L36.57 26.286h8"
										/>
										<path
											className="stroke-current text-blue-300"
											strokeLinecap="square"
											d="M41.143 34.286l3.428 3.428-3.428 3.429"
										/>
										<path
											className="stroke-current text-white"
											strokeLinecap="square"
											d="M41.143 29.714l3.428-3.428-3.428-3.429"
										/>
									</g>
								</g>
							</svg>
							<h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
								Nginx
							</h4>
							<p className="text-gray-600 text-center">
								Load balancing and reverse proxy solutions for uninterrupted
								experience
							</p>
						</div>

						{/* 2nd item */}
						<div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
							<svg
								className="w-16 h-16 p-1 -mt-1 mb-2"
								viewBox="0 0 64 64"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g fill="none" fillRule="evenodd">
									<rect
										className="fill-current text-blue-600"
										width="64"
										height="64"
										rx="32"
									/>
									<g strokeWidth="2" transform="translate(19.429 20.571)">
										<circle
											className="stroke-current text-white"
											strokeLinecap="square"
											cx="12.571"
											cy="12.571"
											r="1.143"
										/>
										<path
											className="stroke-current text-white"
											d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696"
										/>
										<path
											className="stroke-current text-blue-300"
											d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835"
										/>
									</g>
								</g>
							</svg>
							<h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
								Redis caching
							</h4>
							<p className="text-gray-600 text-center">
								Advanced caching technologies providing offline first experience
							</p>
						</div>

						{/* 3rd item */}
						<div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
							<svg
								className="w-16 h-16 p-1 -mt-1 mb-2"
								viewBox="0 0 64 64"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g fill="none" fillRule="evenodd">
									<rect
										className="fill-current text-blue-600"
										width="64"
										height="64"
										rx="32"
									/>
									<g strokeWidth="2">
										<path
											className="stroke-current text-blue-300"
											d="M34.743 29.714L36.57 32 27.43 43.429H24M24 20.571h3.429l1.828 2.286"
										/>
										<path
											className="stroke-current text-white"
											strokeLinecap="square"
											d="M34.743 41.143l1.828 2.286H40M40 20.571h-3.429L27.43 32l1.828 2.286"
										/>
										<path
											className="stroke-current text-blue-300"
											d="M36.571 32H40"
										/>
										<path
											className="stroke-current text-white"
											d="M24 32h3.429"
											strokeLinecap="square"
										/>
									</g>
								</g>
							</svg>
							<h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
								Postgre-SQL
							</h4>
							<p className="text-gray-600 text-center">
								Extremely fast Supabase cloud synced relational database.
							</p>
						</div>

						{/* 4th item */}
						<div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
							<svg
								className="w-16 h-16 p-1 -mt-1 mb-2"
								viewBox="0 0 64 64"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g fill="none" fillRule="evenodd">
									<rect
										className="fill-current text-blue-600"
										width="64"
										height="64"
										rx="32"
									/>
									<g strokeWidth="2">
										<path
											className="stroke-current text-white"
											d="M32 37.714A5.714 5.714 0 0037.714 32a5.714 5.714 0 005.715 5.714"
										/>
										<path
											className="stroke-current text-white"
											d="M32 37.714a5.714 5.714 0 015.714 5.715 5.714 5.714 0 015.715-5.715"
											opacity=".64"
										/>
										<path
											className="stroke-current text-white"
											d="M32 26.286A5.714 5.714 0 0126.286 32a5.714 5.714 0 01-5.715-5.714"
											opacity=".64"
										/>
										<path
											className="stroke-current text-white"
											d="M32 26.286a5.714 5.714 0 00-5.714-5.715 5.714 5.714 0 00-5.715 5.715"
										/>
									</g>
								</g>
							</svg>
							<h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
								NFC
							</h4>
							<p className="text-gray-600 text-center">
								Near field communication for seamless attendance logging.
							</p>
						</div>

						{/* 5th item */}
						<div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
							<svg
								className="w-16 h-16 p-1 -mt-1 mb-2"
								viewBox="0 0 64 64"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g fill="none" fillRule="evenodd">
									<rect
										className="fill-current text-blue-600"
										width="64"
										height="64"
										rx="32"
									/>
									<g strokeWidth="2" transform="translate(21.714 19.429)">
										<circle
											className="stroke-current text-white"
											strokeLinecap="square"
											cx="10.286"
											cy="10.286"
											r="1.143"
										/>
										<path
											className="stroke-current text-white"
											d="M10.286 0v2.286M10.286 18.286v2.286M0 10.286h2.286M18.286 10.286h2.286M3.399 3.399l1.619 1.619M15.839 15.839l1.619 1.619M3.399 17.172l1.619-1.619M15.839 4.733l1.619-1.619"
										/>
									</g>
								</g>
							</svg>
							<h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
								AI
							</h4>
							<p className="text-gray-600 text-center">
								AI detection ensures accuracy and minimizes errors.
							</p>
						</div>

						{/* 6th item */}
						<div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
							<svg
								className="w-16 h-16 p-1 -mt-1 mb-2"
								viewBox="0 0 64 64"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g fill="none" fillRule="evenodd">
									<rect
										className="fill-current text-blue-600"
										width="64"
										height="64"
										rx="32"
									/>
									<g strokeWidth="2">
										<path
											className="stroke-current text-blue-300"
											d="M19.429 29.714h5.714L36.57 41.143h8"
										/>
										<path
											className="stroke-current text-white"
											d="M24 22.857l5.714-5.714"
											strokeLinecap="square"
										/>
										<path
											className="stroke-current text-blue-300"
											d="M19.429 34.286h5.714L36.57 22.857h8"
										/>
										<path
											className="stroke-current text-white"
											d="M24 41.143l5.714-5.714"
											strokeLinecap="square"
										/>
									</g>
								</g>
							</svg>
							<h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
								React
							</h4>
							<p className="text-gray-600 text-center">
								Modern front-end framework for building responsive and dynamic
								user interfaces.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
