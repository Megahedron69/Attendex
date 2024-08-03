import type { FC } from "react";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar: FC = () => {
	return (
		<div className="relative justify-center w-full max-w-sm hidden md:flex">
			<SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
			<input
				type="text"
				className="rounded-xl pl-10 pr-6 h-10 bg-[#0002] border-2 border-[#2f2f31] focus:outline-none focus:border-[#2f2f31] text-white w-full"
			/>
			<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white flex items-center">
				<span>⌘</span>
				<span>F</span>
			</span>
		</div>
	);
};

export default SearchBar;
