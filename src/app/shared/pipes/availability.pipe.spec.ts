import { inventoryLineMock} from 'src/app/testing/inventory-mock';
import { AvailabilityPipe } from './availability.pipe';

describe('AvailabilityPipe', () => {

  let pipe:AvailabilityPipe;

  beforeEach( () => {
    pipe = new AvailabilityPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should return the quantity in a label', () => {
    expect(pipe.transform(inventoryLineMock)).toBe(`quantity: ${inventoryLineMock.quantity}`);
  });

  it('Should return exhausted in label', () => {
    expect(pipe.transform(null as any)).toBe('exhausted');
  });

  it('Should return exhausted in label', () => {
    let inventoryLineMockModified = {...inventoryLineMock};
    inventoryLineMockModified.quantity = 0;
    expect(pipe.transform(inventoryLineMockModified)).toBe('exhausted');
  });


});
