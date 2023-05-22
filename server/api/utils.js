const promiseController = (api) => async (req, res) => {
  try {
    const response = await api(req, res);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
module.exports = {
  promiseController,
};
