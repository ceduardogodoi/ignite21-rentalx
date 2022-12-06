import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
  name: string;
  description: string;
  brand: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

export { ICreateCarDTO };
