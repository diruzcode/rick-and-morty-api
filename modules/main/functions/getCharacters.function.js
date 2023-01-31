const { getAll, search } = require('../services/service');

module.exports.getCharacters = async (req, res) => {
  try {
    const response = req.query.name || req.query.gender ? await search(req.query) : await getAll();
    res.send(response);
  } catch (error) {
    if (error.httpStatus) {
      res.status(error.httpStatus).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Up! Internal Server Error. ' });
    }
  }
};
