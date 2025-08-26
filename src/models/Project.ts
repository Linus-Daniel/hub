// Project Schema (embedded in Portfolio)
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  longDescription: String,
  technologies: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrls: [String],
  projectUrl: String,
  githubUrl: String,
  demoUrl: String,
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  status: {
    type: String,
    enum: ["completed", "in-progress", "paused", "cancelled"],
    default: "completed",
  },
  teamSize: Number,
  role: String,
  achievements: [String],
  challenges: [String],
  impact: [
    {
      metric: String,
      value: String,
    },
  ],
});

// Achievement Schema (embedded in Portfolio)
const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "award",
      "certification",
      "competition",
      "recognition",
      "publication",
    ],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  organization: String,
  certificateUrl: String,
  verificationUrl: String,
  level: {
    type: String,
    enum: ["local", "regional", "national", "international"],
  },
  rank: Number,
  totalParticipants: Number,
});

// Experience Schema (embedded in Portfolio)
const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: [String],
    required: true,
  },
  achievements: {
    type: [String],
    required: true,
  },
  technologies: [String],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  isCurrentPosition: {
    type: Boolean,
    default: false,
  },
  employmentType: {
    type: String,
    enum: ["full-time", "part-time", "internship", "contract", "volunteer"],
    required: true,
  },
  location: String,
  companyWebsite: String,
  supervisor: {
    name: String,
    email: String,
    linkedin: String,
  },
});

// Education Schema (embedded in Portfolio)
const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  isCurrentlyEnrolled: {
    type: Boolean,
    default: false,
  },
  gpa: Number,
  maxGpa: Number,
  coursework: [String],
  honors: [String],
  activities: [String],
  thesis: {
    title: String,
    advisor: String,
    abstract: String,
    url: String,
  },
});

// Testimonial Schema (embedded in Portfolio)
const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    avatar: String,
    linkedinUrl: String,
  },
  {
    timestamps: true,
  }
);
