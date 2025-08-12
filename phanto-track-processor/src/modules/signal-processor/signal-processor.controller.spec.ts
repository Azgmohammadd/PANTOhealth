import { Test, TestingModule } from '@nestjs/testing';
import { SignalProcessorController } from './signal-processor.controller';
import { SignalProcessorService } from './signal-processor.service';

describe('AppController', () => {
  let appController: SignalProcessorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SignalProcessorController],
      providers: [SignalProcessorService],
    }).compile();

    appController = app.get<SignalProcessorController>(
      SignalProcessorController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
