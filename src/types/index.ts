export interface User {
  _id?: string;
  name: string;
  email: string;
  bio: string;
  avatar?: string;
  location: string;
  university: string;
  graduationYear: number;
  major: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Skill {
  _id?: string;
  name: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  description: string;
}

export interface Portfolio {
  _id?: string;
  userId: string;
  title: string;
  description: string;
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  experience: Experience[];
  education: Education[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  startDate: Date;
  endDate?: Date;
}

export interface Achievement {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  organization?: string;
  certificateUrl?: string;
}

export interface Experience {
  _id?: string;
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  isCurrentPosition: boolean;
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
}
