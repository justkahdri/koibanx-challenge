export type DataRow = {
  id: string;
  commerce: string;
  cuit: number;
  current_balance: number;
  active: boolean;
  last_sale: Date;
  concepts: number[];
  // concept_1: number;
  // concept_2: number;
  // concept_3: number;
  // concept_4: number;
  // concept_5: number;
  // concept_6: number;
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
