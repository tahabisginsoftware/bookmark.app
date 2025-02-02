export interface Book {
  id: number;
  title: string;
  totalPages: number;
  currentPage: number;
  deadline?: string;
  archived?: boolean;
}