const User = require('../models').User;
const Presentation = require('../models').Presentation;

module.exports = {
  list(req, res) {
    return User
      .findAll({
        include: [{
          model: Presentation,
          as: 'presentations'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Presentation, as: 'presentations' }, 'createdAt', 'DESC'],
        ],
      })
      .then((classrooms) => res.status(200).send(classrooms))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return User
      .findByPk(req.params.id, {
        include: [{
          model: Presentation,
          as: 'presentations'
        }],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  add(req, res) {
    return User
      .create({
        class_name: req.body.class_name,
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return User
      .findByPk(req.params.id, {
        include: [{
          model: Presentation,
          as: 'presentations'
        }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            class_name: req.body.class_name || user.class_name,
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return User
      .findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
