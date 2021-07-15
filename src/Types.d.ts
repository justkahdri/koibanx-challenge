declare global {
  type ActivityFilter = "active" | "non-active" | "all";

  interface TFilters {
    byInput: string[];
    byActivity: ActivityFilter;
  }

  interface DataRow {
    id: string;
    commerce: string;
    cuit: number;
    current_balance: number;
    active: boolean;
    // last sale format: DD/MM/YYYY
    last_sale: `${number}${number}\/${number}${number}\/${number}${number}${number}${number}`;
    concepts: number[];
  }

  interface APIResponse {
    data: DataRow[];
    page: number;
    pages: number;
    rowsPerPage: number;
    total: number;
  }

  type TOrder =
    | false
    | {
        param: "commerce" | "cuit";
        value: 1 | -1;
      };

  interface TableData extends APIResponse {
    last_input: [string, TFilters];
    order: TOrder;
    message_error?: string;
  }

  type FetchFromAPI = (
    query: string,
    filters: TFilters,
    order?: TOrder
  ) => Promise<TableData>;
}

export {};
