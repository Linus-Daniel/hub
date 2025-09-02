import { models } from 'mongoose';
import {Schema, model, Document} from 'mongoose';
import { required } from 'zod/v4-mini';

export interface IProject extends Document {
    title: string;
    userId?: string;
    description: string;
    githubLink?: string;
    thumbnail?: string;
    link?: string;
    technologies: string[];
    createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
    title: {type: String, required: true},
    userId:{required:true, ref: 'TalentUser', type: Schema.Types.ObjectId},
    description: {type: String, required: true},
    githubLink: {type: String},
    thumbnail: {type: String},
    link: {type: String},
    technologies: {type: [String], required: true},
}, {timestamps: true});
export const Project =models.Project || model<IProject>('Project', ProjectSchema);