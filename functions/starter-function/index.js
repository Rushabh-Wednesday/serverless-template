import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import httpResponseSerializer from '@middy/http-response-serializer';
import { apiSuccess, apiFailure } from '@utils';
import { getOrganizations } from '@services/github';
import { RESPONSE_SERIALIZER } from '@utils/constants';

export const baseHandler = async (event, _context) => {
	try {
		const { organization } = event.body;
		const response = await getOrganizations(organization);
		return apiSuccess(response);
	} catch (error) {
		return apiFailure(error);
	}
};

const inputSchema = {
	type: 'object',
	properties: {
		body: {
			type: 'object',
			properties: {
				organization: { type: 'string' },
			},
			required: ['organization'],
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
	);

export { handler };
