import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarHomeComponent } from './home/navbar-home/navbar-home.component';
import { LandingComponent } from './home/landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import {ProductService} from './providers/product.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SafePipe } from './shared/pipes/safe.pipe';
import { ActivitiesComponent } from './home/activities/activities.component';
import {ProjectsService} from './providers/projects.service';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import {PartnersService} from './providers/partners.service';
import { FeaturedProductComponent } from './home/featured-product/featured-product.component';
import {FaqsService} from './providers/faqs.service';
import { FilterPipe } from './shared/pipes/filter.pipe';
import {ArticleService} from './providers/article.service';
import { SlidingProductsComponent } from './sliding-products/sliding-products.component';
import { MixedProductInfoComponent } from './mixed-product-info/mixed-product-info.component';
import {environment} from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {SafePipeModule} from 'safe-pipe';
import { InvestorRelationComponent } from './investor-relation/investor-relation.component';
import { ProductsListComponent } from './home/products-list/products-list.component';
import { ProductsListCardComponent } from './home/products-list/products-list-card/products-list-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NavbarHomeComponent,
    LandingComponent,
    FooterComponent,
    ProductsComponent,
    ProductCardComponent,
    LoaderComponent,
    ProductDetailsComponent,
    SafePipe,
    ActivitiesComponent,
    TruncatePipe,
    AboutUsComponent,
    FaqsComponent,
    FeaturedProductComponent,
    FilterPipe,
    SlidingProductsComponent,
    MixedProductInfoComponent,
    InvestorRelationComponent,
    ProductsListComponent,
    ProductsListCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SafePipeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth feature
  ],
  providers: [
    ProductService,
    ProjectsService,
    PartnersService,
    FaqsService,
    ArticleService,
    PartnersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
