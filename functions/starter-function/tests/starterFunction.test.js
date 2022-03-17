import { baseHandler } from '../';
import * as GitService from '../../../services/github';
import * as utils from '@utils';
import data from '../data.json';
describe('Starter Function test', () => {
	let event;
	const MOCK_SUCCESS_RESPONSE = {
		data: {
			login: 'wednesday-solutions',
			id: 50692559,
			node_id: 'MDEyOk9yZ2FuaXphdGlvbjUwNjkyNTU5',
			url: 'https://api.github.com/orgs/wednesday-solutions',
			repos_url: 'https://api.github.com/orgs/wednesday-solutions/repos',
			events_url: 'https://api.github.com/orgs/wednesday-solutions/events',
			hooks_url: 'https://api.github.com/orgs/wednesday-solutions/hooks',
			issues_url: 'https://api.github.com/orgs/wednesday-solutions/issues',
			members_url:
				'https://api.github.com/orgs/wednesday-solutions/members{/member}',
			public_members_url:
				'https://api.github.com/orgs/wednesday-solutions/public_members{/member}',
			avatar_url: 'https://avatars.githubusercontent.com/u/50692559?v=4',
			description: '',
			name: 'Wednesday',
			company: null,
			blog: 'https://wednesday.is',
			location: 'Pune',
			email: 'hello@wednesday.is',
			twitter_username: 'wednesdaysol',
			is_verified: false,
			has_organization_projects: true,
			has_repository_projects: true,
			public_repos: 51,
			public_gists: 0,
			followers: 0,
			following: 0,
			html_url: 'https://github.com/wednesday-solutions',
			created_at: '2019-05-16T06:16:40Z',
			updated_at: '2022-03-14T09:44:48Z',
			type: 'Organization',
		},
	};

	beforeAll(() => {
		event = { body: JSON.stringify(data.body) };
	});
	it('should called handler correctly', async () => {
		const repoSpy = jest
			.spyOn(GitService, 'getOrganizations')
			.mockResolvedValue(MOCK_SUCCESS_RESPONSE);
		const apiSucessSpy = jest
			.spyOn(utils, 'apiSuccess')
			.mockReturnValue(MOCK_SUCCESS_RESPONSE);
		const callbackFn = () => {};
		const result = await baseHandler(event, {}, callbackFn);
		expect(repoSpy).toBeCalledWith(JSON.parse(event.body).organization);
		expect(result).toEqual(MOCK_SUCCESS_RESPONSE);
		expect(apiSucessSpy).toBeCalledWith(callbackFn, MOCK_SUCCESS_RESPONSE);
	});
});
