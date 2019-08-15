const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.post('/', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    db.insert(req.body)
      .then(success => {
        success
          ? res.status(201).json(req.body)
          : res.status(500).json({
              error:
                'Oops, the request was good but something went wrong internally.  Try again!'
            });
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: 'The posts information could not be retrieved.' })
      );
  }
});

router.get('/', (req, res) => {
  try {
    const posts = db
      .find()
      .then(posts =>
        posts
          ? res.status(200).json(posts)
          : res
              .status(500)
              .json({ error: 'There was an error retrieving the posts' })
      );
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The posts information could not be retrieved.' });
  }
});

router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length) {
        res.status(200).json(post);
      } else {
        res
          .status(500)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' })
    );
});
router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(success => {
      success
        ? res.status(200).end()
        : res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
    })
    .catch(err =>
      res.status(500).json({ error: 'The post could not be removed' })
    );
});
router.put('/:id', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    db.update(req.params.id, req.body).then(success => {
      success
        ? res.status(200).json(req.body)
        : res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
    });
  }
});

module.exports = router;
