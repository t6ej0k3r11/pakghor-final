// Button props
export interface ButtonInterface {
  text: string;
  filled?: boolean;
  type?: "primary" | "secondary";
  to?: string; // screen name for navigation
  icon?: React.ReactNode | null;
}

// Card props
export interface CardInterface {
  title: string;
  body?: string;
  badge?: BadgeInterface;
  image?: string;
  indicator?: string;
  subtitle?: string;
  link?: string; // screen name for navigation
}

// Badge props
export interface BadgeInterface {
  text: string;
  filled?: boolean;
}

// Cart item (used in context)
export interface CartItem {
  name: string;
  price: number;
  qty: number;
}

// You can expand with other interfaces (e.g., Product, User) later
