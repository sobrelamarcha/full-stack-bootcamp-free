const handleErrors = (error, request, response, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed id" });
  } else {
    return response.status(500).end();
  }
};

module.exports = handleErrors;
