import { apiSuccess, apiFailure } from '@utils';
import { getMemes } from '@services/meme-maker';
import { handleValidations } from '@utils/validationUtil';
import Joi from 'joi';

exports.handler = async (event, _context, callback) => {
	try {
		const { page } = event.pathParameters;
		const options = {
			schema: Joi.object({
				page: Joi.number().required(),
			}),
			parameters: {
				...event.pathParameters,
			},
		};
		handleValidations(options);
		const response = await getMemes(page);
		return apiSuccess(callback, response);
	} catch (error) {
		return apiFailure(callback, error);
	}
};
