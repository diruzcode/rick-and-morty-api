const { store } = require('../services/service');
const requestValidator = require('../../../utils/requestValidator');

module.exports.createCharacter = async (req, res) => {
  const character = req.body;

  requestValidator(
    character,
    {
      name: ['required', 'string'],
      status: ['required', 'string'],
      species: ['required', 'string'],
      type: ['required', 'string'],
      gender: ['required', 'string'],
      origin: ['required', 'string'],
      location: ['required', 'string'],
      image: ['required', 'string'],
    },
    res,
  );
  const response = await store(character);
  return res.send(response);
};
