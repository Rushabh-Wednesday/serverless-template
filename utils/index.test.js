import { apiSuccess } from '.';

describe('calls the apiSuccess function correctly', () => {
	it('should call the success correctly', () => {
		const result = apiSuccess('mocked');
		expect(result.statusCode).toEqual(200);
		expect(result.body).toEqual('mocked');
	});
});
