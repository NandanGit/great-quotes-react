import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import {useRouteMatch} from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, isAscending) => {
	return quotes.sort((quoteA, quoteB) => {
		if (isAscending) {
			return quoteA.id > quoteB.id ? 1 : -1;
		} else {
			return quoteA.id < quoteB.id ? 1 : -1;
		}
	});
};

const QuoteList = (props) => {
	const location = useLocation();
	const history = useHistory();
	// const routeMatch = useRouteMatch();

	const queryParams = new URLSearchParams(location.search);
	const isAscendingOrder = queryParams.get('sort') === 'asc';

	const sortedQuotes = sortQuotes(props.quotes, isAscendingOrder);

	const changeSortingHandler = () => {
		history.push({
			pathname: location.pathname,
			search: `?sort=${isAscendingOrder ? 'desc' : 'asc'}`,
		});
		// history.push(
		// 	`${location.pathname}?sort=${isAscendingOrder ? 'desc' : 'asc'}`
		// );
	};
	return (
		<Fragment>
			<div className={classes.sorting}>
				<button onClick={changeSortingHandler}>
					Sort {isAscendingOrder ? 'Descending' : 'Ascending'}
				</button>
			</div>
			<ul className={classes.list}>
				{sortedQuotes.map((quote) => (
					<QuoteItem
						key={quote.id}
						id={quote.id}
						author={quote.author}
						text={quote.text}
					/>
				))}
			</ul>
		</Fragment>
	);
};

export default QuoteList;
