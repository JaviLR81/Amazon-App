import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'amazonApp';

  // Step 1:
  // Create a property to track whether the menu is open.
  // Start with the menu collapsed so that it does not
  // appear initially when the page loads on a small screen!
  public isMenuCollapsed = true;

  /**
   * Should add two numbers
   * @param number num1
   * @param number num2
   * @returns number
  */
  addTwoNumbers(num1:number,num2:number): number {
    return num1 + num2;
  }

  ngOnInit(): void {

    // Variables en JS por referencia y por valor

    /** Variables inmutables */
    // Los tipos primitivos pasan por valor
    const a = 'a';
    let b = a;
    console.log('b',b);
    b = 'change';
    console.log('b',b);
    console.log('a',a);

    console.log('======================');
    /** Variables mutables */
    // Los arrays y los objetos se asignan por referencia
    const c: any = [1,2,3];
    let d = [...c];
    console.log('d',d);
    d[0] = 'change';
    console.log('d',d);
    console.log('c',c);

    const javi = { name: 'Javier', lastName: 'Lozano'};
    // Bad practice
    // const santi = javi;

    // God practice
    const santi = {...javi};

    santi.name = 'Santiago';

    console.log('Santi',santi);
    console.log('Javi' ,javi);


    // Another Example
    console.log('====================================');

    const array = [
      { name: 'Javier', lastName: 'Lozano', age: 25},
      { name: 'Diana', lastName: 'Lozano', age: 17},
      { name: 'Juana', lastName: 'Rodrigo', age: 52},
    ];

    // Transformando y mutando los valores
    // Sin afectar el array original
    // const newArray = [...array];

    // Como hacerlo con el operador MAP

    const newArray = array.map(item => {
      const today = new Date();

      // Esto no rompe la referencia
      // item.year = "Esto no rompe la referencia";
      // return item;

      return {
        ...item,
        year: today.getFullYear() - item.age
      }
    });

    console.log('oldArray',array);
    console.log('newArray',newArray);


    // Another Example
    console.log('====================================');

    const otherArray = [1,2,3];

    const format = {
      number: 0,
      index: 0,
      type: 'number'
    }

    const newOtherArray = otherArray.map((item,index) => {
      const newFormat = {...format};
      newFormat.number = item;
      newFormat.index = index;
      return newFormat;
    });

    // console.log('oldOtherArray',otherArray);
    console.log('newOtherArray',newOtherArray);
    format.type = 'int';
  }
}
