const { describe, it, expect } = require('@jest/globals');
const { findAll, findById } = require('../repositories/repository');
const { getById, getAll } = require('./service');

jest.mock('../repositories/repository', () => ({
  ...jest.requireActual('../repositories/repository'),
  findAll: jest.fn(),
  findById: jest.fn(),
}));

beforeAll(() => {
  jest.spyOn(global.console, 'error').mockImplementation(() => {});
});

describe('getAll', () => {
  it('Should be called correctly using the repository mock for findAll', async () => {
    findAll.mockResolvedValue([
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
    ]);

    const getAllSpy = jest.spyOn({ getAll }, 'getAll');
    const responseGetAll = await getAllSpy();
    expect(responseGetAll).toEqual([
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
    ]);
    expect(findAll).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith();
    expect(getAllSpy).toHaveReturned();
    expect(getAllSpy).toHaveReturnedTimes(1);
  });
});

describe('getById', () => {
  it('Should be called correctly using the repository mock for findById', async () => {
    findById.mockResolvedValue({
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
    });

    const getByIdSpy = jest.spyOn({ getById }, 'getById');
    const responseGetById = await getByIdSpy();
    expect(responseGetById).toEqual({
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
    });
    expect(findById).toHaveBeenCalledTimes(1);
    expect(getByIdSpy).toHaveBeenCalledTimes(1);
    expect(getByIdSpy).toHaveBeenCalledWith();
    expect(getByIdSpy).toHaveReturned();
    expect(getByIdSpy).toHaveReturnedTimes(1);
  });
});
