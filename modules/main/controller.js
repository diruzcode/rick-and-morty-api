const {
  getAll,
  getById,
  updateById,
  store,
  removeById,
  search,
} = require("./service");

const create = async (req, res) => {
  const character = req.body;
  const response = await store(character);
  res.send(response);
};

const update = async (req, res) => {
  const character = req.body;
  const response = await updateById(req.params.id, character);
  res.send(response);
};

const list = async (req, res) => {
  try {
    const response =
      req.query.name || req.query.gender
        ? await search(req.query)
        : await getAll();
    res.send(response);
  } catch (error) {
    if (error.httpStatus) {
      res.status(error.httpStatus).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Up! Internal Server Error. " });
    }
  }
};

const get = async (req, res) => {
  try {
    const response = await getById(req.params.id);
    res.send(response);
  } catch (error) {
    console.error("Error: ", error);
    console.log(error.httpStatus);
    if (error.httpStatus) {
      res.status(error.httpStatus).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Up! Internal Server Error. " });
    }
  }
};

const remove = async (req, res) => {
  try {
    await removeById(req.params.id);
    res.status(204).json({ message: "Character deleted" });
  } catch (error) {
    console.error("Error: ", error);
    console.log(error.httpStatus);
    res.status(500).json({ message: "Up! Internal Server Error. " });
  }
};

module.exports = {
  create,
  update,
  list,
  get,
  remove,
};
