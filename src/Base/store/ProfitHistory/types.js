// @flow

import type {
	ExtractReturn,
} from '@base/utils/utilitiesTypes';
import {
	profitsRequest,
	profitsSuccess,
	profitsFail,
} from '@base/store/ProfitHistory/actions';

export type ProfitsTable = {|
  bot: string,
  profileID: number,
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
  groupIDRow: string,
	deltaRow: Array<string>,
	totalBTC: number,
  totalUSDT: number,
  accountsRow: [
    {
      accountID: number,
      accountsDeltaRow: Array<string>,
      after: Array<string>,
      before: Array<string>,
    }
  ],
|};

export type ProfitsAction = ExtractReturn<typeof profitsRequest>;
export type ProfitsSuccessAction = ExtractReturn<typeof profitsSuccess>;
export type ProfitsFailAction = ExtractReturn<typeof profitsFail>;


export type ProfitsActions =
	| ProfitsAction
	| ProfitsSuccessAction
  | ProfitsFailAction
