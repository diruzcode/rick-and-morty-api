const { removeById } = require('../services/service');

module.exports.deleteCharacter = async (req, res) => {
  try {
    await removeById(req.params.id);
    res.status(204).json({ message: 'Character deleted' });
  } catch (error) {
    console.error('Error: ', error);
    console.error(error.httpStatus);
    res.status(500).json({ message: 'Up! Internal Server Error. ' });
  }
};
