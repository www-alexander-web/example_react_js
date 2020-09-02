// @flow
import type {
	CommonResponse,
	ErrorResponse,
	OrderType,
} from '@base/types';

export type ProfitsItem = {|
      bot: string,
      profileID: 0,
      profit: {
        accounts: [
          {
            accountID: number,
            after: {
              [string]: number,
            },
            before: {
              [string]: number,
            }
          },
        ],
        accountsDelta: {
          [string]: number,
        },
        delta: {
          btc: 0,
          usdt: 0
        },
        groupID: string,
        total: {
          btc: 0,
          usdt: 0
        },
      },
      receivedAt: string,
      sessionID: string,
      userID: number,
|};

export type PostProfitsReq = {|
	botType?: string,
	endDate?: Date,
	limit?: number,
	offset?: number,
	order?: OrderType,
  search: string,
  searchType: string,
	sort?: string,
  startDate?: Date,
|};
export type PostProfitsResp = {
  ...CommonResponse,
  profits: Array<ProfitsItem>,
} | ErrorResponse;

export type PostProfitsCountResp = {|
	...CommonResponse,
	count?: number,
|} | ErrorResponse;
