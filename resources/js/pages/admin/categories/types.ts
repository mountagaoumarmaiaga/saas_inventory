export type Category = {
  id: number;
  name: string;
  slug?: string | null;
  created_at?: string;
};

export type PaginationMeta = {
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
};
