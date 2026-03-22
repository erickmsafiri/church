export interface Member {
  id: number;
  member_number: string;
  first_name: string;
  last_name: string;
  phone?: string;
  email?: string;
  join_date: string;
  created_at: string;
}

export interface Event {
  id: number;
  event_name: string;
  event_type: string;
  start_date: string;
  location?: string;
  status: string;
}

export interface Offering {
  id: number;
  member_id?: number;
  offering_type: string;
  amount: number;
  offering_date: string;
}

export interface Attendance {
  id: number;
  member_id: number;
  service_date: string;
  service_type: string;
  status: string;
}

export interface PrayerRequest {
  id: number;
  member_id?: number;
  request: string;
  status: string;
  created_at: string;
}