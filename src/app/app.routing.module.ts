import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {ProductsComponent} from './products/products.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {FaqsComponent} from './faqs/faqs.component';
import {InvestorRelationComponent} from './investor-relation/investor-relation.component';

const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full' },
  {path: 'products', component: ProductsComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent},
  {path: 'contact-us', component: AboutUsComponent},
  {path: 'faqs', component: FaqsComponent},
  {path: 'investor-relation', component: InvestorRelationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
