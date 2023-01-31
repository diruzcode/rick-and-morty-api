const {
  findAll, find, create, update, remove, findById,
} = require('../repositories/repository');

const store = async (character) => create(character);

const updateById = async (characterId, character) => update(characterId, character);

const getById = async (characterId) => findById(characterId);

const getAll = async () => findAll();

const search = async (params) => find(params.name, params.gender);

const removeById = async (characterId) => remove(characterId);

module.exports = {
  store,
  updateById,
  getById,
  getAll,
  search,
  removeById,
};
