const { updateById } = require('../services/service');
const requestValidator = require('../../../utils/requestValidator');

module.exports.updateCharacterById = async (req, res) => {
  const character = req.body;
  if (Object.keys(character).length === 0) {
    return res.status(400).json({ message: 'Request body is empty', errors: '' });
  }

  requestValidator(
    character,
    {
      name: ['string'],
      status: ['string'],
      species: ['string'],
      type: ['string'],
      gender: ['string'],
      origin: ['string'],
      location: ['string'],
      image: ['string'],
    },
    res,
  );
  const response = await updateById(req.params.id, character);
  return res.send(response);
};
