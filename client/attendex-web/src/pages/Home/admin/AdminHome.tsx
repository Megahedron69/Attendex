/* eslint-disable no-duplicate-imports */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import type { FunctionComponent } from "react";
import type { RadioChangeEvent } from "antd/lib";
import {
	Card,
	Col,
	Row,
	Typography,
	Tooltip,
	Progress,
	// Upload,
	// message,
	Button,
	Timeline,
	Radio,
} from "antd";
import {
	MenuUnfoldOutlined,
	TeamOutlined,
	UsergroupDeleteOutlined,
	UsergroupAddOutlined,
	UserSwitchOutlined,
} from "@ant-design/icons";
import Main from "../../../components/ui/Admin/Main";
import Paragraph from "antd/lib/typography/Paragraph";
import EChart from "../../../components/charts/EChart";
import LineChart from "../../../components/charts/LineChart";

import "../../../styles/AdminStyles/main.css";
import "../../../styles/AdminStyles/responsive.css";

import ava1 from "../../../assets/images/admin/images/logo-shopify.svg";
import ava2 from "../../../assets/images/admin/images/logo-atlassian.svg";
import ava3 from "../../../assets/images/admin/images/logo-slack.svg";
import ava4 from "../../../assets/images/admin/images/logo-spotify.svg";
import ava5 from "../../../assets/images/admin/images/logo-jira.svg";
import ava6 from "../../../assets/images/admin/images/logo-invision.svg";
import team1 from "../../../assets/images/admin/images/team-1.jpg";
import team2 from "../../../assets/images/admin/images/team-2.jpg";
import team3 from "../../../assets/images/admin/images/team-3.jpg";
import team4 from "../../../assets/images/admin/images/team-4.jpg";

const AdminHome: FunctionComponent = () => {
	const { Title, Text } = Typography;

	const onChange = (event: RadioChangeEvent) => {
		console.log(`radio checked:${event.target.value}`);
	};

	const [reverse, setReverse] = useState(false);

	const dollor = [<TeamOutlined />];
	const profile = [<UsergroupDeleteOutlined />];
	const heart = [<UsergroupAddOutlined />];
	const cart = [<UserSwitchOutlined />];
	const count = [
		{
			today: "Today’s Attendance",
			title: "53,000",
			persent: "+30%",
			icon: dollor,
			bnb: "bnb2",
		},
		{
			today: "Today’s Leaves",
			title: "3,200",
			persent: "+20%",
			icon: profile,
			bnb: "bnb2",
		},
		{
			today: "New Employees",
			title: "+1,200",
			persent: "-20%",
			icon: heart,
			bnb: "redtext",
		},
		{
			today: "New Requests",
			title: "$13,200",
			persent: "10%",
			icon: cart,
			bnb: "bnb2",
		},
	];

	const list = [
		{
			img: ava1,
			Title: "Soft UI Shopify Version",
			bud: "32",
			progress: <Progress percent={60} size="small" />,
			member: (
				<div className="avatar-group mt-2 flex flex-row">
					<Tooltip placement="bottom" title="Ryan Tompson">
						<img className="tootip-img" src={team1} alt="" />
					</Tooltip>
					<Tooltip placement="bottom" title="Romina Hadid">
						<img className="tootip-img" src={team2} alt="" />
					</Tooltip>
					<Tooltip placement="bottom" title="Alexander Smith">
						<img className="tootip-img" src={team3} alt="" />
					</Tooltip>
					<Tooltip placement="bottom" title="Jessica Doe">
						<img className="tootip-img" src={team4} alt="" />
					</Tooltip>
				</div>
			),
		},
		{
			img: ava2,
			Title: "Progress Track",
			bud: "24",
			progress: <Progress percent={10} size="small" />,
			member: (
				<div className="avatar-group mt-2 flex flex-row">
					<Tooltip placement="bottom" title="Ryan Tompson">
						<img className="tootip-img" src={team1} alt="" />
					</Tooltip>
					<Tooltip placement="bottom" title="Romina Hadid">
						<img className="tootip-img" src={team2} alt="" />
					</Tooltip>
				</div>
			),
		},
		{
			img: ava3,
			Title: "Fix Platform Errors",
			bud: "Not Avai",
			progress: <Progress percent={100} size="small" status="active" />,
			member: (
				<div className="avatar-group mt-2 flex flex-row">
					<Tooltip placement="bottom" title="Ryan Tompson">
						<img className="tootip-img" src={team1} alt="" />
					</Tooltip>
					<Tooltip placement="bottom" title="Romina Hadid">
						<img className="tootip-img" src={team1} alt="" />
					</Tooltip>
					<Tooltip placement="bottom" title="Alexander Smith">
						<img className="tootip-img" src={team3} alt="" />
					</Tooltip>
				</div>
			),
		},
		{
			img: ava4,
			Title: "Launch new Mobile App",
			bud: "32",
			progress: <Progress percent={100} size="small" status="active" />,
			member: (
				<div className="avatar-group mt-2 flex flex-row">
					<Tooltip placement="bottom" title="Ryan Tompson">
						<img className="tootip-img" src={team1} alt="" />
					</Tooltip>
					<Tooltip placement="bottom" title="Romina Hadid">
						<img className="tootip-img" src={team2} alt="" />
					</Tooltip>
				</div>
			),
		},
		{
			img: ava5,
			Title: "Add the New Landing Page",
			bud: "51",
			progress: <Progress percent={80} size="small" />,
			member: (
				<div className="avatar-group mt-2 flex flex-row">
					<Tooltip placement="bottom" title="Ryan Tompson">
						<img className="tootip-img" src={team1} alt="" />
					</Tooltip>
					<Tooltip placement="bottom" title="Romina Hadid">
						<img className="tootip-img" src={team2} alt="" />
					</Tooltip>
					<Tooltip placement="bottom" title="Alexander Smith">
						<img className="tootip-img" src={team3} alt="" />
					</Tooltip>
					<Tooltip placement="bottom" title="Jessica Doe">
						<img className="tootip-img" src={team4} alt="" />
					</Tooltip>
				</div>
			),
		},

		{
			img: ava6,
			Title: "Redesign Online Store",
			bud: "34",
			progress: <Progress percent={60} size="small" />,
			member: (
				<div className="avatar-group mt-2 flex flex-row">
					<Tooltip placement="bottom" title="Ryan Tompson">
						<img className="tootip-img" src={team1} alt="" />
					</Tooltip>
					<Tooltip placement="bottom" title="Romina Hadid">
						<img className="tootip-img" src={team2} alt="" />
					</Tooltip>
				</div>
			),
		},
	];

	const logList = [
		{
			title: "John Doe - Present",
			time: "09 JUL 9:05 AM",
			color: "green",
		},
		{
			title: "Jane Smith - Absent",
			time: "08 JUL 9:10 AM",
			color: "red",
		},
		{
			title: "Michael Brown - Unpaid Leave",
			time: "07 JUL 9:20 AM",
			color: "orange",
		},
		{
			title: "Emily White - Sick Leave",
			time: "06 JUL 9:15 AM",
			color: "yellow",
		},
		{
			title: "Chris Green - Present",
			time: "05 JUL 9:00 AM",
			color: "green",
		},
		{
			title: "Anna Black - Maternity Leave",
			time: "04 JUL 9:30 AM",
			color: "pink",
		},
	];

	return (
		<div className="body">
			<Main>
				<div className="layout-content">
					<Row className="rowgap-vbox" gutter={[24, 0]}>
						{count.map((c, index) => (
							<Col
								key={index}
								xs={24}
								sm={24}
								md={12}
								lg={6}
								xl={6}
								className="mb-10"
							>
								<Card bordered={false} className="criclebox ">
									<div className="number">
										<Row align="middle" gutter={[24, 0]}>
											<Col xs={18}>
												<span>{c.today}</span>
												<Title level={3}>
													{c.title} <small className={c.bnb}>{c.persent}</small>
												</Title>
											</Col>
											<Col xs={6}>
												<div className="icon-box">{c.icon}</div>
											</Col>
										</Row>
									</div>
								</Card>
							</Col>
						))}
					</Row>

					<Row gutter={[24, 0]}>
						<Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-10">
							<Card bordered={false} className="criclebox h-full">
								<EChart />
							</Card>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-10">
							<Card bordered={false} className="criclebox h-full">
								<LineChart />
							</Card>
						</Col>
					</Row>

					<Row gutter={[24, 0]}>
						<Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
							<Card bordered={false} className="criclebox cardbody h-full">
								<div className="project-ant">
									<div>
										<Title level={5}>Organistions</Title>
										<Paragraph className="lastweek">
											added this month<span className="blue">40%</span>
										</Paragraph>
									</div>
									<div className="ant-filtertabs">
										<div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
											<Radio.Group onChange={onChange} defaultValue="today">
												<Radio.Button value="today">TODAY</Radio.Button>
												<Radio.Button value="weekly">WEEKLY</Radio.Button>
												<Radio.Button value="monthly">MONTHLY</Radio.Button>
											</Radio.Group>
										</div>
									</div>
								</div>
								<div className="ant-list-box table-responsive">
									<table className="width-100">
										<thead>
											<tr>
												<th>COMPANIES</th>
												<th>MEMBERS</th>
												<th>LEAVE REQUESTS</th>
												<th>ATTENDANCE(%)</th>
											</tr>
										</thead>
										<tbody>
											{list.map((d, index) => (
												<tr key={index}>
													<td>
														<h6>
															<img
																src={d.img}
																alt=""
																className="avatar-sm mr-10"
															/>{" "}
															{d.Title}
														</h6>
													</td>
													<td>{d.member}</td>
													<td>
														<span className="text-xs font-weight-bold">
															{d.bud}{" "}
														</span>
													</td>
													<td>
														<div className="percent-progress">{d.progress}</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</Card>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
							<Card bordered={false} className="criclebox h-full">
								<div className="timeline-box">
									<Title level={5}>Logs</Title>
									<Paragraph className="lastweek" style={{ marginBottom: 24 }}>
										this month <span className="bnb2">50k+ </span>
									</Paragraph>

									<Timeline
										pending="Recording..."
										className="timelinelist"
										reverse={reverse}
									>
										{logList.map((t, index) => (
											<Timeline.Item color={t.color} key={index}>
												<Title level={5}>{t.title}</Title>
												<Text>{t.time}</Text>
											</Timeline.Item>
										))}
									</Timeline>
									<Button
										type="primary"
										className="width-100"
										onClick={() => {
											setReverse(!reverse);
										}}
										icon={<MenuUnfoldOutlined />}
									>
										Leave Requests
									</Button>
								</div>
							</Card>
						</Col>
					</Row>
				</div>
			</Main>
		</div>
	);
};

export default AdminHome;
