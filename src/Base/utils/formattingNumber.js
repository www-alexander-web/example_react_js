// @flow

const formattingNumber = (value: number, format: number, coin: string = ''): string => {
	const valueNew = value.toFixed(format);
	const numbers = valueNew.split('.');
	const text = numbers[0];

	if (text.length > 3) {
		const textReplace = String.fromCharCode(8239);
		const RegExpThousand = new RegExp(/(?:[0-9]{3})/g);
		const regReplace = `${textReplace}$`;
		const RegExpEnd = new RegExp(regReplace);
		const RegExpStart = new RegExp(/0{0,2}/);

		const deltaNumber = text.length % 3 > 0 ? 3 - (text.length % 3) : 0;
		let changeText = deltaNumber > 0 && text.length > 3 ? `${deltaNumber === 1 ? '0' : '00'}${text}` : text;
		changeText = changeText
			.replace(RegExpThousand, (item) => `${item}${textReplace}`)
			.replace(RegExpStart, '')
			.replace(RegExpEnd, '');
		return `${coin && coin === 'usd' ? '$ ' : ''}${changeText}.${numbers[1]}${
			coin && coin !== 'usd' ? ` ${coin.toUpperCase()}` : ''}`;
	}
	return valueNew;
};

export default formattingNumber;
