import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

const root = path.join.bind(this, __dirname, '../');
dotenv.config({ path: root('.env') });

const app = express();

app.get('/', (request, response) => {
	response.send('Hello, Julie!');
});

app.listen(process.env.PORT, () => {
	console.log(`Express server run HTTP://${process.env.HOST}:${process.env.PORT}`);
});
