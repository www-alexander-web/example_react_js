// @flow
import type {
	CommonResponse,
	ErrorResponse,
	OrderType,
} from '@base/types';


export type PostJournalRecordsReq = {|
	botType: string,
	endDate: Date,
	limit: number,
	offset: number,
	order: OrderType,
	search: string,
	sort: string,
	startDate: Date,
	searchType: string,
|};

export type JournalRecords = {
	bot: string,
	createdAt: string,
	id: number,
	info: JSON,
	profileId: number,
	sessionId: string,
	type: string,
	updatedAt: string,
	userEmail: string,
	userID: number
}

export type PostJournalRecordsResp = {|
	...CommonResponse,
	records?: Array<JournalRecords>,
|} | ErrorResponse;

export type PostJournalRecordsCountResp = {|
	...CommonResponse,
	count?: number,
|} | ErrorResponse;
