import { Fragment } from 'react';
import { Route, useParams } from 'react-router';
import Comments from './../components/comments/Comments.js';

function QuoteDetail() {
	const params = useParams();
	return (
		<Fragment>
			<h1>QuoteDetail {params.quoteID}</h1>
			<Route path={`/quotes/${params.quoteID}/comments`}>
				<Comments />
			</Route>
		</Fragment>
	);
}

export default QuoteDetail;
