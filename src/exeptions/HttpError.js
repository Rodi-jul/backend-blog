class HttpError extends Error {
	constructor(massage, httpStatus = 500) {
		super();
		this.httpStatus = httpStatus;
	}
}

export default HttpError;
