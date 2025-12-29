export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  legalFullName?: string;
  ssn: string;
  workAuthorizationTitle?: string;
  workAuthorization?: {
    title?: string;
  };
  phone?: string;
  cellPhone?: string;
  email: string;
  role: string;
  carInfo?: string;
  car?: {
    make?: string;
    model?: string;
    color?: string;
  };
}
