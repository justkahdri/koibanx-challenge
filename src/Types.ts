export type DataRow = {
  id: string;
  commerce: string;
  cuit: number;
  current_balance: number;
  active: boolean;
  last_sale: Date;
  concepts: number[];
};

export type Response = {
  data: DataRow[];
  page: number;
  pages: number;
  rowsPerPage: number;
  total: number;
  message_error?: string;
};

export type FetchToAPI = (
  query: string,
  filters: string[]
) => Promise<Response>;
