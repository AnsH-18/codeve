import mongoose, { Document, Schema, model } from 'mongoose';

interface ITag extends Document {
  name: string;
  userId: mongoose.Types.ObjectId;
}

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

interface ISnippet extends Document {
  title: string;
  description: string;
  tags: mongoose.Types.ObjectId[];
  code: string;
  language: string;
  userId: mongoose.Types.ObjectId;
  isFavorite: boolean
  trashed: boolean
}

const SnippetSchema = new Schema<ISnippet>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  code: { type: String, required: true },
  language: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isFavorite: {type: Boolean, default: false},
  trashed: {type: Boolean, default: false}
}, { timestamps: true });

const Tag = mongoose.models.Tag || model<ITag>('Tag', TagSchema);
const Snippet = mongoose.models.Snippet || model<ISnippet>('Snippet', SnippetSchema);

export { Tag, Snippet };
export type {ISnippet, ITag}