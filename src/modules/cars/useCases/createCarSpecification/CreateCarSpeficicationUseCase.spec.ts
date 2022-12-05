import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
  });

  it('should be able to add a new specification to a non-existent car', async () => {
    expect(async () => {
      const car_id = '123';
      const specifications_id = ['54321'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      brand: 'Brand',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      category_id: 'category',
    });

    const specifications_id = ['54321'];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
