declare global {
  type DataRow = {
    id: string;
    commerce: string;
    cuit: number;
    current_balance: number;
    active: boolean;
    // last sale format: DD/MM/YYYY
    last_sale: `${number}${number}\/${number}${number}\/${number}${number}${number}${number}`;
    concepts: number[];
  };

  type APIResponse = {
    data: DataRow[];
    page: number;
    pages: number;
    rowsPerPage: number;
    total: number;
  };

  type Order =
    | false
    | {
        param: "commerce" | "cuit";
        value: 1 | -1;
      };

  type TableData = {
    last_input: [string, string[]];
    order: Order;
    message_error?: string;
  } & APIResponse;

  type FetchFromAPI = (
    query: string,
    filters: string[],
    order?: Order
  ) => Promise<TableData>;
}

export {};
