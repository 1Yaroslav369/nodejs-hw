import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

//повертає всіх студентів
export const getAllNotes = async (req, res, next) => {
  const notes = await Note.find();

  if (!notes) {
    next(createHttpError(404, 'Notes not found'));
    return;
  }
  res.status(200).json(notes);
};

//повертає одного студента
export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }
  res.status(200).json(note);
};

//POST
export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

//DELETE
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

//PATCH
export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findOneAndUpdate(
      { _id: noteId },
      req.body,
      { new: true },
    );

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};
