import type { FC } from "react";
import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const Footer: FC = function () {
	return (
		<AntFooter style={{ background: "#fafafa" }}>
			<Row className="just">
				<Col xs={24} md={12} lg={12}>
					<div className="copyright">
						© 2024, made with
						{<HeartFilled />} by
						<a
							href="https://github.com/Megahedron69/Attendex"
							className="font-weight-bold"
							target="_blank"
						>
							Team attendex
						</a>
						for a better web.
					</div>
				</Col>
				<Col xs={24} md={12} lg={12}>
					<div className="footer-menu">
						<ul>
							<li className="nav-item">
								<a
									href="https://github.com/Megahedron69/Attendex"
									className="nav-link text-muted"
									target="_blank"
								>
									Attendex
								</a>
							</li>
							<li className="nav-item">
								<a
									href="https://github.com/Megahedron69"
									className="nav-link text-muted"
									target="_blank"
								>
									About Us
								</a>
							</li>
							<li className="nav-item">
								<a
									href="https://github.com/Megahedron69/Attendex"
									className="nav-link text-muted"
									target="_blank"
								>
									Repository
								</a>
							</li>
							<li className="nav-item">
								<a
									href="https://github.com/Megahedron69/Attendex/blob/master/client/attendex-web/LICENSE"
									className="nav-link pe-0 text-muted"
									target="_blank"
								>
									License
								</a>
							</li>
						</ul>
					</div>
				</Col>
			</Row>
		</AntFooter>
	);
};

export default Footer;
