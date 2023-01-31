const { getPool } = require('../../../services/db/postgres');
const Repository = require('./repository');

jest.mock('../../../services/db/postgres', () => {
  const pool = {
    connect() {
      return { query: jest.fn(), release: jest.fn() };
    },
    query: jest.fn(),
    end: jest.fn(),
    on: jest.fn(),
  };
  return { getPool: jest.fn(() => pool) };
});

let pool;

beforeEach(async () => {
  pool = getPool();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('findAll', () => {
  test('When the correct parameters are sent, verify that the query is executed with these parameters', async () => {
    pool.query?.mockResolvedValueOnce({
      rows: [
        {
          id: 'chr_6h8-jRWM8mPe3BXF7h9OD',
          name: 'Ricado',
          status: 'live',
          species: 'Human',
          type: 'Genetic experiment',
          gender: 'Male',
          origin: 'Earth (Replacement Dimension)',
          location: 'Testicle Monster Dimension',
          image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
          createdAt: '2023-01-29T14:19:26.029Z',
          updatedAt: '2023-01-29T14:20:18.494Z',
          deletedAt: null,
        },
      ],
    });

    await Repository.findAll();

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM characters WHERE deleted_at IS NULL;');

    expect(pool.query).toHaveBeenCalledTimes(1);
  });
});

describe('findById', () => {
  test('When the correct parameters are sent, verify that the query is executed with these parameters', async () => {
    const characterId = 'chr_6h8-jRWM8mPe3BXF7h9OD';

    pool.query?.mockResolvedValueOnce({
      rows: [
        {
          id: 'chr_6h8-jRWM8mPe3BXF7h9OD',
          name: 'Ricado',
          status: 'live',
          species: 'Human',
          type: 'Genetic experiment',
          gender: 'Male',
          origin: 'Earth (Replacement Dimension)',
          location: 'Testicle Monster Dimension',
          image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
          createdAt: '2023-01-29T14:19:26.029Z',
          updatedAt: '2023-01-29T14:20:18.494Z',
          deletedAt: null,
        },
      ],
    });

    const response = await Repository.findById(characterId);

    expect(pool.query).toHaveBeenCalledWith(
      'SELECT * FROM characters WHERE id = $1 AND deleted_at IS NULL',
      [characterId],
    );

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(response.species).toBe('Human');
  });
});
