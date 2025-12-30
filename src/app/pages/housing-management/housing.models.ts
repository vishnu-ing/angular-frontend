// housing.models.ts

export interface Landlord {
  name?: string; // for backend compatibility
  fullName?: string; //frontend compatibility
  phone: string;
  email: string;
}

export interface Employee {
  id: string;
  _id?: string; // Optional MongoDB id for compatibility
  name: string; // preferred or legal
  firstName?: string;
  lastName?: string;
  phone: string;
  email: string;
  carInfo?: string;
  car?: {
    make?: string;
    model?: string;
    color?: string;
  };
}

export type FacilityReportStatus = 'Open' | 'In Progress' | 'Closed';

export interface FacilityReportComment {
  id: string;
  description: string;
  createdBy: string; // could be name or userId
  createdAt: string; // ISO string
}

export interface FacilityReport {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  reportedBy?: any; // Add this line for backend compatibility
  createdAt: string;
  updatedAt?: string;
  status: FacilityReportStatus;
  comments: FacilityReportComment[];
}

export interface FacilityInfo {
  beds: number;
  mattresses: number;
  tables: number;
  chairs: number;
}

export interface HouseSummary {
  id: string;
  _id?: string; // for backend compatibility (e.g., MongoDB)
  address: string;
  landlord: Landlord;
  employeeCount: number;
}

export interface HouseDetails extends HouseSummary {
  facility: FacilityInfo;
  facilityReports: FacilityReport[];
  employees: Employee[];
}
