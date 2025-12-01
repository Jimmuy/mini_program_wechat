export interface Photo {
  id: number | string;
  url: string;
  title: string;
  category: string;
  location?: string;
  date?: string;
  story?: string;
  exif?: {
    camera?: string;
    lens?: string;
    aperture?: string;
    iso?: string;
    shutter?: string;
    focalLength?: string;
  };
}

export interface LocationGallery {
  location: string;
  description: string;
  photos: Photo[];
}

export interface BasicInfoItem {
  label: string;
  value: string;
}

export interface SkillItem {
  name: string;
}

export interface SkillCategory {
  category: string;
  items: string | SkillItem[];
  isLanguage?: boolean;
}

export interface ExperienceDetail {
  time: string;
  company: string;
  role: string;
  summary: string;
  details: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  basicInfo: BasicInfoItem[];
  coreAdvantages: string[];
  skills: SkillCategory[];
  workExperience: ExperienceDetail[];
  aboutMe: string[];
}

export interface HomepageData {
  name: string;
  role: string;
  bio: string;
}

export type ViewState = 'home' | 'gallery' | 'resume';