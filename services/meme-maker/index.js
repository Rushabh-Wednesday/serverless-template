import axios from 'axios';

const generateMemeMakerClient = () => {
	const memeMakerClient = axios.create({
		baseURL: process.env.MEME_MAKER_URL,
	});
	return memeMakerClient;
};

export const getMemes = async (category) => {
	const memeMakerClient = generateMemeMakerClient();
	const repoData = await memeMakerClient.get(`/${category}`);
	return repoData;
};
