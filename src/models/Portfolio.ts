// TalentPortfolio Schema
const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    tagline: String,
    status: {
      type: String,
      enum: ["draft", "published", "private"],
      default: "draft",
    },
    template: {
      type: String,
      enum: ["modern", "classic", "creative", "minimal"],
      default: "modern",
    },

    // Core sections
    skills: [skillSchema],
    projects: [projectSchema],
    achievements: [achievementSchema],
    experience: [experienceSchema],
    education: [educationSchema],

    // Additional sections
    testimonials: [testimonialSchema],
    languages: [
      {
        language: {
          type: String,
          required: true,
        },
        proficiency: {
          type: String,
          enum: ["basic", "conversational", "fluent", "native"],
          required: true,
        },
      },
    ],
    interests: [String],

    // SEO and customization
    customUrl: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      match: /^[a-z0-9-]+$/,
    },
    seoTitle: String,
    seoDescription: String,
    customCSS: String,

    // Analytics
    views: {
      type: Number,
      default: 0,
    },
    lastViewedAt: Date,

    // Settings
    settings: {
      showContactInfo: {
        type: Boolean,
        default: true,
      },
      allowDownloadResume: {
        type: Boolean,
        default: true,
      },
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      accentColor: {
        type: String,
        default: "#14B8A6",
      },
      fontFamily: {
        type: String,
        default: "Inter",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for TalentPortfolio
portfolioSchema.index({ userId: 1 });
portfolioSchema.index({ customUrl: 1 }, { unique: true, sparse: true });
portfolioSchema.index({
  title: "text",
  description: "text",
  "skills.name": "text",
  "projects.title": "text",
  "projects.description": "text",
});
portfolioSchema.index({ status: 1 });
portfolioSchema.index({ template: 1 });
portfolioSchema.index({ "skills.category": 1 });
portfolioSchema.index({ "skills.level": 1 });
portfolioSchema.index({ "projects.category": 1 });
portfolioSchema.index({ "projects.technologies": 1 });
portfolioSchema.index({ views: -1 });
portfolioSchema.index({ userId: 1, status: 1 });
portfolioSchema.index({ status: 1, views: -1 });

const TalentPortfolio = mongoose.model("TalentPortfolio", portfolioSchema);

module.exports = {
  TalentPortfolio,
};
