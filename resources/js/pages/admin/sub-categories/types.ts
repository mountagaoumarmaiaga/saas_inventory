// resources/js/pages/admin/sub-categories/types.ts

export type Category = {
  id: number;
  name: string;
  slug?: string | null;
};

export type SubCategory = {
  id: number;
  category_id: number;
  name: string;
  slug?: string | null;
  created_at?: string;

  // si ton backend fait load('category')
  category?: Category;
};

export type PaginationMeta = {
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
};
