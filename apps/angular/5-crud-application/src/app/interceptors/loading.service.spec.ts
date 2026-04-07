import { LoadingService } from './loading.service';
describe(LoadingService.name, () => {
  let service: LoadingService;

  beforeEach(() => {
    service = new LoadingService();
  });

  it('track concurrent requests correctly', () => {
    expect(service.isLoading()).toEqual(false);

    service.start();
    expect(service.isLoading()).toEqual(true);

    service.stop();
    expect(service.isLoading()).toEqual(false);
  });

  it('does not go below zero', () => {
    service.stop();
    expect(service.isLoading()).toEqual(false);
  });
});
