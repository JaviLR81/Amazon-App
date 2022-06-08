import { Pipe, PipeTransform } from '@angular/core';
import { Inventory } from '../interfaces/inventory.interface';

@Pipe({
  name: 'availability'
})
export class AvailabilityPipe implements PipeTransform {

  transform(inventory:Inventory): string {
    return (inventory?.quantity) && inventory?.quantity > 0  ? `quantity: ${inventory.quantity}` : 'exhausted';
  }

}
