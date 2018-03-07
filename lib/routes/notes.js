const router = require('express').Router();
const respond = require('../utils/respond');
const Note = require('../models/note');

module.exports = router

  .get(
    '/users',
    respond(() => Note.find().distinct('user'))
  )

  .get(
    '/:user/notes', 
    respond(({ params: { user } }) => Note.find({ user }))
  )

  .post(
    '/:user/notes', 
    respond(({ body, params: { user } }) => {
      if(body.text === 'bad') throw { code: 400, error: 'bad note' };
      body.user = user;
      return new Note(body).save();
    })
  )
  
  .put(
    '/notes/:id',
    respond(({ body: { text }, params: { user, id: _id } }) => {
      return Note.findOneAndUpdate({ _id, user }, {
        $set: { text }
      }, { new: true });
    })
  )
  
  .delete(
    '/notes/:id',
    respond(({ params: { user, id: _id } }) => {
      return Note.findOneAndRemove({ _id, user });
    })
  )
  
  .post(
    '/notes/:id/comments',
    respond(async ({ body, params: { user, id: _id } }) => {
      const note = await Note.findOneAndUpdate({ _id, user }, {
        $push: { comments: body }
      }, { new: true });
      return note.comments.pop();
    })
  )

  .delete(
    '/notes/:id/comments/:commentId',
    respond(async ({ params: { user, id: _id, commentId } }) => {
      await Note.findOneAndUpdate({ _id, user }, {
        $pull: { comments: { _id: commentId } }
      }, { new: true });
      return { removed: true };
    })
  );