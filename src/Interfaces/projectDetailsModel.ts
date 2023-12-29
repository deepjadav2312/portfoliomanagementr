export default interface projectDetailsModel{
    id: number;
    projectName: string;
    clientName?: string;
    clientEmail?: string;
    budgent?: string;
    duration?: string;
    startDate?: number;
    endDate?: number;
    isActive?: boolean;
}