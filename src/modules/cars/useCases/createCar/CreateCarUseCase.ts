import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) { }

  async execute(request: IRequest): Promise<void> {
    const {
      name,
      description,
      brand,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
    } = request;

    this.carsRepository.create({
      name,
      description,
      brand,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
    });
  }
}

export { CreateCarUseCase };
