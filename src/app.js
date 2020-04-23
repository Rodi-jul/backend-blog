import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

const root = path.join.bind(this, __dirname, '../');
dotenv.config({ path: root('.env') });

const app = express();
app.use(cors());
app.use(bodyParser.json());

/**
 * user data
 */

const users = [
	{ name: 'Yulia', login: 'yulia', password: '123' },
	{ name: 'Andrew', login: 'andrew', password: '321' },
];

const posts = [
	{
		id: 1,
		header: 'Кобаяси Исса — Я наказал ребенка',
		content:
			'Я наказал ребенка,\n' +
			'Но привязал его к дереву там,\n' +
			'Где дует прохладный ветер.' +
			'Я наказал ребенка,\n' +
			'Но привязал его к дереву там,\n' +
			'Где дует прохладный ветер.' +
			'Я наказал ребенка,\n' +
			'Но привязал его к дереву там,\n' +
			'Где дует прохладный ветер.' +
			'Я наказал ребенка,\n' +
			'Но привязал его к дереву там,\n' +
			'Где дует прохладный ветер.' +
			'Я наказал ребенка,\n' +
			'Но привязал его к дереву там,\n' +
			'Где дует прохладный ветер.' +
			'Я наказал ребенка,\n' +
			'Но привязал его к дереву там,\n' +
			'Где дует прохладный ветер.',
	},
	{
		id: 2,
		header: 'Мацуо Басё — Луна проплыла',
		content: 'Луна проплыла,\n Ветви оцепенели\n В блестках дождевых.',
	},
	{
		id: 3,
		header: 'Мацуо Басё — Прощайте, вишни',
		content: 'Прощайте, вишни!\n Цветенье ваше мой путь\n Теплом согреет.',
	},
	{
		id: 4,
		header: 'Мацуо Басё — Совсем исхудал',
		content: 'Совсем исхудал,\n И волосы отросли.\n Долгие дожди.',
	},
];

/**
 * endpoints
 */

app.post('/auth', (request, response) => {
	const { login, password } = request.body;
	const user = users.find((u) => u.login === login && u.password === password);

	if (!user) {
		response.status(401).json({ status: false, message: 'Incorrect login or password' });
	}

	response.json({ status: true, user });
});

app.get('/posts', (request, response) => {
	response.json(posts);
});

app.get('/posts/search', (request, response) => {
	const findPostIndex = posts.findIndex((p) => +p.id === +request.query.id);

	if (findPostIndex === -1) {
		response.status(401).json({ status: false, message: 'Post not found' });
		return;
	}

	response.json({ post: posts[findPostIndex] });
});

app.post('/posts', (request, response) => {
	posts.push(request.body);

	response.json({ status: true, post: request.body });
});

app.put('/posts', (request, response) => {
	const index = posts.findIndex((p) => +p.id === +request.query.id);

	if (index === -1) {
		response.status(401).json({ status: false, message: 'Post not found' });
	}

	posts[index].header = request.body.header;
	posts[index].content = request.body.content;

	response.json({ status: true, post: posts[index] });
});

app.delete('/posts', (request, response) => {
	const findPostIndex = posts.findIndex((p) => +p.id === +request.query.id);

	if (findPostIndex === -1) {
		response.status(401).json({ status: false, message: 'Post not found' });
		return;
	}

	const deletePost = posts.splice(findPostIndex, 1);

	response.json({ deletePost, message: 'Post succesfully deleted' });
});

app.use('*', (request, response) => {
	response.status(404).send('Endpoint not found on server!');
});

app.listen(process.env.PORT, () => {
	console.log(`Express server run HTTP://${process.env.HOST}:${process.env.PORT}`);
});
