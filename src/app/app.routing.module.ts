import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {ProductsComponent} from './products/products.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {TeamComponent} from './team/team.component';
import {PapersComponent} from './papers/papers.component';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {FaqsComponent} from './faqs/faqs.component';
import {CapacityBuildingComponent} from './capacity-building/capacity-building.component';
import {ArticlesComponent} from './articles/articles.component';
import {ArticleDetailsComponent} from './article-details/article-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full' },
  {path: 'products', component: ProductsComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent},
  {path: 'team', component: TeamComponent},
  {path: 'papers', component: PapersComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'project-details/:id', component: ProjectDetailComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'faqs', component: FaqsComponent},
  {path: 'capacity-building', component: CapacityBuildingComponent},
  {path: 'article/:id', component: ArticleDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
