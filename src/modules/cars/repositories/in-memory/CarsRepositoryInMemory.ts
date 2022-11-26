import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<void> {
    const {
      name,
      description,
      brand,
      daily_rate,
      fine_amount,
      license_plate,
      category_id,
    } = data;
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      brand,
      daily_rate,
      fine_amount,
      license_plate,
      category_id,
    });

    this.cars.push(car);
  }
}

export { CarsRepositoryInMemory };
