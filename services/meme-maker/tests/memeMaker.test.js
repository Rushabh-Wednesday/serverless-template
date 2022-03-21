import axios from 'axios';
import { getMemes } from '../index';
import { mockData } from '@utils/mockData';

const {
	MOCK_JOKE_SUCCESS_RESPONSE: mockSuccessResponse,
	MOCK_JOKE_FAILURE_RESPONSE: mockFailureResponse,
} = mockData;
jest.mock('axios');

describe('testing getMeme api', () => {
	it('should return a joke of category Programming', async () => {
		axios.create = () => ({
			get: () => mockSuccessResponse,
		});
		const joke = await getMemes('Programming');
		expect(joke).toEqual(mockSuccessResponse);
	});
	it('should throw an error when wrong category is passed', async () => {
		axios.create = () => ({
			get: () => mockFailureResponse,
		});
		const joke = await getMemes('Progra');
		expect(joke.error).toEqual(true);
		expect(joke.code).toEqual(106);
		expect(joke.message).toEqual('No matching joke found');
	});
});
