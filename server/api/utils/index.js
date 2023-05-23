const promiseController = (api) => async (req, res) => {
  try {
    const response = await api(req, res);
    res.json(response);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error,
    });
  }
};
module.exports = {
  promiseController,
};
