import { apiSuccess, apiFailure } from '@utils';
import { getOrganizations } from '@services/github';
import { handleValidations } from '@utils/validationUtil';
import Joi from 'joi';

exports.handler = async (event, _context, callback) => {
	try {
		event.body = JSON.parse(event.body);
		const { organization } = event.body;
		const options = {
			schema: Joi.object({
				organization: Joi.string().required(),
			}),
			parameters: {
				...event.body,
			},
		};
		handleValidations(options);
		const response = await getOrganizations(organization);
		return apiSuccess(callback, response);
	} catch (error) {
		return apiFailure(callback, error);
	}
};
