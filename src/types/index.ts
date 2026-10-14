export interface Ingredient {
  id: string;
  name: string;
  urduName: string;
  botanicalName: string;
  dosePerCap: string;
  doseTotal: string;
  image: string;
  color: string;
  summary: string;
  keyNutrient: string;
  pcosBenefit: string;
  details: string[];
}

export interface ProductVariant {
  id: string;
  title: string;
  tagline: string;
  bottles: number;
  capsules: number;
  daysSupply: number;
  price: number;
  originalPrice: number;
  savings: number;
  popular?: boolean;
  bestValue?: boolean;
  freeShipping?: boolean;
  gift?: string;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  concern: string;
  duration: string;
  verified: boolean;
}

export interface OrderItem {
  variantId: string;
  title: string;
  bottles: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customerName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: 'COD' | 'Online';
  status: 'Confirmed' | 'Processing' | 'Dispatched' | 'Delivered';
  createdAt: string;
}
