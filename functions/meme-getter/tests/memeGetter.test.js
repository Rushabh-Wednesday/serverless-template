import * as MemeService from '../../../services/meme-maker';
import { handler } from '../';
import data from '../data.json';
import * as utils from '@utils';

describe('testing memeGetter handler', () => {
	let event;
	const MOCK_SUCCESS_RESPONSE = {
		code: 200,
		data: [
			{
				ID: 1,
				bottomText: 'Good!',
				image: 'http://imgflip.com/s/meme/Grumpy-Cat.jpg',
				name: 'Grumpy Cat',
				rank: 10,
				tags: 'Tardar Sauce, Tabatha Bundesen, Felis domesticus',
				topText: '',
			},
			{
				ID: 7,
				bottomText: 'Winter is Coming',
				image: 'https://imgflip.com/s/meme/Brace-Yourselves-X-is-Coming.jpg',
				name: 'Brace Yourselves',
				rank: 20,
				tags:
					'Winter is Coming, Ned Stark, Sean Bean, Game of Thrones, GOT, Imminent Ned',
				topText: 'Brace Yourselves',
			},
			{
				ID: 3,
				bottomText: 'Or just ___',
				image: 'https://imgflip.com/s/meme/Futurama-Fry.jpg',
				name: 'Futurama Fry',
				rank: 30,
				tags: 'Not Sure If',
				topText: 'Not sure if ___',
			},
			{
				ID: 5,
				bottomText: 'Walk into mordor',
				image: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
				name: 'One Does Not Simply',
				rank: 40,
				tags:
					'One Does Not Simply Walk Into Mordor, Boromir, Sean Bean, Ned Stark, LOTR, Lord of the rings, One Ring',
				topText: 'One does not simply',
			},
			{
				ID: 4,
				bottomText: null,
				image: 'https://imgflip.com/s/meme/Bad-Luck-Brian.jpg',
				name: 'Bad Luck Brian',
				rank: 50,
				tags: 'Bad Luck Kyle',
				topText: null,
			},
			{
				ID: 6,
				bottomText: null,
				image: 'https://imgflip.com/s/meme/First-World-Problems.jpg',
				name: 'First World Problems',
				rank: 60,
				tags: 'Crying, FWP, White Whine',
				topText: null,
			},
			{
				ID: 2,
				bottomText: 'Who ___',
				image: 'https://imgflip.com/s/meme/Am-I-The-Only-One-Around-Here.jpg',
				name: 'Am I The Only One Around Here',
				rank: 70,
				tags: 'Dude Abides, Big Lebowski, Angry Walter Sobchak',
				topText: 'Am I the only one around here',
			},
			{
				ID: 8,
				bottomText: 'Success!',
				image: 'https://imgflip.com/s/meme/Success-Kid.jpg',
				name: 'Success Kid',
				rank: 80,
				tags: 'I hate sandcastles, eating sand',
				topText: null,
			},
			{
				ID: 9,
				bottomText: null,
				image: 'https://imgflip.com/s/meme/Awkward-Moment-Sealion.jpg',
				name: 'Awkward Moment Seal',
				rank: 90,
				tags: 'Poker Face',
				topText: null,
			},
			{
				ID: 10,
				bottomText: null,
				image: 'https://imgflip.com/s/meme/Confession-Bear.jpg',
				name: 'Confession Bear',
				rank: 100,
				tags: 'Animal, Advice',
				topText: null,
			},
			{
				ID: 15,
				bottomText: 'Enough!',
				image: 'https://imgflip.com/s/meme/Batman-Slapping-Robin.jpg',
				name: 'Batman Slapping Robin',
				rank: 110,
				tags: 'My parents are dead',
				topText: '',
			},
			{
				ID: 16,
				bottomText: '',
				image: 'https://imgflip.com/s/meme/Grandma-Finds-The-Internet.jpg',
				name: 'Grandma Finds the Internet',
				rank: 120,
				tags: 'Internet Grandma Surprise',
				topText: '',
			},
			{
				ID: 11,
				bottomText: '"Aliens"',
				image: 'https://imgflip.com/s/meme/Ancient-Aliens.jpg',
				name: 'Ancient Aliens',
				rank: 130,
				tags: 'History Channel Guy, Giorgio A Tsoukalos',
				topText: '',
			},
			{
				ID: 14,
				bottomText: '',
				image: 'https://imgflip.com/s/meme/Creepy-Condescending-Wonka.jpg',
				name: 'Condescending Wonka',
				rank: 140,
				tags:
					'Creepy WIlly Wonka, Willy wonka and the chocolate factory, Gene Wilder',
				topText: '',
			},
			{
				ID: 12,
				bottomText: '',
				image: 'https://imgflip.com/s/meme/Actual-Advice-Mallard.jpg',
				name: 'Actual Advice Mallard',
				rank: 150,
				tags: 'Green, Duck, Advice',
				topText: '',
			},
			{
				ID: 13,
				bottomText: 'But when I do ___',
				image:
					'https://imgflip.com/s/meme/The-Most-Interesting-Man-In-The-World.jpg',
				name: 'The Most Interesting Man in the World',
				rank: 160,
				tags: 'Jonathan Goldsmith',
				topText: "I don't always ___",
			},
			{
				ID: 56,
				bottomText: '',
				image: 'https://imgflip.com/s/meme/Philosoraptor.jpg',
				name: 'Philosoraptor',
				rank: 165,
				tags: 'What if, dinosaur, Velociraptor, metaphysical inquiries',
				topText: 'What if ...',
			},
			{
				ID: 17,
				bottomText: 'Everywhere',
				image: 'https://imgflip.com/s/meme/X-Everywhere.jpg',
				name: 'X, X Everywhere',
				rank: 170,
				tags: 'Toy story, Buzz lightyear, Woody',
				topText: '___, ___',
			},
			{
				ID: 20,
				bottomText: "That'd be great",
				image: 'https://imgflip.com/s/meme/That-Would-Be-Great.jpg',
				name: 'That would be great',
				rank: 180,
				tags: 'Bill Lumbergh, Office Space',
				topText: 'Yeah, If you could just ___',
			},
			{
				ID: 18,
				bottomText: '',
				image: 'https://imgflip.com/s/meme/Good-Guy-Greg.jpg',
				name: 'Good Guy Greg',
				rank: 180,
				tags: 'ggg',
				topText: '      ',
			},
			{
				ID: 258,
				bottomText: 'Show Me What You Got',
				image: 'http://i.imgur.com/6Ln3hp8.png',
				name: 'Show Me What You Got',
				rank: 188,
				tags: 'Rick and Morty, Giant Heads, Dan, Justin, Adult Swim',
				topText: '',
			},
			{
				ID: 21,
				bottomText: '',
				image: 'https://imgflip.com/readImage?iid=21808196',
				name: 'What if I told you',
				rank: 200,
				tags: 'Matrix, Morpheus, Lawrence Fishburne',
				topText: 'What if I Told You',
			},
			{
				ID: 55,
				bottomText: "Ain't nobody got time for that",
				image: 'https://imgflip.com/s/meme/Aint-Nobody-Got-Time-For-That.jpg',
				name: "Ain't nobody got time for that",
				rank: 205,
				tags: 'sweet brown Kimberly Wilkins',
				topText: '',
			},
			{
				ID: 54,
				bottomText: '',
				image: 'https://imgflip.com/s/meme/Insanity-Wolf.jpg',
				name: 'Insanity Wolf',
				rank: 205,
				tags: 'animal, insane, dog',
				topText: '',
			},
		],
		message: 'GET successful',
		next: 'http://alpha-meme-maker.herokuapp.com/2',
	};
	const MOCK_FAILURE_RESPONSE = {
		errorCode: 500,
		errMessage: 'ValidationError: "page" must be a number',
	};
	beforeAll(() => {
		event = data;
	});
	it('should callled the handler', async () => {
		const memeSpy = jest
			.spyOn(MemeService, 'getMemes')
			.mockResolvedValue(MOCK_SUCCESS_RESPONSE);
		const apiSucessSpy = jest
			.spyOn(utils, 'apiSuccess')
			.mockReturnValue(MOCK_SUCCESS_RESPONSE);
		const callbackFn = () => {};
		const result = await handler(event, {}, callbackFn);
		expect(memeSpy).toBeCalledWith(event.pathParameters.page);
		expect(result).toEqual(MOCK_SUCCESS_RESPONSE);
		expect(apiSucessSpy).toBeCalledWith(callbackFn, MOCK_SUCCESS_RESPONSE);
	});

	it('should throw error when page is passed with anyother datatype except number', async () => {
		event.pathParameters = '1';
		jest.spyOn(utils, 'apiFailure').mockReturnValue(MOCK_FAILURE_RESPONSE);
		const callbackFn = () => {};
		const result = await handler(event, {}, callbackFn);
		expect(result.errorCode).toEqual(500);
		expect(result.errMessage).toEqual(
			'ValidationError: "page" must be a number'
		);
	});
});
