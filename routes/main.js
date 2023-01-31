/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: API to manage rick and morty characters.
 * components:
 *   schemas:
 *     Characters:
 *       type: object
 *       required:
 *         - name
 *         - status
 *         - species
 *         - type
 *         - gender
 *         - origin
 *         - location
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the character.
 *         name:
 *           type: string
 *           description: The name of the character.
 *         status:
 *           type: string
 *           description: he or she is dead or not?
 *         type:
 *           type: string
 *           description: Human? Alien?
 *         gender:
 *           type: string
 *           description: Famele? Male?
 *         origin:
 *           type: string
 *           description: Earth? Other planet?
 *         location:
 *           type: string
 *           description: Where is he or she right now?
 *         image:
 *           type: string
 *           description: what that ugly is?
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of the record was created.
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date of the record was updated.
 *         deletedAt:
 *           type: string
 *           format: date
 *           description: The date of the record was deleted.
 *       example:
 *          name: Abradolf Lincler
 *          status: unknown
 *          species: Human
 *          type: Genetic experiment
 *          gender: Male
 *          origin: Earth (Replacement Dimension)
 *          location: Testicle Monster Dimension
 *          image: https://rickandmortyapi.com/api/character/avatar/7.jpeg
 */

const express = require('express');

const router = express.Router();
const { createCharacter } = require('../modules/main/functions/createCharacter.function');
const { deleteCharacter } = require('../modules/main/functions/deleteCharacter.function');
const { getCharacterById } = require('../modules/main/functions/getCharacterById.function');
const { getCharacters } = require('../modules/main/functions/getCharacters.function');
const { updateCharacterById } = require('../modules/main/functions/updateCharacterById.function');

/**
 * @swagger
 * /characters:
 *     get:
 *       summary: Lists all the characters
 *       tags: [Characters]
 *       parameters:
 *         - in: query
 *           name: name
 *           schema:
 *             type: string
 *           description: The name for the character that you wanna to find
 *         - in: query
 *           name: gender
 *           schema:
 *             type: string
 *           description: The gender of the character that you wanna get
 *       responses:
 *         "200":
 *           description: The list of characters.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Characters'
 */
router.get('/characters', getCharacters);

/**
 * @swagger
 * /characters/{id}:
 *     get:
 *       summary: Gets a character by id
 *       tags: [Characters]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The character id
 *       responses:
 *         "200":
 *           description: The information about the character.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Characters'
 *         "404":
 *           description: Characters not found.
 */
router.get('/characters/:id', getCharacterById);

/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Creates a new character
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Characters'
 *     responses:
 *       "200":
 *         description: The created character.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Characters'
 */
router.post('/characters', createCharacter);

/**
 * @swagger
 * /characters/{id}:
 *   put:
 *       summary: Updates a character
 *       tags: [Characters]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The character id
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Characters'
 *       responses:
 *         "204":
 *           description: Update was successful.
 *         "404":
 *           description: Character not found.
 */
router.put('/characters/:id', updateCharacterById);

/**
 * @swagger
 * /characters/{id}:
 *   delete:
 *        summary: Deletes a character by id
 *        tags: [Characters]
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The character id
 *        responses:
 *          "204":
 *            description: Delete was successful.
 *          "404":
 *            description: Character not found.
 */
router.delete('/characters/:id', deleteCharacter);

module.exports = router;
