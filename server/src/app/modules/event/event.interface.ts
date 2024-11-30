export type TEvent = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  layout: string;
  date: Date;
  startTime: string;
  endTime: string;
  guestCount: number;
  eventType: string;
  foodPreference: string;
  additionalRequirements?: string;
  preferenceImage?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}