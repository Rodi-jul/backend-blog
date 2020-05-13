import posts from '../models/Post';
import TryCatch from '../decorators/TryCatchMiddlewareDecorator';
import HttpError from '../exeptions/HttpError';

class PostsController {
	@TryCatch
	static async read(req, res) {
		const index = posts.findIndex((p) => +p.id === +req.params.id);

		if (index === -1) {
			throw new HttpError('Post not found', 404);
		}

		res.json({ post: posts[index] });
	}

	@TryCatch
	static async list(req, res) {
		res.json(posts);
	}

	@TryCatch
	static async create(req, res) {
		const nextid = Math.max(...posts.map((post) => post.id), 0) + 1;
		req.body.id = nextid;
		posts.push(req.body);
		res.json({ status: true, post: req.body });
	}

	@TryCatch
	static async update(req, res) {
		const index = posts.findIndex((p) => +p.id === +req.params.id);

		if (index === -1) {
			throw new HttpError('Post not found', 404);
		}

		posts[index].header = req.body.header;
		posts[index].content = req.body.content;

		res.json({ status: true, post: posts[index] });
	}

	@TryCatch
	static async delete(req, res) {
		const findPostIndex = posts.findIndex((p) => +p.id === +req.params.id);

		if (findPostIndex === -1) {
			throw new HttpError(`Post with ${+req.params.id} not found`, 404);
		}

		const deletePost = posts.splice(findPostIndex, 1);

		res.json({ deletePost, message: 'Post succesfully deleted' });
	}
}

export default PostsController;
