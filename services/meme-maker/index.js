import axios from 'axios';

const generateMemeMakerClient = () => {
	console.log('Here', process.env);
	const memeMakerClient = axios.create({
		baseURL: process.env.MEME_MAKER_URL,
	});
	return memeMakerClient;
};

export const getMemes = async (page) => {
	const memeMakerClient = generateMemeMakerClient();
	const repoData = await memeMakerClient.get(`/${page}`);
	return repoData.data;
};
