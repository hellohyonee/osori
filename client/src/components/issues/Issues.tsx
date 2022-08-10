import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const Frame = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid #878787;
	border-radius: 20px;
	padding: 20px 0px;
	width: 700px;
	justify-content: center;
	align-items: center;
	margin-top: 30px;
`;

const Issue = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Topic = styled.div`
	text-align: center;
	font-size: 20px;
	font-weight: 900;
`;

const Answer = styled.div`
	display: flex;
	border-bottom: 1px solid #878787;
`;

const Ans = styled.button<{
	padValue: string;
	marginL?: string;
	hoverColor?: string;
	backC?: string;
	pressed: boolean;
}>`
	align-items: center;
	background: ${({ backC, pressed }) => {
		if (!pressed) {
			return backC || '#eeeeee';
		}
		return 'black';
	}};
	border: 0 solid #e2e8f0;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 1);
	box-sizing: border-box;
	color: #1a202c;
	display: inline-flex;
	font-family: Inter, sans-serif;
	font-size: 1rem;
	font-weight: 700;
	height: 45px;
	justify-content: center;
	line-height: 24px;
	overflow-wrap: break-word;
	${({ padValue }) => `padding : ${padValue} ;`}
	margin: 20px 50px;
	margin-left: ${({ marginL }) => marginL || '0px'};
	text-decoration: none;
	width: auto;
	border-radius: 8px;
	cursor: pointer;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	&:hover {
		background-color: ${({ hoverColor, pressed }) => {
			if (!pressed) {
				return hoverColor || 'rgba(81, 155, 122, 0.80)';
			}
			return 'black';
		}};
	}
`;

const Examples = styled.div`
	background-color: rgb(230, 230, 230);
	border-radius: 20px;
	width: 500px;
	margin: 20px 45px;
	padding: 10px;
	box-shadow: inset 0px 0px 10px #7c7c7c;
`;

const Example = styled.div`
	margin: 10px 0px 10px;
`;

const ExampleList1 = styled.span<{ examplListLS?: string }>`
	letter-spacing: ${({ examplListLS }) => examplListLS || '0px'};
	text-align: center;
	font-weight: 900;
	margin-left: 20px;
`;

const ExampleList2 = styled.span``;

const ConfirmDiv = styled.div`
	display: flex;
	width: 100%;
`;

const Div = styled.div`
	display: flex;
	width: 100%;
	display: flex;
	flex-direction: column;
`;
const Confirm = styled.button`
	font-size: 17px;
	font-weight: 500;
	border: 1px solid white;
	border-radius: 10px;
	background-color: white;
	margin: auto 0 0 auto;
	margin-right: 25px;
	padding: 2px;
	cursor: pointer;
`;

interface IssuesData {
	_id: string;
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
	answers?: { _id: string; answer: string }[];
}

function Issues({
	issues,
	setPageChange,
	target,
	setTop,
	setSelectIssue,
}: {
	issues: IssuesData[];
	setPageChange: React.Dispatch<React.SetStateAction<boolean>>;
	target: (EventTarget & HTMLDivElement) | null;
	setTop: React.Dispatch<React.SetStateAction<number>>;
	setSelectIssue: React.Dispatch<React.SetStateAction<string>>;
}) {
	const [check, setCheck] = useState(false);
	const [pressed, setPressed] = useState<{ [key: string]: boolean[] }>({});
	if (!check) {
		const data: { [key: string]: boolean[] } = {};
		for (const i of issues) {
			const base = [false, false, false];
			if (i.answers === undefined) {
				data[i.title] = base;
			} else {
				const { answer } = i.answers[0];
				if (answer === '네') {
					base[0] = true;
				} else if (answer === '아니요') {
					base[2] = true;
				} else {
					base[1] = true;
				}
				data[i.title] = base;
			}
		}
		setPressed(data);
		setCheck(true);
	}

	return (
		<Div>
			{issues.length > 0
				? issues.map((issue, idx) => {
						const key = `isssue${idx}`;
						return (
							<Frame key={key}>
								<Issue>
									<Topic>{issue.title}</Topic>
									<Answer>
										<Ans
											padValue="8px 25px"
											backC="#519b7a"
											marginL="50px"
											pressed={pressed[issue.title] ? pressed[issue.title][0] : false}
											onClick={() => {
												axios.get(`${process.env.REACT_APP_SERVER_URI}`).then((x) => {
													console.log('yes');
													setPressed({ ...pressed, [issue.title]: [true, false, false] });
												});
											}}
										>
											네
										</Ans>
										<Ans
											padValue="8px 10px"
											backC="#fbcd57"
											hoverColor="rgba(251, 205, 87, 0.80)"
											pressed={pressed[issue.title] ? pressed[issue.title][1] : false}
											onClick={() => {
												axios.get(`${process.env.REACT_APP_SERVER_URI}`).then((x) => {
													console.log('so');

													setPressed({ ...pressed, [issue.title]: [false, true, false] });
												});
											}}
										>
											글쎄요
										</Ans>
										<Ans
											padValue="8px 10px"
											backC="#fb7b77"
											hoverColor="rgba(251, 123, 119, 0.80)"
											pressed={pressed[issue.title] ? pressed[issue.title][2] : false}
											onClick={() => {
												axios.get(`${process.env.REACT_APP_SERVER_URI}`).then((x) => {
													setPressed({ ...pressed, [issue.title]: [false, false, true] });
												});
											}}
										>
											아니요
										</Ans>
									</Answer>
									<Examples>
										<Example>
											<ExampleList1 examplListLS="30px">네</ExampleList1>
											<ExampleList2> {issue.answerTextO}</ExampleList2>
										</Example>
										<Example>
											<ExampleList1>글쎄요</ExampleList1>
											<ExampleList2> {issue.answerTextS}</ExampleList2>
										</Example>
										<Example>
											<ExampleList1>아니요</ExampleList1>
											<ExampleList2> {issue.answerTextX}</ExampleList2>
										</Example>
									</Examples>
								</Issue>
								<ConfirmDiv>
									<Confirm
										onClick={() => {
											if (target !== null) {
												setTop(target.scrollTop);
											}
											// eslint-disable-next-line no-underscore-dangle
											setSelectIssue(issue._id);
											setPageChange(false);
										}}
									>
										통계보기
									</Confirm>
								</ConfirmDiv>
							</Frame>
						);
				  })
				: null}
		</Div>
	);
}

export default Issues;
