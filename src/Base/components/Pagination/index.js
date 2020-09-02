// @flow

import React, {
	useState,
	useCallback,
	useEffect,
} from 'react';
import cx from 'classnames';

import styles from './Pagination.module.scss';

type PaginationProps = {|
	name?: string,
	page: number,
	count: number,
	pageSize: number,
	onChange: ({
		name: string,
		value: number,
		event?: SyntheticInputEvent<HTMLInputElement>,
	}) => void,
	className: string,
	isLoading: boolean,
|};

const Pagination = ({
	page,
	name,
	count,
	onChange,
	pageSize,
	className,
	isLoading,
}: PaginationProps) => {
	const [
		pageCount,
		setPageCount,
	] = useState<number>(Math.ceil(count / pageSize));

	const handlePageClick = useCallback((
		valueNew: number,
		event?: SyntheticInputEvent<HTMLInputElement>,
	) => {
		let valueChecked = valueNew;

		if (valueNew <= 0) {
			valueChecked = 0;
		} else if (valueNew >= pageCount - 1) {
			valueChecked = pageCount - 1;
		}

		onChange({
			name: name || '',
			value: valueChecked,
			event,
		});
	}, [
		onChange,
		name,
		pageCount,
	]);

	// eslint-disable-next-line react/no-unused-prop-types
	const handleCheckButtons = useCallback(({ item, OFFSET }: { item: number, OFFSET: number }) => {
		let offsetLeft = OFFSET;
		let offsetRight = OFFSET;
		if (page <= OFFSET) {
			offsetLeft = OFFSET + OFFSET - page;
			offsetRight = OFFSET - OFFSET + page;
		} else if (page >= pageCount - OFFSET) {
			offsetRight = OFFSET + 1;
		}
		return item <= page + offsetLeft && item >= page - offsetRight;
	}, [
		page,
		pageCount,
	]);

	useEffect(() => {
		if (count !== undefined && count !== null && isLoading !== true) {
			const countNew = Math.ceil(count / pageSize);
			setPageCount(countNew);
		}
	}, [
		count,
		isLoading,
		pageSize,
	]);

	if (pageCount <= 1) {
		return (<></>);
	}

	const getButtonNumber = (numberPage) => (
		<button
			type="button"
			className={cx(
				styles.pagination__button,
				{
					[styles['pagination__button--active']]: numberPage === page,
				},
			)}
			onClick={(event) => handlePageClick(numberPage, event)}
		>
			{numberPage + 1}
		</button>
	);

	const getPageCountNext = (pageCount_?: number) => {
		if (pageCount_ !== undefined) return pageCount;

		if (pageCount > 7) return pageCount - 3;
		if (pageCount > 6) return pageCount - 2;

		return pageCount;
	};

	return (
		<div className={cx(styles.pagination, className)}>
			<div className={styles.pagination_desktop}>
				{page > 0 && pageCount >= 10
				&& (
					<button
						type="button"
						className={styles.pagination__backward_or_forward}
						onClick={(event) => handlePageClick(page - 1, event)}
					>
						{'<'}
					</button>
				)}

				{(page > 1) && (pageCount > 3) && getButtonNumber(0)}
				{(page > 2) && (pageCount > 1) && getButtonNumber(1)}
				{(page > 3) && (pageCount < 10) && getButtonNumber(2)}

				{(page > 4) && (pageCount >= 10) && <div className={styles.pagination__ellipsis}>...</div>}

				{(page > pageCount - 5) && (pageCount > 5) && getButtonNumber(pageCount - 6)}
				{(page > pageCount - 4) && (pageCount > 4) && getButtonNumber(pageCount - 5)}
				{(page > pageCount - 3) && (pageCount > 3) && getButtonNumber(pageCount - 4)}

				{[
					...Array(getPageCountNext()).keys(),
				].map((item) => (
					handleCheckButtons({ item, OFFSET: 1 }) ? (
						<>{getButtonNumber(item)}</>
					) : <></>))}

				{/* появляются в если выбираешь последние страницы */}
				{page <= 1 && pageCount > 3 && getButtonNumber(3)}
				{page <= 2 && pageCount > 4 && getButtonNumber(4)}
				{page <= 3 && pageCount > 5 && getButtonNumber(5)}
				{((pageCount > 8 && pageCount < page + 6) || (pageCount < 10)) && getButtonNumber(pageCount - 3)}

				{(pageCount > 9 && pageCount > page + 5) && <div className={styles.pagination__ellipsis}>....</div>}

				{(pageCount > 8 && pageCount < 9) && (page > 3) && (page < 8) && getButtonNumber(pageCount - 3)}

				{pageCount > 6 && getButtonNumber(pageCount - 2)}
				{pageCount > 7 && getButtonNumber(pageCount - 1)}

				{(pageCount >= 10 && pageCount !== page + 1)
				&& (
					<button
						type="button"
						className={styles.pagination__backward_or_forward}
						onClick={(event) => handlePageClick(page + 1, event)}
					>
						{'>'}
					</button>
				)}

			</div>

			{/* Mobile */}
			<div className={styles.pagination_mobile}>
				<div className={cx(styles.pagination, className)}>
					{page > 0 && pageCount >= 7
					&& (
						<button
							type="button"
							className={styles.pagination__backward_or_forward}
							onClick={(event) => handlePageClick(page - 1, event)}
						>
							{'<'}
						</button>
					)}
					{page + 1 === pageCount && pageCount > 6 && getButtonNumber(pageCount - 5)}
					{[
						...Array(getPageCountNext(pageCount)).keys(),
					].map((item) => (
						handleCheckButtons({ item, OFFSET: 2 }) ? (
							<>{getButtonNumber(item)}</>
						) : <></>))}
					{(pageCount >= 7 && pageCount !== page + 1)
					&& (
						<button
							type="button"
							className={styles.pagination__backward_or_forward}
							onClick={(event) => handlePageClick(page + 1, event)}
						>
							{'>'}
						</button>
					)}

				</div>
			</div>
		</div>
	);
};

Pagination.defaultProps = {
	className: '',
};

export default Pagination;
