// flow-typed signature: 8273680aa92766369f12e1ef042185af
// flow-typed version: <<STUB>>/connected-react-router_v6.7.0/flow_v0.120.1

/**
 * This is an autogenerated libdef stub for:
 *
 *   'connected-react-router'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare module 'connected-react-router' {
  import type {
    History,
    Location as HistoryLocation,
    Action as HistoryActionType,
  } from 'history';
  import type { Reducer, Middleware, Action } from 'redux';

  declare var LOCATION_CHANGE: '@@router/LOCATION_CHANGE';
  declare var CALL_HISTORY_METHOD: '@@router/CALL_HISTORY_METHOD';

  declare export type RouterActionType = HistoryActionType;

  declare export type Location = {|
    ...HistoryLocation,
    state: any,
  |};

  declare export type RouterState = {
    location: Location,
    action: RouterActionType,
  };

  declare export type LocationChangePayload = {
    ...RouterState,
    isFirstRendering: boolean,
  };

  declare export type LocationChangeAction = {
    type: typeof LOCATION_CHANGE,
    payload: LocationChangePayload,
  };

  declare export type CallHistoryMethodAction<A = Array<any>> = {
    type: typeof CALL_HISTORY_METHOD,
    payload: LocationActionPayload<A>,
  }

  declare type ConnectedRouterProps = {
    history: History<>,
    context?: React$Context<any>,
  };

  declare type LocationActionPayload<A = Array<any>> = {
    method: string;
    args?: A;
  }

  declare export class ConnectedRouter extends React$Component<
    ConnectedRouterProps,
    {}
  > {}

  declare export function connectRouter<S = Location>(history: History<S>)
    : Reducer<RouterState, LocationChangeAction>;

  declare export function routerMiddleware<S: {...} = {}>(history: History<>)
    : Middleware<S, any>;

  declare export var push: {
    <S: {...} | void = void>(path: string, state?: S): CallHistoryMethodAction<[ string, S ]>,
    (location: Location<>): CallHistoryMethodAction<[ Location<> ]>
  }
}
