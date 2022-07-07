const serviceErrorToStatusCode = {
	notfound: 404,
};

export function notFoundError() {
	return { type: "notfound" };
}

export default function handleErrors(err, req, res, next) {
	if (err.type) {
	  return res.sendStatus(serviceErrorToStatusCode[err.type]);
	}
	return res.sendStatus(500);
  }
  