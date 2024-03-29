import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FeatureButtonsComponent } from './feature-buttons/feature-buttons.component';

import { AppRoutingModule } from './app-routing.module';
import { ProductSearchComponent } from './product-search/product-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListingComponent, PurchaseConfirmationDialog } from './product-listing/product-listing.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import {MatNativeDateModule} from '@angular/material/core';
import { CreateComponent } from './create/create.component';
import { CurrencyPipe } from '@angular/common';
import { PictureUploadComponent } from './picture-upload/picture-upload.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { ConfirmDeleteDialog, EditProductComponent } from './edit-product/edit-product.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { SellerReviewComponent } from './seller-review/seller-review.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';
import { PictureCarouselComponent } from './picture-carousel/picture-carousel.component';
import { SiteMenuComponent } from './site-menu/site-menu.component';
import { RecentlyViewedItemsComponent } from './recently-viewed-items/recently-viewed-items.component';
import { UserShopComponent } from './user-shop/user-shop.component';
import { ChangeProfilePicComponent } from './change-profile-pic/change-profile-pic.component';
import { ShopHistoryViewComponent } from './shop-history-view/shop-history-view.component';
import { GeneralChatComponent } from './general-chat/general-chat.component';
import { RetrieveUsernameComponent } from './retrieve-username/retrieve-username.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SpecialResetPasswordComponent } from './special-reset-password/special-reset-password.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { NotVerifiedComponent } from './not-verified/not-verified.component';
import { ChatOverviewComponent } from './chat-overview/chat-overview.component';
import { CreateGroupAdComponent } from './create-group-ad/create-group-ad.component';
import { GroupadListingComponent } from './groupad-listing/groupad-listing.component';
import { GroupadDetailsComponent } from './groupad-details/groupad-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProfileComponent,
    UserInfoComponent,
    FeatureButtonsComponent,
    CreateComponent,
    PictureUploadComponent,
    ProductSearchComponent,
    ProductListingComponent,
    RegisterComponent,
    ChangePasswordComponent,
    EditProductComponent,
    ChangeUsernameComponent,
    SellerReviewComponent,
    LoginComponent,
    EditProductComponent,
    PurchaseHistoryComponent,
    PurchaseConfirmationDialog,
    UserWishlistComponent,
    PictureCarouselComponent,
    ProductDetailsComponent,
    SiteMenuComponent,
    RecentlyViewedItemsComponent,
    UserShopComponent,
    ConfirmDeleteDialog,
    ChangeProfilePicComponent,
    ShopHistoryViewComponent,
    GeneralChatComponent,
    RetrieveUsernameComponent,
    ResetPasswordComponent,
    SpecialResetPasswordComponent,
    VerifyAccountComponent,
    NotVerifiedComponent,
    ChatOverviewComponent,
    CreateGroupAdComponent,
    GroupadListingComponent,
    GroupadDetailsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatNativeDateModule
    
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent],
  
})
export class AppModule { }