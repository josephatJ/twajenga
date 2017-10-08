import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarHomeComponent } from './home/navbar-home/navbar-home.component';
import { LandingComponent } from './home/landing/landing.component';
import { PartnersComponent } from './home/partiners/partiners.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import {ProductService} from './providers/product.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SafePipe } from './shared/pipes/safe.pipe';
import { TeamComponent } from './team/team.component';
import {TeamService} from './providers/team.service';
import {TeamEducationService} from './providers/team-education.service';
import {TeamExperienceService} from './providers/team-experience.service';
import {TeamConsultancyService} from './providers/team-consultancy.service';
import { ActivitiesComponent } from './home/activities/activities.component';
import { PapersComponent } from './papers/papers.component';
import {PaperService} from './providers/paper.service';
import { ProjectsComponent } from './projects/projects.component';
import {ProjectsService} from './providers/projects.service';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import {PartnersService} from './providers/partners.service';
import { FeaturedProductComponent } from './home/featured-product/featured-product.component';
import {FaqsService} from './providers/faqs.service';
import { CapacityBuildingComponent } from './capacity-building/capacity-building.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ArticlesComponent } from './articles/articles.component';
import { FeaturedArticleComponent } from './home/featured-article/featured-article.component';
import { NewsEventComponent } from './home/news-event/news-event.component';
import { RecentArticlesComponent } from './home/recent-articles/recent-articles.component';
import {TrainingService} from './providers/training.service';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import {ArticleService} from './providers/article.service';
import { AcademiesComponent } from './home/academies/academies.component';
import { SlidingProductsComponent } from './sliding-products/sliding-products.component';
import { MixedProductInfoComponent } from './mixed-product-info/mixed-product-info.component';
import {MemberContactsService} from './providers/member-contacts.service';
import {environment} from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {SafePipeModule} from 'safe-pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NavbarHomeComponent,
    LandingComponent,
    PartnersComponent,
    FooterComponent,
    ProductsComponent,
    ProductCardComponent,
    LoaderComponent,
    ProductDetailsComponent,
    SafePipe,
    TeamComponent,
    ActivitiesComponent,
    PapersComponent,
    ProjectsComponent,
    TruncatePipe,
    ProjectDetailComponent,
    AboutUsComponent,
    FaqsComponent,
    FeaturedProductComponent,
    CapacityBuildingComponent,
    FilterPipe,
    ArticlesComponent,
    FeaturedArticleComponent,
    NewsEventComponent,
    RecentArticlesComponent,
    ArticleDetailsComponent,
    AcademiesComponent,
    SlidingProductsComponent,
    MixedProductInfoComponent
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
    TeamService,
    TeamEducationService,
    TeamExperienceService,
    TeamConsultancyService,
    MemberContactsService,
    PaperService,
    ProjectsService,
    PartnersService,
    FaqsService,
    TrainingService,
    ArticleService,
    PartnersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
