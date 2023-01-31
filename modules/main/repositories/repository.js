const { nanoid } = require('nanoid');
const { getPool } = require('../../../services/db/postgres');

const create = async (character) => {
  const pool = getPool();
  try {
    await pool.query('BEGIN');
    await pool.query(
      `INSERT INTO characters(
        id,
        name,
        status,
        species,
        type,
        gender,
        origin,
        location,
        image
        ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        `chr_${nanoid()}`,
        character.name,
        character.status,
        character.species,
        character.type,
        character.gender,
        character.origin,
        character.location,
        character.image,
      ],
    );
    await pool.query('COMMIT');
  } catch (e) {
    await pool.query('ROLLBACK');
    throw new Error(e);
  }
};

const update = async (characterId, character) => {
  const keyValues = [];
  const params = [];
  const values = Object.values(character);
  Object.keys(character).forEach((e, index) => {
    keyValues.push(`${e} = '${values[index]}'`);
    params.push(character[e]);
  });

  const sql = `UPDATE characters SET ${keyValues.toString()} WHERE id = $1`;
  const pool = getPool();
  const { rows } = await pool.query(sql, [characterId]);
  return rows;
};

const find = async (name, gender) => {
  const pool = getPool({ camelCase: true });
  let sql = 'SELECT * FROM characters WHERE ';
  if (name) {
    sql = `${sql} name LIKE '%${name}%'`;
  }
  if (name && gender) {
    sql = `${sql} AND `;
  }

  if (gender) {
    sql = `${sql} gender = '${gender}'`;
  }
  const { rows } = await pool.query(sql);
  return rows;
};

const findById = async (characterId) => {
  const pool = getPool({ camelCase: true });
  const { rows } = await pool.query(
    'SELECT * FROM characters WHERE id = $1 AND deleted_at IS NULL',
    [characterId],
  );
  if (rows.length === 0) {
    const e = new Error();
    e.name = 'NOT_FOUND';
    e.httpStatus = 404;
    e.message = 'Up!! we not found the resource';
    throw e;
  }
  return rows[0];
};

const findAll = async () => {
  const pool = getPool({ camelCase: true });
  const { rows } = await pool.query('SELECT * FROM characters WHERE deleted_at IS NULL;');
  return rows;
};

const remove = async (characterId) => {
  const pool = getPool({ camelCase: true });
  const { rows } = await pool.query('UPDATE characters SET deleted_at = NOW() WHERE id = $1;', [
    characterId,
  ]);
  return rows[0];
};

module.exports = {
  create,
  update,
  findById,
  findAll,
  remove,
  find,
};
