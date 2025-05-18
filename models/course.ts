import mongoose, { Schema, type Document } from "mongoose"

export interface ICourse extends Document {
  title: string
  description: string
  provider: string
  duration: string
  price?: string
  enrollmentUrl: string
  createdAt: Date
}

const CourseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: [true, "Please provide a course title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a course description"],
  },
  provider: {
    type: String,
    required: [true, "Please provide a provider name"],
    trim: true,
  },
  duration: {
    type: String,
    required: [true, "Please provide a course duration"],
    trim: true,
  },
  price: {
    type: String,
    trim: true,
  },
  enrollmentUrl: {
    type: String,
    required: [true, "Please provide an enrollment URL"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema)
