import { model, Schema } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      default: '',
      type: String,
      required: false,
      trim: true,
    },
    tag: {
      type: String,
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
      default: 'Todo',
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Note = model('Note', noteSchema);
