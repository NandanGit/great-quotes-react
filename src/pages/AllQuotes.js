import { useEffect } from 'react';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

// const DUMMY_QUOTES = [
// 	{ id: '1', author: 'Nandan', text: 'Learning React is fun!' },
// 	{ id: '2', author: 'Jay', text: 'Learning VLSI is fun!' },
// 	{ id: '3', author: 'Navadeep', text: 'Learning ML is fun!' },
// 	{ id: '4', author: 'Abdul', text: 'Learning Python is fun!' },
// 	{ id: '5', author: 'SreeRam', text: 'Learning Programming is fun!' },
// ];

function AllQuotes() {
	const {
		sendRequest,
		status,
		data: loadedQuotes,
		error,
	} = useHttp(getAllQuotes, true);

	useEffect(() => {
		sendRequest();
	}, [sendRequest]);

	if (status === 'pending') {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <p className="centered focused">{error}</p>;
	}

	if (
		status === 'completed' &&
		(!loadedQuotes || loadedQuotes.length === 0)
	) {
		return <NoQuotesFound />;
	}

	return <QuoteList quotes={loadedQuotes} />;
}

export default AllQuotes;
