import { Test, TestingModule } from '@nestjs/testing';
import { OrderProcessingService } from './order-processing.service';

describe('OrderProcessingService', () => {
  let service: OrderProcessingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderProcessingService],
    }).compile();

    service = module.get<OrderProcessingService>(OrderProcessingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
