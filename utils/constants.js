module.exports = {
	RESPONSE_SERIALIZER: [
		{
			regex: /^application\/xml$/,
			serializer: ({ body }) => `<message>${body}</message>`,
		},
		{
			regex: /^application\/json$/,
			serializer: ({ body }) => JSON.stringify(body),
		},
		{
			regex: /^text\/plain$/,
			serializer: ({ body }) => body,
		},
	],
};
