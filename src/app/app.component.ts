import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ProductsService } from './products.service';
import { Observable, map, mergeMap, scan } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(@Inject(LOCALE_ID)private local_id:string,private productService:ProductsService){}

  selectedLanguage:string=this.local_id;
  products$:Observable<any>|undefined;
  infoMessage:string="";

  locales=[
 {language:"French",id:"fr"},
 {language:"German",id:"de"},
 {language:"Hindi",id:"hi"},
 {language:"English",id:"en-US"}

]

headers=[
  $localize `:title|title of the product@@productTitle:Title`,
  $localize`:price|price of the product:Price`,
  $localize`:rating|rating assigned to the product:Rating`,
  $localize`:updated date|last updated date of the product:Last Updated`
]

ngOnInit(){
  this.products$=this.productService.getProducts().pipe(
    map((response:any)=>{
      this.infoMessage= $localize `There are ${response.products.length}:productsLength: products displayed on this page`
      return response.products;
    }))
}

  switch(){
    location.replace(`/${this.selectedLanguage}/`);
  }
}
