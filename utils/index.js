export const apiFailure = (callback, error, statusCode = 500) => {
	const errMessage = error.message || 'Something went wrong!';
	return callback(null, {
		statusCode,
		body: JSON.stringify({
			errorCode: error.code || statusCode,
			errMessage,
		}),
	});
};

export const apiSuccess = (callback, data) => {
	console.log('success', JSON.stringify(data));
	return callback(null, { body: JSON.stringify({ data }) });
};
