const {
  findAll,
  find,
  create,
  update,
  remove,
  findById,
} = require("./repository");

const store = async (character) => {
  const response = await create(character);
  return response;
};

const updateById = async (characterId, character) => {
  const response = await update(characterId, character);
  return response;
};

const getById = async (characterId) => {
  return await findById(characterId);
};

const getAll = async () => {
  const response = await findAll();
  return response;
};

const search = async (params) => {
  const response = await find(params.name, params.gender);
  return response;
};

const removeById = async (characterId) => {
  return await remove(characterId);
};

module.exports = {
  store,
  updateById,
  getById,
  getAll,
  search,
  removeById,
};
