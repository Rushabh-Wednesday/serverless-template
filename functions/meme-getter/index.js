import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import httpResponseSerializer from '@middy/http-response-serializer';
import { apiSuccess, apiFailure } from '@utils';
import { getMemes } from '@services/meme-maker';
import { RESPONSE_SERIALIZER } from '@utils/constants';
import httpErrorHandler from '@middy/http-error-handler';

const baseHandler = async (event, _context) => {
	try {
		const { category } = event.pathParameters;
		const response = await getMemes(category);
		return apiSuccess(response);
	} catch (error) {
		return apiFailure(error);
	}
};

const inputSchema = {
	type: 'object',
	properties: {
		pathParameters: {
			type: 'object',
			properties: {
				category: { type: 'string', enum: ['Programming', 'Christmas'] },
			},
			required: ['category'],
		},
	},
};

const handler = middy(baseHandler)
	.use(jsonBodyParser())
	.use(validator({ inputSchema }))
	.use(
		httpResponseSerializer({
			serializers: RESPONSE_SERIALIZER,
			default: 'application/json',
		})
	)
	.use(
		httpErrorHandler({
			logger: (error) => apiFailure({ message: error.details[0].message }),
		})
	);

export { handler };
