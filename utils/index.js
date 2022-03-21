export const apiFailure = (error, statusCode = 500) => {
	const errMessage = error.message || 'Something went wrong!';
	return {
		statusCode,
		body: {
			errorCode: error.code || statusCode,
			errMessage,
		},
	};
};

export const apiSuccess = (data) => ({
	statusCode: 200,
	body: data,
});
