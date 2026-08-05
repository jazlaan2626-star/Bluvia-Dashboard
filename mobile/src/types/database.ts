export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional';

export interface DiverProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  country: string | null;
  bio: string | null;
  certifications: string[];
  experience_level: ExperienceLevel;
  created_at: string;
  updated_at: string;
}

export interface Dive {
  id: string;
  diver_id: string;
  dive_date: string;
  dive_site: string | null;
  location: string | null;
  lat: number | null;
  lng: number | null;
  max_depth: number | null;
  avg_depth: number | null;
  dive_time_seconds: number | null;
  bottom_time_seconds: number | null;
  surface_interval_seconds: number | null;
  water_temp: number | null;
  visibility: number | null;
  heart_rate_avg: number | null;
  calories: number | null;
  buddy: string | null;
  equipment_used: string[];
  photos: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type NewDive = Pick<Dive, 'diver_id'> &
  Partial<
    Omit<Dive, 'id' | 'diver_id' | 'created_at' | 'updated_at' | 'equipment_used' | 'photos'>
  > & {
    equipment_used?: string[];
    photos?: string[];
  };
