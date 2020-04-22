import express from 'express';

const app = express();

app.get('/', (request, response) => {
	response.send('Hello world!');
});

app.listen(7777, () => {
	console.log('Express server listening on port 7777');
});
