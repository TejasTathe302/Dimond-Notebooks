import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProductsComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule {
  constructor(private sanitizer: DomSanitizer) {
    // Example of sanitizing a URL
    const unsafeUrl = '...'; // Your URL
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }
 }
