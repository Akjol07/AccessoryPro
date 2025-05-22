import { IContacts } from "@/shared/types/types";

export interface IContactsDetail extends IContacts {
  map: TrustedHTML;
  address: string;
  days: string;
  work_time: string;
  phonenumber: string;
  email: string;
  rest_days: {
    id: number;
    day: "sat" | "sun";
    open_time: string;
    close_time: string;
    is_weekend: boolean;
  }[];
}
