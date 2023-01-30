const {
  findAll,
  find,
  create,
  update,
  remove,
  findById,
} = require('./repository');

const store = async (character) => await create(character);

const updateById = async (characterId, character) => await update(characterId, character);

const getById = async (characterId) => await findById(characterId);

const getAll = async () => await findAll();

const search = async (params) => await find(params.name, params.gender);

const removeById = async (characterId) => await remove(characterId);

module.exports = {
  store,
  updateById,
  getById,
  getAll,
  search,
  removeById,
};
