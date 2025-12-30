export interface VisaDocument{
    _id: string,
    type: string,
    status: 'Pending' | 'Approved' | 'Rejected',
    startDate: string,
    endDate: string,
    fileUrl?: string,
    feedback?: string
}