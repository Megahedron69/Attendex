import type { FC } from "react";
import { Spin } from "antd";

const Loader: FC = () => {
	return (
		<>
			<Spin tip="Loading" size="large" fullscreen />
		</>
	);
};

export default Loader;
