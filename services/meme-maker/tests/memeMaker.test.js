import { getMemes } from '../index';

describe('testing getMeme api', () => {
	it('should return array of memes and code as 200', async () => {
		const memeData = await getMemes(1);
		expect(memeData).toBeDefined();
		expect(memeData.code).toBe(200);
	});
});
