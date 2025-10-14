
export interface BadgeInterface {
  text: string;
  filled?: boolean;
}

export interface ButtonInterface {
  text: string;
  filled: boolean;
  type: "primary" | "secondary" | "danger";
  to?: string;   
  icon?: React.ReactNode;
}


export interface CardInterface {
  indicator?: string,
  badge?: BadgeInterface,
  image?: string,
  title: string,
  subtitle?: string,
  body: string,
  btn: ButtonInterface
  link?: string;
  price?: number;
}

export interface Card {
  _id: string;
  title: string;
  subtitle?: string;
  body: string;
  image?: string;
  indicator?: string;
  badge?: BadgeInterface;
  btn: ButtonInterface;
  link?: string;
  price?: number;
}