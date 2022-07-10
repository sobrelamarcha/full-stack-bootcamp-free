const handleErrors = (error, request, response, next) => {
  console.error(error);
  console.error("el error name es", error.name);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed id" });
  } else if (error.name === "MongoServerError") {
    return response.status(400).json({ error: error.message });
  } else {
    return response.status(500).end();
  }
};

module.exports = handleErrors;
