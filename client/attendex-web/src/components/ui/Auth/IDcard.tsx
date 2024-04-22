import type { FunctionComponent } from "react";

const Front: FunctionComponent = () => {
	return (
		<div className="w-full relative bg-white overflow-hidden flex flex-col items-end justify-start pt-[21px] pb-[18px] pr-[49px] pl-10 box-border gap-[10px] tracking-[normal] text-left text-[12px] text-white font-kameron">
			<img
				className="w-full h-[54px] absolute !m-[0] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden shrink-0"
				alt=""
				src="../../../assets/images/shape-2.svg"
			/>
			<img
				className="w-full h-[120.2px] absolute !m-[0] top-[0px] right-[0px] left-[0px] max-w-full overflow-hidden shrink-0"
				alt=""
				src="../../../assets/images/shape-1.svg"
			/>
			<div className="self-stretch flex flex-row items-start justify-end pt-0 pb-[5px] pr-[13px] pl-5 text-center">
				<div className="flex-1 flex flex-col items-end justify-start gap-[3px]">
					<div className="h-[15px] flex flex-row items-start justify-end py-0 pr-[30px] pl-[37px] box-border">
						<img
							className="h-[15px] w-[15px] relative overflow-hidden shrink-0 z-[1]"
							loading="lazy"
							alt=""
							src="../../../assets/images/logo.svg"
						/>
					</div>
					<div className="self-stretch flex flex-col items-start justify-start">
						<h1 className="m-0 self-stretch relative text-inherit font-normal font-inherit whitespace-pre-wrap z-[1]">
							{" "}
							BLUEINSTA
						</h1>
						<div className="flex flex-row items-start justify-start py-0 pr-0 pl-[7px] text-left text-[6px] font-roboto">
							<div className="relative inline-block min-w-[75px] z-[1]">
								125 STREET, CHICAGO, USA
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="h-[85px] flex flex-row items-start justify-end pt-0 pb-[5px] pr-[13px] pl-[22px] box-border">
				<img
					className="h-20 w-20 relative rounded-[100px] overflow-hidden shrink-0 object-cover z-[1]"
					loading="lazy"
					alt=""
					src="../../../assets/images/img02-6@2x.png"
				/>
			</div>
			<div className="flex flex-row items-start justify-end py-0 pr-3 pl-5 text-[16px] text-darkcyan">
				<div className="flex flex-col items-start justify-start">
					<h1 className="m-0 relative text-inherit font-bold font-inherit text-transparent !bg-clip-text [background:linear-gradient(0deg,_#2e9da6_12.29%,_#000f30_77.92%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block min-w-[83px]">
						JOHN DOE
					</h1>
					<div className="flex flex-row items-start justify-start py-0 pr-[19px] pl-4 text-[10px] font-roboto">
						<h2 className="m-0 relative text-inherit font-semibold font-inherit inline-block min-w-[48px]">
							DESIGNER
						</h2>
					</div>
				</div>
			</div>
			<div className="h-[92px] flex flex-col items-start justify-start gap-[7px] text-[8px] text-black font-roboto">
				<div className="relative">
					<p className="m-0">
						<span className="text-darkcyan">
							<b className="font-roboto">ID NO</b>
							<span className="font-roboto whitespace-pre-wrap">{`   `}</span>
						</span>
						<span>
							<span className="font-roboto whitespace-pre-wrap">{`    `}</span>
							<span className="font-medium"> : 905750250</span>
						</span>
					</p>
					<p className="m-0">
						<span className="text-darkcyan">
							<b className="font-roboto">Validity</b>
							<span className="font-semibold font-roboto">{` `}</span>
						</span>
						<span>
							<span className="font-roboto whitespace-pre-wrap">{`    `}</span>
							<span className="font-medium">: 2022-2024</span>
						</span>
					</p>
					<p className="m-0">
						<b className="font-roboto text-darkcyan">Phone</b>
						<span>
							<span className="font-roboto whitespace-pre-wrap">{`       `}</span>
							<span className="font-medium">: 915678326321</span>
						</span>
					</p>
					<p className="m-0">
						<b className="font-roboto text-darkcyan">E-mail</b>
						<span>
							<span className="font-roboto whitespace-pre-wrap">{`       `}</span>
							<span className="font-medium">: johndoe@gmail.com</span>
						</span>
					</p>
				</div>
				<div className="flex-1 flex flex-row items-start justify-start py-0 pr-8 pl-[34px]">
					<img
						className="h-[49px] w-[49px] relative object-cover z-[1]"
						loading="lazy"
						alt=""
						src="../../../assets/images/canvas-1@2x.png"
					/>
				</div>
			</div>
		</div>
	);
};

export default Front;
