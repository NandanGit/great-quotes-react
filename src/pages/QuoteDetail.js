import { Fragment, useEffect } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HighlightedQuote from '../components/quotes/HighlightedQuote.js';
import LoadingSpinner from '../components/UI/LoadingSpinner.js';
import useHttp from '../hooks/use-http.js';
import { getSingleQuote } from '../lib/api.js';
import Comments from './../components/comments/Comments.js';

// const DUMMY_QUOTES = [
// 	{ id: '1', author: 'Nandan', text: 'Learning React is fun!' },
// 	{ id: '2', author: 'Jay', text: 'Learning VLSI is fun!' },
// 	{ id: '3', author: 'Navadeep', text: 'Learning ML is fun!' },
// 	{ id: '4', author: 'Abdul', text: 'Learning Python is fun!' },
// 	{ id: '5', author: 'SreeRam', text: 'Learning Programming is fun!' },
// ];

function QuoteDetail() {
	const routeMatch = useRouteMatch();
	// console.log(routeMatch);
	const params = useParams();

	const { quoteID } = params;

	const {
		sendRequest,
		status,
		data: loadedQuote,
		error,
	} = useHttp(getSingleQuote, true);

	useEffect(() => {
		sendRequest(quoteID);
	}, [sendRequest, quoteID]);

	if (status === 'pending') {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <p className="centered">{error}</p>;
	}
	if (!loadedQuote.text) {
		return <p className="centered">No quote found</p>;
	}
	return (
		<Fragment>
			<HighlightedQuote {...loadedQuote} />
			<Route path={routeMatch.path} exact>
				<div className="centered">
					<Link
						className="btn--flat"
						to={`${routeMatch.url}/comments`}
					>
						Comments
					</Link>
				</div>
			</Route>
			<Route path={`${routeMatch.path}/comments`}>
				<Comments />
			</Route>
		</Fragment>
	);
}

export default QuoteDetail;
