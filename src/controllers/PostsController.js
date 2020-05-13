import posts from '../models/Post';

class PostsController {
	static async read(req, res) {
		const index = posts.findIndex((p) => +p.id === +req.params.id);

		if (index === -1) {
			res.status(404).json({ status: false, message: 'Post not found' });
			return;
		}

		res.json({ post: posts[index] });
	}

	static async list(req, res) {
		res.json(posts);
	}

	static async create(req, res) {
		const nextid = Math.max(...posts.map((post) => post.id), 0) + 1;
		req.body.id = nextid;
		posts.push(req.body);
		res.json({ status: true, post: req.body });
	}

	static async update(req, res) {
		const index = posts.findIndex((p) => +p.id === +req.params.id);

		if (index === -1) {
			res.status(401).json({ status: false, message: 'Post not found' });
		}

		posts[index].header = req.body.header;
		posts[index].content = req.body.content;

		res.json({ status: true, post: posts[index] });
	}

	static async delete(req, res) {
		const findPostIndex = posts.findIndex((p) => +p.id === +req.params.id);

		if (findPostIndex === -1) {
			res.status(401).json({ status: false, message: `Post with ${+req.params.id} not found` });
			return;
		}

		const deletePost = posts.splice(findPostIndex, 1);

		res.json({ deletePost, message: 'Post succesfully deleted' });
	}
}

export default PostsController;
