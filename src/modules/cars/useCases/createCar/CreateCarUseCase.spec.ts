import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      brand: 'Brand',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
    expect(car).toHaveProperty('available');
    expect(car).toHaveProperty('created_at');
  });

  it('should not be able to create a car with an existent license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car1',
        description: 'Description Car',
        brand: 'Brand',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'Car2',
        description: 'Description Car',
        brand: 'Brand',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should create a car with availability true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Description Car',
      brand: 'Brand',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
