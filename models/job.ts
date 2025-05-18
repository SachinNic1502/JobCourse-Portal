import mongoose, { Schema, type Document } from "mongoose"

export interface IJob extends Document {
  title: string
  description: string
  company: string
  location: string
  salary?: string
  applicationUrl: string
  createdAt: Date
}

const JobSchema = new Schema<IJob>({
  title: {
    type: String,
    required: [true, "Please provide a job title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a job description"],
  },
  company: {
    type: String,
    required: [true, "Please provide a company name"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Please provide a job location"],
    trim: true,
  },
  salary: {
    type: String,
    trim: true,
  },
  applicationUrl: {
    type: String,
    required: [true, "Please provide an application URL"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema)
