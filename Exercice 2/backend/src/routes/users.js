import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET /api/users
router.get('/', async function (req, res, next) {
  try {
    const users = await User.findAll();
    res.json({ result: true, users: users });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id
router.get('/:id', async function (req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json({ result: true, user: user });
    } else {
      res.json({ result: false, error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/users
router.post('/', async function (req, res, next) {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });
    res.json({ result: true, user: newUser });
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/:id
router.put('/:id', async function (req, res, next) {
  try {
    const id = req.params.id;
    
    const [affectedCount] = await User.update(
      { 
        username: req.body.username, 
        password: req.body.password 
      },
      { where: { id: id } }
    );

    if (affectedCount > 0) {
      const updatedUser = await User.findByPk(id);
      res.json({ result: true, message: "Utilisateur mis à jour !", user: updatedUser });
    } else {
      res.json({ result: false, error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:id
router.delete('/:id', async function (req, res, next) {
  try {
    const deletedCount = await User.destroy({ where: { id: req.params.id } });
    
    if (deletedCount > 0) {
      res.json({ result: true, message: "Utilisateur supprimé !" });
    } else {
      res.json({ result: false, error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;