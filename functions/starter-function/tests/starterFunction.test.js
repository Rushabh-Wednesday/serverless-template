import { baseHandler } from '../';
import * as GitService from '../../../services/github';
import * as utils from '@utils';
import data from '../data.json';
import { mockData } from '@utils/mockData';

const {
	MOCK_ORGANIZATION_SUCCESS_RESPONSE: mockSuccessResponse,
	MOCK_ORGANIZATION_FAILURE_RESPONSE: mockFailureResponse,
} = mockData;
describe('Starter Function test', () => {
	let event;
	let result;
	let repoSpy;

	beforeAll(() => {
		event = { body: JSON.stringify(data.body) };
	});
	it('should called handler correctly', async () => {
		repoSpy = jest
			.spyOn(GitService, 'getOrganizations')
			.mockResolvedValue(mockSuccessResponse);
		const apiSucessSpy = jest
			.spyOn(utils, 'apiSuccess')
			.mockReturnValue(mockSuccessResponse);
		result = await baseHandler(event, {});
		expect(repoSpy).toBeCalledWith(event.body.organization);
		expect(result).toEqual(mockSuccessResponse);
		expect(apiSucessSpy).toBeCalledWith(mockSuccessResponse);
	});

	it('should throw an error when organization is not found', async () => {
		event.body = JSON.parse(event.body);
		event.body.organization = 'wednesday-solutionss';
		repoSpy = jest
			.spyOn(GitService, 'getOrganizations')
			.mockRejectedValue(mockFailureResponse);
		jest.spyOn(utils, 'apiFailure').mockReturnValue(mockFailureResponse);
		result = await baseHandler(event, {});
		expect(repoSpy).toBeCalledWith(event.body.organization);
		expect(result).toEqual(mockFailureResponse);
	});
});
