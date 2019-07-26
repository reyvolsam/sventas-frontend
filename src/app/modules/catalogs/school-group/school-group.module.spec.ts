import { SchoolGroupModule } from './school-group.module';

describe('SchoolGroupModule', () => {
  let schoolGroupModule: SchoolGroupModule;

  beforeEach(() => {
    schoolGroupModule = new SchoolGroupModule();
  });

  it('should create an instance', () => {
    expect(schoolGroupModule).toBeTruthy();
  });
});
