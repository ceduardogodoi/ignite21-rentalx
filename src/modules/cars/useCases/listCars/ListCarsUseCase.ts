import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

class ListCarsUseCase {
  constructor(
    private carsRepository: ICarsRepository
  ) { }

  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    return this.carsRepository.findAvailable(brand, category_id, name);
  }
}

export { ListCarsUseCase };
