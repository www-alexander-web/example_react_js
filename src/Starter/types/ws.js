// @flow

export type WsUpdateBotRes = {
	id: number,
	profileID: number,
	sessionID: string,
	type: string,
	status: string,
	coins: Array<string>,
	exchanges: Array<string>,
	startTime: string,
	updateTime: string,
	userEmail: string,
	userID: number,
	info: {
		activity: number
	}
};
