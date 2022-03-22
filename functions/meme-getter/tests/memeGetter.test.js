import * as memeService from '@services/meme-maker';
import { handler } from '../';
import data from '../data.json';
import * as utils from '@utils';
import { mockData } from '@utils/mockData';

const {
	MOCK_JOKE_SUCCESS_RESPONSE: mockSuccessResponse,
	MOCK_JOKE_FAILURE_RESPONSE: mockFailureResponse,
} = mockData;

describe('testing memeGetter handler', () => {
	let event;
	let result;
	beforeAll(() => {
		event = data;
	});
	it('should callled the handler', async () => {
		const memeSpy = jest
			.spyOn(memeService, 'getMemes')
			.mockResolvedValueOnce(mockSuccessResponse);
		const apiSucessSpy = jest
			.spyOn(utils, 'apiSuccess')
			.mockReturnValueOnce(mockSuccessResponse);
		result = await handler(event, {});
		expect(memeSpy).toBeCalledWith(event.pathParameters.category);
		expect(result).toEqual(mockSuccessResponse);
		expect(apiSucessSpy).toBeCalledWith(mockSuccessResponse);
	});

	it('should throw error when category is passed with any other value than Program,Christmas', async () => {
		event.pathParameters = { category: 'Program' };
		jest.spyOn(utils, 'apiFailure').mockReturnValueOnce(mockFailureResponse);
		result = await handler(event, {});
		expect(result.statusCode).toEqual(400);
		expect(result.body).toEqual('Event object failed validation');
	});
});
