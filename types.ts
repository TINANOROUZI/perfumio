// types.ts
export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number | null;
  img: string;
  notes: string[];
  category: "Women" | "Men" | "Unisex";
  tag?: string | string[]; // 👈 allow tag(s)
  comingSoon?: boolean;
};
