import { Pipe, PipeTransform } from '@angular/core';
import { OrderItem } from '../model/entity-model';

@Pipe ({
  name: 'orderitemsconcatproducts'
})
export class OrderItemsConcatProductsPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    let orderItems = value as OrderItem[];
    let result = "";

    if (orderItems) {
      let first = true;
      orderItems.forEach(oi => {
        if (!first) result += ', ';
        first = false;
        result += oi.product.name;
      });
    }

    return result;
  }
}
