const { getById } = require('../services/service');

module.exports.getCharacterById = async (req, res) => {
  try {
    const response = await getById(req.params.id);
    res.send(response);
  } catch (error) {
    console.error('Error: ', error);
    console.error(error.httpStatus);
    if (error.httpStatus) {
      res.status(error.httpStatus).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Up! Internal Server Error. ' });
    }
  }
};
