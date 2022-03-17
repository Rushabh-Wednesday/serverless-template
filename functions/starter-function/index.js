// import middy from '@middy/core';
// import jsonBodyParser from '@middy/http-json-body-parser';
// import validator from '@middy/validator';
// import httpErrorHandler from '@middy/http-error-handler';
import { apiSuccess, apiFailure } from '@utils';
import { getOrganizations } from '@services/github';

export const baseHandler = async (event, _context, callback) => {
	try {
		console.log('Inside baseHandler');
		const { organization } = JSON.parse(event.body);

		const response = await getOrganizations(organization);
		return apiSuccess(callback, response);
	} catch (error) {
		return apiFailure(callback, error);
	}
};

// const inputSchema = {
// 	type: 'object',
// 	properties: {
// 		body: {
// 			type: 'object',
// 			properties: {
// 				organization: { type: 'string' },
// 			},
// 			required: ['organization'],
// 		},
// 	},
// };

// const handler = middy(baseHandler)
// 	.use(jsonBodyParser())
// 	.use(validator({ inputSchema }))
// 	.use(httpErrorHandler());

// export { handler };
exports.handler = baseHandler;
