export class MockResponse {
	constructor (args) {
		args = args || {};
		this.statusCode = args.statusCode;
	  this.body = args.body;
	  this.url = args.url;
	}

	status = (statusCode) => {
		this.statusCode = statusCode;
		return this;
	}

	send = (body) => {
		this.body = body;
		return this;
	}

	redirect = (url) => {
		this.url = url;
		this.statusCode = 301;
		return this;
	}
}