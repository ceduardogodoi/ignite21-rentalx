import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const {
      name,
      description,
      brand,
      daily_rate,
      fine_amount,
      license_plate,
      category_id,
      specifications,
      id,
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
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    return this.cars
      .filter(car =>
        car.available ||
        brand && car.brand === brand ||
        category_id && car.category_id === category_id ||
        name && car.name === name
      );
  }

  async findById(car_id: string): Promise<Car> {
    return this.cars.find(car => car.id === car_id)
  }
}

export { CarsRepositoryInMemory };
