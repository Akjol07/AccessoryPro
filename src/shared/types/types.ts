export type RatingType = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
export type ButtonUiType = "primary" | "secondary" | "neutral";

export interface IProduct {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface IResults<T> {
  results: T[];
  count: number;
}

export interface IService {
  id: string;
  price: number;
  image: string;
  duration: string;
  category: string;
}

export interface IBarber {
  id: string;
  fullname: string;
  position: string;
  schedule: string;
  expirience: string;
  rating: string;
  image: string;
}

export interface IBarberDetail extends IBarber {
  reviews: IReview[];
}

export interface IGalleryPhoto {
  id: string;
  category: string;
  image: string;
}

export interface IGalleryVideo {
  id: string;
  title: string;
  video: string;
}

export interface IReview {
  id: string;
  name?: string;
  fullname?: string;
  rating: number;
  text: string;
  created_at: string;
  avatar?: string;
}

export interface IContacts {
  instagram: string;
  facebook: string;
  tik_tok: string;
  twitter: string;
}
