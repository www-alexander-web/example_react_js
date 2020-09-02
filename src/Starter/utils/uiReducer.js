// @flow

export default <S, A>(state: S, initialState: S, action: A): S => {
	// $FlowFixMe
	const { type } = action;
	const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(type);

	if (!matches) return state;

	const [ , requestName, requestState ] = matches;

	// $FlowFixMe
	if (type === 'RESET_UI') return initialState;
	// $FlowFixMe
	if (!state[requestName]) return state;

	return {
		...state,
		[requestName]: requestState,
	};
};
