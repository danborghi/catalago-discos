const express = require('express');
const router = express.Router();

const discoRoutes = require('./discos');
const artistaRoutes = require('./artistas');
const generoRoutes = require('./generos');

router.use('/discos', discoRoutes);
router.use('/artistas', artistaRoutes);
router.use('/generos', generoRoutes);

// Rota raiz
router.get('/', (req, res) => {
  res.redirect('/discos');
});

module.exports = router;
