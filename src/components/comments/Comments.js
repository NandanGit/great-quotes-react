import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList.js';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
	const [isAddingComment, setIsAddingComment] = useState(false);
	const { quoteID } = useParams();

	const {
		sendRequest,
		status,
		error,
		data: loadedComments,
	} = useHttp(getAllComments);

	useEffect(() => {
		sendRequest(quoteID);
	}, [sendRequest, quoteID]);

	const startAddCommentHandler = () => {
		setIsAddingComment(true);
	};

	const addedCommentHandler = useCallback(() => {
		sendRequest(quoteID);
		setIsAddingComment(false);
	}, [sendRequest, quoteID]);

	let comments;

	if (status === 'pending') {
		comments = (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (status === 'completed' && loadedComments && loadedComments.length > 0) {
		comments = <CommentsList comments={loadedComments} />;
	}

	if (
		status === 'completed' &&
		(!loadedComments || loadedComments.length === 0)
	) {
		comments = <div className="centered">No comments yet</div>;
	}

	return (
		<section className={classes.comments}>
			<h2>User Comments</h2>
			{!isAddingComment && (
				<button className="btn" onClick={startAddCommentHandler}>
					Add a Comment
				</button>
			)}
			{isAddingComment && (
				<NewCommentForm
					quoteID={quoteID}
					onAddedComment={addedCommentHandler}
				/>
			)}
			{comments}
		</section>
	);
};

export default Comments;
