"use strict";
(self["webpackChunkangular_io_example"] = self["webpackChunkangular_io_example"] || []).push([["main"],{

/***/ 9893:
/*!***********************************************!*\
  !*** ./src/app/Auth/Login/Login.component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginComponent": () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angularx-social-login */ 4260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _services_Auth_Profile_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/Auth/Profile.service */ 2521);
/* harmony import */ var _services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/SharedServices/Shared.service */ 4937);
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @agm/core */ 3333);
/* harmony import */ var _ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngneat/hot-toast */ 7403);









var addressLocation = '';
var City = '';
var State = '';
var Country = '';
var PinCode = '';
class LoginComponent {
    constructor(titleService, metaService, fb, _profileServices, _sharedServices, apiloader, toast, authService) {
        this.titleService = titleService;
        this.metaService = metaService;
        this.fb = fb;
        this._profileServices = _profileServices;
        this._sharedServices = _sharedServices;
        this.apiloader = apiloader;
        this.toast = toast;
        this.authService = authService;
        this.isGetLocationOnlOad = false;
        this.titleService.setTitle("Login");
        this.metaService.updateTag({ property: 'og:title', content: 'Login new' });
        this._sharedServices.checkInterNetConnection();
        _sharedServices.IsUserIsOnLogInPage();
        this.AskForLocation();
    }
    ngOnInit() {
        this.createLoginForm();
    }
    createLoginForm() {
        this.loginForm = this.fb.group({
            UserName: [""],
            Email: [""],
            LoginProvider: [""],
            ImageUrl: [""],
            CoverImageUrl: [""],
            Name: [""],
            MobileNumber: [""],
            Password: [""],
            WebSiteUrl: [""],
            Latitude: [""],
            Longitude: [""],
            City: [""],
            Country: [""],
            Pincode: [""],
            State: [""],
            UserAddress: [""],
            AboutUs: [""],
        });
    }
    AskForLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                if (position) {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.apiloader.load().then(() => {
                        let geocoder = new google.maps.Geocoder();
                        let latlng = {
                            lat: this.latitude,
                            lng: this.longitude,
                        };
                        geocoder.geocode({
                            location: latlng,
                        }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[1]) {
                                    addressLocation = results[1].formatted_address;
                                    City = results[1].address_components[5].long_name;
                                    State = results[1].address_components[7].long_name;
                                    Country = results[1].address_components[8].long_name;
                                    PinCode = results[1].address_components[9].long_name;
                                }
                            }
                            else {
                                console.log("Not found");
                            }
                        });
                    });
                    this.isGetLocationOnlOad = true;
                }
                else {
                    this.showToast();
                    return;
                }
            }, (err) => {
                return this.toast.error("Please allow location of your device", {
                    position: "top-center",
                });
            });
        }
        else {
            this.toast.info("location not supported by this browser", {
                position: "top-center",
            });
        }
    }
    // Google Login
    signInWithGoogle() {
        this._profileServices.load();
        if (this.isGetLocationOnlOad) {
            this.authService
                .signIn(angularx_social_login__WEBPACK_IMPORTED_MODULE_2__.GoogleLoginProvider.PROVIDER_ID)
                .then((data) => {
                this.loginForm.controls["Email"].setValue(data.email);
                this.loginForm.controls["Name"].setValue(data.name);
                this.loginForm.controls["ImageUrl"].setValue(data.photoUrl);
                this.loginForm.controls["LoginProvider"].setValue(data.provider);
                this.loginForm.controls["UserName"].setValue(data.name);
                this.loginForm.controls["Latitude"].setValue(this.latitude);
                this.loginForm.controls["Longitude"].setValue(this.longitude);
                this.loginForm.controls["UserAddress"].setValue(addressLocation);
                this.loginForm.controls["City"].setValue(City);
                this.loginForm.controls["Country"].setValue(Country);
                this.loginForm.controls["State"].setValue(State);
                this.loginForm.controls["Pincode"].setValue(PinCode);
                this.loginUser = Object.assign({}, this.loginForm.value);
                this._profileServices
                    .Login(this.loginUser)
                    .subscribe((data) => {
                    localStorage.setItem("user", JSON.stringify(data));
                    location.href = "/";
                });
            });
        }
        else {
            this.AskForLocation();
        }
    }
    signInWithFacebook() {
        this.authService
            .signIn(angularx_social_login__WEBPACK_IMPORTED_MODULE_2__.FacebookLoginProvider.PROVIDER_ID)
            .then((data) => {
            this.loginForm.controls["Email"].setValue(data.email);
            this.loginForm.controls["Name"].setValue(data.name);
            this.loginForm.controls["ImageUrl"].setValue(data.photoUrl);
            this.loginForm.controls["LoginProvider"].setValue(data.provider);
            this.loginForm.controls["UserName"].setValue(data.name);
            this.loginForm.controls["Latitude"].setValue(this.latitude);
            this.loginForm.controls["Longitude"].setValue(this.longitude);
            this.loginForm.controls["UserAddress"].setValue(addressLocation);
            this.loginUser = Object.assign({}, this.loginForm.value);
            this._profileServices
                .Login(this.loginUser)
                .subscribe((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                location.href = "/";
            });
        });
    }
    // Facebook Login
    showToast() {
        this.toast.info("Allow location to use this application", {
            position: "top-center",
        });
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_Auth_Profile_service__WEBPACK_IMPORTED_MODULE_0__.ProfileService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_1__.SharedService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_agm_core__WEBPACK_IMPORTED_MODULE_6__.MapsAPILoader), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_7__.HotToastService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](angularx_social_login__WEBPACK_IMPORTED_MODULE_2__.SocialAuthService)); };
LoginComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-Login"]], decls: 32, vars: 0, consts: [[1, "login_overlay"], [1, "login_wrapper"], [1, "lf_left_sec"], [1, "logo"], ["src", "./../../../assets/Logo/hoozon_logo.svg", "alt", "", 1, "img-responsive"], [1, "lg_right_sec"], [1, "social_login"], [1, "sc_lg", 3, "click"], ["viewBox", "0 0 24 24", "width", "48", "height", "48", "xmlns", "http://www.w3.org/2000/svg"], ["transform", "matrix(1, 0, 0, 1, 27.009001, -39.238998)"], ["fill", "#4285F4", "d", "M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"], ["fill", "#34A853", "d", "M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"], ["fill", "#FBBC05", "d", "M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"], ["fill", "#EA4335", "d", "M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"], ["version", "1.1", "width", "48", "height", "48", "id", "Layer_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 40 40", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 40 40"], ["type", "text/css"], ["id", "SVGID_1_", "gradientUnits", "userSpaceOnUse", "x1", "-277.375", "y1", "406.6018", "x2", "-277.375", "y2", "407.5726", "gradientTransform", "matrix(40 0 0 -39.7778 11115.001 16212.334)"], ["offset", "0", 2, "stop-color", "#0062E0"], ["offset", "1", 2, "stop-color", "#19AFFF"], ["d", "M16.7,39.8C7.2,38.1,0,29.9,0,20C0,9,9,0,20,0s20,9,20,20c0,9.9-7.2,18.1-16.7,19.8l-1.1-0.9h-4.4L16.7,39.8z", 1, "st0"], ["d", "M27.8,25.6l0.9-5.6h-5.3v-3.9c0-1.6,0.6-2.8,3-2.8h2.6V8.2c-1.4-0.2-3-0.4-4.4-0.4c-4.6,0-7.8,2.8-7.8,7.8V20\n                        h-5v5.6h5v14.1c1.1,0.2,2.2,0.3,3.3,0.3c1.1,0,2.2-0.1,3.3-0.3V25.6H27.8z", 1, "st1"], [1, "login_des"], [1, "login_bt"], [1, "text-1"], [1, "text-2"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1)(2, "div", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 5)(6, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, " Login ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 6)(9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoginComponent_Template_div_click_9_listener() { return ctx.signInWithGoogle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "svg", 8)(11, "g", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "path", 10)(13, "path", 11)(14, "path", 12)(15, "path", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoginComponent_Template_div_click_16_listener() { return ctx.signInWithFacebook(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "svg", 14)(18, "style", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, " .st0{fill:url(#SVGID_1_);} .st1{fill:#FFFFFF;} ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "linearGradient", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](21, "stop", 17)(22, "stop", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](23, "path", 19)(24, "path", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, " By continuing, you agree to HoozOnline Terms of Services and acknowledge that you've read our Privacy policy ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "div", 22)(28, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29, "hoozOnline");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31, "BETA");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    } }, styles: [".login_wrapper[_ngcontent-%COMP%] {\r\n    max-width: 810px;\r\n    width: 100%;\r\n    padding: 0 15px;\r\n    display: flex;\r\n    margin: 0 auto;\r\n}\r\n.lf_left_sec[_ngcontent-%COMP%] {\r\n\tmargin-right: 30px;\r\n}\r\n.lg_right_sec[_ngcontent-%COMP%] {\r\n\tpadding-top: 100px;\r\n}\r\n.lg_right_sec[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n\tfont-weight: 600;\r\n\tmargin-bottom: 20px;\r\n    font-size: 32px;\r\n}\r\n.login_des[_ngcontent-%COMP%] {\r\n\tfont-size: 12px;\r\n\tfont-weight: 300;\r\n\tmargin-bottom: 60px;\r\n}\r\n.login_bt[_ngcontent-%COMP%]   .text-1[_ngcontent-%COMP%] {\r\n\tfont-weight: 300;\r\n\tmargin-bottom: 3px;\r\n}\r\n.login_bt[_ngcontent-%COMP%]   .text-2[_ngcontent-%COMP%] {\r\n\tfont-weight: 600;\r\n}\r\n.social_login[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    margin-bottom: 35px;\r\n}\r\n.sc_lg[_ngcontent-%COMP%] {\r\n    background: var(--light-gray-color);\r\n    height: 72px;\r\n    width: 72px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    border-radius: 12px;\r\n    margin-right: 20px;\r\n    cursor: pointer;\r\n}\r\n.sc_lg[_ngcontent-%COMP%]:hover {\r\n    background-color: #eee;\r\n}\r\n.login_overlay[_ngcontent-%COMP%] {\r\n    display: none;\r\n    background: rgb(255 255 255 / 50%);\r\n    position: absolute;\r\n    left: 0;\r\n    right: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n}\r\n@media (max-width:992px) {\r\n    .logo[_ngcontent-%COMP%]   img.img-responsive[_ngcontent-%COMP%] {\r\n        max-width: 100%;\r\n    }\r\n}\r\n@media (max-width:767px) {\r\n    .login_wrapper[_ngcontent-%COMP%] {\r\n        display: block;\r\n    }\r\n    .lf_left_sec[_ngcontent-%COMP%] {\r\n        display: none;\r\n    }\r\n    .lg_right_sec[_ngcontent-%COMP%] {\r\n        text-align: center;\r\n    }\r\n    .social_login[_ngcontent-%COMP%] {\r\n        justify-content: center;\r\n    }\r\n    .social_login[_ngcontent-%COMP%]   .sc_lg[_ngcontent-%COMP%]:nth-child(2) {\r\n        margin: 0;\r\n    }\r\n    .lg_right_sec[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n        margin-bottom: 27px;\r\n    }\r\n    .login_des[_ngcontent-%COMP%] {\r\n        line-height: 1.5;\r\n        max-width: 220px;\r\n        margin: 0 auto 55px;\r\n    }\r\n    .sc_lg[_ngcontent-%COMP%] {\r\n        width: 63px;\r\n        height: 63px;\r\n        border-radius: 50px;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLGVBQWU7SUFDZixhQUFhO0lBQ2IsY0FBYztBQUNsQjtBQUNBO0NBQ0Msa0JBQWtCO0FBQ25CO0FBQ0E7Q0FDQyxrQkFBa0I7QUFDbkI7QUFDQTtDQUNDLGdCQUFnQjtDQUNoQixtQkFBbUI7SUFDaEIsZUFBZTtBQUNuQjtBQUNBO0NBQ0MsZUFBZTtDQUNmLGdCQUFnQjtDQUNoQixtQkFBbUI7QUFDcEI7QUFDQTtDQUNDLGdCQUFnQjtDQUNoQixrQkFBa0I7QUFDbkI7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjtBQUNBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksbUNBQW1DO0lBQ25DLFlBQVk7SUFDWixXQUFXO0lBQ1gsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixlQUFlO0FBQ25CO0FBQ0E7SUFDSSxzQkFBc0I7QUFDMUI7QUFDQTtJQUNJLGFBQWE7SUFDYixrQ0FBa0M7SUFDbEMsa0JBQWtCO0lBQ2xCLE9BQU87SUFDUCxRQUFRO0lBQ1IsTUFBTTtJQUNOLFNBQVM7QUFDYjtBQUNBO0lBQ0k7UUFDSSxlQUFlO0lBQ25CO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksY0FBYztJQUNsQjtJQUNBO1FBQ0ksYUFBYTtJQUNqQjtJQUNBO1FBQ0ksa0JBQWtCO0lBQ3RCO0lBQ0E7UUFDSSx1QkFBdUI7SUFDM0I7SUFDQTtRQUNJLFNBQVM7SUFDYjtJQUNBO1FBQ0ksbUJBQW1CO0lBQ3ZCO0lBQ0E7UUFDSSxnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLG1CQUFtQjtJQUN2QjtJQUNBO1FBQ0ksV0FBVztRQUNYLFlBQVk7UUFDWixtQkFBbUI7SUFDdkI7QUFDSiIsImZpbGUiOiJMb2dpbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxvZ2luX3dyYXBwZXIge1xyXG4gICAgbWF4LXdpZHRoOiA4MTBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZzogMCAxNXB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIG1hcmdpbjogMCBhdXRvO1xyXG59XHJcbi5sZl9sZWZ0X3NlYyB7XHJcblx0bWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG59XHJcbi5sZ19yaWdodF9zZWMge1xyXG5cdHBhZGRpbmctdG9wOiAxMDBweDtcclxufVxyXG4ubGdfcmlnaHRfc2VjIGgyIHtcclxuXHRmb250LXdlaWdodDogNjAwO1xyXG5cdG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgICBmb250LXNpemU6IDMycHg7XHJcbn1cclxuLmxvZ2luX2RlcyB7XHJcblx0Zm9udC1zaXplOiAxMnB4O1xyXG5cdGZvbnQtd2VpZ2h0OiAzMDA7XHJcblx0bWFyZ2luLWJvdHRvbTogNjBweDtcclxufVxyXG4ubG9naW5fYnQgLnRleHQtMSB7XHJcblx0Zm9udC13ZWlnaHQ6IDMwMDtcclxuXHRtYXJnaW4tYm90dG9tOiAzcHg7XHJcbn1cclxuLmxvZ2luX2J0IC50ZXh0LTIge1xyXG5cdGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuLnNvY2lhbF9sb2dpbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMzVweDtcclxufVxyXG4uc2NfbGcge1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0tbGlnaHQtZ3JheS1jb2xvcik7XHJcbiAgICBoZWlnaHQ6IDcycHg7XHJcbiAgICB3aWR0aDogNzJweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi5zY19sZzpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xyXG59XHJcbi5sb2dpbl9vdmVybGF5IHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjU1IDI1NSAyNTUgLyA1MCUpO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgYm90dG9tOiAwO1xyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOjk5MnB4KSB7XHJcbiAgICAubG9nbyBpbWcuaW1nLXJlc3BvbnNpdmUge1xyXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgIH1cclxufVxyXG5AbWVkaWEgKG1heC13aWR0aDo3NjdweCkge1xyXG4gICAgLmxvZ2luX3dyYXBwZXIge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgfVxyXG4gICAgLmxmX2xlZnRfc2VjIHtcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG4gICAgLmxnX3JpZ2h0X3NlYyB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG4gICAgLnNvY2lhbF9sb2dpbiB7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgICAuc29jaWFsX2xvZ2luIC5zY19sZzpudGgtY2hpbGQoMikge1xyXG4gICAgICAgIG1hcmdpbjogMDtcclxuICAgIH1cclxuICAgIC5sZ19yaWdodF9zZWMgaDIge1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDI3cHg7XHJcbiAgICB9XHJcbiAgICAubG9naW5fZGVzIHtcclxuICAgICAgICBsaW5lLWhlaWdodDogMS41O1xyXG4gICAgICAgIG1heC13aWR0aDogMjIwcHg7XHJcbiAgICAgICAgbWFyZ2luOiAwIGF1dG8gNTVweDtcclxuICAgIH1cclxuICAgIC5zY19sZyB7XHJcbiAgICAgICAgd2lkdGg6IDYzcHg7XHJcbiAgICAgICAgaGVpZ2h0OiA2M3B4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICB9XHJcbn0iXX0= */"] });


/***/ }),

/***/ 7322:
/*!*********************************************************!*\
  !*** ./src/app/ChatModule/Chatbox/Chatbox.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatboxComponent": () => (/* binding */ ChatboxComponent)
/* harmony export */ });
/* harmony import */ var ngx_timeago_language_strings_en__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-timeago/language-strings/en */ 5260);
/* harmony import */ var _Model_Message_RealChatDtos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Model/Message/RealChatDtos */ 9042);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-timeago */ 2699);
/* harmony import */ var _services_Auth_Profile_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/Auth/Profile.service */ 2521);
/* harmony import */ var _services_Chat_User_UserChat_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/Chat/User/UserChat.service */ 5976);
/* harmony import */ var _services_signalr_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/signalr.service */ 9032);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngneat/hot-toast */ 7403);










function ChatboxComponent_a_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("src", ctx_r0.user == null ? null : ctx_r0.user.ImageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
} }
function ChatboxComponent_div_11_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Last seen: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "i", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("date", ctx_r2.LastActive);
} }
function ChatboxComponent_div_11_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 20)(1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Online");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
} }
function ChatboxComponent_div_11_ul_4_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li", 27)(1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("src", ctx_r7.user == null ? null : ctx_r7.user.ImageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", item_r6.Content, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("date", item_r6 == null ? null : item_r6.MessageSent);
} }
function ChatboxComponent_div_11_ul_4_li_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li", 27)(1, "div", 30)(2, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](item_r6.Content);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("date", item_r6 == null ? null : item_r6.MessageSent);
} }
function ChatboxComponent_div_11_ul_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ul", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ChatboxComponent_div_11_ul_4_li_1_Template, 6, 3, "li", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ChatboxComponent_div_11_ul_4_li_2_Template, 5, 2, "li", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", item_r6.SenderContent == null);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", item_r6.SenderContent != null);
} }
function ChatboxComponent_div_11_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "sending...");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function ChatboxComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ChatboxComponent_div_11_div_1_Template, 5, 1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ChatboxComponent_div_11_div_2_Template, 6, 0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ChatboxComponent_div_11_ul_4_Template, 3, 2, "ul", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, ChatboxComponent_div_11_span_5_Template, 2, 0, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 16)(7, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("keyup.enter", function ChatboxComponent_div_11_Template_input_keyup_enter_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r11.SendMsg()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 18)(9, "img", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ChatboxComponent_div_11_Template_img_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r13.SendMsg()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.isOnline == false);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.isOnline == true);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r1.msgInboxArray);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.isSending);
} }
class ChatboxComponent {
    constructor(intl, _profileDetails, _chatServices, _signalR, route, _location, toast) {
        this._profileDetails = _profileDetails;
        this._chatServices = _chatServices;
        this._signalR = _signalR;
        this.route = route;
        this._location = _location;
        this.toast = toast;
        this.isSending = false;
        this.checkIsSend = false;
        this.isOnline = false;
        this.msgDto = new _Model_Message_RealChatDtos__WEBPACK_IMPORTED_MODULE_0__.RealChatDtos();
        this.msgInboxArray = [];
        intl.strings = ngx_timeago_language_strings_en__WEBPACK_IMPORTED_MODULE_5__.strings;
        intl.changes.next();
        let user = JSON.parse(localStorage.getItem("user"));
        this.recipientId = user.Id;
        this.route.queryParams.subscribe((params) => {
            this.senderId = parseInt(params["uid"]);
        });
    }
    ngOnInit() {
        this.loadUserData();
        this.loadUserChat();
        this.IsOnline();
        setInterval(() => {
            this.loadUserChat();
            this.IsOnline();
        }, 2000);
        this._signalR.retrieveMappedObject().subscribe((receivedObj) => { this.addToInbox(receivedObj); });
    }
    loadUserData() {
        this._profileDetails
            .GetUserProfile(this.senderId)
            .subscribe((data) => {
            this.user = data;
        });
    }
    loadUserChat() {
        this._chatServices
            .getMessages(this.senderId, this.recipientId)
            .subscribe((data) => {
            this.msgInboxArray = data;
        });
    }
    IsOnline() {
        this._profileDetails.IsOnline(this.senderId).subscribe((data) => {
            this.isOnline = data.IsOnline;
            this.LastActive = data.LastActive;
        });
    }
    SendMsg() {
        let message = document.getElementById("msg").value;
        if (message == "")
            return this.toast.info('please type to send.', {
                position: 'top-center',
            });
        this.isSending = true;
        this.msgDto = {
            SenderId: this.senderId,
            RecipientId: this.recipientId,
            Content: message,
            RecipientContent: '',
            SenderContent: message,
            MessageSent: new Date()
        };
        document.getElementById("msg").value = "";
        this._signalR.mapReceivedMessage(this.msgDto);
        this._signalR.sendMessageToApi(this.senderId, this.msgDto).subscribe((data) => {
            this.isSending = false;
            this.checkIsSend = true;
        }, err => {
            this.isSending = false;
        });
    }
    addToInbox(obj) {
        let newObj = new _Model_Message_RealChatDtos__WEBPACK_IMPORTED_MODULE_0__.RealChatDtos();
        newObj.SenderId = obj.SenderId;
        newObj.SenderContent = obj.SenderContent;
        newObj.RecipientId = obj.RecipientId;
        newObj.RecipientContent = obj.RecipientContent;
        newObj.Content = obj.Content;
        newObj.MessageSent = new Date();
        this.msgInboxArray.push(newObj);
    }
    //Back loacation History
    backClicked() {
        this._location.back();
    }
}
ChatboxComponent.ɵfac = function ChatboxComponent_Factory(t) { return new (t || ChatboxComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_timeago__WEBPACK_IMPORTED_MODULE_6__.TimeagoIntl), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_Auth_Profile_service__WEBPACK_IMPORTED_MODULE_1__.ProfileService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_Chat_User_UserChat_service__WEBPACK_IMPORTED_MODULE_2__.UserChatService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_signalr_service__WEBPACK_IMPORTED_MODULE_3__.SignalrService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_9__.HotToastService)); };
ChatboxComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: ChatboxComponent, selectors: [["app-Chatbox"]], decls: 12, vars: 5, consts: [[1, "chat-app"], [1, "chat_top_sec"], [1, "back_arrow_chat"], ["aria-hidden", "true", 1, "back", "fa", "fa-2x", "fa", "fa-angle-left", 3, "click"], [1, "tp_user"], ["data-toggle", "modal", "data-target", "#view_info", 4, "ngIf"], [1, "c-details"], [1, "img", "share"], ["class", "chat", 4, "ngIf"], ["data-toggle", "modal", "data-target", "#view_info"], ["alt", "avatar", 3, "src"], [1, "chat"], ["class", "chat-header clearfix", 4, "ngIf"], [1, "chat-history"], ["class", "m-b-0", 4, "ngFor", "ngForOf"], ["class", "message-sending", 4, "ngIf"], [1, "chat-message_btn", "clearfix"], ["type", "text", "id", "msg", "value", "", "placeholder", "Type here...", 1, "form-control", 3, "keyup.enter"], [1, "send_wrap"], ["src", "./../../../assets/Logo/send.svg", "alt", "img", 1, "img", "send", 3, "click"], [1, "chat-header", "clearfix"], [1, "fa", "fa-circle", "offline"], ["timeago", "", 1, "message-data-time", 3, "date"], [1, "status"], [1, "fa", "fa-circle", "online"], [1, "m-b-0"], ["class", "clearfix", 4, "ngIf"], [1, "clearfix"], [1, "message-data"], [1, "message", "other-message"], [1, "md_chat"], [1, "message", "my-message"], [1, "message-sending"]], template: function ChatboxComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ChatboxComponent_Template_i_click_3_listener() { return ctx.backClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, ChatboxComponent_a_5_Template, 2, 1, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 6)(7, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, ChatboxComponent_div_11_Template, 10, 4, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.user == null ? null : ctx.user.ImageUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.user == null ? null : ctx.user.Name);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", ctx.user == null ? null : ctx.user.City, ", ", ctx.user == null ? null : ctx.user.State, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.user);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, ngx_timeago__WEBPACK_IMPORTED_MODULE_6__.TimeagoDirective], styles: [".chat-app[_ngcontent-%COMP%] {\n  max-width: 100%;\n  width: 630px;\n  padding-left: 15px;\n  padding-right: 15px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.img.share[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1;\n}\n\n.c-details[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.c-details[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  margin: 0 0 7px;\n}\n\n.chat-app[_ngcontent-%COMP%]   .chat[_ngcontent-%COMP%] {\n  background: var(--light-gray-color);\n  box-shadow: inset 0px 8px 8px rgba(0, 0, 0, 0.02);\n  border-radius: 15px;\n}\n\n.chat-app[_ngcontent-%COMP%]   .people-list[_ngcontent-%COMP%] {\n  width: 280px;\n  position: absolute;\n  left: 0;\n  top: 0;\n  padding: 20px;\n  z-index: 7;\n}\n\n.people-list[_ngcontent-%COMP%] {\n  transition: 0.5s;\n}\n\n.people-list[_ngcontent-%COMP%]   .chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 10px 15px;\n  list-style: none;\n  border-radius: 3px;\n}\n\n.people-list[_ngcontent-%COMP%]   .chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  background: #efefef;\n  cursor: pointer;\n}\n\n.people-list[_ngcontent-%COMP%]   .chat-list[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%] {\n  background: #efefef;\n}\n\n.people-list[_ngcontent-%COMP%]   .chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n\n.people-list[_ngcontent-%COMP%]   .chat-list[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n}\n\n.people-list[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n}\n\n.people-list[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%] {\n  float: left;\n  padding-left: 8px;\n}\n\n.people-list[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 13px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%] {\n  padding: 15px 20px;\n  font-size: var(--font-size-sm);\n  text-align: center;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  float: left;\n  border-radius: 50%;\n  width: 48px;\n  height: 48px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   .chat-about[_ngcontent-%COMP%] {\n  float: left;\n  padding-left: 10px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-height: calc(100vh - 345px);\n  overflow-y: auto;\n  margin-bottom: 5px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding: 0;\n  max-height: 415px;\n  overflow-y: auto;\n  margin: 0 0 20px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  list-style: none;\n  margin-bottom: 30px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message-data[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message-data[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  margin-right: 14px;\n  background: #fff;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message-data-time[_ngcontent-%COMP%] {\n  font-size: 12px;\n  padding-left: 68px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%] {\n  color: #444;\n  font-size: var(--font-font-normal);\n  border-radius: 7px;\n  display: inline-block;\n  position: relative;\n  margin-bottom: 5px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .other-message[_ngcontent-%COMP%] {\n  background: #fff;\n  padding: 12px 16px;\n  max-width: 290px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-message[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n\n.online[_ngcontent-%COMP%], .offline[_ngcontent-%COMP%], .me[_ngcontent-%COMP%] {\n  margin-right: 2px;\n  font-size: 8px;\n  vertical-align: middle;\n}\n\n.online[_ngcontent-%COMP%] {\n  color: #86c541;\n}\n\n.offline[_ngcontent-%COMP%] {\n  color: #e47297;\n}\n\n.me[_ngcontent-%COMP%] {\n  color: #1d8ecd;\n}\n\n.float-right[_ngcontent-%COMP%] {\n  float: right;\n}\n\n.clearfix[_ngcontent-%COMP%]:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n\n.md_chat[_ngcontent-%COMP%] {\n  text-align: right;\n  padding-right: 40px;\n  padding-left: 64px;\n}\n\n.md_chat[_ngcontent-%COMP%]   .message-data-time[_ngcontent-%COMP%] {\n  padding: 0;\n}\n\n.input-group-prepend[_ngcontent-%COMP%] {\n  margin-right: 20px;\n  cursor: pointer;\n}\n\n.send_wrap[_ngcontent-%COMP%] {\n  margin-left: 15px;\n  cursor: pointer;\n}\n\n.chat-message_btn[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 12px 26px;\n  align-items: center;\n}\n\n.chat-message_btn[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  background: #FFFFFF;\n  border-radius: 12px;\n  height: 48px;\n  border: none;\n  font-size: 18px;\n  padding: 2px 18px;\n  box-shadow: none;\n}\n\n.chat_top_sec[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 25px;\n}\n\n.back_arrow_chat[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  cursor: pointer;\n}\n\n.chat_top_sec[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  flex: 1;\n  text-align: center;\n  margin: 0;\n  font-weight: 600;\n}\n\n.tp_user[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-left: 20px;\n}\n\n.tp_user[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n}\n\n.tp_user[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  margin-right: 20px;\n}\n\n@media (max-width: 767px) {\n  .back_arrow_chat[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 30px;\n  }\n\n  .md_chat[_ngcontent-%COMP%] {\n    padding-right: 10px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNoYXRib3guY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQUVGOztBQUFBO0VBQ0UsT0FBQTtBQUdGOztBQUZFO0VBQ0ksZUFBQTtBQUlOOztBQURBO0VBQ0UsbUNBQUE7RUFDQSxpREFBQTtFQUNBLG1CQUFBO0FBSUY7O0FBRkE7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxPQUFBO0VBQ0EsTUFBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0FBS0Y7O0FBRkE7RUFJRSxnQkFBQTtBQUtGOztBQUZBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBS0Y7O0FBRkE7RUFDRSxtQkFBQTtFQUNBLGVBQUE7QUFLRjs7QUFGQTtFQUNFLG1CQUFBO0FBS0Y7O0FBRkE7RUFDRSxlQUFBO0FBS0Y7O0FBRkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBS0Y7O0FBRkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBS0Y7O0FBRkE7RUFDRSxXQUFBO0VBQ0EsaUJBQUE7QUFLRjs7QUFGQTtFQUNFLFdBQUE7RUFDQSxlQUFBO0FBS0Y7O0FBRkE7RUFDRSxrQkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7QUFLRjs7QUFGQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBS0Y7O0FBRkE7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7QUFLRjs7QUFGQTtFQUNFLGFBQUE7RUFDQSwrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFLRjs7QUFGQTtFQUNFLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFLRjs7QUFGQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7QUFLRjs7QUFGQTtFQUNFLGtCQUFBO0FBS0Y7O0FBRkE7RUFDRSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBQUtGOztBQUZBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFLRjs7QUFGQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtBQUtGOztBQUZBO0VBQ0UsV0FBQTtFQUNBLGtDQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUFLRjs7QUFGQTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQUtGOztBQUZBO0VBQ0UsYUFBQTtBQUtGOztBQUZBOzs7RUFHRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxzQkFBQTtBQUtGOztBQUZBO0VBQ0UsY0FBQTtBQUtGOztBQUZBO0VBQ0UsY0FBQTtBQUtGOztBQUZBO0VBQ0UsY0FBQTtBQUtGOztBQUZBO0VBQ0UsWUFBQTtBQUtGOztBQUZBO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtBQUtGOztBQUhBO0VBQ0UsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBTUY7O0FBSkE7RUFDRSxVQUFBO0FBT0Y7O0FBTEE7RUFBc0Isa0JBQUE7RUFBb0IsZUFBQTtBQVUxQzs7QUFUQTtFQUFZLGlCQUFBO0VBQW1CLGVBQUE7QUFjL0I7O0FBYkE7RUFBbUIsYUFBQTtFQUFjLGtCQUFBO0VBQW9CLG1CQUFBO0FBbUJyRDs7QUFsQkE7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0VBQW9CLFlBQUE7RUFBYSxZQUFBO0VBQWEsZUFBQTtFQUFnQixpQkFBQTtFQUFrQixnQkFBQTtBQTBCbEY7O0FBeEJBO0VBQWUsYUFBQTtFQUFjLG1CQUFBO0VBQW9CLG1CQUFBO0FBOEJqRDs7QUE3QkE7RUFBa0IsaUJBQUE7RUFBbUIsZUFBQTtBQWtDckM7O0FBakNBO0VBQWtCLGVBQUE7RUFBaUIsT0FBQTtFQUFTLGtCQUFBO0VBQW9CLFNBQUE7RUFBVyxnQkFBQTtBQXlDM0U7O0FBeENBO0VBQVUsYUFBQTtFQUFlLG1CQUFBO0VBQXFCLGlCQUFBO0FBOEM5Qzs7QUE3Q0E7RUFBYyxXQUFBO0VBQWEsWUFBQTtFQUFjLGtCQUFBO0FBbUR6Qzs7QUFsREE7RUFBWSxrQkFBQTtBQXNEWjs7QUFyREE7RUFDRTtJQUNFLGVBQUE7RUF3REY7O0VBdERBO0lBQ0UsbUJBQUE7RUF5REY7QUFDRiIsImZpbGUiOiJDaGF0Ym94LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNoYXQtYXBwIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICB3aWR0aDogNjMwcHg7XG4gIHBhZGRpbmctbGVmdDogMTVweDtcbiAgcGFkZGluZy1yaWdodDogMTVweDtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbn1cbi5pbWcuc2hhcmUge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuLmMtZGV0YWlscyB7XG4gIGZsZXg6IDE7XG4gIGg2IHtcbiAgICAgIG1hcmdpbjogMCAwIDdweDtcbiAgfVxufVxuLmNoYXQtYXBwIC5jaGF0IHtcbiAgYmFja2dyb3VuZDogdmFyKC0tbGlnaHQtZ3JheS1jb2xvcik7XG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCA4cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4wMik7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG59XG4uY2hhdC1hcHAgLnBlb3BsZS1saXN0IHtcbiAgd2lkdGg6IDI4MHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgcGFkZGluZzogMjBweDtcbiAgei1pbmRleDogN1xufVxuXG4ucGVvcGxlLWxpc3Qge1xuICAtbW96LXRyYW5zaXRpb246IC41cztcbiAgLW8tdHJhbnNpdGlvbjogLjVzO1xuICAtd2Via2l0LXRyYW5zaXRpb246IC41cztcbiAgdHJhbnNpdGlvbjogLjVzXG59XG5cbi5wZW9wbGUtbGlzdCAuY2hhdC1saXN0IGxpIHtcbiAgcGFkZGluZzogMTBweCAxNXB4O1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAzcHhcbn1cblxuLnBlb3BsZS1saXN0IC5jaGF0LWxpc3QgbGk6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xuICBjdXJzb3I6IHBvaW50ZXJcbn1cblxuLnBlb3BsZS1saXN0IC5jaGF0LWxpc3QgbGkuYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2VmZWZlZlxufVxuXG4ucGVvcGxlLWxpc3QgLmNoYXQtbGlzdCBsaSAubmFtZSB7XG4gIGZvbnQtc2l6ZTogMTVweFxufVxuXG4ucGVvcGxlLWxpc3QgLmNoYXQtbGlzdCBpbWcge1xuICB3aWR0aDogNDhweDtcbiAgaGVpZ2h0OiA0OHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCVcbn1cblxuLnBlb3BsZS1saXN0IGltZyB7XG4gIHdpZHRoOiA0OHB4O1xuICBoZWlnaHQ6IDQ4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJVxufVxuXG4ucGVvcGxlLWxpc3QgLmFib3V0IHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIHBhZGRpbmctbGVmdDogOHB4XG59XG5cbi5wZW9wbGUtbGlzdCAuc3RhdHVzIHtcbiAgY29sb3I6ICM5OTk7XG4gIGZvbnQtc2l6ZTogMTNweFxufVxuXG4uY2hhdCAuY2hhdC1oZWFkZXIge1xuICBwYWRkaW5nOiAxNXB4IDIwcHg7XG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplLXNtKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uY2hhdCAuY2hhdC1oZWFkZXIgaW1nIHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDQ4cHg7XG4gIGhlaWdodDogNDhweFxufVxuXG4uY2hhdCAuY2hhdC1oZWFkZXIgLmNoYXQtYWJvdXQge1xuICBmbG9hdDogbGVmdDtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4XG59XG5cbi5jaGF0IC5jaGF0LWhpc3Rvcnkge1xuICBwYWRkaW5nOiAyMHB4O1xuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMzQ1cHgpO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG5cbi5jaGF0IC5jaGF0LWhpc3RvcnkgdWwge1xuICBwYWRkaW5nOiAwO1xuICBtYXgtaGVpZ2h0OiA0MTVweDtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgbWFyZ2luOiAwIDAgMjBweDtcbn1cblxuLmNoYXQgLmNoYXQtaGlzdG9yeSB1bCBsaSB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG1hcmdpbi1ib3R0b206IDMwcHhcbn1cblxuLmNoYXQgLmNoYXQtaGlzdG9yeSB1bCBsaTpsYXN0LWNoaWxkIHtcbiAgbWFyZ2luLWJvdHRvbTogMHB4XG59XG5cbi5jaGF0IC5jaGF0LWhpc3RvcnkgLm1lc3NhZ2UtZGF0YSB7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5jaGF0IC5jaGF0LWhpc3RvcnkgLm1lc3NhZ2UtZGF0YSBpbWcge1xuICB3aWR0aDogNDhweDtcbiAgaGVpZ2h0OiA0OHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIG1hcmdpbi1yaWdodDogMTRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cblxuLmNoYXQgLmNoYXQtaGlzdG9yeSAubWVzc2FnZS1kYXRhLXRpbWUge1xuICBmb250LXNpemU6IDEycHg7XG4gIHBhZGRpbmctbGVmdDogNjhweDtcbn1cblxuLmNoYXQgLmNoYXQtaGlzdG9yeSAubWVzc2FnZSB7XG4gIGNvbG9yOiAjNDQ0O1xuICBmb250LXNpemU6IHZhcigtLWZvbnQtZm9udC1ub3JtYWwpO1xuICBib3JkZXItcmFkaXVzOiA3cHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG5cbi5jaGF0IC5jaGF0LWhpc3RvcnkgLm90aGVyLW1lc3NhZ2Uge1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIG1heC13aWR0aDogMjkwcHg7XG59XG5cbi5jaGF0IC5jaGF0LW1lc3NhZ2Uge1xuICBwYWRkaW5nOiAyMHB4XG59XG5cbi5vbmxpbmUsXG4ub2ZmbGluZSxcbi5tZSB7XG4gIG1hcmdpbi1yaWdodDogMnB4O1xuICBmb250LXNpemU6IDhweDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZVxufVxuXG4ub25saW5lIHtcbiAgY29sb3I6ICM4NmM1NDFcbn1cblxuLm9mZmxpbmUge1xuICBjb2xvcjogI2U0NzI5N1xufVxuXG4ubWUge1xuICBjb2xvcjogIzFkOGVjZFxufVxuXG4uZmxvYXQtcmlnaHQge1xuICBmbG9hdDogcmlnaHRcbn1cblxuLmNsZWFyZml4OmFmdGVyIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAwO1xuICBjb250ZW50OiBcIiBcIjtcbiAgY2xlYXI6IGJvdGg7XG4gIGhlaWdodDogMFxufVxuLm1kX2NoYXQge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgcGFkZGluZy1yaWdodDogNDBweDtcbiAgcGFkZGluZy1sZWZ0OiA2NHB4O1xufVxuLm1kX2NoYXQgLm1lc3NhZ2UtZGF0YS10aW1lIHtcbiAgcGFkZGluZzogMDtcbn1cbi5pbnB1dC1ncm91cC1wcmVwZW5kIHttYXJnaW4tcmlnaHQ6IDIwcHg7IGN1cnNvcjogcG9pbnRlcjt9XG4uc2VuZF93cmFwIHttYXJnaW4tbGVmdDogMTVweDsgY3Vyc29yOiBwb2ludGVyO31cbi5jaGF0LW1lc3NhZ2VfYnRuIHtkaXNwbGF5OiBmbGV4O3BhZGRpbmc6IDEycHggMjZweDsgYWxpZ24taXRlbXM6IGNlbnRlcjt9XG4uY2hhdC1tZXNzYWdlX2J0biAuZm9ybS1jb250cm9sIHtcbiAgYmFja2dyb3VuZDogI0ZGRkZGRjtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtoZWlnaHQ6IDQ4cHg7Ym9yZGVyOiBub25lO2ZvbnQtc2l6ZTogMThweDtwYWRkaW5nOiAycHggMThweDtib3gtc2hhZG93OiBub25lO1xufVxuLmNoYXRfdG9wX3NlYyB7ZGlzcGxheTogZmxleDthbGlnbi1pdGVtczogY2VudGVyO21hcmdpbi1ib3R0b206IDI1cHg7fVxuLmJhY2tfYXJyb3dfY2hhdCB7bWFyZ2luLWxlZnQ6IDEwcHg7IGN1cnNvcjogcG9pbnRlcjt9XG4uY2hhdF90b3Bfc2VjIGgyIHtmb250LXNpemU6IDIycHg7IGZsZXg6IDE7IHRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luOiAwOyBmb250LXdlaWdodDogNjAwO31cbi50cF91c2VyIHtkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBtYXJnaW4tbGVmdDogMjBweDt9XG4udHBfdXNlciBpbWcge3dpZHRoOiA0OHB4OyBoZWlnaHQ6IDQ4cHg7IGJvcmRlci1yYWRpdXM6IDUwJTt9XG4udHBfdXNlciBhIHttYXJnaW4tcmlnaHQ6IDIwcHg7fVxuQG1lZGlhIChtYXgtd2lkdGg6NzY3cHgpIHtcbiAgLmJhY2tfYXJyb3dfY2hhdCBpIHtcbiAgICBmb250LXNpemU6IDMwcHg7XG4gIH1cbiAgLm1kX2NoYXQge1xuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4gIH1cbn1cbiJdfQ== */"] });


/***/ }),

/***/ 6655:
/*!*****************************************************!*\
  !*** ./src/app/ChatModule/Chats/Chats.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatsComponent": () => (/* binding */ ChatsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_Chat_User_UserChat_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/Chat/User/UserChat.service */ 5976);
/* harmony import */ var _services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/SharedServices/Shared.service */ 4937);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4666);





const _c0 = function () { return ["/chatbox"]; };
const _c1 = function (a0) { return { uid: a0 }; };
function ChatsComponent_ul_2_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 7)(3, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](6, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](7, _c1, item_r1.Id));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("src", item_r1.ImageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r1.Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", item_r1 == null ? null : item_r1.City, ", ", item_r1 == null ? null : item_r1.State, " ");
} }
function ChatsComponent_ul_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ul", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ChatsComponent_ul_2_li_1_Template, 8, 9, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", item_r1.Id !== ctx_r0.userId);
} }
class ChatsComponent {
    constructor(_userchatServices, _sharedServices, _navigaterouter) {
        this._userchatServices = _userchatServices;
        this._sharedServices = _sharedServices;
        this._navigaterouter = _navigaterouter;
        this._sharedServices.checkInterNetConnection();
        let user = JSON.parse(localStorage.getItem('user'));
        this.userId = user.Id;
    }
    ngOnInit() {
        this.LoadUserChatList();
    }
    LoadUserChatList() {
        this._userchatServices.getUserchatList(this.userId).subscribe((data) => {
            this.userlist = data.data;
        });
    }
    RedirectToUser(userId) {
        this._navigaterouter.navigate(['/profile'], { queryParams: { target: userId } });
    }
}
ChatsComponent.ɵfac = function ChatsComponent_Factory(t) { return new (t || ChatsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_Chat_User_UserChat_service__WEBPACK_IMPORTED_MODULE_0__.UserChatService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_1__.SharedService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router)); };
ChatsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ChatsComponent, selectors: [["app-Chats"]], decls: 3, vars: 1, consts: [[1, "chat-app"], ["id", "plist", 1, "people-list"], ["class", "list-unstyled chat-list", 4, "ngFor", "ngForOf"], [1, "list-unstyled", "chat-list"], ["class", "clearfix", 3, "routerLink", "queryParams", 4, "ngIf"], [1, "clearfix", 3, "routerLink", "queryParams"], ["alt", "avatar", 3, "src"], [1, "about"], [1, "name"], [1, "status"], [1, "fa", "fa-angle-right"]], template: function ChatsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ChatsComponent_ul_2_Template, 2, 1, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.userlist);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink], styles: [".people-list[_ngcontent-%COMP%] {\n  max-width: 100%;\n  width: 630px;\n  padding-left: 15px;\n  padding-right: 15px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 10px;\n  align-items: center;\n  padding: 12px 16px;\n  border-radius: 12px;\n  cursor: pointer;\n}\n.fa-angle-right[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-left: auto;\n  margin-right: 20px;\n  display: none;\n}\n.chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   .fa-angle-right[_ngcontent-%COMP%] {\n  display:block;\n}\n.chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  background: var(--light-gray-color);\n}\n.chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  margin-right: 17px;\n}\n.about[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  margin-bottom: 5px;\n}\n.about[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.about[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%]   i.fa[_ngcontent-%COMP%] {\n  margin-right: 4px;\n  font-size: 12px;\n}\n.online[_ngcontent-%COMP%] {\n  color: #86c541;\n}\n.offline[_ngcontent-%COMP%] {\n  color: #e47297;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNoYXRzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFlO0VBQ2YsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixhQUFhO0FBQ2Y7QUFDQTtFQUNFLGFBQWE7QUFDZjtBQUNBO0VBQ0UsbUNBQW1DO0FBQ3JDO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGVBQWU7QUFDakI7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQixlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxjQUFjO0FBQ2hCIiwiZmlsZSI6IkNoYXRzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGVvcGxlLWxpc3Qge1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHdpZHRoOiA2MzBweDtcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xufVxuLmNoYXQtbGlzdCBsaSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmZhLWFuZ2xlLXJpZ2h0IHtcbiAgZm9udC1zaXplOiAzMnB4O1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICBkaXNwbGF5OiBub25lO1xufVxuLmNoYXQtbGlzdCBsaTpob3ZlciAuZmEtYW5nbGUtcmlnaHQge1xuICBkaXNwbGF5OmJsb2NrO1xufVxuLmNoYXQtbGlzdCBsaTpob3ZlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWxpZ2h0LWdyYXktY29sb3IpO1xufVxuLmNoYXQtbGlzdCBsaSBpbWcge1xuICB3aWR0aDogNDhweDtcbiAgaGVpZ2h0OiA0OHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIG1hcmdpbi1yaWdodDogMTdweDtcbn1cbi5hYm91dCAubmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbn1cbi5hYm91dCAuc3RhdHVzIHtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuLmFib3V0IC5zdGF0dXMgaS5mYSB7XG4gIG1hcmdpbi1yaWdodDogNHB4O1xuICBmb250LXNpemU6IDEycHg7XG59XG4ub25saW5lIHtcbiAgY29sb3I6ICM4NmM1NDE7XG59XG4ub2ZmbGluZSB7XG4gIGNvbG9yOiAjZTQ3Mjk3O1xufVxuIl19 */"] });


/***/ }),

/***/ 584:
/*!*********************************************************!*\
  !*** ./src/app/ChatModule/JobChat/JobChat.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JobChatComponent": () => (/* binding */ JobChatComponent)
/* harmony export */ });
/* harmony import */ var ngx_timeago_language_strings_en__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-timeago/language-strings/en */ 5260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-timeago */ 2699);
/* harmony import */ var _services_JobPost_JobPost_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/JobPost/JobPost.service */ 9923);
/* harmony import */ var _services_Chat_JobChat_JobChat_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/Chat/JobChat/JobChat.service */ 9597);
/* harmony import */ var _services_signalr_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/signalr.service */ 9032);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngneat/hot-toast */ 7403);









const _c0 = function () { return ["/jobDetails"]; };
const _c1 = function (a0) { return { target: a0 }; };
function JobChatComponent_a_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](3, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](4, _c1, ctx_r0.job == null ? null : ctx_r0.job.Id));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("src", ctx_r0.job == null ? null : ctx_r0.job.ImagesUrl, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function JobChatComponent_div_8_ul_3_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 20)(1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "img", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("src", item_r4 == null ? null : item_r4.RecipientPhotoUrl, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", item_r4.Content, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("date", item_r4.MessageSent);
} }
function JobChatComponent_div_8_ul_3_li_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 20)(1, "div", 25)(2, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const item_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r4.Content);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("date", item_r4.MessageSent);
} }
function JobChatComponent_div_8_ul_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ul", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, JobChatComponent_div_8_ul_3_li_1_Template, 6, 3, "li", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, JobChatComponent_div_8_ul_3_li_2_Template, 5, 2, "li", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", item_r4.SenderContent == null);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", item_r4.SenderContent != null);
} }
function JobChatComponent_div_8_span_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "sending...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function JobChatComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, JobChatComponent_div_8_ul_3_Template, 3, 2, "ul", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, JobChatComponent_div_8_span_4_Template, 2, 0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 14)(6, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("keyup.enter", function JobChatComponent_div_8_Template_input_keyup_enter_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r9.SendMsg()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 16)(8, "img", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function JobChatComponent_div_8_Template_img_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r11.SendMsg()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.jobMessages);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.isSending);
} }
class JobChatComponent {
    constructor(intl, _jobServices, _jobchatServices, _signalR, route, _location, toast) {
        this._jobServices = _jobServices;
        this._jobchatServices = _jobchatServices;
        this._signalR = _signalR;
        this.route = route;
        this._location = _location;
        this.toast = toast;
        this.messages = [];
        this.jobMessages = [];
        this.isSending = false;
        intl.strings = ngx_timeago_language_strings_en__WEBPACK_IMPORTED_MODULE_4__.strings;
        intl.changes.next();
        let user = JSON.parse(localStorage.getItem("user"));
        this.route.queryParams.subscribe((params) => {
            this.jobId = params["jobId"];
            this.senderId = params["senderId"];
            this.recipientId = params["recipientId"];
        });
        this.LoadJobDetailsById();
        this.getJobChat();
        this.UpdateSeenResponces();
    }
    ngOnInit() {
        setInterval(() => {
            this.getJobChat();
        }, 2000);
    }
    getJobChat() {
        this._jobchatServices.getJobchatList(this.jobId, this.senderId, this.recipientId).subscribe((data) => {
            this.jobMessages = data;
        });
    }
    LoadJobDetailsById() {
        this._jobServices.GetJobById(this.jobId).subscribe((data) => {
            this.job = data[0];
        });
    }
    SendMsg() {
        let message = document.getElementById("msg").value;
        if (message == "")
            return this.toast.info('please type to send.', {
                position: 'top-center',
            });
        this.isSending = true;
        let messageObj = {
            JobId: this.jobId,
            SenderId: this.senderId,
            SenderContent: message,
            RecipientId: this.recipientId,
            Content: message,
            MessageSent: new Date()
        };
        this._signalR.broadcastJobMessage(messageObj);
        document.getElementById("msg").value = "";
        this._signalR.sendMessageToJobApi(this.jobId, this.recipientId, this.senderId, messageObj).subscribe((data) => {
            this.isSending = false;
        }, err => {
            this.isSending = false;
        });
    }
    UpdateSeenResponces() {
        this._jobchatServices.updateJobReponcesCount(this.jobId, this.recipientId, this.senderId).subscribe(() => { });
    }
    //Back loacation History
    backClicked() {
        this._location.back();
    }
}
JobChatComponent.ɵfac = function JobChatComponent_Factory(t) { return new (t || JobChatComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ngx_timeago__WEBPACK_IMPORTED_MODULE_5__.TimeagoIntl), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_JobPost_JobPost_service__WEBPACK_IMPORTED_MODULE_0__.JobPostService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_Chat_JobChat_JobChat_service__WEBPACK_IMPORTED_MODULE_1__.JobChatService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_signalr_service__WEBPACK_IMPORTED_MODULE_2__.SignalrService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_8__.HotToastService)); };
JobChatComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: JobChatComponent, selectors: [["app-JobChat"]], decls: 9, vars: 3, consts: [[1, "chat-app"], [1, "chat_top_sec"], [1, "back_arrow_chat"], ["aria-hidden", "true", 1, "back", "fa", "fa-2x", "fa", "fa-angle-left", 3, "click"], [1, "tp_user"], ["data-toggle", "modal", "data-target", "#view_info", 3, "routerLink", "queryParams", 4, "ngIf"], ["class", "chat", 4, "ngIf"], ["data-toggle", "modal", "data-target", "#view_info", 3, "routerLink", "queryParams"], ["alt", "hooz", 3, "src"], [1, "chat"], [1, "chat-header", "clearfix"], [1, "chat-history"], ["class", "m-b-0", 4, "ngFor", "ngForOf"], ["class", "message-sending", 4, "ngIf"], [1, "chat-message_btn", "clearfix"], ["type", "text", "id", "msg", "value", "", "placeholder", "Enter text here...", 1, "form-control", 3, "keyup.enter"], [1, "send_wrap"], ["src", "./../../../assets/Logo/send.svg", "alt", "img", 1, "img", "send", 3, "click"], [1, "m-b-0"], ["class", "clearfix", 4, "ngIf"], [1, "clearfix"], [1, "message-data"], ["alt", "avatar", 3, "src"], [1, "message", "other-message"], ["timeago", "", 1, "message-data-time", 3, "date"], [1, "md_chat"], [1, "message", "my-message"], [1, "message-sending"]], template: function JobChatComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function JobChatComponent_Template_i_click_3_listener() { return ctx.backClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, JobChatComponent_a_5_Template, 2, 6, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, JobChatComponent_div_8_Template, 9, 2, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.job == null ? null : ctx.job.ImagesUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("You are messaging to Job Id ", ctx.job == null ? null : ctx.job.Id, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.job);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLinkWithHref, ngx_timeago__WEBPACK_IMPORTED_MODULE_5__.TimeagoDirective], styles: [".chat-app[_ngcontent-%COMP%] {\n  max-width: 100%;\n  width: 630px;\n  padding-left: 15px;\n  padding-right: 15px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.img.share[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1;\n}\n\n.c-details[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.c-details[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  margin: 0 0 7px;\n}\n\n.chat-app[_ngcontent-%COMP%]   .chat[_ngcontent-%COMP%] {\n  background: var(--light-gray-color);\n  box-shadow: inset 0px 8px 8px rgba(0, 0, 0, 0.02);\n  border-radius: 15px;\n}\n\n.chat-app[_ngcontent-%COMP%]   .people-list[_ngcontent-%COMP%] {\n  width: 280px;\n  position: absolute;\n  left: 0;\n  top: 0;\n  padding: 20px;\n  z-index: 7;\n}\n\n.people-list[_ngcontent-%COMP%] {\n  transition: 0.5s;\n}\n\n.people-list[_ngcontent-%COMP%]   .chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 10px 15px;\n  list-style: none;\n  border-radius: 3px;\n}\n\n.people-list[_ngcontent-%COMP%]   .chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  background: #efefef;\n  cursor: pointer;\n}\n\n.people-list[_ngcontent-%COMP%]   .chat-list[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%] {\n  background: #efefef;\n}\n\n.people-list[_ngcontent-%COMP%]   .chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n\n.people-list[_ngcontent-%COMP%]   .chat-list[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n}\n\n.people-list[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n}\n\n.people-list[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%] {\n  float: left;\n  padding-left: 8px;\n}\n\n.people-list[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 13px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%] {\n  padding: 15px 20px;\n  font-size: var(--font-size-sm);\n  text-align: center;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  float: left;\n  border-radius: 50%;\n  width: 48px;\n  height: 48px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   .chat-about[_ngcontent-%COMP%] {\n  float: left;\n  padding-left: 10px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-height: calc(100vh - 345px);\n  overflow-y: auto;\n  margin-bottom: 5px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding: 0;\n  max-height: 415px;\n  overflow-y: auto;\n  margin: 0 0 20px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  list-style: none;\n  margin-bottom: 30px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message-data[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message-data[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  margin-right: 14px;\n  background: #fff;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message-data-time[_ngcontent-%COMP%] {\n  font-size: 12px;\n  padding-left: 68px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%] {\n  color: #444;\n  font-size: var(--font-font-normal);\n  border-radius: 7px;\n  display: inline-block;\n  position: relative;\n  margin-bottom: 5px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .other-message[_ngcontent-%COMP%] {\n  background: #fff;\n  padding: 12px 16px;\n  max-width: 290px;\n}\n\n.chat[_ngcontent-%COMP%]   .chat-message[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n\n.online[_ngcontent-%COMP%], .offline[_ngcontent-%COMP%], .me[_ngcontent-%COMP%] {\n  margin-right: 2px;\n  font-size: 8px;\n  vertical-align: middle;\n}\n\n.online[_ngcontent-%COMP%] {\n  color: #86c541;\n}\n\n.offline[_ngcontent-%COMP%] {\n  color: #e47297;\n}\n\n.me[_ngcontent-%COMP%] {\n  color: #1d8ecd;\n}\n\n.float-right[_ngcontent-%COMP%] {\n  float: right;\n}\n\n.clearfix[_ngcontent-%COMP%]:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n\n.md_chat[_ngcontent-%COMP%] {\n  text-align: right;\n  padding-right: 40px;\n  padding-left: 64px;\n}\n\n.md_chat[_ngcontent-%COMP%]   .message-data-time[_ngcontent-%COMP%] {\n  padding: 0;\n}\n\n.input-group-prepend[_ngcontent-%COMP%] {\n  margin-right: 20px;\n  cursor: pointer;\n}\n\n.send_wrap[_ngcontent-%COMP%] {\n  margin-left: 15px;\n  cursor: pointer;\n}\n\n.chat-message_btn[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 12px 26px;\n  align-items: center;\n}\n\n.chat-message_btn[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  background: #FFFFFF;\n  border-radius: 12px;\n  height: 48px;\n  border: none;\n  font-size: 18px;\n  padding: 2px 18px;\n  box-shadow: none;\n}\n\n.chat_top_sec[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 25px;\n}\n\n.back_arrow_chat[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  cursor: pointer;\n}\n\n.chat_top_sec[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  flex: 1;\n  text-align: center;\n  margin: 0;\n  font-weight: 600;\n}\n\n.tp_user[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-left: 20px;\n}\n\n.tp_user[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n}\n\n.tp_user[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  margin-right: 20px;\n}\n\n@media (max-width: 767px) {\n  .back_arrow_chat[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 30px;\n  }\n\n  .md_chat[_ngcontent-%COMP%] {\n    padding-right: 10px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNoYXRib3guY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQUVGOztBQUFBO0VBQ0UsT0FBQTtBQUdGOztBQUZFO0VBQ0ksZUFBQTtBQUlOOztBQURBO0VBQ0UsbUNBQUE7RUFDQSxpREFBQTtFQUNBLG1CQUFBO0FBSUY7O0FBRkE7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxPQUFBO0VBQ0EsTUFBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0FBS0Y7O0FBRkE7RUFJRSxnQkFBQTtBQUtGOztBQUZBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBS0Y7O0FBRkE7RUFDRSxtQkFBQTtFQUNBLGVBQUE7QUFLRjs7QUFGQTtFQUNFLG1CQUFBO0FBS0Y7O0FBRkE7RUFDRSxlQUFBO0FBS0Y7O0FBRkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBS0Y7O0FBRkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBS0Y7O0FBRkE7RUFDRSxXQUFBO0VBQ0EsaUJBQUE7QUFLRjs7QUFGQTtFQUNFLFdBQUE7RUFDQSxlQUFBO0FBS0Y7O0FBRkE7RUFDRSxrQkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7QUFLRjs7QUFGQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBS0Y7O0FBRkE7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7QUFLRjs7QUFGQTtFQUNFLGFBQUE7RUFDQSwrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFLRjs7QUFGQTtFQUNFLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFLRjs7QUFGQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7QUFLRjs7QUFGQTtFQUNFLGtCQUFBO0FBS0Y7O0FBRkE7RUFDRSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBQUtGOztBQUZBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFLRjs7QUFGQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtBQUtGOztBQUZBO0VBQ0UsV0FBQTtFQUNBLGtDQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUFLRjs7QUFGQTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQUtGOztBQUZBO0VBQ0UsYUFBQTtBQUtGOztBQUZBOzs7RUFHRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxzQkFBQTtBQUtGOztBQUZBO0VBQ0UsY0FBQTtBQUtGOztBQUZBO0VBQ0UsY0FBQTtBQUtGOztBQUZBO0VBQ0UsY0FBQTtBQUtGOztBQUZBO0VBQ0UsWUFBQTtBQUtGOztBQUZBO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtBQUtGOztBQUhBO0VBQ0UsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBTUY7O0FBSkE7RUFDRSxVQUFBO0FBT0Y7O0FBTEE7RUFBc0Isa0JBQUE7RUFBb0IsZUFBQTtBQVUxQzs7QUFUQTtFQUFZLGlCQUFBO0VBQW1CLGVBQUE7QUFjL0I7O0FBYkE7RUFBbUIsYUFBQTtFQUFjLGtCQUFBO0VBQW9CLG1CQUFBO0FBbUJyRDs7QUFsQkE7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0VBQW9CLFlBQUE7RUFBYSxZQUFBO0VBQWEsZUFBQTtFQUFnQixpQkFBQTtFQUFrQixnQkFBQTtBQTBCbEY7O0FBeEJBO0VBQWUsYUFBQTtFQUFjLG1CQUFBO0VBQW9CLG1CQUFBO0FBOEJqRDs7QUE3QkE7RUFBa0IsaUJBQUE7RUFBbUIsZUFBQTtBQWtDckM7O0FBakNBO0VBQWtCLGVBQUE7RUFBaUIsT0FBQTtFQUFTLGtCQUFBO0VBQW9CLFNBQUE7RUFBVyxnQkFBQTtBQXlDM0U7O0FBeENBO0VBQVUsYUFBQTtFQUFlLG1CQUFBO0VBQXFCLGlCQUFBO0FBOEM5Qzs7QUE3Q0E7RUFBYyxXQUFBO0VBQWEsWUFBQTtFQUFjLGtCQUFBO0FBbUR6Qzs7QUFsREE7RUFBWSxrQkFBQTtBQXNEWjs7QUFyREE7RUFDRTtJQUNFLGVBQUE7RUF3REY7O0VBdERBO0lBQ0UsbUJBQUE7RUF5REY7QUFDRiIsImZpbGUiOiJDaGF0Ym94LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNoYXQtYXBwIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICB3aWR0aDogNjMwcHg7XG4gIHBhZGRpbmctbGVmdDogMTVweDtcbiAgcGFkZGluZy1yaWdodDogMTVweDtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbn1cbi5pbWcuc2hhcmUge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuLmMtZGV0YWlscyB7XG4gIGZsZXg6IDE7XG4gIGg2IHtcbiAgICAgIG1hcmdpbjogMCAwIDdweDtcbiAgfVxufVxuLmNoYXQtYXBwIC5jaGF0IHtcbiAgYmFja2dyb3VuZDogdmFyKC0tbGlnaHQtZ3JheS1jb2xvcik7XG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCA4cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4wMik7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG59XG4uY2hhdC1hcHAgLnBlb3BsZS1saXN0IHtcbiAgd2lkdGg6IDI4MHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgcGFkZGluZzogMjBweDtcbiAgei1pbmRleDogN1xufVxuXG4ucGVvcGxlLWxpc3Qge1xuICAtbW96LXRyYW5zaXRpb246IC41cztcbiAgLW8tdHJhbnNpdGlvbjogLjVzO1xuICAtd2Via2l0LXRyYW5zaXRpb246IC41cztcbiAgdHJhbnNpdGlvbjogLjVzXG59XG5cbi5wZW9wbGUtbGlzdCAuY2hhdC1saXN0IGxpIHtcbiAgcGFkZGluZzogMTBweCAxNXB4O1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAzcHhcbn1cblxuLnBlb3BsZS1saXN0IC5jaGF0LWxpc3QgbGk6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xuICBjdXJzb3I6IHBvaW50ZXJcbn1cblxuLnBlb3BsZS1saXN0IC5jaGF0LWxpc3QgbGkuYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2VmZWZlZlxufVxuXG4ucGVvcGxlLWxpc3QgLmNoYXQtbGlzdCBsaSAubmFtZSB7XG4gIGZvbnQtc2l6ZTogMTVweFxufVxuXG4ucGVvcGxlLWxpc3QgLmNoYXQtbGlzdCBpbWcge1xuICB3aWR0aDogNDhweDtcbiAgaGVpZ2h0OiA0OHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCVcbn1cblxuLnBlb3BsZS1saXN0IGltZyB7XG4gIHdpZHRoOiA0OHB4O1xuICBoZWlnaHQ6IDQ4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJVxufVxuXG4ucGVvcGxlLWxpc3QgLmFib3V0IHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIHBhZGRpbmctbGVmdDogOHB4XG59XG5cbi5wZW9wbGUtbGlzdCAuc3RhdHVzIHtcbiAgY29sb3I6ICM5OTk7XG4gIGZvbnQtc2l6ZTogMTNweFxufVxuXG4uY2hhdCAuY2hhdC1oZWFkZXIge1xuICBwYWRkaW5nOiAxNXB4IDIwcHg7XG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplLXNtKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uY2hhdCAuY2hhdC1oZWFkZXIgaW1nIHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDQ4cHg7XG4gIGhlaWdodDogNDhweFxufVxuXG4uY2hhdCAuY2hhdC1oZWFkZXIgLmNoYXQtYWJvdXQge1xuICBmbG9hdDogbGVmdDtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4XG59XG5cbi5jaGF0IC5jaGF0LWhpc3Rvcnkge1xuICBwYWRkaW5nOiAyMHB4O1xuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMzQ1cHgpO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG5cbi5jaGF0IC5jaGF0LWhpc3RvcnkgdWwge1xuICBwYWRkaW5nOiAwO1xuICBtYXgtaGVpZ2h0OiA0MTVweDtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgbWFyZ2luOiAwIDAgMjBweDtcbn1cblxuLmNoYXQgLmNoYXQtaGlzdG9yeSB1bCBsaSB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG1hcmdpbi1ib3R0b206IDMwcHhcbn1cblxuLmNoYXQgLmNoYXQtaGlzdG9yeSB1bCBsaTpsYXN0LWNoaWxkIHtcbiAgbWFyZ2luLWJvdHRvbTogMHB4XG59XG5cbi5jaGF0IC5jaGF0LWhpc3RvcnkgLm1lc3NhZ2UtZGF0YSB7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5jaGF0IC5jaGF0LWhpc3RvcnkgLm1lc3NhZ2UtZGF0YSBpbWcge1xuICB3aWR0aDogNDhweDtcbiAgaGVpZ2h0OiA0OHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIG1hcmdpbi1yaWdodDogMTRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cblxuLmNoYXQgLmNoYXQtaGlzdG9yeSAubWVzc2FnZS1kYXRhLXRpbWUge1xuICBmb250LXNpemU6IDEycHg7XG4gIHBhZGRpbmctbGVmdDogNjhweDtcbn1cblxuLmNoYXQgLmNoYXQtaGlzdG9yeSAubWVzc2FnZSB7XG4gIGNvbG9yOiAjNDQ0O1xuICBmb250LXNpemU6IHZhcigtLWZvbnQtZm9udC1ub3JtYWwpO1xuICBib3JkZXItcmFkaXVzOiA3cHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG5cbi5jaGF0IC5jaGF0LWhpc3RvcnkgLm90aGVyLW1lc3NhZ2Uge1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIG1heC13aWR0aDogMjkwcHg7XG59XG5cbi5jaGF0IC5jaGF0LW1lc3NhZ2Uge1xuICBwYWRkaW5nOiAyMHB4XG59XG5cbi5vbmxpbmUsXG4ub2ZmbGluZSxcbi5tZSB7XG4gIG1hcmdpbi1yaWdodDogMnB4O1xuICBmb250LXNpemU6IDhweDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZVxufVxuXG4ub25saW5lIHtcbiAgY29sb3I6ICM4NmM1NDFcbn1cblxuLm9mZmxpbmUge1xuICBjb2xvcjogI2U0NzI5N1xufVxuXG4ubWUge1xuICBjb2xvcjogIzFkOGVjZFxufVxuXG4uZmxvYXQtcmlnaHQge1xuICBmbG9hdDogcmlnaHRcbn1cblxuLmNsZWFyZml4OmFmdGVyIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAwO1xuICBjb250ZW50OiBcIiBcIjtcbiAgY2xlYXI6IGJvdGg7XG4gIGhlaWdodDogMFxufVxuLm1kX2NoYXQge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgcGFkZGluZy1yaWdodDogNDBweDtcbiAgcGFkZGluZy1sZWZ0OiA2NHB4O1xufVxuLm1kX2NoYXQgLm1lc3NhZ2UtZGF0YS10aW1lIHtcbiAgcGFkZGluZzogMDtcbn1cbi5pbnB1dC1ncm91cC1wcmVwZW5kIHttYXJnaW4tcmlnaHQ6IDIwcHg7IGN1cnNvcjogcG9pbnRlcjt9XG4uc2VuZF93cmFwIHttYXJnaW4tbGVmdDogMTVweDsgY3Vyc29yOiBwb2ludGVyO31cbi5jaGF0LW1lc3NhZ2VfYnRuIHtkaXNwbGF5OiBmbGV4O3BhZGRpbmc6IDEycHggMjZweDsgYWxpZ24taXRlbXM6IGNlbnRlcjt9XG4uY2hhdC1tZXNzYWdlX2J0biAuZm9ybS1jb250cm9sIHtcbiAgYmFja2dyb3VuZDogI0ZGRkZGRjtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtoZWlnaHQ6IDQ4cHg7Ym9yZGVyOiBub25lO2ZvbnQtc2l6ZTogMThweDtwYWRkaW5nOiAycHggMThweDtib3gtc2hhZG93OiBub25lO1xufVxuLmNoYXRfdG9wX3NlYyB7ZGlzcGxheTogZmxleDthbGlnbi1pdGVtczogY2VudGVyO21hcmdpbi1ib3R0b206IDI1cHg7fVxuLmJhY2tfYXJyb3dfY2hhdCB7bWFyZ2luLWxlZnQ6IDEwcHg7IGN1cnNvcjogcG9pbnRlcjt9XG4uY2hhdF90b3Bfc2VjIGgyIHtmb250LXNpemU6IDIycHg7IGZsZXg6IDE7IHRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luOiAwOyBmb250LXdlaWdodDogNjAwO31cbi50cF91c2VyIHtkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBtYXJnaW4tbGVmdDogMjBweDt9XG4udHBfdXNlciBpbWcge3dpZHRoOiA0OHB4OyBoZWlnaHQ6IDQ4cHg7IGJvcmRlci1yYWRpdXM6IDUwJTt9XG4udHBfdXNlciBhIHttYXJnaW4tcmlnaHQ6IDIwcHg7fVxuQG1lZGlhIChtYXgtd2lkdGg6NzY3cHgpIHtcbiAgLmJhY2tfYXJyb3dfY2hhdCBpIHtcbiAgICBmb250LXNpemU6IDMwcHg7XG4gIH1cbiAgLm1kX2NoYXQge1xuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4gIH1cbn1cbiJdfQ== */"] });


/***/ }),

/***/ 812:
/*!*******************************************************!*\
  !*** ./src/app/Job/JobDetails/JobDetail.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JobDetailComponent": () => (/* binding */ JobDetailComponent)
/* harmony export */ });
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert2 */ 598);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngx_timeago_language_strings_en__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-timeago/language-strings/en */ 5260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_JobPost_JobPost_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/JobPost/JobPost.service */ 9923);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-timeago */ 2699);
/* harmony import */ var _Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Shared/services/NavbarCommunication.service */ 4920);
/* harmony import */ var _services_JobPost_ReportJob_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/JobPost/ReportJob.service */ 1555);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-clipboard */ 1131);
/* harmony import */ var _ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngneat/hot-toast */ 7403);
/* harmony import */ var src_app_services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/SharedServices/Shared.service */ 4937);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _JobResponce_JobResponce_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../JobResponce/JobResponce.component */ 1750);















function JobDetailComponent_div_3_span_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r4.totalResponces, " ");
} }
function JobDetailComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 29)(1, "div", 30)(2, "div", 31)(3, "div", 32)(4, "div", 33)(5, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("change", function JobDetailComponent_div_3_Template_input_change_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r5.ResponceTab()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "label", 35)(7, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "Post");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "label", 37)(10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, " Response ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, JobDetailComponent_div_3_span_12_Template, 2, 1, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.totalResponces != 0);
} }
function JobDetailComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "img", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx_r1.job == null ? null : ctx_r1.job.ImagesUrl, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
} }
function JobDetailComponent_div_7_h6_6_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h6", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobDetailComponent_div_7_h6_6_Template_h6_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r15.RedirectToUser(ctx_r15.job.User.Id)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "span", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", ctx_r7.job == null ? null : ctx_r7.job.User == null ? null : ctx_r7.job.User.Name, " ");
} }
function JobDetailComponent_div_7_h6_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h6");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Anonymous ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "span", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function JobDetailComponent_div_7_a_13_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobDetailComponent_div_7_a_13_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r17.AddToJob()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Add to My Jobs");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function JobDetailComponent_div_7_a_14_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobDetailComponent_div_7_a_14_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r19.RemoveToJob()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Remove Job");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function JobDetailComponent_div_7_a_15_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobDetailComponent_div_7_a_15_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r22); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r21.Report()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Report");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function JobDetailComponent_div_7_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 68)(1, "div", 69)(2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Job Status");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 70)(5, "div", 71)(6, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r12.job == null ? null : ctx_r12.job.JobStatus, " ");
} }
function JobDetailComponent_div_7_div_20_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 80)(1, "button", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobDetailComponent_div_7_div_20_div_16_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r25); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r24.Edit(ctx_r24.job.Id)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} }
function JobDetailComponent_div_7_div_20_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 68)(1, "div", 69)(2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Job status");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 70)(5, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "i", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "select", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("change", function JobDetailComponent_div_7_div_20_Template_select_change_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r27); const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r26.UpdateStatus($event)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "option", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Open");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "option", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "On hold");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "option", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, "Closed");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "option", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, JobDetailComponent_div_7_div_20_div_16_Template, 3, 0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("selected", (ctx_r13.job == null ? null : ctx_r13.job.JobStatus) === "OPEN");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("selected", (ctx_r13.job == null ? null : ctx_r13.job.JobStatus) === "ON HOLD");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("selected", (ctx_r13.job == null ? null : ctx_r13.job.JobStatus) === "CLOSED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("selected", (ctx_r13.job == null ? null : ctx_r13.job.JobStatus) === "DELETED");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r13.loggedUserId == (ctx_r13.job == null ? null : ctx_r13.job.User == null ? null : ctx_r13.job.User.Id));
} }
function JobDetailComponent_div_7_div_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r28 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", item_r28.TagName, " ");
} }
function JobDetailComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 42)(1, "div", 43)(2, "div", 44)(3, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "img", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, JobDetailComponent_div_7_h6_6_Template, 3, 1, "h6", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, JobDetailComponent_div_7_h6_7_Template, 3, 0, "h6", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 50)(9, "div", 51)(10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](11, "img", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, JobDetailComponent_div_7_a_13_Template, 2, 0, "a", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, JobDetailComponent_div_7_a_14_Template, 2, 0, "a", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, JobDetailComponent_div_7_a_15_Template, 2, 0, "a", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "a", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17, "Share");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](19, JobDetailComponent_div_7_div_19_Template, 8, 1, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](20, JobDetailComponent_div_7_div_20_Template, 17, 5, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "div", 56)(22, "div", 58)(23, "label", 59)(24, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](25, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "div", 61)(27, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "div", 62)(30, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](33, JobDetailComponent_div_7_div_33_Template, 2, 1, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", (ctx_r2.job == null ? null : ctx_r2.job.IsAnonymous) == false ? ctx_r2.job == null ? null : ctx_r2.job.User == null ? null : ctx_r2.job.User.UserImage : ctx_r2.job == null ? null : ctx_r2.job.AnonmousUserPic, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r2.job == null ? null : ctx_r2.job.IsAnonymous) == false);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r2.job == null ? null : ctx_r2.job.IsAnonymous) == true);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.loggedUserId != (ctx_r2.job == null ? null : ctx_r2.job.User == null ? null : ctx_r2.job.User.Id) && ctx_r2.loggedUserId && ctx_r2.isJobAdded);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.loggedUserId != (ctx_r2.job == null ? null : ctx_r2.job.User == null ? null : ctx_r2.job.User.Id) && ctx_r2.loggedUserId && !ctx_r2.isJobAdded);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.loggedUserId != (ctx_r2.job == null ? null : ctx_r2.job.User == null ? null : ctx_r2.job.User.Id) && ctx_r2.loggedUserId);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.loggedUserId != (ctx_r2.job == null ? null : ctx_r2.job.User == null ? null : ctx_r2.job.User.Id));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.loggedUserId == (ctx_r2.job == null ? null : ctx_r2.job.User == null ? null : ctx_r2.job.User.Id));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx_r2.job == null ? null : ctx_r2.job.ImagesUrl, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r2.job == null ? null : ctx_r2.job.Descriptions);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r2.job == null ? null : ctx_r2.job.Address);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r2.job == null ? null : ctx_r2.job.Tags);
} }
function JobDetailComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 42)(1, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "app-JobResponce");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} }
class JobDetailComponent {
    constructor(_jobServices, title, intl, navServices, _reportServices, activatedRoute, _clipboardService, toast, _navigaterouter, _shareService, _location) {
        this._jobServices = _jobServices;
        this.title = title;
        this.navServices = navServices;
        this._reportServices = _reportServices;
        this.activatedRoute = activatedRoute;
        this._clipboardService = _clipboardService;
        this.toast = toast;
        this._navigaterouter = _navigaterouter;
        this._shareService = _shareService;
        this._location = _location;
        this.jobId = 0;
        this.isJobAdded = false;
        this.IsOnResponces = false;
        this.totalResponces = 0;
        this.jobResponces = [];
        this.sharedLink = '';
        this.Des = JSON.stringify(localStorage.getItem('des'));
        this.metaDescription = 'Details jobs here';
        this.title.setTitle(this.Des);
        this._shareService.checkInterNetConnection();
        intl.strings = ngx_timeago_language_strings_en__WEBPACK_IMPORTED_MODULE_7__.strings;
        intl.changes.next();
        this.activatedRoute.queryParams.subscribe(params => {
            this.jobId = params['target'];
            this.LoadJobDetailsById(this.jobId);
            this.loadUserData();
        });
    }
    //Load Basic User Data
    loadUserData() {
        if (localStorage.getItem('user')) {
            this.loggeduser = JSON.parse(localStorage.getItem('user'));
            this.loggedUserId = this.loggeduser.Id;
            this.loadResponcesData(this.loggedUserId);
        }
    }
    ngOnInit() {
        setInterval(() => {
            this.loadResponcesData(this.loggedUserId);
        }, 2000);
    }
    showToast() {
        this.toast.success('Link copied!', {
            position: 'top-center',
        });
    }
    LoadJobDetailsById(id) {
        this._jobServices.GetJobById(id).subscribe((data) => {
            this.job = data[0];
            this.IsAddedJob(this.loggedUserId, this.jobId);
        });
    }
    loadResponcesData(userId) {
        this._jobServices.GetResponceCount(this.jobId, userId).subscribe((data) => {
            this.totalResponces = data;
        });
    }
    //Job status update
    UpdateStatus($event) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
            text: `Are you sure to update status to ${$event.target.value}`,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this._jobServices.UpdateJobStatus(this.jobId, $event.target.value).subscribe(() => {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire('Job status updated successfully!', '', 'success');
                }, err => {
                    console.log(err);
                });
            }
            else if (result.isDenied) {
                this._navigaterouter.navigateByUrl('/jobDetails/' + this.jobId);
            }
        });
    }
    //Check is this job added already
    IsAddedJob(userId, jobId) {
        this._jobServices.IsAddedJob(userId, jobId).subscribe((data) => {
            if (data.Status == 200) {
                this.isJobAdded = false;
            }
            else {
                this.isJobAdded = true;
            }
        });
    }
    // Job Added
    AddToJob() {
        let userJob = {
            jobModelId: this.jobId,
            socialAuthenticationId: this.loggedUserId
        };
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
            text: 'Please wait.. Adding job',
            showConfirmButton: false,
            icon: 'info'
        });
        this._jobServices.AddJobToUser(userJob).subscribe((data) => {
            if (data._responce.Status == 422) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire(`Job ${this.jobId} removed successfully!`, '', 'info');
                this.IsAddedJob(this.loggedUserId, this.jobId);
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire(`Job ${this.jobId} Added successfully!`, '', 'success');
                this.IsAddedJob(this.loggedUserId, this.jobId);
            }
        }, err => {
            console.log(err);
        });
        // swal.fire({
        //   text: `Confirm to add Job Post Id: ${this.job.Id}`,
        //   showDenyButton: true,
        //   confirmButtonText: 'Yes',
        //   confirmButtonColor:'#00fa9a',
        //   denyButtonText: `No`,
        //   denyButtonColor:'black'
        // }).then((result) => {
        //   /* Read more about isConfirmed, isDenied below */
        //   if (result.isConfirmed) {
        //   } else if (result.isDenied) {
        //   }
        // })
    }
    // Job Removed
    RemoveToJob() {
        let userJob = {
            jobModelId: this.jobId,
            socialAuthenticationId: this.loggedUserId
        };
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
            text: 'Please wait.. Removing job',
            showConfirmButton: false,
            icon: 'info'
        });
        this._jobServices.AddJobToUser(userJob).subscribe((data) => {
            if (data._responce.Status == 422) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire(`Job ${this.jobId} removed successfully!`, '', 'info');
                this.IsAddedJob(this.loggedUserId, this.jobId);
            }
            else {
            }
        }, err => {
            console.log(err);
        });
    }
    //Edit Job
    Edit(jobId) {
        sessionStorage.setItem("EditJobId", jobId);
        this._navigaterouter.navigate(['/jobEdit']);
    }
    ResponceTab() {
        this.IsOnResponces = !this.IsOnResponces;
    }
    Report() {
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
            title: `Report Post`,
            input: 'textarea',
            showDenyButton: true,
            confirmButtonText: 'Report',
            denyButtonText: `Cancel`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let reportJob = {
                    jobModelId: this.jobId,
                    socialAuthenticationId: this.loggedUserId,
                    Isusue: result.value
                };
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
                    text: 'Please wait... Reporting',
                    showConfirmButton: false,
                    icon: 'info'
                });
                this._reportServices.ReportJob(reportJob).subscribe((data) => {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire(`Job ${this.job.Id} Reported!`, '', 'success');
                }, err => {
                    console.log(err);
                });
            }
            else if (result.isDenied) {
                // swal.fire('Changes are not saved', '', 'info')
            }
        });
    }
    //Back loacation History
    backClicked() {
        this._location.back();
    }
    hideEvent() {
        this.navServices.Toggle();
    }
    shareFB() {
        return window.open('https://www.facebook.com/sharer/sharer.php?' + 'u=http://hoozonline.com/jobDetails?target=' + this.jobId, "Hooz", `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=600,height=300,left=100,top=100`);
    }
    shareTwitter() {
        return window.open('http://twitter.com/share?' + 'url=http://hoozonline.com/jobDetails?target=' + this.jobId, "Hooz", `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=600,height=300,left=100,top=100`);
    }
    shareWhatsApp() {
        return window.open("https://api.whatsapp.com/send?text=http://hoozonline.com/jobDetails?target=" +
            this.jobId, "_blank");
    }
    //Shared Link
    GetSharedLink() {
        this.sharedLink = "http://hoozonline.com/jobDetails?target=" + this.jobId;
        this._clipboardService.copy(this.sharedLink);
        this.showToast();
    }
    RedirectToUser(userId) {
        this._navigaterouter.navigate(['/profile'], { queryParams: { target: userId } });
    }
}
JobDetailComponent.ɵfac = function JobDetailComponent_Factory(t) { return new (t || JobDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_JobPost_JobPost_service__WEBPACK_IMPORTED_MODULE_1__.JobPostService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_timeago__WEBPACK_IMPORTED_MODULE_9__.TimeagoIntl), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_2__.NavbarCommunicationService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_JobPost_ReportJob_service__WEBPACK_IMPORTED_MODULE_3__.ReportJobService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_clipboard__WEBPACK_IMPORTED_MODULE_11__.ClipboardService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_12__.HotToastService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_4__.SharedService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_13__.Location)); };
JobDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: JobDetailComponent, selectors: [["app-JobDetail"]], decls: 32, vars: 5, consts: [[1, "main_cnt_wrap", 3, "click"], [1, "back_arrow"], ["aria-hidden", "true", 1, "back", "fa", "fa-2x", "fa-arrow-left", 3, "click"], ["class", "container-sm mt-0 mb-4", 4, "ngIf"], [1, "my_container"], ["id", "custom-button", 1, "img_wrap", "desk_view", "left_sec"], ["style", "cursor: pointer", "data-bs-toggle", "modal", "data-bs-target", "#exampleModal", 4, "ngIf"], ["class", "right_sec", 4, "ngIf"], ["id", "staticBackdrop", "data-bs-backdrop", "static", "data-bs-keyboard", "false", "tabindex", "-1", "aria-labelledby", "staticBackdropLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-dialog-centered", "modal-dialog-scrollable"], [1, "modal-content", "ShareModel"], [1, "modal-header"], ["id", "staticBackdropLabel", 1, "modal-title"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close"], [1, "modal-body"], [1, "row"], [1, "social-buttons"], ["aria-label", "Facebook", 1, "social-buttons__button", "social-button", "social-button--facebook", 3, "click"], [1, "fab", "fa-facebook-f"], ["aria-label", "Twitter", 1, "social-buttons__button", "social-button", "social-button--twitter", 3, "click"], [1, "fab", "fa-twitter"], ["aria-label", "SnapChat", 1, "social-buttons__button", "social-button", "social-button--snapchat", 3, "click"], [1, "fa", "fa-link"], ["aria-label", "Whatsapp", 1, "social-buttons__button", "social-button", "social-button--steam", 3, "click"], [1, "fab", "fa-whatsapp"], ["id", "exampleModal", "tabindex", "-1", "aria-labelledby", "exampleModalLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog"], [1, "modal-content"], ["alt", "job image", 1, "img", "img-responsive", "img-fluid", 3, "src"], [1, "container-sm", "mt-0", "mb-4"], [1, "row", "col-sm-12"], [1, "d-flex", "switch_button_wrap"], [1, "d-flex", "flex-row", "justify-content-between"], [1, "switch-button"], ["type", "checkbox", 1, "switch-button-checkbox", 3, "change"], ["for", "", 1, "switch-button-label"], [1, "switch-button-label-span"], ["for", "", 1, "ll"], ["class", "badge rounded-pill bg-Responce", 4, "ngIf"], [1, "badge", "rounded-pill", "bg-Responce"], ["data-bs-toggle", "modal", "data-bs-target", "#exampleModal", 2, "cursor", "pointer"], ["alt", "post image", 1, "img", "img-responsive", "img-fluid", 3, "src"], [1, "right_sec"], [1, "d-flex", "job_details"], [1, "user_details"], [1, "icon"], [1, "rounded-circle", "img-fluid", 3, "src"], [1, "c-details"], [3, "click", 4, "ngIf"], [4, "ngIf"], [1, "share_sec"], [1, "dropdown"], ["src", "./../../../assets/Logo/3dots.svg", 1, "img", "share"], [1, "dropdown-content", "JobdetailDroupdown", "mt-0"], ["style", "cursor: pointer;", 3, "click", 4, "ngIf"], ["data-bs-toggle", "modal", "data-bs-target", "#staticBackdrop", 2, "cursor", "pointer"], [1, ""], ["class", "job_status", 4, "ngIf"], [1, "d-flex"], ["id", "custom-button", 1, "img_wrap", "mob_view"], [1, "overlay_bg"], [1, "job_des"], [1, "locations"], [1, "badgeTagWrap"], ["class", "badgeTag", 4, "ngFor", "ngForOf"], [3, "click"], ["timeago", ""], [2, "cursor", "pointer", 3, "click"], [1, "job_status"], [1, "title"], [1, "job_opt"], [1, "select"], [1, "select__field"], [1, "fa", "fa-caret-down"], ["name", "nameValueSelect", "required", "", 1, "select__field", 3, "change"], ["value", "OPEN", 3, "selected"], ["value", "ON HOLD", 3, "selected"], ["value", "CLOSED", 3, "selected"], ["value", "DELETED", 3, "selected"], ["class", "edit_sec", 4, "ngIf"], [1, "edit_sec"], ["type", "button", 1, "btn", 3, "click"], [1, "badgeTag"]], template: function JobDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobDetailComponent_Template_div_click_0_listener() { return ctx.hideEvent(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1)(2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobDetailComponent_Template_i_click_2_listener() { return ctx.backClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, JobDetailComponent_div_3_Template, 13, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 4)(5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, JobDetailComponent_div_6_Template, 2, 1, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, JobDetailComponent_div_7_Template, 34, 12, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, JobDetailComponent_div_8_Template, 3, 0, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 8)(10, "div", 9)(11, "div", 10)(12, "div", 11)(13, "h5", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, "Share with");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](15, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "div", 14)(17, "div", 15)(18, "div", 16)(19, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobDetailComponent_Template_a_click_19_listener() { return ctx.shareFB(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](20, "i", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "a", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobDetailComponent_Template_a_click_21_listener() { return ctx.shareTwitter(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](22, "i", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "a", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobDetailComponent_Template_a_click_23_listener() { return ctx.GetSharedLink(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](24, "i", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "a", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobDetailComponent_Template_a_click_25_listener() { return ctx.shareWhatsApp(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](26, "i", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](27, "div", 25)(28, "div", 26)(29, "div", 27)(30, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](31, "img", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.loggedUserId == (ctx.job == null ? null : ctx.job.User == null ? null : ctx.job.User.Id));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.job == null ? null : ctx.job.ImagesUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.IsOnResponces == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.IsOnResponces == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx.job == null ? null : ctx.job.ImagesUrl, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ɵNgSelectMultipleOption"], ngx_timeago__WEBPACK_IMPORTED_MODULE_9__.TimeagoDirective, _JobResponce_JobResponce_component__WEBPACK_IMPORTED_MODULE_5__.JobResponceComponent], styles: [".switch-button[_ngcontent-%COMP%] {\n  width: 290px;\n  padding-right: 145px;\n}\n\n.switch-button-checkbox[_ngcontent-%COMP%]:checked    + .switch-button-label[_ngcontent-%COMP%]:before {\n  transform: translateX(146px);\n}\n\n.ll[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 136px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 3;\n  pointer-events: none;\n}\n\n.container-fluid[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: sans-serif;\n}\n\ninput[type=file][_ngcontent-%COMP%] {\n  display: none;\n}\n\n.bg-badge[_ngcontent-%COMP%] {\n  background-color: #b4b4b4;\n  height: 1.8rem;\n}\n\n.icon[_ngcontent-%COMP%] {\n  width: 48px;\n  margin-right: 10px;\n}\n\n.user_details[_ngcontent-%COMP%] {\n  display: flex;\n  cursor: pointer;\n}\n\n.c-details[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.c-details[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 3px;\n}\n\n.job_details[_ngcontent-%COMP%] {\n  align-items: center;\n  margin-bottom: 35px;\n}\n\n.share_sec[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n\n.job_status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 35px;\n}\n\n.job_status[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 700;\n  margin-right: 25px;\n}\n\n.job_status[_ngcontent-%COMP%]   .edit_sec[_ngcontent-%COMP%], .job_status[_ngcontent-%COMP%]   .chat_sec[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n\n.job_status[_ngcontent-%COMP%]   .job_opt[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%] {\n  margin: 0;\n  width: 142px;\n  height: 48px;\n  background: var(--light-gray-color);\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.job_status[_ngcontent-%COMP%]   .job_opt[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%]   .select__field[_ngcontent-%COMP%] {\n  height: 40px;\n  width: 133px;\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);\n  border-radius: 10px;\n  border: none;\n  font-size: 20px;\n  font-weight: 700;\n}\n\n.job_des[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 300;\n  margin-bottom: 30px;\n}\n\n.locations[_ngcontent-%COMP%] {\n  display: flex;\n  font-size: var(--font-font-normal);\n  font-weight: 700;\n}\n\n@media (max-width: 767px) {\n  .job_des[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpvYkRldGFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxvQkFBQTtBQUNGOztBQUNBO0VBQ0UsNEJBQUE7QUFFRjs7QUFBQTtFQUNFLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLG9CQUFBO0FBR0Y7O0FBREE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLHVCQUFBO0FBSUY7O0FBREE7RUFDRSxhQUFBO0FBSUY7O0FBRkM7RUFDQyx5QkFBQTtFQUNBLGNBQUE7QUFLRjs7QUFGQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtBQUtGOztBQUhBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7QUFNRjs7QUFKQTtFQUNFLFNBQUE7QUFPRjs7QUFORTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FBUUo7O0FBTEE7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0FBUUY7O0FBTkE7RUFDRSxpQkFBQTtBQVNGOztBQVBBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFVRjs7QUFURTtFQUNFLFNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQVdKOztBQVRFOztFQUVFLGlCQUFBO0FBV0o7O0FBVEU7RUFDRSxTQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxtQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFXSjs7QUFWSTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0EsMENBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFZTjs7QUFUQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBWUY7O0FBVkE7RUFDRSxhQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQkFBQTtBQWFGOztBQVZBO0VBQ0U7SUFDRSxlQUFBO0VBYUY7QUFDRiIsImZpbGUiOiJKb2JEZXRhaWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc3dpdGNoLWJ1dHRvbiB7XHJcbiAgd2lkdGg6IDI5MHB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDE0NXB4O1xyXG59XHJcbi5zd2l0Y2gtYnV0dG9uLWNoZWNrYm94OmNoZWNrZWQgKyAuc3dpdGNoLWJ1dHRvbi1sYWJlbDpiZWZvcmUge1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxNDZweCk7XHJcbn1cclxuLmxsIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGJvdHRvbTogMDtcclxuICByaWdodDogMDtcclxuICB3aWR0aDogMTM2cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHotaW5kZXg6IDM7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbn1cclxuLmNvbnRhaW5lci1mbHVpZCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwiZmlsZVwiXSB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG4gLmJnLWJhZGdlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjRiNGI0O1xyXG4gIGhlaWdodDogMS44cmVtO1xyXG59XHJcbiAgLy8gdXNlclNlY3Rpb25zXHJcbi5pY29uIHtcclxuICB3aWR0aDogNDhweDtcclxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuLnVzZXJfZGV0YWlscyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLmMtZGV0YWlscyBoNiB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIHNwYW4ge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBtYXJnaW4tdG9wOiAzcHg7XHJcbiAgfVxyXG59XHJcbi5qb2JfZGV0YWlscyB7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAzNXB4O1xyXG59XHJcbi5zaGFyZV9zZWMge1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG59XHJcbi5qb2Jfc3RhdHVzIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzVweDtcclxuICBwIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDI1cHg7XHJcbiAgfVxyXG4gIC5lZGl0X3NlYyxcclxuICAuY2hhdF9zZWMge1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgfVxyXG4gIC5qb2Jfb3B0IC5zZWxlY3Qge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgd2lkdGg6IDE0MnB4O1xyXG4gICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0tbGlnaHQtZ3JheS1jb2xvcik7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIC5zZWxlY3RfX2ZpZWxkIHtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICB3aWR0aDogMTMzcHg7XHJcbiAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggNHB4IHJnYigwIDAgMCAvIDEwJSk7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICBmb250LXdlaWdodDogNzAwOyAgICB9XHJcbiAgfVxyXG59XHJcbi5qb2JfZGVzIHtcclxuICBmb250LXNpemU6IDMycHg7XHJcbiAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG59XHJcbi5sb2NhdGlvbnMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LWZvbnQtbm9ybWFsKTtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDo3NjdweCkge1xyXG4gIC5qb2JfZGVzIHtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICB9XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ 7651:
/*!**************************************************!*\
  !*** ./src/app/Job/JobEdit/JobEdit.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JobEditComponent": () => (/* binding */ JobEditComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_JobPost_JobPost_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/JobPost/JobPost.service */ 9923);
/* harmony import */ var _Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Shared/services/NavbarCommunication.service */ 4920);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngneat/hot-toast */ 7403);
/* harmony import */ var _services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/SharedServices/Shared.service */ 4937);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 4666);









function JobEditComponent_span_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Updating...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function JobEditComponent_span_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Update");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function JobEditComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Add image");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} }
function JobEditComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", ctx_r3.imgURL, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function JobEditComponent_small_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "small", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Description is requires.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function JobEditComponent_span_61_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Updating...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function JobEditComponent_span_62_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Update");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
class JobEditComponent {
    constructor(fb, _jobServices, navServices, _router, toast, _sharedServices, _location) {
        this.fb = fb;
        this._jobServices = _jobServices;
        this.navServices = navServices;
        this._router = _router;
        this.toast = toast;
        this._sharedServices = _sharedServices;
        this._location = _location;
        this.imagePath = '';
        this.ischeckedAnonymously = false;
        this.ischeckedPublic = true;
        this.editJobId = 0;
        this.uploadFile = (jobId, files) => {
            if (files.length === 0)
                return;
            let fileToUpload = files[0];
            const formData = new FormData();
            formData.append('file', fileToUpload, fileToUpload.name);
            this._jobServices.AddPostImages(jobId, formData).subscribe(() => {
                this.btnLoader = false;
                this.showToast();
                this._router.navigate(['/joblist'], { queryParams: { target: 'MyPost' } });
            }, error => {
                console.log(error);
            });
        };
        this._sharedServices.checkInterNetConnection();
        let user = JSON.parse(localStorage.getItem('user'));
        this.userId = user.Id;
        this.editJobId = parseInt(sessionStorage.getItem('EditJobId'));
    }
    ngOnInit() {
        this.createJobPostForm();
        this.loadJobEditDetails(this.editJobId);
    }
    createJobPostForm() {
        this.jobPostForm = this.fb.group({
            Descriptions: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
            ImagesUrl: [''],
            Address: [''],
            Latitude: [''],
            Longitude: [''],
            IsAnonymous: [false],
            IsPublic: [true]
        });
    }
    loadJobEditDetails(jobId) {
        this._jobServices.GetJobById(jobId).subscribe((data) => {
            this.jobModel = data[0];
            this.jobPostForm.controls['Descriptions'].setValue(this.jobModel.Descriptions);
            this.jobPostForm.controls['IsAnonymous'].setValue(this.jobModel.IsAnonymous);
            this.jobPostForm.controls['IsPublic'].setValue(this.jobModel.IsPublic);
            this.jobPostForm.controls['ImagesUrl'].setValue(this.jobModel.ImagesUrl);
            this.jobPostForm.controls['Address'].setValue(this.jobModel.Address);
            this.ischeckedAnonymously = this.jobModel.IsAnonymous;
            this.ischeckedPublic = this.jobModel.IsPublic;
            this.imgURL = this.jobModel.JobDetailImage;
        });
    }
    FileUpload(files) {
        if (files.length === 0)
            return;
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }
        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
            this.filetoPost = files;
            this.message = "";
        };
    }
    changePostAnonymously() {
        this.ischeckedAnonymously = !this.ischeckedAnonymously;
        this.jobPostForm.controls['IsAnonymous'].setValue(this.ischeckedAnonymously);
    }
    changePostPublic() {
        this.ischeckedPublic = !this.ischeckedPublic;
        this.jobPostForm.controls['IsPublic'].setValue(this.ischeckedPublic);
    }
    showToast() {
        this.toast.success('Job update Successfully', {
            position: 'top-center',
        });
    }
    AddJobPost() {
        this.btnLoader = true;
        this.jobModel = Object.assign({}, this.jobPostForm.value);
        this._jobServices.UpdateJobPost(this.editJobId, this.jobModel).subscribe((data) => {
            if (this.filetoPost == undefined) {
                this.btnLoader = false;
                this._router.navigate(['/joblist'], { queryParams: { target: 'MyPost' } });
                return this.showToast();
            }
            this.uploadFile(this.editJobId, this.filetoPost);
        });
    }
    //Back loacation History
    backClicked() {
        this._location.back();
    }
    hideEvent() {
        this.navServices.Toggle();
    }
}
JobEditComponent.ɵfac = function JobEditComponent_Factory(t) { return new (t || JobEditComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_JobPost_JobPost_service__WEBPACK_IMPORTED_MODULE_0__.JobPostService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_1__.NavbarCommunicationService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_6__.HotToastService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_2__.SharedService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.Location)); };
JobEditComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: JobEditComponent, selectors: [["app-JobEdit"]], decls: 63, vars: 13, consts: [[1, "main_cnt_wrap", 3, "click"], [1, "back_arrow"], ["aria-hidden", "true", 1, "back", "fa", "fa-2x", "fa-arrow-left", 3, "click"], [1, "jobpost_wrap"], [1, "jobpost_top"], [1, "j_left"], [1, "j_right"], ["type", "submit", "form", "postForm", "id", "post", 1, "btn", "btn-hoozOn", 3, "disabled"], [1, "button-content"], ["class", "load-text", 4, "ngIf"], ["class", "btn-text", 4, "ngIf"], [1, "jobpost_main"], ["id", "postForm", "[formGroup]?", "jobPostForm", 3, "keydown.enter", "ngSubmit"], [1, "jobpost_left"], ["id", "custom-button", 1, "add_post"], [4, "ngIf"], ["class", "ap_img_wrp", 4, "ngIf"], ["formControlName", "ImagesUrl", "id", "real-file", "type", "file", "size", "60", 3, "change"], ["file", ""], [1, "text", "text-danger"], [1, "jobpost_right"], [1, "mb-20"], ["for", "exampleInputEmail1", 1, "form-label"], ["type", "text", "formControlName", "Descriptions", "placeholder", "What are you looking for?", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control", "one"], ["id", "emailHelp", "class", "form-text text text-danger", 4, "ngIf"], [1, "mb-20", "location"], ["for", "exampleInputPassword1", 1, "form-label"], [1, "location_sec"], ["id", "location"], [1, "form-check"], ["type", "checkbox", "id", "flexcheckboxDefault1", 1, "form-check-input", 3, "checked", "change"], ["for", "flexcheckboxDefault1", 1, "check"], ["aria-hidden", "true", 1, "fa", "fa-check"], ["for", "flexcheckboxDefault1", 1, "form-label"], [1, "parapost"], ["type", "checkbox", "name", "flexcheckDefault", "id", "flexcheckboxDefault2", "checked", "", 1, "form-check-input", 3, "checked", "change"], ["for", "flexcheckboxDefault2", 1, "check"], ["for", "flexcheckboxDefault2", 1, "form-label"], [1, "post_button"], [1, "load-text"], [1, "btn-text"], [1, "fas", "fa-plus"], [1, "ap_img_wrp"], ["alt", "your image", 3, "src"], ["id", "emailHelp", 1, "form-text", "text", "text-danger"]], template: function JobEditComponent_Template(rf, ctx) { if (rf & 1) {
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function JobEditComponent_Template_div_click_0_listener() { return ctx.hideEvent(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1)(2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function JobEditComponent_Template_i_click_2_listener() { return ctx.backClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Update YOUR REQUIREMENT");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Update post");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 6)(11, "button", 7)(12, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, JobEditComponent_span_13_Template, 2, 0, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, JobEditComponent_span_14_Template, 2, 0, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 11)(16, "form", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("keydown.enter", function JobEditComponent_Template_form_keydown_enter_16_listener($event) { return $event.preventDefault(); })("ngSubmit", function JobEditComponent_Template_form_ngSubmit_16_listener() { return ctx.AddJobPost(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 13)(18, "label", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, JobEditComponent_div_19_Template, 4, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](20, JobEditComponent_div_20_Template, 2, 1, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "input", 17, 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function JobEditComponent_Template_input_change_21_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8); const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](22); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.FileUpload(_r4.files)); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "small", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "div", 20)(26, "div", 21)(27, "label", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28, "Add description* ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "textarea", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, "              ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](31, JobEditComponent_small_31_Template, 2, 0, "small", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "div", 25)(33, "label", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34, "Location");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "div", 27)(36, "span", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "div", 21)(39, "div", 29)(40, "input", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function JobEditComponent_Template_input_change_40_listener() { return ctx.changePostAnonymously(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "label", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](42, "i", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "div")(44, "label", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](45, " Post Anonymously ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "p", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "Post as anonymous user, creators information will not be shown");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "div", 21)(49, "div", 29)(50, "input", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function JobEditComponent_Template_input_change_50_listener() { return ctx.changePostPublic(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "label", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](52, "i", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](53, "div")(54, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](55, " Post Locally ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](56, "p", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](57, "Post will be shown to your nearby users only upto 80 kms");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](58, "div", 38)(59, "button", 7)(60, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](61, JobEditComponent_span_61_Template, 2, 0, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](62, JobEditComponent_span_62_Template, 2, 0, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx.jobPostForm.valid || ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.imgURL && !ctx.jobModel.ImagesUrl == null);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.imgURL);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.message);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.jobPostForm.get("Descriptions").hasError("required") && ctx.jobPostForm.get("Descriptions").touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.jobModel.Address);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("checked", ctx.ischeckedAnonymously);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("checked", ctx.ischeckedPublic);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx.jobPostForm.valid || ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.btnLoader);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgForm, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName], styles: [".jobpost_wrap[_ngcontent-%COMP%] {\n  max-width: 100%;\n  width: 780px;\n  padding-left: 15px;\n  padding-right: 15px;\n  margin-left: auto;\n  margin-right: auto;\n  padding-bottom: 50px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n}\n@media (max-width: 767px) {\n  .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%] {\n    margin: 0 0 28px;\n  }\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%] {\n  min-width: 320px;\n  max-width: 320px;\n  margin-right: 45px;\n}\n@media (max-width: 767px) {\n  .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%] {\n    min-width: 100%;\n    max-width: 100%;\n  }\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%] {\n  background: var(--light-gray-color);\n  border-radius: 12px;\n  height: 310px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  font-size: var(--font-size-xl);\n  color: #828E9B;\n  font-weight: 700;\n  position: relative;\n  padding: 13px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%]   .ap_img_wrp[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  padding: 5px 0;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%]::before {\n  content: \"\";\n  left: 13px;\n  right: 13px;\n  top: 13px;\n  bottom: 13px;\n  position: absolute;\n  border: 2px dashed #828E9B;\n  border-radius: 8px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%]   i.fas.fa-plus[_ngcontent-%COMP%] {\n  border: 2px solid #828E9B;\n  width: 48px;\n  height: 48px;\n  display: flex;\n  margin: 0 auto 10px;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 100%;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%]   input#real-file[_ngcontent-%COMP%] {\n  opacity: 0;\n  width: 0;\n}\n@media (max-width: 767px) {\n  .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%] {\n    height: 210px;\n    padding: 18px;\n  }\n  .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%]::before {\n    left: 18px;\n    right: 18px;\n    top: 18px;\n    bottom: 18px;\n  }\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   label.form-label[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xl);\n  font-weight: 700;\n  padding: 0 10px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-text[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n  padding-left: 10px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   textarea.form-control[_ngcontent-%COMP%], .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-control.taginput[_ngcontent-%COMP%], .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .location_sec[_ngcontent-%COMP%] {\n  background: var(--light-gray-color);\n  border-radius: 12px;\n  height: 145px;\n  border: none;\n  font-size: var(--body-font-size);\n  padding: 15px;\n}\n@media (max-width: 767px) {\n  .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   textarea.form-control[_ngcontent-%COMP%], .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-control.taginput[_ngcontent-%COMP%], .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .location_sec[_ngcontent-%COMP%] {\n    height: 120px;\n  }\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-control.taginput[_ngcontent-%COMP%] {\n  height: 72px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .location_sec[_ngcontent-%COMP%] {\n  height: auto;\n  min-height: 72px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .add_tag[_ngcontent-%COMP%] {\n  position: relative;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .add_tag[_ngcontent-%COMP%]   .btn-hoozOn-2[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 10px;\n  top: 12px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .location_sec[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .location_sec[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-right: 15px;\n  flex: 1;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%] {\n  padding: 0;\n  display: flex;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]   label.form-label[_ngcontent-%COMP%] {\n  font-size: 20px;\n  padding: 0;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]   input.form-check-input[type=checkbox][_ngcontent-%COMP%] {\n  display: none;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]   input.form-check-input[type=checkbox][_ngcontent-%COMP%]    + .check[_ngcontent-%COMP%] {\n  display: inline-block;\n  vertical-align: top;\n  width: 48px;\n  min-width: 48px;\n  height: 48px;\n  border: 4px solid #000000;\n  border-radius: 50%;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 22px;\n  margin-right: 25px;\n  cursor: pointer;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]   input.form-check-input[type=checkbox][_ngcontent-%COMP%]    + .check[_ngcontent-%COMP%]   i.fa.fa-check[_ngcontent-%COMP%] {\n  display: none;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]   input.form-check-input[type=checkbox][_ngcontent-%COMP%]:checked    + .check[_ngcontent-%COMP%] {\n  background: #000000;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]   input.form-check-input[type=checkbox][_ngcontent-%COMP%]:checked    + .check[_ngcontent-%COMP%]   i.fa.fa-check[_ngcontent-%COMP%] {\n  display: block;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .mb-20.location[_ngcontent-%COMP%] {\n  margin-bottom: 38px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .post_button[_ngcontent-%COMP%] {\n  text-align: right;\n  margin-top: 15px;\n}\n.jobpost_top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 35px;\n}\n.jobpost_top[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n  font-weight: 700;\n  margin-bottom: 2px;\n}\n.jobpost_top[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.jobpost_top[_ngcontent-%COMP%]   .j_right[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpvYlBvc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7QUFDRjtBQUNJO0VBQ0UsYUFBQTtBQUNOO0FBQU07RUFGRjtJQUdJLGNBQUE7RUFHTjtFQUZNO0lBQ0UsZ0JBQUE7RUFJUjtBQUNGO0FBREk7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFHTjtBQUZNO0VBSkY7SUFLSSxlQUFBO0lBQ0EsZUFBQTtFQUtOO0FBQ0Y7QUFKTTtFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSw4QkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtBQU1SO0FBTFE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FBT1o7QUFMUTtFQUNFLFdBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQkFBQTtFQUNBLGtCQUFBO0FBT1Y7QUFMUTtFQUNFLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7QUFPVjtBQUxRO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FBT1Y7QUFMUTtFQUFpQixVQUFBO0VBQVcsUUFBQTtBQVNwQztBQVJRO0VBOUNGO0lBK0NJLGFBQUE7SUFDQSxhQUFBO0VBV1I7RUFWUTtJQUNFLFVBQUE7SUFDQSxXQUFBO0lBQ0EsU0FBQTtJQUNBLFlBQUE7RUFZVjtBQUNGO0FBUkk7RUFDRSxPQUFBO0FBVU47QUFUTTtFQUNJLDhCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBV1Y7QUFUTTtFQUFZLDhCQUFBO0VBQStCLGtCQUFBO0FBYWpEO0FBWk07OztFQUdJLG1DQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLGdDQUFBO0VBQ0EsYUFBQTtBQWNWO0FBYlU7RUFUSjs7O0lBVU0sYUFBQTtFQWtCVjtBQUNGO0FBaEJNO0VBQ0UsWUFBQTtBQWtCUjtBQWhCTTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQWtCUjtBQWhCTTtFQUNFLGtCQUFBO0FBa0JSO0FBaEJNO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtBQWtCUjtBQWhCTTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQWtCUjtBQWpCUTtFQUNFLGtCQUFBO0VBQ0EsT0FBQTtBQW1CVjtBQWhCTTtFQUNJLFVBQUE7RUFDQSxhQUFBO0FBa0JWO0FBakJVO0VBQ0UsZUFBQTtFQUNBLFVBQUE7QUFtQlo7QUFqQlU7RUFDRSxhQUFBO0FBbUJaO0FBbEJZO0VBQ0kscUJBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBb0JoQjtBQW5CZ0I7RUFDRSxhQUFBO0FBcUJsQjtBQWxCWTtFQUNFLG1CQUFBO0FBb0JkO0FBbkJjO0VBQ0UsY0FBQTtBQXFCaEI7QUFqQlU7RUFDRSxPQUFBO0FBbUJaO0FBZEU7RUFBaUIsbUJBQUE7QUFpQm5CO0FBaEJFO0VBQWMsaUJBQUE7RUFBa0IsZ0JBQUE7QUFvQmxDO0FBbEJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFxQkY7QUFwQkU7RUFDRSw4QkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFzQko7QUFwQkU7RUFDRSxnQkFBQTtBQXNCSjtBQXBCRTtFQUNFLGlCQUFBO0FBc0JKIiwiZmlsZSI6IkpvYlBvc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuam9icG9zdF93cmFwIHtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgd2lkdGg6IDc4MHB4O1xyXG4gIHBhZGRpbmctbGVmdDogMTVweDtcclxuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gIG1hcmdpbi1yaWdodDogYXV0bztcclxuICBwYWRkaW5nLWJvdHRvbTogNTBweDtcclxuICAuam9icG9zdF9tYWluIHtcclxuICAgIGZvcm0ge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDo3NjdweCkge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIC5qb2Jwb3N0X2xlZnQge1xyXG4gICAgICAgICAgbWFyZ2luOiAwIDAgMjhweDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC5qb2Jwb3N0X2xlZnQge1xyXG4gICAgICBtaW4td2lkdGg6IDMyMHB4O1xyXG4gICAgICBtYXgtd2lkdGg6IDMyMHB4O1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6IDQ1cHg7XHJcbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOjc2N3B4KSB7XHJcbiAgICAgICAgbWluLXdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgICAgfVxyXG4gICAgICAuYWRkX3Bvc3Qge1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWxpZ2h0LWdyYXktY29sb3IpO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgICAgICAgaGVpZ2h0OiAzMTBweDtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplLXhsKTtcclxuICAgICAgICBjb2xvcjogIzgyOEU5QjtcclxuICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICBwYWRkaW5nOiAxM3B4O1xyXG4gICAgICAgIC5hcF9pbWdfd3JwIHtcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgcGFkZGluZzogNXB4IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICY6OmJlZm9yZSB7XHJcbiAgICAgICAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgICAgICAgbGVmdDogMTNweDtcclxuICAgICAgICAgIHJpZ2h0OiAxM3B4O1xyXG4gICAgICAgICAgdG9wOiAxM3B4O1xyXG4gICAgICAgICAgYm90dG9tOiAxM3B4O1xyXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgYm9yZGVyOiAycHggZGFzaGVkICM4MjhFOUI7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGkuZmFzLmZhLXBsdXMge1xyXG4gICAgICAgICAgYm9yZGVyOiAycHggc29saWQgIzgyOEU5QjtcclxuICAgICAgICAgIHdpZHRoOiA0OHB4O1xyXG4gICAgICAgICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgIG1hcmdpbjogMCBhdXRvIDEwcHg7XHJcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGltZyB7XHJcbiAgICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICBtYXgtaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dCNyZWFsLWZpbGUge29wYWNpdHk6IDA7d2lkdGg6IDA7fVxyXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOjc2N3B4KSB7XHJcbiAgICAgICAgICBoZWlnaHQ6IDIxMHB4O1xyXG4gICAgICAgICAgcGFkZGluZzogMThweDtcclxuICAgICAgICAgICY6OmJlZm9yZSB7XHJcbiAgICAgICAgICAgIGxlZnQ6IDE4cHg7XHJcbiAgICAgICAgICAgIHJpZ2h0OiAxOHB4O1xyXG4gICAgICAgICAgICB0b3A6IDE4cHg7XHJcbiAgICAgICAgICAgIGJvdHRvbTogMThweDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC5qb2Jwb3N0X3JpZ2h0IHtcclxuICAgICAgZmxleDogMTtcclxuICAgICAgbGFiZWwuZm9ybS1sYWJlbCB7XHJcbiAgICAgICAgICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS14bCk7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgICAgcGFkZGluZzogMCAxMHB4O1xyXG4gICAgICB9XHJcbiAgICAgIC5mb3JtLXRleHQge2ZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplLXNtKTtwYWRkaW5nLWxlZnQ6IDEwcHg7fVxyXG4gICAgICB0ZXh0YXJlYS5mb3JtLWNvbnRyb2wsXHJcbiAgICAgIC5mb3JtLWNvbnRyb2wudGFnaW5wdXQsXHJcbiAgICAgIC5sb2NhdGlvbl9zZWMge1xyXG4gICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tbGlnaHQtZ3JheS1jb2xvcik7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gICAgICAgICAgaGVpZ2h0OiAxNDVweDtcclxuICAgICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogdmFyKC0tYm9keS1mb250LXNpemUpO1xyXG4gICAgICAgICAgcGFkZGluZzogMTVweDtcclxuICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOjc2N3B4KSB7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTIwcHg7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLmZvcm0tY29udHJvbC50YWdpbnB1dCB7XHJcbiAgICAgICAgaGVpZ2h0OiA3MnB4O1xyXG4gICAgICB9XHJcbiAgICAgIC5sb2NhdGlvbl9zZWMge1xyXG4gICAgICAgIGhlaWdodDogYXV0bztcclxuICAgICAgICBtaW4taGVpZ2h0OiA3MnB4O1xyXG4gICAgICB9XHJcbiAgICAgIC5hZGRfdGFnIHtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIH1cclxuICAgICAgLmFkZF90YWcgLmJ0bi1ob296T24tMiB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHJpZ2h0OiAxMHB4O1xyXG4gICAgICAgIHRvcDogMTJweDtcclxuICAgICAgfVxyXG4gICAgICAubG9jYXRpb25fc2VjIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgc3BhbiB7XHJcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgICAgICAgICBmbGV4OiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAuZm9ybS1jaGVjayB7XHJcbiAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgIGxhYmVsLmZvcm0tbGFiZWwge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpbnB1dC5mb3JtLWNoZWNrLWlucHV0W3R5cGU9XCJjaGVja2JveFwiXSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICAgICAgICAgICYrIC5jaGVjayB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4cHg7XHJcbiAgICAgICAgICAgICAgICBtaW4td2lkdGg6IDQ4cHg7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDQ4cHg7XHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IDRweCBzb2xpZCAjMDAwMDAwO1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAyNXB4O1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgICAgICAgICAgaS5mYS5mYS1jaGVjayB7XHJcbiAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJjpjaGVja2VkICsgLmNoZWNrIHtcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMDAwMDAwO1xyXG4gICAgICAgICAgICAgIGkuZmEuZmEtY2hlY2sge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAmPiBkaXYge1xyXG4gICAgICAgICAgICBmbGV4OiAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5tYi0yMC5sb2NhdGlvbiB7bWFyZ2luLWJvdHRvbTogMzhweDt9XHJcbiAgLnBvc3RfYnV0dG9uIHt0ZXh0LWFsaWduOiByaWdodDttYXJnaW4tdG9wOiAxNXB4O31cclxufVxyXG4uam9icG9zdF90b3Age1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAzNXB4O1xyXG4gIHAge1xyXG4gICAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtc20pO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDJweDtcclxuICB9XHJcbiAgaDIge1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICB9XHJcbiAgLmpfcmlnaHQge1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgfVxyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 443:
/*!**************************************************!*\
  !*** ./src/app/Job/JobList/JobList.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JobListComponent": () => (/* binding */ JobListComponent)
/* harmony export */ });
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert2 */ 598);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngx_timeago_language_strings_en__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-timeago/language-strings/en */ 5260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_JobPost_JobPost_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/JobPost/JobPost.service */ 9923);
/* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-timeago */ 2699);
/* harmony import */ var _services_JobPost_ReportJob_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/JobPost/ReportJob.service */ 1555);
/* harmony import */ var _Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Shared/services/NavbarCommunication.service */ 4920);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/SharedServices/Shared.service */ 4937);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-infinite-scroll */ 2029);












function JobListComponent_div_30_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("date", item_r3 == null ? null : item_r3.CreatedBy);
} }
function JobListComponent_div_30_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("date", item_r3 == null ? null : item_r3.CreatedBy);
} }
function JobListComponent_div_30_div_14_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r3.TotalResponces);
} }
function JobListComponent_div_30_div_14_span_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r3.TotalResponces);
} }
function JobListComponent_div_30_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Response\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, JobListComponent_div_30_div_14_span_2_Template, 2, 1, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, JobListComponent_div_30_div_14_span_3_Template, 2, 1, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r3.TotalResponces > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r3.TotalResponces == 0);
} }
function JobListComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div")(1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobListComponent_div_30_Template_div_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r16); const item_r3 = restoredCtx.$implicit; const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r15.RedirectToJob(item_r3.Id)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 28)(3, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "img", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 31)(6, "div", 14)(7, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](9, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](10, "i", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, JobListComponent_div_30_div_12_Template, 2, 1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, JobListComponent_div_30_div_13_Template, 2, 1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, JobListComponent_div_30_div_14_Template, 4, 2, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", item_r3.JobDetailImage, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind3"](9, 5, item_r3.Descriptions, 0, 50));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r3.Descriptions.length <= 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", item_r3.Descriptions.length >= 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r0.IsOnJob);
} }
function JobListComponent_div_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "div")(2, "div")(3, "div")(4, "div")(5, "br")(6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function JobListComponent_div_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "br")(2, "br")(3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 42)(5, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "No Results");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
} }
class JobListComponent {
    constructor(_jobServices, intl, _reportServices, navServices, activatedRoute, _sharedServices, _router, _location) {
        this._jobServices = _jobServices;
        this._reportServices = _reportServices;
        this.navServices = navServices;
        this.activatedRoute = activatedRoute;
        this._sharedServices = _sharedServices;
        this._router = _router;
        this._location = _location;
        this.jobModels = [];
        this.currentPage = 1;
        this.itemsPerPage = 4;
        this.isLogedIn = false;
        this.isLoading = false;
        //Scroll Variable
        this.NotEmptPost = true;
        this.notScrollY = true;
        // TabToggleTrackVariable
        this.IsOnJob = true;
        this.JobStatus = 'OPEN';
        this._sharedServices.checkInterNetConnection();
        intl.strings = ngx_timeago_language_strings_en__WEBPACK_IMPORTED_MODULE_7__.strings;
        intl.changes.next();
        this.loadUserData();
    }
    ngOnInit() {
    }
    //Load Jobs Post Tab
    LoadAllWithAddedJob(currentPage, itemsPerPage, Jobstatus) {
        this._jobServices.GetAllWithAddedJob(this.userId, currentPage, itemsPerPage, Jobstatus)
            .subscribe({
            next: (res) => {
                this.jobModel = res.result;
                this.jobModels = res.result.data;
                this.pagination = res.pagination;
                this.isLoading = false;
            }
        });
    }
    //Load Post Tab
    LoadAllPost(userId, currentPage, itemsPerPage, Jobstatus) {
        this._jobServices.GetPostJob(userId, currentPage, itemsPerPage, Jobstatus)
            .subscribe({
            next: (res) => {
                this.jobModel = res.result;
                this.jobModels = res.result.data;
                this.pagination = res.pagination;
                if (this.jobModels.length === 0) {
                    this.NotEmptPost = false;
                }
            }
        });
    }
    LoadNextPost() {
        this.currentPage = this.currentPage + 1;
        if (this.IsOnJob == true) {
            this._jobServices.GetAllWithAddedJob(this.userId, this.currentPage, this.itemsPerPage, this.JobStatus).subscribe((res) => {
                const newData = res.result.data;
                this.isLoading = false;
                if (newData.length === 0) {
                    this.NotEmptPost = false;
                }
                this.jobModels = this.jobModels.concat(newData);
                this.notScrollY = true;
                this.pagination = res.pagination;
            }, err => {
                this.isLoading = false;
            });
        }
        else {
            this._jobServices.GetPostJob(this.currentPage, this.itemsPerPage).subscribe((res) => {
                const newData = res.result.data;
                this.isLoading = false;
                if (newData.length === 0) {
                    this.NotEmptPost = false;
                }
                this.jobModels = this.jobModels.concat(newData);
                this.notScrollY = true;
                this.pagination = res.pagination;
            }, err => {
                this.isLoading = false;
            });
        }
    }
    onScroll() {
        if (this.notScrollY && this.NotEmptPost) {
            this.isLoading = true;
            this.notScrollY = false;
            this.LoadNextPost();
        }
    }
    // Job Added
    AddToJob(jobId) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
            text: `Confirm to add Job Post Id: ${jobId}`,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let userJob = {
                    jobModelId: jobId,
                    socialAuthenticationId: this.userId
                };
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
                    text: 'Please wait.. Adding job',
                    showConfirmButton: false,
                    icon: 'info'
                });
                this._jobServices.AddJobToUser(userJob).subscribe((data) => {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire(`Job ${jobId} Added successfully!`, '', 'success');
                }, err => {
                    console.log(err);
                });
            }
            else if (result.isDenied) {
            }
        });
    }
    //Report Job
    Report(jobId) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
            title: `Report Post`,
            input: 'textarea',
            showDenyButton: true,
            confirmButtonText: 'Report',
            denyButtonText: `Cancel`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let reportJob = {
                    jobModelId: jobId,
                    socialAuthenticationId: this.userId,
                    Isusue: result.value
                };
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
                    text: 'Please wait... Reporting',
                    showConfirmButton: false,
                    icon: 'info'
                });
                this._reportServices.ReportJob(reportJob).subscribe((data) => {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire(`Job ${jobId} Reported!`, '', 'success');
                }, err => {
                    console.log(err);
                });
            }
            else if (result.isDenied) {
            }
        });
    }
    //Checkbox toggle method
    checkValue(event) {
        this.isLoading = false;
        this.IsOnJob = event;
        this.currentPage = 1;
        this.itemsPerPage = 4;
        this.notScrollY = true;
        this.NotEmptPost = true;
        this.jobModels = [];
        //this.jobModel = null;
        if (this.IsOnJob == true) {
            this.LoadAllWithAddedJob(this.currentPage, this.itemsPerPage, this.JobStatus);
        }
        else {
            this.LoadAllPost(this.user.Id, this.currentPage, this.itemsPerPage, this.JobStatus);
        }
    }
    //Job status dropdown
    JobStatusChange($event) {
        this.JobStatus = $event.target.value.trim();
        this.currentPage = 1;
        this.itemsPerPage = 4;
        if (this.IsOnJob == true) {
            this.LoadAllWithAddedJob(this.currentPage, this.itemsPerPage, this.JobStatus);
        }
        else {
            this.LoadAllPost(this.user.Id, this.currentPage, this.itemsPerPage, this.JobStatus);
        }
    }
    //Back loacation History
    backClicked() {
        this._location.back();
    }
    //Load Basic User Data
    loadUserData() {
        if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.userId = this.user.Id;
            this.isLogedIn = true;
            this.activatedRoute.queryParams.subscribe(params => {
                const paramVal = params['target'];
                if (paramVal == 'MyPost') {
                    this.checkValue(false);
                }
                else {
                    this.LoadAllWithAddedJob(this.currentPage, this.itemsPerPage, this.JobStatus);
                }
            });
        }
        else {
            this.isLogedIn = false;
            window.location.href = '/login';
        }
    }
    hideEvent() {
        this.navServices.Toggle();
    }
    RedirectToJob(jobId) {
        this._router.navigate(['/jobDetails'], { queryParams: { target: jobId } });
    }
}
JobListComponent.ɵfac = function JobListComponent_Factory(t) { return new (t || JobListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_JobPost_JobPost_service__WEBPACK_IMPORTED_MODULE_1__.JobPostService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_timeago__WEBPACK_IMPORTED_MODULE_8__.TimeagoIntl), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_JobPost_ReportJob_service__WEBPACK_IMPORTED_MODULE_2__.ReportJobService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_3__.NavbarCommunicationService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_4__.SharedService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_10__.Location)); };
JobListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: JobListComponent, selectors: [["app-JobList"]], decls: 33, vars: 5, consts: [[3, "click"], [1, "back_arrow"], ["aria-hidden", "true", 1, "back", "fa", "fa-2x", "fa-arrow-left", 3, "click"], [1, "job_list_wrap"], [1, "container-sm", "mt-0", "mb-1"], [1, "row", "col-sm-12"], [1, "d-flex", "switch_button_wrap"], [1, "d-flex", "flex-row"], [1, "switch-button"], ["type", "checkbox", 1, "switch-button-checkbox", 3, "ngModel", "ngModelChange", "change"], ["for", "", 1, "switch-button-label"], [1, "switch-button-label-span"], [1, "content"], [1, "d-flex", "job_list_text"], [1, "title"], [1, "job_opt"], [1, "select"], [1, "fa", "fa-caret-down"], ["name", "nameValueSelect", "required", "", 1, "select__field", 3, "change"], ["value", "OPEN"], ["value", "ON HOLD"], ["value", "CLOSED"], ["value", "DELETED"], ["infiniteScroll", "", 1, "search-results", 3, "infiniteScrollDistance", "scrolled"], [4, "ngFor", "ngForOf"], ["class", "lds-ring", 4, "ngIf"], [4, "ngIf"], [1, "job_list_item", 3, "click"], ["id", "custom-button", 1, "img_wrap"], [1, "overlay_bg"], ["alt", "hooz image", 3, "src"], [1, "right_sec"], [1, "fa", "fa-angle-right"], [1, "bt_sec"], ["class", "ResponceBadge", 4, "ngIf"], ["timeago", "", 3, "date"], [1, "ResponceBadge"], ["class", "badge rounded-pill bg-Responce", 4, "ngIf"], ["class", "badge rounded-pill bg-NoResponce", 4, "ngIf"], [1, "badge", "rounded-pill", "bg-Responce"], [1, "badge", "rounded-pill", "bg-NoResponce"], [1, "lds-ring"], [1, "col-md-12", "d-flex", "justify-content-center"], [1, "Search-result"]], template: function JobListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobListComponent_Template_div_click_0_listener() { return ctx.hideEvent(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1)(2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function JobListComponent_Template_i_click_2_listener() { return ctx.backClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "div", 7)(8, "div", 8)(9, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function JobListComponent_Template_input_ngModelChange_9_listener($event) { return !(ctx.IsOnJob = $event); })("change", function JobListComponent_Template_input_change_9_listener() { return ctx.checkValue(ctx.IsOnJob ? false : true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "label", 10)(11, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12, "Jobs");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "div", 12)(14, "div", 13)(15, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16, " List of all posts with status ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "div", 15)(18, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](19, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "select", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("change", function JobListComponent_Template_select_change_20_listener($event) { return ctx.JobStatusChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "option", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](22, "Open");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "option", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](24, "On hold");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "option", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26, "Closed");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](27, "option", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](28, "Delete");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("scrolled", function JobListComponent_Template_div_scrolled_29_listener() { return ctx.onScroll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](30, JobListComponent_div_30_Template, 15, 9, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](31, JobListComponent_div_31_Template, 7, 0, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](32, JobListComponent_div_32_Template, 7, 0, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", !ctx.IsOnJob);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("infiniteScrollDistance", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.jobModels);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.NotEmptPost);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgModel, ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_5__.InfiniteScrollDirective, ngx_timeago__WEBPACK_IMPORTED_MODULE_8__.TimeagoDirective, _angular_common__WEBPACK_IMPORTED_MODULE_10__.SlicePipe], styles: [".switch-button[_ngcontent-%COMP%]:before {\n  content: \"Posts\";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 136px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 3;\n  font-weight: normal;\n  pointer-events: none;\n}\n\n.lds-ring[_ngcontent-%COMP%] {\n  width: 65px;\n  height: 65px;\n}\n\n.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 64px;\n  height: 64px;\n  margin-left: 290px;\n  border: 8px solid black;\n  border-radius: 50%;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: black transparent transparent transparent;\n}\n\n.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: -0.45s;\n}\n\n.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: -0.3s;\n}\n\n.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: -0.15s;\n}\n\n@keyframes lds-ring {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n.job_list_wrap[_ngcontent-%COMP%] {\n  max-width: 100%;\n  width: 630px;\n  padding-left: 15px;\n  padding-right: 15px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.job_list_text[_ngcontent-%COMP%] {\n  align-items: center;\n  justify-content: center;\n  margin: 35px 0;\n}\n\n.job_list_text[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  margin-right: 25px;\n}\n\n.job_list_item[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 5px;\n  background: rgba(239, 242, 245, 0.5);\n  border-radius: 12px;\n  margin-bottom: 26px;\n  cursor: pointer;\n}\n\n.job_list_item[_ngcontent-%COMP%]   .fa-angle-right[_ngcontent-%COMP%] {\n  font-size: 33px;\n  margin: 3px 10px 0 auto;\n  opacity: 0;\n}\n\n.job_list_item[_ngcontent-%COMP%]   .right_sec[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.job_list_item[_ngcontent-%COMP%]   .right_sec[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin: 10px 0 0;\n  display: flex;\n}\n\n.job_list_item[_ngcontent-%COMP%]   .right_sec[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding-right: 30px;\n}\n\n.job_list_item[_ngcontent-%COMP%]   .right_sec[_ngcontent-%COMP%]   .bt_sec[_ngcontent-%COMP%] {\n  margin-top: auto;\n  display: flex;\n  font-size: var(--font-size-sm);\n  margin-bottom: 6px;\n  align-items: center;\n}\n\n.job_list_item[_ngcontent-%COMP%]   .right_sec[_ngcontent-%COMP%]   .bt_sec[_ngcontent-%COMP%]   .ResponceBadge[_ngcontent-%COMP%] {\n  margin-left: auto;\n  margin-right: 16px;\n  display: flex;\n  align-items: center;\n}\n\n.job_list_item[_ngcontent-%COMP%]   .right_sec[_ngcontent-%COMP%]   .bt_sec[_ngcontent-%COMP%]   .ResponceBadge[_ngcontent-%COMP%]   .bg-Responce[_ngcontent-%COMP%] {\n  margin-left: 5px;\n}\n\n.job_list_item[_ngcontent-%COMP%]:hover {\n  background: var(--light-gray-color);\n}\n\n.job_list_item[_ngcontent-%COMP%]:hover   .fa-angle-right[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n\n.job_list_item[_ngcontent-%COMP%]   .img_wrap[_ngcontent-%COMP%] {\n  width: 135px;\n  margin-right: 20px;\n  margin-bottom: 0;\n}\n\n.job_list_item[_ngcontent-%COMP%]   .img_wrap[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: 12px;\n}\n\n@media (max-width: 767px) {\n  .job_list_text[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .job_list_text[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n    margin: 0 0 10px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpvYkxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7QUFDRjs7QUFDQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBRUE7O0FBQUE7RUFDQSxzQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsOERBQUE7RUFDQSx1REFBQTtBQUdBOztBQURBO0VBQ0EsdUJBQUE7QUFJQTs7QUFGQTtFQUNBLHNCQUFBO0FBS0E7O0FBSEE7RUFDQSx1QkFBQTtBQU1BOztBQUpBO0VBQ0E7SUFDRSx1QkFBQTtFQU9BO0VBTEY7SUFDRSx5QkFBQTtFQU9BO0FBQ0Y7O0FBSkE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBTUE7O0FBSkE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtBQU9BOztBQUxBO0VBQ0Esa0JBQUE7QUFRQTs7QUFOQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQVNBOztBQVJBO0VBQ0UsZUFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtBQVVGOztBQVJBO0VBQ0UsT0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQVVGOztBQVRFO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7QUFXSjs7QUFWSTtFQUNFLG1CQUFBO0FBWU47O0FBVEU7RUFDRSxnQkFBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFXSjs7QUFWSTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFZTjs7QUFYTTtFQUNFLGdCQUFBO0FBYVI7O0FBUkE7RUFDRSxtQ0FBQTtBQVVGOztBQVRFO0VBQ0UsVUFBQTtBQVdKOztBQVJBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFVRjs7QUFURTtFQUNFLFdBQUE7RUFDQSxtQkFBQTtBQVdKOztBQU5BO0VBQ0E7SUFDRSxzQkFBQTtFQVNBO0VBUkE7SUFDRSxnQkFBQTtFQVVGO0FBQ0YiLCJmaWxlIjoiSm9iTGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zd2l0Y2gtYnV0dG9uOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJQb3N0c1wiO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgYm90dG9tOiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIHdpZHRoOiAxMzZweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgei1pbmRleDogMztcclxuICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG59XHJcbi5sZHMtcmluZyB7XHJcbndpZHRoOiA2NXB4O1xyXG5oZWlnaHQ6IDY1cHg7XHJcbn1cclxuLmxkcy1yaW5nIGRpdiB7XHJcbmJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbmRpc3BsYXk6IGJsb2NrO1xyXG5wb3NpdGlvbjogYWJzb2x1dGU7XHJcbndpZHRoOiA2NHB4O1xyXG5oZWlnaHQ6IDY0cHg7XHJcbm1hcmdpbi1sZWZ0OiAyOTBweDtcclxuYm9yZGVyOiA4cHggc29saWQgYmxhY2s7XHJcbmJvcmRlci1yYWRpdXM6IDUwJTtcclxuYW5pbWF0aW9uOiBsZHMtcmluZyAxLjJzIGN1YmljLWJlemllcigwLjUsIDAsIDAuNSwgMSkgaW5maW5pdGU7XHJcbmJvcmRlci1jb2xvcjogYmxhY2sgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7XHJcbn1cclxuLmxkcy1yaW5nIGRpdjpudGgtY2hpbGQoMSkge1xyXG5hbmltYXRpb24tZGVsYXk6IC0wLjQ1cztcclxufVxyXG4ubGRzLXJpbmcgZGl2Om50aC1jaGlsZCgyKSB7XHJcbmFuaW1hdGlvbi1kZWxheTogLTAuM3M7XHJcbn1cclxuLmxkcy1yaW5nIGRpdjpudGgtY2hpbGQoMykge1xyXG5hbmltYXRpb24tZGVsYXk6IC0wLjE1cztcclxufVxyXG5Aa2V5ZnJhbWVzIGxkcy1yaW5nIHtcclxuMCUge1xyXG4gIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG59XHJcbjEwMCUge1xyXG4gIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbn1cclxufVxyXG5cclxuLmpvYl9saXN0X3dyYXAge1xyXG5tYXgtd2lkdGg6IDEwMCU7XHJcbndpZHRoOiA2MzBweDtcclxucGFkZGluZy1sZWZ0OiAxNXB4O1xyXG5wYWRkaW5nLXJpZ2h0OiAxNXB4O1xyXG5tYXJnaW4tbGVmdDogYXV0bztcclxubWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG59XHJcbi5qb2JfbGlzdF90ZXh0IHtcclxuYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuanVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbm1hcmdpbjogMzVweCAwO1xyXG59XHJcbi5qb2JfbGlzdF90ZXh0IC50aXRsZSB7XHJcbm1hcmdpbi1yaWdodDogMjVweDtcclxufVxyXG4uam9iX2xpc3RfaXRlbSB7XHJcbmRpc3BsYXk6IGZsZXg7XHJcbnBhZGRpbmc6IDVweDtcclxuYmFja2dyb3VuZDogcmdiKDIzOSAyNDIgMjQ1IC8gNTAlKTtcclxuYm9yZGVyLXJhZGl1czogMTJweDtcclxubWFyZ2luLWJvdHRvbTogMjZweDtcclxuY3Vyc29yOiBwb2ludGVyO1xyXG4uZmEtYW5nbGUtcmlnaHQge1xyXG4gIGZvbnQtc2l6ZTogMzNweDtcclxuICBtYXJnaW46IDNweCAxMHB4IDAgYXV0bztcclxuICBvcGFjaXR5OiAwO1xyXG59XHJcbi5yaWdodF9zZWMge1xyXG4gIGZsZXg6IDE7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIC50aXRsZSB7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgbWFyZ2luOiAxMHB4IDAgMDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBzcGFuIHtcclxuICAgICAgcGFkZGluZy1yaWdodDogMzBweDtcclxuICAgIH1cclxuICB9XHJcbiAgLmJ0X3NlYyB7XHJcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplLXNtKTtcclxuICAgIG1hcmdpbi1ib3R0b206IDZweDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAuUmVzcG9uY2VCYWRnZSB7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6IDE2cHg7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIC5iZy1SZXNwb25jZSB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4mOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1saWdodC1ncmF5LWNvbG9yKTtcclxuICAuZmEtYW5nbGUtcmlnaHQge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICB9XHJcbn1cclxuLmltZ193cmFwIHtcclxuICB3aWR0aDogMTM1cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgaW1nIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICB9XHJcbn1cclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6NzY3cHgpIHtcclxuLmpvYl9saXN0X3RleHQge1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgLnRpdGxlIHtcclxuICAgIG1hcmdpbjogMCAwIDEwcHg7XHJcbiAgfVxyXG59XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ 2073:
/*!**************************************************!*\
  !*** ./src/app/Job/JobPost/JobPost.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JobPostComponent": () => (/* binding */ JobPostComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Shared/services/NavbarCommunication.service */ 4920);
/* harmony import */ var _services_JobPost_JobPost_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/JobPost/JobPost.service */ 9923);
/* harmony import */ var _services_Tags_Tag_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/Tags/Tag.service */ 4698);
/* harmony import */ var _ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngneat/hot-toast */ 7403);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @agm/core */ 3333);
/* harmony import */ var _services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/SharedServices/Shared.service */ 4937);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 4666);











function JobPostComponent_span_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "span", 47);
} }
function JobPostComponent_span_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Posting...");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function JobPostComponent_span_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Post");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function JobPostComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "i", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Add image");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
} }
function JobPostComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "img", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("src", ctx_r4.imgURL, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
} }
function JobPostComponent_small_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "small", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Description is required.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function JobPostComponent_span_45_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "i", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function JobPostComponent_span_45_Template_i_click_2_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r13); const item_r11 = restoredCtx.$implicit; const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r12.RemoveTagging(item_r11.TagName)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", item_r11.TagName, " ");
} }
function JobPostComponent_span_75_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "span", 47);
} }
function JobPostComponent_span_76_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Posting...");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function JobPostComponent_span_77_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Post");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
var addressLocation = '';
class JobPostComponent {
    constructor(fb, navServices, _jobServices, _tagService, toast, _router, apiloader, _sharedServices, _location) {
        this.fb = fb;
        this.navServices = navServices;
        this._jobServices = _jobServices;
        this._tagService = _tagService;
        this.toast = toast;
        this._router = _router;
        this.apiloader = apiloader;
        this._sharedServices = _sharedServices;
        this._location = _location;
        this.Tags = [];
        this.imagePath = '';
        this.ischeckedAnonymously = false;
        this.ischeckedPublic = true;
        this.isPostClick = false;
        this.uploadFile = (jobId, files) => {
            if (files.length === 0)
                return;
            let fileToUpload = files[0];
            const formData = new FormData();
            formData.append('file', fileToUpload, fileToUpload.name);
            this._jobServices.AddPostImages(jobId, formData).subscribe(() => {
                this.jobPostForm.controls['Tags'].setValue('');
                this.Tags = [];
                this.Tagmessage = '';
                this.btnLoader = false;
                this.imgURL = null;
                this.jobPostForm.reset();
                this._router.navigate(['/joblist'], { queryParams: { target: 'MyPost' } });
            }, error => {
                console.log(error);
            });
        };
        this.AskForLocation();
        window.scrollTo(0, 0);
        this._sharedServices.checkInterNetConnection();
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            this.userId = user.Id;
        }
        else {
            window.location.href = '/login';
        }
    }
    ngOnInit() {
        this.createJobPostForm();
        this.isPostClick = false;
    }
    canDeactivate() {
        if (!this.isPostClick) {
            let description = this.jobPostForm.controls['Descriptions'].value;
            if (description != '') {
                return false;
            }
            else
                return true;
        }
        else {
            return true;
        }
    }
    createJobPostForm() {
        this.jobPostForm = this.fb.group({
            UserId: [],
            Descriptions: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
            Tags: [''],
            ImagesUrl: [''],
            Address: [''],
            Latitude: [''],
            Longitude: [''],
            IsAnonymous: [false],
            IsPublic: [true]
        });
    }
    changePostAnonymously() {
        this.ischeckedAnonymously = !this.ischeckedAnonymously;
        this.jobPostForm.controls['IsAnonymous'].setValue(this.ischeckedAnonymously);
    }
    changePostPublic() {
        this.ischeckedPublic = !this.ischeckedPublic;
        this.jobPostForm.controls['IsPublic'].setValue(this.ischeckedPublic);
    }
    showToast() {
        this.toast.success('Job created Successfully', {
            position: 'top-center',
        });
    }
    AskForLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                if (position) {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.apiloader.load().then(() => {
                        let geocoder = new google.maps.Geocoder;
                        let latlng = {
                            lat: this.latitude,
                            lng: this.longitude
                        };
                        geocoder.geocode({
                            'location': latlng
                        }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[1]) {
                                    addressLocation = results[1].formatted_address;
                                    window.document.getElementById('location').innerHTML = addressLocation;
                                }
                            }
                            else {
                                console.log('Not found');
                            }
                        });
                    });
                }
                else {
                    this.showToast();
                    return;
                }
            });
        }
        else {
            this.toast.info('location not supported by this browser', {
                position: 'top-center',
            });
        }
    }
    AddJobPost() {
        if (this.Tags.length == 0) {
            this.toast.warning('Tag is required!', {
                position: 'top-center',
            });
            return;
        }
        this.btnLoader = true;
        this.isPostClick = true;
        this.jobPostForm.controls['UserId'].setValue(this.userId);
        this.jobPostForm.controls['Tags'].setValue(this.Tags);
        this.jobPostForm.controls["Latitude"].setValue(this.latitude);
        this.jobPostForm.controls["Longitude"].setValue(this.longitude);
        this.jobPostForm.controls['IsAnonymous'].setValue(this.ischeckedAnonymously);
        this.jobPostForm.controls['IsPublic'].setValue(this.ischeckedPublic);
        this.jobPostForm.controls['Address'].setValue(addressLocation);
        this.jobModel = Object.assign({}, this.jobPostForm.value);
        this._jobServices.AddJobPost(this.jobModel).subscribe((data) => {
            if (this.filetoPost == undefined) {
                this._jobServices.AddPostImages(data.CreatedJob.Id, null).subscribe(() => {
                }, error => {
                    console.log(error);
                });
                this.jobPostForm.controls['Tags'].setValue('');
                this.Tags = [];
                this.Tagmessage = '';
                this.btnLoader = false;
                this.imgURL = null;
                this.showToast();
                this.jobPostForm.reset();
                this._router.navigate(['/joblist'], { queryParams: { target: 'MyPost' } });
            }
            else {
                this.uploadFile(data.CreatedJob.Id, this.filetoPost);
            }
        }, error => {
            console.log(error);
        });
    }
    AddTagging() {
        if (this.jobPostForm.controls['Tags'].value == '') {
            this.toast.warning('Tag is required!', {
                position: 'top-center',
            });
            return;
        }
        this.jobTag = {
            TagName: this.jobPostForm.controls['Tags'].value.trim(),
            TagMasterId: 0
        };
        this.Tags.push(this.jobTag);
        this.Tagmessage = '';
        // Add Tag To TagMaster for Later show suggetions
        this.tagMaster = {
            Id: 0,
            TagName: this.jobPostForm.controls['Tags'].value.trim()
        };
        this.jobPostForm.controls['Tags'].setValue(null);
        this._tagService.AddTag(this.tagMaster).subscribe((data) => {
        }, err => {
            console.log("Tag Adding to master Failed");
        });
    }
    RemoveTagging(item) {
        this.Tags = this.Tags.filter(function (obj) {
            return obj.TagName != item;
        });
    }
    FileUpload(files) {
        if (files.length === 0)
            return;
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }
        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
            this.filetoPost = files;
            this.message = "";
        };
    }
    //Back loacation History
    backClicked() {
        this._location.back();
    }
    hideEvent() {
        this.navServices.Toggle();
    }
}
JobPostComponent.ɵfac = function JobPostComponent_Factory(t) { return new (t || JobPostComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_0__.NavbarCommunicationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_JobPost_JobPost_service__WEBPACK_IMPORTED_MODULE_1__.JobPostService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_Tags_Tag_service__WEBPACK_IMPORTED_MODULE_2__.TagService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_6__.HotToastService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_agm_core__WEBPACK_IMPORTED_MODULE_8__.MapsAPILoader), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_9__.Location)); };
JobPostComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: JobPostComponent, selectors: [["app-JobPost"]], hostBindings: function JobPostComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("beforeunload", function JobPostComponent_beforeunload_HostBindingHandler() { return ctx.canDeactivate(); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresolveWindow"]);
    } }, decls: 79, vars: 16, consts: [[1, "main_cnt_wrap", 3, "click"], [1, "back_arrow"], ["aria-hidden", "true", 1, "back", "fa", "fa-2x", "fa-arrow-left", 3, "click"], [1, "jobpost_wrap"], [1, "jobpost_top"], [1, "j_left"], [1, "j_right"], ["type", "submit", "form", "postForm", "id", "post", 1, "btn", "btn-hoozOn", 3, "disabled"], [1, "button-content"], ["class", "spinner-border text-light spinner-border-sm", "role", "status", 4, "ngIf"], ["class", "load-text", 4, "ngIf"], ["class", "btn-text", 4, "ngIf"], [1, "jobpost_main"], ["id", "postForm", 3, "formGroup", "keydown.enter", "ngSubmit"], [1, "jobpost_left"], ["id", "custom-button", 1, "add_post"], [4, "ngIf"], ["class", "ap_img_wrp", 4, "ngIf"], ["formControlName", "ImagesUrl", "id", "real-file", "type", "file", "size", "60", 3, "change"], ["file", ""], [1, "text", "text-danger"], [1, "jobpost_right"], [1, "mb-20"], ["for", "exampleInputEmail1", 1, "form-label"], ["type", "text", "formControlName", "Descriptions", "placeholder", "What are you looking for?", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control", "one"], ["id", "emailHelp", "class", "form-text text text-danger", 4, "ngIf"], ["for", "exampleInputPassword1", 1, "form-label", "form-label1"], [1, "add_tag"], ["formControlName", "Tags", "placeholder", " add tags to your post", "type", "text", 1, "form-control", "taginput", 3, "keyup.enter"], ["type", "button", "id", "showPassword", 1, "btn", "btn-hoozOn-2", 3, "click"], [1, "badgeTagWrap"], ["class", "badgeTag", 4, "ngFor", "ngForOf"], [1, "mb-20", "location"], ["for", "exampleInputPassword1", 1, "form-label"], [1, "location_sec"], ["id", "location"], [1, "form-check"], ["type", "checkbox", "id", "flexcheckboxDefault1", 1, "form-check-input", 3, "checked", "change"], ["for", "flexcheckboxDefault1", 1, "check"], ["aria-hidden", "true", 1, "fa", "fa-check"], ["for", "flexcheckboxDefault1", 1, "form-label"], [1, "parapost"], ["type", "checkbox", "name", "flexcheckDefault", "id", "flexcheckboxDefault2", "checked", "", 1, "form-check-input", 3, "checked", "change"], ["for", "flexcheckboxDefault2", 1, "check"], ["for", "flexcheckboxDefault2", 1, "form-label"], [1, "post_button"], [1, "row"], ["role", "status", 1, "spinner-border", "text-light", "spinner-border-sm"], [1, "load-text"], [1, "btn-text"], [1, "fas", "fa-plus"], [1, "ap_img_wrp"], ["alt", "your image", 3, "src"], ["id", "emailHelp", 1, "form-text", "text", "text-danger"], [1, "badgeTag"], ["aria-hidden", "true", 1, "fa", "fa-times", 3, "click"]], template: function JobPostComponent_Template(rf, ctx) { if (rf & 1) {
        const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function JobPostComponent_Template_div_click_0_listener() { return ctx.hideEvent(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1)(2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function JobPostComponent_Template_i_click_2_listener() { return ctx.backClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "POST YOUR REQUIREMENT ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "Create post");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 6)(11, "button", 7)(12, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, JobPostComponent_span_13_Template, 1, 0, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, JobPostComponent_span_14_Template, 2, 0, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, JobPostComponent_span_15_Template, 2, 0, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div", 12)(17, "form", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("keydown.enter", function JobPostComponent_Template_form_keydown_enter_17_listener($event) { return $event.preventDefault(); })("ngSubmit", function JobPostComponent_Template_form_ngSubmit_17_listener() { return ctx.AddJobPost(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "div", 14)(19, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, JobPostComponent_div_20_Template, 4, 0, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, JobPostComponent_div_21_Template, 2, 1, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "input", 18, 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function JobPostComponent_Template_input_change_22_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r14); const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](23); return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx.FileUpload(_r5.files)); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "small", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "div", 21)(27, "div", 22)(28, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](29, " Add description");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](31, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "textarea", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](33, "              ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](34, JobPostComponent_small_34_Template, 2, 0, "small", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "div", 22)(36, "label", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](37, "Add tags");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](39, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](40, "div", 27)(41, "input", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("keyup.enter", function JobPostComponent_Template_input_keyup_enter_41_listener() { return ctx.AddTagging(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](42, "button", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function JobPostComponent_Template_button_click_42_listener() { return ctx.AddTagging(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](43, "Add");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](44, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](45, JobPostComponent_span_45_Template, 3, 1, "span", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](46, "div", 32)(47, "label", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](48, "Location*");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](49, "div", 34)(50, "span", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](51, "featching location...");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](52, "div", 22)(53, "div", 36)(54, "input", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function JobPostComponent_Template_input_change_54_listener() { return ctx.changePostAnonymously(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](55, "label", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](56, "i", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](57, "div")(58, "label", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](59, " Post Anonymously ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](60, "p", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](61, "Post as anonymous user, creators information will not be shown");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](62, "div", 22)(63, "div", 36)(64, "input", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function JobPostComponent_Template_input_change_64_listener() { return ctx.changePostPublic(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](65, "label", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](66, "i", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](67, "div")(68, "label", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](69, " Post Locally ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](70, "p", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](71, "Post will be shown to your nearby users only upto 80 kms");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](72, "div", 45)(73, "button", 7)(74, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](75, JobPostComponent_span_75_Template, 1, 0, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](76, JobPostComponent_span_76_Template, 2, 0, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](77, JobPostComponent_span_77_Template, 2, 0, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](78, "div", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !ctx.jobPostForm.valid || ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.jobPostForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.imgURL);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.imgURL);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.message);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.jobPostForm.get("Descriptions").hasError("required") && ctx.jobPostForm.get("Descriptions").touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.Tags);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("checked", ctx.ischeckedAnonymously);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("checked", ctx.ischeckedPublic);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !ctx.jobPostForm.valid || ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.btnLoader);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName], styles: [".jobpost_wrap[_ngcontent-%COMP%] {\n  max-width: 100%;\n  width: 780px;\n  padding-left: 15px;\n  padding-right: 15px;\n  margin-left: auto;\n  margin-right: auto;\n  padding-bottom: 50px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n}\n@media (max-width: 767px) {\n  .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%] {\n    margin: 0 0 28px;\n  }\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%] {\n  min-width: 320px;\n  max-width: 320px;\n  margin-right: 45px;\n}\n@media (max-width: 767px) {\n  .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%] {\n    min-width: 100%;\n    max-width: 100%;\n  }\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%] {\n  background: var(--light-gray-color);\n  border-radius: 12px;\n  height: 310px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  font-size: var(--font-size-xl);\n  color: #828E9B;\n  font-weight: 700;\n  position: relative;\n  padding: 13px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%]   .ap_img_wrp[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  padding: 5px 0;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%]::before {\n  content: \"\";\n  left: 13px;\n  right: 13px;\n  top: 13px;\n  bottom: 13px;\n  position: absolute;\n  border: 2px dashed #828E9B;\n  border-radius: 8px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%]   i.fas.fa-plus[_ngcontent-%COMP%] {\n  border: 2px solid #828E9B;\n  width: 48px;\n  height: 48px;\n  display: flex;\n  margin: 0 auto 10px;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 100%;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%]   input#real-file[_ngcontent-%COMP%] {\n  opacity: 0;\n  width: 0;\n}\n@media (max-width: 767px) {\n  .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%] {\n    height: 210px;\n    padding: 18px;\n  }\n  .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_left[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%]::before {\n    left: 18px;\n    right: 18px;\n    top: 18px;\n    bottom: 18px;\n  }\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   label.form-label[_ngcontent-%COMP%] {\n  font-size: var(--font-size-xl);\n  font-weight: 700;\n  padding: 0 10px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-text[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n  padding-left: 10px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   textarea.form-control[_ngcontent-%COMP%], .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-control.taginput[_ngcontent-%COMP%], .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .location_sec[_ngcontent-%COMP%] {\n  background: var(--light-gray-color);\n  border-radius: 12px;\n  height: 145px;\n  border: none;\n  font-size: var(--body-font-size);\n  padding: 15px;\n}\n@media (max-width: 767px) {\n  .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   textarea.form-control[_ngcontent-%COMP%], .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-control.taginput[_ngcontent-%COMP%], .jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .location_sec[_ngcontent-%COMP%] {\n    height: 120px;\n  }\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-control.taginput[_ngcontent-%COMP%] {\n  height: 72px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .location_sec[_ngcontent-%COMP%] {\n  height: auto;\n  min-height: 72px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .add_tag[_ngcontent-%COMP%] {\n  position: relative;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .add_tag[_ngcontent-%COMP%]   .btn-hoozOn-2[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 10px;\n  top: 12px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .location_sec[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .location_sec[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-right: 15px;\n  flex: 1;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%] {\n  padding: 0;\n  display: flex;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]   label.form-label[_ngcontent-%COMP%] {\n  font-size: 20px;\n  padding: 0;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]   input.form-check-input[type=checkbox][_ngcontent-%COMP%] {\n  display: none;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]   input.form-check-input[type=checkbox][_ngcontent-%COMP%]    + .check[_ngcontent-%COMP%] {\n  display: inline-block;\n  vertical-align: top;\n  width: 48px;\n  min-width: 48px;\n  height: 48px;\n  border: 4px solid #000000;\n  border-radius: 50%;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 22px;\n  margin-right: 25px;\n  cursor: pointer;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]   input.form-check-input[type=checkbox][_ngcontent-%COMP%]    + .check[_ngcontent-%COMP%]   i.fa.fa-check[_ngcontent-%COMP%] {\n  display: none;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]   input.form-check-input[type=checkbox][_ngcontent-%COMP%]:checked    + .check[_ngcontent-%COMP%] {\n  background: #000000;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]   input.form-check-input[type=checkbox][_ngcontent-%COMP%]:checked    + .check[_ngcontent-%COMP%]   i.fa.fa-check[_ngcontent-%COMP%] {\n  display: block;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .jobpost_main[_ngcontent-%COMP%]   .jobpost_right[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .mb-20.location[_ngcontent-%COMP%] {\n  margin-bottom: 38px;\n}\n.jobpost_wrap[_ngcontent-%COMP%]   .post_button[_ngcontent-%COMP%] {\n  text-align: right;\n  margin-top: 15px;\n}\n.jobpost_top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 35px;\n}\n.jobpost_top[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n  font-weight: 700;\n  margin-bottom: 2px;\n}\n.jobpost_top[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.jobpost_top[_ngcontent-%COMP%]   .j_right[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpvYlBvc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7QUFDRjtBQUNJO0VBQ0UsYUFBQTtBQUNOO0FBQU07RUFGRjtJQUdJLGNBQUE7RUFHTjtFQUZNO0lBQ0UsZ0JBQUE7RUFJUjtBQUNGO0FBREk7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFHTjtBQUZNO0VBSkY7SUFLSSxlQUFBO0lBQ0EsZUFBQTtFQUtOO0FBQ0Y7QUFKTTtFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSw4QkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtBQU1SO0FBTFE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FBT1o7QUFMUTtFQUNFLFdBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQkFBQTtFQUNBLGtCQUFBO0FBT1Y7QUFMUTtFQUNFLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7QUFPVjtBQUxRO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FBT1Y7QUFMUTtFQUFpQixVQUFBO0VBQVcsUUFBQTtBQVNwQztBQVJRO0VBOUNGO0lBK0NJLGFBQUE7SUFDQSxhQUFBO0VBV1I7RUFWUTtJQUNFLFVBQUE7SUFDQSxXQUFBO0lBQ0EsU0FBQTtJQUNBLFlBQUE7RUFZVjtBQUNGO0FBUkk7RUFDRSxPQUFBO0FBVU47QUFUTTtFQUNJLDhCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBV1Y7QUFUTTtFQUFZLDhCQUFBO0VBQStCLGtCQUFBO0FBYWpEO0FBWk07OztFQUdJLG1DQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLGdDQUFBO0VBQ0EsYUFBQTtBQWNWO0FBYlU7RUFUSjs7O0lBVU0sYUFBQTtFQWtCVjtBQUNGO0FBaEJNO0VBQ0UsWUFBQTtBQWtCUjtBQWhCTTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQWtCUjtBQWhCTTtFQUNFLGtCQUFBO0FBa0JSO0FBaEJNO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtBQWtCUjtBQWhCTTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQWtCUjtBQWpCUTtFQUNFLGtCQUFBO0VBQ0EsT0FBQTtBQW1CVjtBQWhCTTtFQUNJLFVBQUE7RUFDQSxhQUFBO0FBa0JWO0FBakJVO0VBQ0UsZUFBQTtFQUNBLFVBQUE7QUFtQlo7QUFqQlU7RUFDRSxhQUFBO0FBbUJaO0FBbEJZO0VBQ0kscUJBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBb0JoQjtBQW5CZ0I7RUFDRSxhQUFBO0FBcUJsQjtBQWxCWTtFQUNFLG1CQUFBO0FBb0JkO0FBbkJjO0VBQ0UsY0FBQTtBQXFCaEI7QUFqQlU7RUFDRSxPQUFBO0FBbUJaO0FBZEU7RUFBaUIsbUJBQUE7QUFpQm5CO0FBaEJFO0VBQWMsaUJBQUE7RUFBa0IsZ0JBQUE7QUFvQmxDO0FBbEJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFxQkY7QUFwQkU7RUFDRSw4QkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFzQko7QUFwQkU7RUFDRSxnQkFBQTtBQXNCSjtBQXBCRTtFQUNFLGlCQUFBO0FBc0JKIiwiZmlsZSI6IkpvYlBvc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuam9icG9zdF93cmFwIHtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgd2lkdGg6IDc4MHB4O1xyXG4gIHBhZGRpbmctbGVmdDogMTVweDtcclxuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gIG1hcmdpbi1yaWdodDogYXV0bztcclxuICBwYWRkaW5nLWJvdHRvbTogNTBweDtcclxuICAuam9icG9zdF9tYWluIHtcclxuICAgIGZvcm0ge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDo3NjdweCkge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIC5qb2Jwb3N0X2xlZnQge1xyXG4gICAgICAgICAgbWFyZ2luOiAwIDAgMjhweDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC5qb2Jwb3N0X2xlZnQge1xyXG4gICAgICBtaW4td2lkdGg6IDMyMHB4O1xyXG4gICAgICBtYXgtd2lkdGg6IDMyMHB4O1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6IDQ1cHg7XHJcbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOjc2N3B4KSB7XHJcbiAgICAgICAgbWluLXdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgICAgfVxyXG4gICAgICAuYWRkX3Bvc3Qge1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWxpZ2h0LWdyYXktY29sb3IpO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgICAgICAgaGVpZ2h0OiAzMTBweDtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplLXhsKTtcclxuICAgICAgICBjb2xvcjogIzgyOEU5QjtcclxuICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICBwYWRkaW5nOiAxM3B4O1xyXG4gICAgICAgIC5hcF9pbWdfd3JwIHtcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgcGFkZGluZzogNXB4IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICY6OmJlZm9yZSB7XHJcbiAgICAgICAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgICAgICAgbGVmdDogMTNweDtcclxuICAgICAgICAgIHJpZ2h0OiAxM3B4O1xyXG4gICAgICAgICAgdG9wOiAxM3B4O1xyXG4gICAgICAgICAgYm90dG9tOiAxM3B4O1xyXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgYm9yZGVyOiAycHggZGFzaGVkICM4MjhFOUI7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGkuZmFzLmZhLXBsdXMge1xyXG4gICAgICAgICAgYm9yZGVyOiAycHggc29saWQgIzgyOEU5QjtcclxuICAgICAgICAgIHdpZHRoOiA0OHB4O1xyXG4gICAgICAgICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgIG1hcmdpbjogMCBhdXRvIDEwcHg7XHJcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGltZyB7XHJcbiAgICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICBtYXgtaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dCNyZWFsLWZpbGUge29wYWNpdHk6IDA7d2lkdGg6IDA7fVxyXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOjc2N3B4KSB7XHJcbiAgICAgICAgICBoZWlnaHQ6IDIxMHB4O1xyXG4gICAgICAgICAgcGFkZGluZzogMThweDtcclxuICAgICAgICAgICY6OmJlZm9yZSB7XHJcbiAgICAgICAgICAgIGxlZnQ6IDE4cHg7XHJcbiAgICAgICAgICAgIHJpZ2h0OiAxOHB4O1xyXG4gICAgICAgICAgICB0b3A6IDE4cHg7XHJcbiAgICAgICAgICAgIGJvdHRvbTogMThweDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC5qb2Jwb3N0X3JpZ2h0IHtcclxuICAgICAgZmxleDogMTtcclxuICAgICAgbGFiZWwuZm9ybS1sYWJlbCB7XHJcbiAgICAgICAgICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS14bCk7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgICAgcGFkZGluZzogMCAxMHB4O1xyXG4gICAgICB9XHJcbiAgICAgIC5mb3JtLXRleHQge2ZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplLXNtKTtwYWRkaW5nLWxlZnQ6IDEwcHg7fVxyXG4gICAgICB0ZXh0YXJlYS5mb3JtLWNvbnRyb2wsXHJcbiAgICAgIC5mb3JtLWNvbnRyb2wudGFnaW5wdXQsXHJcbiAgICAgIC5sb2NhdGlvbl9zZWMge1xyXG4gICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tbGlnaHQtZ3JheS1jb2xvcik7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gICAgICAgICAgaGVpZ2h0OiAxNDVweDtcclxuICAgICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogdmFyKC0tYm9keS1mb250LXNpemUpO1xyXG4gICAgICAgICAgcGFkZGluZzogMTVweDtcclxuICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOjc2N3B4KSB7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTIwcHg7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLmZvcm0tY29udHJvbC50YWdpbnB1dCB7XHJcbiAgICAgICAgaGVpZ2h0OiA3MnB4O1xyXG4gICAgICB9XHJcbiAgICAgIC5sb2NhdGlvbl9zZWMge1xyXG4gICAgICAgIGhlaWdodDogYXV0bztcclxuICAgICAgICBtaW4taGVpZ2h0OiA3MnB4O1xyXG4gICAgICB9XHJcbiAgICAgIC5hZGRfdGFnIHtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIH1cclxuICAgICAgLmFkZF90YWcgLmJ0bi1ob296T24tMiB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHJpZ2h0OiAxMHB4O1xyXG4gICAgICAgIHRvcDogMTJweDtcclxuICAgICAgfVxyXG4gICAgICAubG9jYXRpb25fc2VjIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgc3BhbiB7XHJcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgICAgICAgICBmbGV4OiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAuZm9ybS1jaGVjayB7XHJcbiAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgIGxhYmVsLmZvcm0tbGFiZWwge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpbnB1dC5mb3JtLWNoZWNrLWlucHV0W3R5cGU9XCJjaGVja2JveFwiXSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICAgICAgICAgICYrIC5jaGVjayB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4cHg7XHJcbiAgICAgICAgICAgICAgICBtaW4td2lkdGg6IDQ4cHg7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDQ4cHg7XHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IDRweCBzb2xpZCAjMDAwMDAwO1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAyNXB4O1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgICAgICAgICAgaS5mYS5mYS1jaGVjayB7XHJcbiAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJjpjaGVja2VkICsgLmNoZWNrIHtcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMDAwMDAwO1xyXG4gICAgICAgICAgICAgIGkuZmEuZmEtY2hlY2sge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAmPiBkaXYge1xyXG4gICAgICAgICAgICBmbGV4OiAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5tYi0yMC5sb2NhdGlvbiB7bWFyZ2luLWJvdHRvbTogMzhweDt9XHJcbiAgLnBvc3RfYnV0dG9uIHt0ZXh0LWFsaWduOiByaWdodDttYXJnaW4tdG9wOiAxNXB4O31cclxufVxyXG4uam9icG9zdF90b3Age1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAzNXB4O1xyXG4gIHAge1xyXG4gICAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtc20pO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDJweDtcclxuICB9XHJcbiAgaDIge1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICB9XHJcbiAgLmpfcmlnaHQge1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgfVxyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 1750:
/*!**********************************************************!*\
  !*** ./src/app/Job/JobResponce/JobResponce.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JobResponceComponent": () => (/* binding */ JobResponceComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_JobPost_JobResponces_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/JobPost/JobResponces.service */ 9712);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/SharedServices/Shared.service */ 4937);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4666);





const _c0 = function () { return ["/jobchatbox"]; };
const _c1 = function (a0, a1, a2) { return { jobId: a0, senderId: a1, recipientId: a2 }; };
function JobResponceComponent_div_0_ul_1_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 7)(3, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "i", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](4, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction3"](5, _c1, ctx_r4.jobId, item_r3.RecipientId, item_r3.SenderId));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("src", item_r3.Sender.ImageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r3.Sender.Name);
} }
function JobResponceComponent_div_0_ul_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ul", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, JobResponceComponent_div_0_ul_1_li_1_Template, 6, 9, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", item_r3.Sender.Id !== ctx_r2.userId);
} }
function JobResponceComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, JobResponceComponent_div_0_ul_1_Template, 2, 1, "ul", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r0.userlist);
} }
function JobResponceComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 10)(1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "No response received yet");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} }
class JobResponceComponent {
    constructor(_jobresponceServices, activatedRoute, _sharedServices, _navigaterouter) {
        this._jobresponceServices = _jobresponceServices;
        this.activatedRoute = activatedRoute;
        this._sharedServices = _sharedServices;
        this._navigaterouter = _navigaterouter;
        this._sharedServices.checkInterNetConnection();
        let user = JSON.parse(localStorage.getItem('user'));
        this.userId = user.Id;
        this.activatedRoute.queryParams.subscribe(params => {
            this.jobId = params['target'];
        });
    }
    ngOnInit() {
        this.LoadUserChatList();
    }
    LoadUserChatList() {
        this._jobresponceServices.GetJobResponces(this.jobId, this.userId).subscribe((data) => {
            this.userlist = data;
            console.log(this.userlist);
        });
    }
    RedirectToUser(userId) {
        this._navigaterouter.navigate(['/profile'], { queryParams: { target: userId } });
    }
}
JobResponceComponent.ɵfac = function JobResponceComponent_Factory(t) { return new (t || JobResponceComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_JobPost_JobResponces_service__WEBPACK_IMPORTED_MODULE_0__.JobResponcesService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_1__.SharedService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router)); };
JobResponceComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: JobResponceComponent, selectors: [["app-JobResponce"]], decls: 2, vars: 2, consts: [[4, "ngIf"], ["class", "col-md-12 d-flex justify-content-center", 4, "ngIf"], ["class", "list-unstyled chat-list", 4, "ngFor", "ngForOf"], [1, "list-unstyled", "chat-list"], ["class", "clearfix", 3, "routerLink", "queryParams", 4, "ngIf"], [1, "clearfix", 3, "routerLink", "queryParams"], ["alt", "avatar", 3, "src"], [1, "about"], [1, "name"], [1, "fa", "fa-angle-right"], [1, "col-md-12", "d-flex", "justify-content-center"], [1, "Search-result"]], template: function JobResponceComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, JobResponceComponent_div_0_Template, 2, 1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, JobResponceComponent_div_1_Template, 3, 0, "div", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.userlist.length >= 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.userlist.length == 0);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink], styles: [".people-list[_ngcontent-%COMP%] {\n  max-width: 100%;\n  width: 630px;\n  padding-left: 15px;\n  padding-right: 15px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 10px;\n  align-items: center;\n  padding: 12px 16px;\n  border-radius: 12px;\n  cursor: pointer;\n}\n.fa-angle-right[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-left: auto;\n  margin-right: 20px;\n  display: none;\n}\n.chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   .fa-angle-right[_ngcontent-%COMP%] {\n  display:block;\n}\n.chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  background: var(--light-gray-color);\n}\n.chat-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  margin-right: 17px;\n}\n.about[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  margin-bottom: 5px;\n}\n.about[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.about[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%]   i.fa[_ngcontent-%COMP%] {\n  margin-right: 4px;\n  font-size: 12px;\n}\n.online[_ngcontent-%COMP%] {\n  color: #86c541;\n}\n.offline[_ngcontent-%COMP%] {\n  color: #e47297;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNoYXRzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFlO0VBQ2YsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixhQUFhO0FBQ2Y7QUFDQTtFQUNFLGFBQWE7QUFDZjtBQUNBO0VBQ0UsbUNBQW1DO0FBQ3JDO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGVBQWU7QUFDakI7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQixlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxjQUFjO0FBQ2hCIiwiZmlsZSI6IkNoYXRzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGVvcGxlLWxpc3Qge1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHdpZHRoOiA2MzBweDtcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xufVxuLmNoYXQtbGlzdCBsaSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmZhLWFuZ2xlLXJpZ2h0IHtcbiAgZm9udC1zaXplOiAzMnB4O1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICBkaXNwbGF5OiBub25lO1xufVxuLmNoYXQtbGlzdCBsaTpob3ZlciAuZmEtYW5nbGUtcmlnaHQge1xuICBkaXNwbGF5OmJsb2NrO1xufVxuLmNoYXQtbGlzdCBsaTpob3ZlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWxpZ2h0LWdyYXktY29sb3IpO1xufVxuLmNoYXQtbGlzdCBsaSBpbWcge1xuICB3aWR0aDogNDhweDtcbiAgaGVpZ2h0OiA0OHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIG1hcmdpbi1yaWdodDogMTdweDtcbn1cbi5hYm91dCAubmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbn1cbi5hYm91dCAuc3RhdHVzIHtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuLmFib3V0IC5zdGF0dXMgaS5mYSB7XG4gIG1hcmdpbi1yaWdodDogNHB4O1xuICBmb250LXNpemU6IDEycHg7XG59XG4ub25saW5lIHtcbiAgY29sb3I6ICM4NmM1NDE7XG59XG4ub2ZmbGluZSB7XG4gIGNvbG9yOiAjZTQ3Mjk3O1xufVxuIl19 */"] });


/***/ }),

/***/ 9042:
/*!***********************************************!*\
  !*** ./src/app/Model/Message/RealChatDtos.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RealChatDtos": () => (/* binding */ RealChatDtos)
/* harmony export */ });
class RealChatDtos {
}


/***/ }),

/***/ 8361:
/*!*************************************!*\
  !*** ./src/app/Model/Pagination.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaginatedResult": () => (/* binding */ PaginatedResult)
/* harmony export */ });
class PaginatedResult {
}


/***/ }),

/***/ 4026:
/*!*******************************************************!*\
  !*** ./src/app/Profile/EditProfile/Edit.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditComponent": () => (/* binding */ EditComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert2 */ 598);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_Auth_Profile_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/Auth/Profile.service */ 2521);
/* harmony import */ var _services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/SharedServices/Shared.service */ 4937);
/* harmony import */ var _services_Tags_Tag_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/Tags/Tag.service */ 4698);
/* harmony import */ var _ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngneat/hot-toast */ 7403);
/* harmony import */ var _Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Shared/services/NavbarCommunication.service */ 4920);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 4666);











function EditComponent_span_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "span", 45);
} }
function EditComponent_small_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "small", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Name is requires.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function EditComponent_small_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "small", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Name length should be less than 20.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function EditComponent_small_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "small", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "UserName is requires.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function EditComponent_div_47_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "i", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function EditComponent_div_47_Template_i_click_2_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r12); const item_r10 = restoredCtx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r11.RemoveTagging(item_r10.TagName)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", item_r10.TagName, " ");
} }
function EditComponent_span_65_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "span", 49);
} }
function EditComponent_span_66_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Saving...");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function EditComponent_span_67_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Save ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
class EditComponent {
    constructor(_profileServices, _sharedServices, _tagService, fb, toast, navServices, _router, _location) {
        this._profileServices = _profileServices;
        this._sharedServices = _sharedServices;
        this._tagService = _tagService;
        this.fb = fb;
        this.toast = toast;
        this.navServices = navServices;
        this._router = _router;
        this._location = _location;
        this.Tags = [];
        this.imagePath = '';
        this.showAlert = false;
        this.profileImgUploading = false;
        this.coverImgUploading = false;
        this._sharedServices.checkInterNetConnection();
        let user = JSON.parse(localStorage.getItem('user'));
        this.userId = user.Id;
    }
    ngOnInit() {
        this.createUserForm();
        this.loadUserDetais(this.userId);
    }
    showToast() {
        this.toast.success('Profile Updated Successfully', {
            position: 'top-center',
        });
    }
    createUserForm() {
        this.userForm = this.fb.group({
            UserName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
            ImageUrl: [''],
            Email: [''],
            CoverImageUrl: [''],
            Name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.maxLength(25)]],
            MobileNumber: [''],
            WebSiteUrl: [''],
            Latitude: [''],
            Longitude: [''],
            UserAddress: [''],
            AboutUs: [''],
            tags: [],
            stringTags: ['']
        });
    }
    loadUserDetais(userId) {
        this._profileServices.GetUserProfile(userId).subscribe((data) => {
            this.authUser = data;
            this.userForm.controls['ImageUrl'].setValue(this.authUser.ImageUrl);
            this.userForm.controls['Email'].setValue(this.authUser.Email);
            this.userForm.controls['CoverImageUrl'].setValue(this.authUser.CoverImageUrl);
            this.userForm.controls['Name'].setValue(this.authUser.Name);
            this.userForm.controls['MobileNumber'].setValue(this.authUser.MobileNumber);
            this.userForm.controls['UserAddress'].setValue(this.authUser.UserAddress);
            this.userForm.controls['AboutUs'].setValue(this.authUser.AboutUs);
            this.userForm.controls['tags'].setValue(this.authUser.tags);
            this.userForm.controls['Latitude'].setValue(this.authUser.Latitude);
            this.userForm.controls['Longitude'].setValue(this.authUser.Longitude);
            this.userForm.controls['WebSiteUrl'].setValue(this.authUser.WebSiteUrl);
            this.userForm.controls['UserName'].setValue(this.authUser.UserName);
            this.ImageUrl = this.authUser.ImageUrl;
            this.CoverImageUrl = this.authUser.CoverImageUrl;
            this.Tags = this.authUser.tags;
            this.authUser = Object.assign({}, this.userForm.value);
        });
    }
    // File Upload Cover
    FileUploadCover(files) {
        if (files.length === 0)
            return;
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }
        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
            this.CoverImageUrl = this.imgURL;
            this.filetoPost = files;
            this.message = "";
        };
        let fileToUpload = files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        this._profileServices.AddAuthUserCoverImage(this.userId, formData).subscribe((data) => {
            console.log(data);
        });
    }
    //File Upload User
    FileUploadUser(files) {
        if (files.length === 0)
            return;
        this.profileImgUploading = true;
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }
        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
            this.ImageUrl = this.imgURL;
            this.filetoPost = files;
            this.message = "";
        };
        let fileToUpload = files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        this._profileServices.UpdateUserPhoto(this.userId, formData).subscribe((data) => {
            this.profileImgUploading = false;
        });
    }
    UpdateProfile() {
        this.btnLoader = true;
        this.authUser = this.userForm.value;
        this._profileServices.UpdateUser(this.userId, this.authUser).subscribe((data) => {
            this.btnLoader = false;
            this.showAlert = true;
            this.showToast();
            this._router.navigate(['/profile'], { queryParams: { target: this.userId } });
        });
    }
    AddTagging() {
        if (this.userForm.controls['stringTags'].value == '') {
            this.toast.warning('Tag is required!', {
                position: 'top-center',
            });
            return;
        }
        this.userTag = {
            TagName: this.userForm.controls['stringTags'].value,
            UserId: this.userId,
        };
        this.Tags.push(this.userTag);
        this.userForm.controls['tags'].setValue(this.Tags);
        this.Tagmessage = '';
        // Addv TAG TO TAG MASTER TABLE
        // Add Tag To TagMaster for Later show suggetions
        this.tagMaster = {
            Id: 0,
            TagName: this.userForm.controls['stringTags'].value.trim()
        };
        this._tagService.AddTag(this.tagMaster).subscribe((data) => {
            this.userForm.controls['stringTags'].setValue('');
        }, err => {
            console.log("Tag Adding to master Failed");
        });
    }
    RemoveTagging(item) {
        this.Tags = this.Tags.filter(function (obj) {
            return obj.TagName != item;
        });
        this.userForm.controls['tags'].setValue(this.Tags);
    }
    //Reset Profile
    Reset() {
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
            text: `Are you sure to reset`,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.userForm.reset();
            }
            else if (result.isDenied) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire('Reset Abort', '', 'info');
            }
        });
    }
    //Remove Profile Photo
    RemoveProfilePhotos() {
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
            text: `Are you sure to Delete you photo`,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this._profileServices.RemoveUserPhoto(this.userId).subscribe((data) => {
                    this.loadUserDetais(this.userId);
                });
            }
            else if (result.isDenied) {
            }
        });
    }
    //Back loacation History
    backClicked() {
        this._location.back();
    }
    hideEvent() {
        this.navServices.Toggle();
    }
}
EditComponent.ɵfac = function EditComponent_Factory(t) { return new (t || EditComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_Auth_Profile_service__WEBPACK_IMPORTED_MODULE_1__.ProfileService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_2__.SharedService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_Tags_Tag_service__WEBPACK_IMPORTED_MODULE_3__.TagService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_7__.HotToastService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_4__.NavbarCommunicationService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_9__.Location)); };
EditComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: EditComponent, selectors: [["app-Edit"]], decls: 68, vars: 16, consts: [[1, "main_cnt_wrap", 3, "click"], [1, "back_arrow"], ["aria-hidden", "true", 1, "back", "fa", "fa-2x", "fa-arrow-left", 3, "click"], [1, "edit_profile"], [1, "edit_profile_top"], [1, ""], [1, "outer-div"], [1, "inner-div"], [1, "front"], [1, "cover_pic"], [1, "front__bkg-photo", "overlay_bg"], ["type", "file", "size", "60", 3, "change"], ["file", ""], [1, "upload_cover"], [1, "fa-solid", "fa-upload"], [1, "front__face-photo", "overlay_bg", "overlay_radius"], ["class", "spinner-border text-dark mt-5", "role", "status", 4, "ngIf"], ["file1", ""], ["type", "button", 1, "btn", "btn-default", "btn-circle"], [1, "fa", "fa-2x", "fa-camera", 3, "click"], ["id", "postForm", 3, "formGroup", "keydown.enter", "ngSubmit"], [1, "row", "mb-4"], [1, "col-lg-6"], ["for", "exampleInputEmail1", 1, "form-label"], ["autocomplete", "off", "type", "text", "formControlName", "Name", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control", "one"], ["class", "text text-center", "id", "emailHelp", "class", "form-text text text-danger", 4, "ngIf"], ["for", "exampleInputEmail1", 1, "form-label", "form-label1"], ["autocomplete", "off", "type", "text", "formControlName", "UserName", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control", "one"], ["id", "emailHelp", "class", "form-text text text-danger", 4, "ngIf"], [1, "row", "mb-0"], [1, "col-md-12"], [1, "buttonInside"], ["autocomplete", "off", "type", "text", "formControlName", "stringTags", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control", "taginput", 3, "keyup.enter"], ["type", "button", "id", "showPassword", 1, "tagbutton", "btn-hoozOn-2", 3, "click"], [1, "badgeTagWrap"], ["class", "badgeTag", 4, "ngFor", "ngForOf"], ["autocomplete", "off", "placeholder", "Short bio", "type", "text", "formControlName", "AboutUs", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control", "about", 2, "height", "80px"], ["placeholder", "Link", "autocomplete", "off", "type", "text", "formControlName", "WebSiteUrl", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control", "about"], ["id", "footer", 1, "d-flex", "fixed-bottom"], [1, "container", "d-flex", "align-items-center", "justify-content-center", "text-center"], ["role", "button", 1, "btn", "btn-lg", "btn-reset", 3, "click"], ["type", "submit", "form", "postForm", 1, "btn-hoozOn-2", 3, "disabled"], ["class", "spinner-border spinner-border-sm", "role", "status", 4, "ngIf"], ["class", "load-text", 4, "ngIf"], ["class", "btn-text", 4, "ngIf"], ["role", "status", 1, "spinner-border", "text-dark", "mt-5"], ["id", "emailHelp", 1, "form-text", "text", "text-danger"], [1, "badgeTag"], ["aria-hidden", "true", 1, "fa", "fa-times", 3, "click"], ["role", "status", 1, "spinner-border", "spinner-border-sm"], [1, "load-text"], [1, "btn-text"]], template: function EditComponent_Template(rf, ctx) { if (rf & 1) {
        const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function EditComponent_Template_div_click_0_listener() { return ctx.hideEvent(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1)(2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function EditComponent_Template_i_click_2_listener() { return ctx.backClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "div", 7)(8, "div", 8)(9, "label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "input", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function EditComponent_Template_input_change_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](12); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx.FileUploadCover(_r0.files)); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](14, "i", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "label")(16, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, EditComponent_span_17_Template, 1, 0, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "input", 11, 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function EditComponent_Template_input_change_18_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](19); return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx.FileUploadUser(_r2.files)); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "a", 18)(21, "i", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function EditComponent_Template_i_click_21_listener() { return ctx.RemoveProfilePhotos(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "form", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("keydown.enter", function EditComponent_Template_form_keydown_enter_22_listener($event) { return $event.preventDefault(); })("ngSubmit", function EditComponent_Template_form_ngSubmit_22_listener() { return ctx.UpdateProfile(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "div", 21)(24, "div", 22)(25, "div", 5)(26, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](27, "Name \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](28, "input", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](29, EditComponent_small_29_Template, 2, 0, "small", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](30, EditComponent_small_30_Template, 2, 0, "small", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "div", 22)(32, "div", 5)(33, "label", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](34, "UserName \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](35, "input", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](36, EditComponent_small_36_Template, 2, 0, "small", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "div", 29)(38, "div", 30)(39, "div", 5)(40, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](41, "Tags \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](42, "div", 31)(43, "input", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("keyup.enter", function EditComponent_Template_input_keyup_enter_43_listener() { return ctx.AddTagging(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](44, "button", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function EditComponent_Template_button_click_44_listener() { return ctx.AddTagging(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](45, "Add");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](46, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](47, EditComponent_div_47_Template, 3, 1, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](48, "div", 21)(49, "div", 30)(50, "div", 5)(51, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](52, "About Me \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](53, "textarea", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](54, "div", 21)(55, "div", 30)(56, "div", 5)(57, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](58, "Links \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](59, "input", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](60, "footer", 38)(61, "div", 39)(62, "button", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function EditComponent_Template_button_click_62_listener() { return ctx.Reset(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](63, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](64, "button", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](65, EditComponent_span_65_Template, 1, 0, "span", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](66, EditComponent_span_66_Template, 2, 0, "span", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](67, EditComponent_span_67_Template, 2, 0, "span", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleMapInterpolate1"]("background-image: url(", ctx.CoverImageUrl, ");");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleMapInterpolate1"]("background-image: url(", ctx.ImageUrl, ");");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.profileImgUploading);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", ctx.userForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.userForm.get("Name").hasError("required") && ctx.userForm.get("Name").touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.userForm.get("Name").hasError("maxlength") && ctx.userForm.get("Name").touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.userForm.get("UserName").hasError("required") && ctx.userForm.get("UserName").touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.Tags);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx.userForm.valid || ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.btnLoader);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.btnLoader);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlName], styles: [".edit_profile[_ngcontent-%COMP%] {\r\n  max-width: 100%;\r\n  width: 630px;\r\n  padding-left: 15px;\r\n  padding-right: 15px;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  padding-bottom: 80px;\r\n}\r\n.edit_profile_top[_ngcontent-%COMP%] {\r\n  margin-bottom: 25px;\r\n}\r\n.btn-circle[_ngcontent-%COMP%] {\r\n  width: 45px;\r\n  height: 45px;\r\n  padding: 0px;\r\n  border-radius: 70px;\r\n  text-align: center;\r\n  font-size: 12px;\r\n  line-height: 1.42857;\r\n  position: absolute;\r\n  margin-left: -38px;\r\n  background-color: #fff;\r\n  z-index: 999;\r\n  margin-top: -61px;\r\n  display: inline-flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\nlabel.form-label[_ngcontent-%COMP%] {font-weight: 600;margin-bottom: 12px;}\r\n.about[_ngcontent-%COMP%] {\r\n  height: 48px;\r\n  width: 100%;\r\n  background-color: #f7f7f9;\r\n  font-weight: 300;\r\n  color: black;\r\n  border-width: 0;\r\n  border-radius: 0.5rem;\r\n}\r\n.one[_ngcontent-%COMP%] {\r\n  height: 48px;\r\n  width: 100%;\r\n  background-color: #f7f7f9;\r\n  font-weight: 300;\r\n  color: black;\r\n  border-width: 0;\r\n  border-radius: 0.5rem;\r\n}\r\n.buttonInside[_ngcontent-%COMP%]{\r\n  position:relative;\r\n  margin-bottom:10px;\r\n}\r\n.taginput[_ngcontent-%COMP%] {\r\n  height: 85px;\r\n  width: 100%;\r\n  background-color: #f7f7f9;\r\n  font-weight: 300;\r\n  color: black;\r\n  border-width: 0;\r\n  padding-left:10px;\r\n  border-radius: 0.5rem;\r\n  border:none;\r\n  outline:none;\r\n}\r\n.tagbutton[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 25px;\r\n  top: 20px;\r\n}\r\n.btn-ChatHooz[_ngcontent-%COMP%] {\r\n  background-color: #00fa9a;\r\n  color: black;\r\n  border-radius: 0.5rem;\r\n  width: 4.6rem;\r\n  font-weight: bold;\r\n  margin-top: -80px;\r\n  margin-left: -178px;\r\n}\r\n.btn-EditHooz[_ngcontent-%COMP%] {\r\n  background-color: black;\r\n  color: white;\r\n  border-radius: 0.5rem;\r\n  width: 4.6rem;\r\n  font-weight: bold;\r\n  margin-top: -80px;\r\n  margin-left: -178px;\r\n}\r\n.outer-div[_ngcontent-%COMP%] {\r\n  perspective: 900px;\r\n  perspective-origin: 50% calc(50% - 18em);\r\n}\r\n.inner-div[_ngcontent-%COMP%] {\r\n  margin: 0 auto;\r\n  border-radius: 5px;\r\n  font-weight: 400;\r\n  color: black;\r\n  font-size: 1rem;\r\n  text-align: center;\r\n  transition: all 0.6s cubic-bezier(0.8, -0.4, 0.2, 1.7);\r\n  transform-style: preserve-3d;\r\n  position: relative;\r\n}\r\n.front__bkg-photo[_ngcontent-%COMP%] {\r\n  height: 192px;\r\n  background:no-repeat;\r\n  background-size: cover;\r\n  border-radius: 12px;\r\n  background-position: center;\r\n  cursor: pointer;\r\n}\r\n.front__face-photo[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  height: 134px;\r\n  width: 134px;\r\n  margin: 0 auto;\r\n  margin-top: -67px;\r\n  border-radius: 50%;\r\n  background: no-repeat;\r\n  background-size: cover;\r\n  background-position: center;\r\n  z-index: 1;\r\n  cursor: pointer;\r\n}\r\ninput[type=\"file\"][_ngcontent-%COMP%] {\r\n  display: none;\r\n}\r\n.bg-badge[_ngcontent-%COMP%] {\r\n  background-color: #b4b4b4;\r\n}\r\n#footer[_ngcontent-%COMP%] {\r\n    background:#c7cfd8;\r\n    color: #fff;\r\n    height: 74px;\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n    z-index: 1;\r\n    transition: all .5s;\r\n}\r\n.btn-save[_ngcontent-%COMP%] {\r\n  border: none;\r\n  background-color: var(--btn-color);\r\n  color: white;\r\n  border-radius: 12px;\r\n  outline: none;\r\n  text-align: center;\r\n  font-weight: bold;\r\n  height: 48px;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n.spinner-border-sm[_ngcontent-%COMP%] {\r\n  margin-right: 6px;\r\n}\r\n.btn-reset[_ngcontent-%COMP%] {\r\n  border:none;\r\n  background-color: white;\r\n  color: black;\r\n  border-radius:12px;\r\n  outline:none;\r\n  text-align:center;\r\n  font-weight:bold;\r\n  width: 85px;\r\n  height: 48px;\r\n  margin-right: 20px;\r\n}\r\nlabel.cover_pic[_ngcontent-%COMP%] {\r\n  display: block;\r\n}\r\nspan.upload_cover[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 20px;\r\n  right: 20px;\r\n  background-color: #fff;\r\n  width: 45px;\r\n  height: 45px;\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 20px;\r\n}\r\n@media (max-width:767px) {\r\n  .col-lg-6[_ngcontent-%COMP%]:first-child {\r\n    margin-bottom: 25px;\r\n  }\r\n  .edit_profile[_ngcontent-%COMP%] {\r\n    padding-bottom: 20px;\r\n  }\r\n  footer#footer[_ngcontent-%COMP%] {\r\n      position: static;\r\n      margin-bottom: 20px;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVkaXQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQWU7RUFDZixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0UsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjtBQUNBLGtCQUFrQixnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztBQUN2RDtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osZUFBZTtFQUNmLHFCQUFxQjtBQUN2QjtBQUNBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCx5QkFBeUI7RUFDekIsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixlQUFlO0VBQ2YscUJBQXFCO0FBQ3ZCO0FBQ0E7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLHlCQUF5QjtFQUN6QixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLGVBQWU7RUFDZixpQkFBaUI7RUFDakIscUJBQXFCO0VBQ3JCLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsU0FBUztBQUNYO0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsWUFBWTtFQUNaLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7QUFDQTtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLHdDQUF3QztBQUMxQztBQUNBO0VBQ0UsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsc0RBQXNEO0VBQ3RELDRCQUE0QjtFQUM1QixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGFBQWE7RUFDYixvQkFBb0I7RUFDcEIsc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQiwyQkFBMkI7RUFDM0IsZUFBZTtBQUNqQjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixZQUFZO0VBQ1osY0FBYztFQUNkLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLHNCQUFzQjtFQUN0QiwyQkFBMkI7RUFDM0IsVUFBVTtFQUNWLGVBQWU7QUFDakI7QUFDQTtFQUNFLGFBQWE7QUFDZjtBQUNBO0VBQ0UseUJBQXlCO0FBQzNCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFlBQVk7SUFDWixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLFVBQVU7SUFDVixtQkFBbUI7QUFDdkI7QUFDQTtFQUNFLFlBQVk7RUFDWixrQ0FBa0M7RUFDbEMsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGNBQWM7QUFDaEI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsV0FBVztFQUNYLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixlQUFlO0FBQ2pCO0FBQ0E7RUFDRTtJQUNFLG1CQUFtQjtFQUNyQjtFQUNBO0lBQ0Usb0JBQW9CO0VBQ3RCO0VBQ0E7TUFDSSxnQkFBZ0I7TUFDaEIsbUJBQW1CO0VBQ3ZCO0FBQ0YiLCJmaWxlIjoiRWRpdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVkaXRfcHJvZmlsZSB7XHJcbiAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gIHdpZHRoOiA2MzBweDtcclxuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbiAgcGFkZGluZy1yaWdodDogMTVweDtcclxuICBtYXJnaW4tbGVmdDogYXV0bztcclxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbiAgcGFkZGluZy1ib3R0b206IDgwcHg7XHJcbn1cclxuLmVkaXRfcHJvZmlsZV90b3Age1xyXG4gIG1hcmdpbi1ib3R0b206IDI1cHg7XHJcbn1cclxuLmJ0bi1jaXJjbGUge1xyXG4gIHdpZHRoOiA0NXB4O1xyXG4gIGhlaWdodDogNDVweDtcclxuICBwYWRkaW5nOiAwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNzBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjQyODU3O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBtYXJnaW4tbGVmdDogLTM4cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICB6LWluZGV4OiA5OTk7XHJcbiAgbWFyZ2luLXRvcDogLTYxcHg7XHJcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5sYWJlbC5mb3JtLWxhYmVsIHtmb250LXdlaWdodDogNjAwO21hcmdpbi1ib3R0b206IDEycHg7fVxyXG4uYWJvdXQge1xyXG4gIGhlaWdodDogNDhweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y5O1xyXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG4gIGJvcmRlci13aWR0aDogMDtcclxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XHJcbn1cclxuLm9uZSB7XHJcbiAgaGVpZ2h0OiA0OHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjk7XHJcbiAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICBjb2xvcjogYmxhY2s7XHJcbiAgYm9yZGVyLXdpZHRoOiAwO1xyXG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcclxufVxyXG4uYnV0dG9uSW5zaWRle1xyXG4gIHBvc2l0aW9uOnJlbGF0aXZlO1xyXG4gIG1hcmdpbi1ib3R0b206MTBweDtcclxufVxyXG4udGFnaW5wdXQge1xyXG4gIGhlaWdodDogODVweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y5O1xyXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG4gIGJvcmRlci13aWR0aDogMDtcclxuICBwYWRkaW5nLWxlZnQ6MTBweDtcclxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XHJcbiAgYm9yZGVyOm5vbmU7XHJcbiAgb3V0bGluZTpub25lO1xyXG59XHJcbi50YWdidXR0b24ge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICByaWdodDogMjVweDtcclxuICB0b3A6IDIwcHg7XHJcbn1cclxuLmJ0bi1DaGF0SG9veiB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwZmE5YTtcclxuICBjb2xvcjogYmxhY2s7XHJcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xyXG4gIHdpZHRoOiA0LjZyZW07XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbWFyZ2luLXRvcDogLTgwcHg7XHJcbiAgbWFyZ2luLWxlZnQ6IC0xNzhweDtcclxufVxyXG4uYnRuLUVkaXRIb296IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xyXG4gIHdpZHRoOiA0LjZyZW07XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbWFyZ2luLXRvcDogLTgwcHg7XHJcbiAgbWFyZ2luLWxlZnQ6IC0xNzhweDtcclxufVxyXG4ub3V0ZXItZGl2IHtcclxuICBwZXJzcGVjdGl2ZTogOTAwcHg7XHJcbiAgcGVyc3BlY3RpdmUtb3JpZ2luOiA1MCUgY2FsYyg1MCUgLSAxOGVtKTtcclxufVxyXG4uaW5uZXItZGl2IHtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICBjb2xvcjogYmxhY2s7XHJcbiAgZm9udC1zaXplOiAxcmVtO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB0cmFuc2l0aW9uOiBhbGwgMC42cyBjdWJpYy1iZXppZXIoMC44LCAtMC40LCAwLjIsIDEuNyk7XHJcbiAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLmZyb250X19ia2ctcGhvdG8ge1xyXG4gIGhlaWdodDogMTkycHg7XHJcbiAgYmFja2dyb3VuZDpuby1yZXBlYXQ7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLmZyb250X19mYWNlLXBob3RvIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgaGVpZ2h0OiAxMzRweDtcclxuICB3aWR0aDogMTM0cHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgbWFyZ2luLXRvcDogLTY3cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGJhY2tncm91bmQ6IG5vLXJlcGVhdDtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICB6LWluZGV4OiAxO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5pbnB1dFt0eXBlPVwiZmlsZVwiXSB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG4uYmctYmFkZ2Uge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNiNGI0YjQ7XHJcbn1cclxuI2Zvb3RlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiNjN2NmZDg7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGhlaWdodDogNzRweDtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIC41cztcclxufVxyXG4uYnRuLXNhdmUge1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1idG4tY29sb3IpO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGhlaWdodDogNDhweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuLnNwaW5uZXItYm9yZGVyLXNtIHtcclxuICBtYXJnaW4tcmlnaHQ6IDZweDtcclxufVxyXG4uYnRuLXJlc2V0IHtcclxuICBib3JkZXI6bm9uZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICBjb2xvcjogYmxhY2s7XHJcbiAgYm9yZGVyLXJhZGl1czoxMnB4O1xyXG4gIG91dGxpbmU6bm9uZTtcclxuICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICBmb250LXdlaWdodDpib2xkO1xyXG4gIHdpZHRoOiA4NXB4O1xyXG4gIGhlaWdodDogNDhweDtcclxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbn1cclxubGFiZWwuY292ZXJfcGljIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5zcGFuLnVwbG9hZF9jb3ZlciB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMjBweDtcclxuICByaWdodDogMjBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIHdpZHRoOiA0NXB4O1xyXG4gIGhlaWdodDogNDVweDtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG5AbWVkaWEgKG1heC13aWR0aDo3NjdweCkge1xyXG4gIC5jb2wtbGctNjpmaXJzdC1jaGlsZCB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyNXB4O1xyXG4gIH1cclxuICAuZWRpdF9wcm9maWxlIHtcclxuICAgIHBhZGRpbmctYm90dG9tOiAyMHB4O1xyXG4gIH1cclxuICBmb290ZXIjZm9vdGVyIHtcclxuICAgICAgcG9zaXRpb246IHN0YXRpYztcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICB9XHJcbn0iXX0= */"] });


/***/ }),

/***/ 3664:
/*!**************************************************************!*\
  !*** ./src/app/Profile/UserProfile/UserProfile.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserProfileComponent": () => (/* binding */ UserProfileComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_Auth_Profile_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/Auth/Profile.service */ 2521);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Shared/services/NavbarCommunication.service */ 4920);
/* harmony import */ var _services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/SharedServices/Shared.service */ 4937);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 124);






const _c0 = function () { return ["/chatbox"]; };
const _c1 = function (a0) { return { uid: a0 }; };
function UserProfileComponent_button_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Chat");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](2, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](3, _c1, ctx_r0.user.Id));
} }
const _c2 = function () { return ["/editProfile"]; };
function UserProfileComponent_button_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](1, _c2));
} }
function UserProfileComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", item_r3.TagName, " ");
} }
class UserProfileComponent {
    constructor(_userServices, _location, navServices, _sharedServices, activatedRoute, _router) {
        this._userServices = _userServices;
        this._location = _location;
        this.navServices = navServices;
        this._sharedServices = _sharedServices;
        this.activatedRoute = activatedRoute;
        this._router = _router;
        this._sharedServices.checkInterNetConnection();
        this.activatedRoute.queryParams.subscribe(params => {
            this.userId = params['target'];
        });
        if (localStorage.getItem('user')) {
            this.loggeduser = JSON.parse(localStorage.getItem('user'));
            this.loggedUserId = this.loggeduser.Id;
        }
    }
    ngOnInit() {
        this.LoadUserData(this.userId);
    }
    LoadUserData(id) {
        this._userServices.GetUserProfile(id).subscribe((data) => {
            this.user = data;
        });
    }
    //Back loacation History
    backClicked() {
        this._location.back();
    }
    hideEvent() {
        this.navServices.Toggle();
    }
}
UserProfileComponent.ɵfac = function UserProfileComponent_Factory(t) { return new (t || UserProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_Auth_Profile_service__WEBPACK_IMPORTED_MODULE_0__.ProfileService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_4__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_1__.NavbarCommunicationService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_2__.SharedService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute)); };
UserProfileComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: UserProfileComponent, selectors: [["app-UserProfile"]], decls: 36, vars: 14, consts: [[1, "main_cnt_wrap", 3, "click"], [1, "back_arrow"], ["aria-hidden", "true", 1, "back", "fa", "fa-2x", "fa-arrow-left", 3, "click"], [1, "user_profile"], [1, ""], [1, "outer-div"], [1, "inner-div"], [1, "front"], [1, "front__bkg-photo", "overlay_bg"], [1, "front__face-photo", "overlay_bg", "overlay_radius"], [1, "user_name_wrap"], [1, "user_name"], [1, "chat_sec"], ["type", "button", "class", "btn", 3, "routerLink", "queryParams", 4, "ngIf"], [1, "edit_sec"], ["type", "button", "routerLinkActive", "router-link-active", "class", "btn-hoozOn-2", 3, "routerLink", 4, "ngIf"], [1, "badgeTagWrap"], [1, "title"], ["class", "badgeTag", 4, "ngFor", "ngForOf"], [1, "about_sec"], [1, "links_url"], [1, "lnk"], ["target", "_blank", 3, "href"], ["type", "button", 1, "btn", 3, "routerLink", "queryParams"], ["type", "button", "routerLinkActive", "router-link-active", 1, "btn-hoozOn-2", 3, "routerLink"], [1, "badgeTag"]], template: function UserProfileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function UserProfileComponent_Template_div_click_0_listener() { return ctx.hideEvent(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1)(2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function UserProfileComponent_Template_i_click_2_listener() { return ctx.backClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "div", 8)(9, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 10)(11, "div", 11)(12, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, UserProfileComponent_button_17_Template, 2, 5, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, UserProfileComponent_button_19_Template, 2, 2, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 16)(21, "h5", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22, "Tags");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](24, UserProfileComponent_div_24_Template, 2, 1, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "div", 19)(26, "h5", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27, "About me");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "div", 20)(31, "h5", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](32, "URL's");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "div", 21)(34, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleMapInterpolate1"]("background-image: url(", ctx.user == null ? null : ctx.user.CoverImageUrl, ");");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleMapInterpolate1"]("background-image: url(", ctx.user == null ? null : ctx.user.UserImage, ");");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.user == null ? null : ctx.user.Name);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.user == null ? null : ctx.user.UserAddress);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.userId != ctx.loggedUserId);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.userId == ctx.loggedUserId);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.user == null ? null : ctx.user.tags);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.user == null ? null : ctx.user.AboutUs, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("href", ctx.user == null ? null : ctx.user.WebSiteUrl, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.user == null ? null : ctx.user.WebSiteUrl);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLinkActive], styles: [".user_profile[_ngcontent-%COMP%] {\n  max-width: 100%;\n  width: 630px;\n  padding-left: 15px;\n  padding-right: 15px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.inner-div[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  border-radius: 5px;\n  font-weight: 400;\n  color: black;\n  font-size: 1rem;\n  text-align: center;\n  transition: all 0.6s cubic-bezier(0.8, -0.4, 0.2, 1.7);\n  transform-style: preserve-3d;\n}\n\n.front__bkg-photo[_ngcontent-%COMP%] {\n  height: 192px;\n  background: no-repeat;\n  background-size: cover;\n  border-radius: 12px;\n  background-position: center;\n}\n\n.front__face-photo[_ngcontent-%COMP%] {\n  position: relative;\n  height: 134px;\n  width: 134px;\n  margin: 0 auto;\n  margin-top: -67px;\n  border-radius: 50%;\n  background: no-repeat;\n  background-size: cover;\n  background-position: center;\n  z-index: 1;\n}\n\n.bg-badge[_ngcontent-%COMP%] {\n  background-color: #b4b4b4;\n  height: 1.8rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVzZXJQcm9maWxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUNBO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0Esc0RBQUE7RUFDQSw0QkFBQTtBQUVGOztBQUFBO0VBQ0UsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0FBR0Y7O0FBREE7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSxVQUFBO0FBSUY7O0FBRkM7RUFDQyx5QkFBQTtFQUNBLGNBQUE7QUFLRiIsImZpbGUiOiJVc2VyUHJvZmlsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi51c2VyX3Byb2ZpbGUge1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxuICB3aWR0aDogNjMwcHg7XHJcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XHJcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG59XHJcbi5pbm5lci1kaXYge1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIGNvbG9yOiBibGFjaztcclxuICBmb250LXNpemU6IDFyZW07XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjZzIGN1YmljLWJlemllcigwLjgsIC0wLjQsIDAuMiwgMS43KTtcclxuICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xyXG59XHJcbi5mcm9udF9fYmtnLXBob3RvIHtcclxuICBoZWlnaHQ6IDE5MnB4O1xyXG4gIGJhY2tncm91bmQ6bm8tcmVwZWF0O1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbn1cclxuLmZyb250X19mYWNlLXBob3RvIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgaGVpZ2h0OiAxMzRweDtcclxuICB3aWR0aDogMTM0cHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgbWFyZ2luLXRvcDogLTY3cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGJhY2tncm91bmQ6IG5vLXJlcGVhdDtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICB6LWluZGV4OiAxO1xyXG59XHJcbiAuYmctYmFkZ2Uge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNiNGI0YjQ7XHJcbiAgaGVpZ2h0OiAxLjhyZW07XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ 145:
/*!*********************************************************!*\
  !*** ./src/app/Settings/Download/Download.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DownloadComponent": () => (/* binding */ DownloadComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Shared/services/NavbarCommunication.service */ 4920);




class DownloadComponent {
    constructor(_location, titleService, metaService, navServices) {
        this._location = _location;
        this.titleService = titleService;
        this.metaService = metaService;
        this.navServices = navServices;
    }
    ngOnInit() {
        this.titleService.setTitle("Download List");
        this.metaService.updateTag({ property: 'og:title', content: 'Download new' });
    }
    //Back loacation History
    backClicked() {
        this._location.back();
    }
    hideEvent() {
        this.navServices.Toggle();
    }
}
DownloadComponent.ɵfac = function DownloadComponent_Factory(t) { return new (t || DownloadComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_2__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_0__.NavbarCommunicationService)); };
DownloadComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DownloadComponent, selectors: [["app-Download"]], decls: 19, vars: 0, consts: [[3, "click"], [1, "d-flex", "justify-content-start", "mt-4"], ["aria-hidden", "true", 1, "back", "fa", "fa-2x", "fa-arrow-left", 3, "click"], ["src", "../../../assets/Logo/DownloadBG.png", 1, "img-responsove", "img-fluid", "desktopImg", 2, "float", "right"], [1, "InDestop"], [1, "d-flex", "mt-5"], [1, "ContentSection", "mt-2"], [1, "mb-5"], [1, "mb-4", 2, "font-weight", "bold"], ["src", "../../../assets/Logo/googleplayDownload.png", 1, "mb-2"], ["src", "../../../assets/Logo/DownloadBG.png", 1, "img-responsove", "img-fluid", "mobileImg", "mt-4", 2, "float", "right"]], template: function DownloadComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DownloadComponent_Template_div_click_0_listener() { return ctx.hideEvent(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1)(2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DownloadComponent_Template_i_click_2_listener() { return ctx.backClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " Get complete feature rich");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "\nexperience on your phone ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "h2", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Download Hooz app");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "img", 9)(15, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Available on Google Play only");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    } }, styles: ["@media only screen and (max-width: 1600px) and (min-width: 960px) {\r\n    .back[_ngcontent-%COMP%]{\r\n        padding-left: 50px;\r\n        cursor: pointer;\r\n    } \r\n    .ContentSection[_ngcontent-%COMP%]{\r\n        margin-left: 303px; \r\n    }\r\n    \r\n  .ContentSection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n    font-size: xx-large;\r\n    font-weight: inherit;\r\n}\r\n.desktopImg[_ngcontent-%COMP%]{\r\n  display: block;\r\n  margin-top: 80px;\r\n}\r\n \r\n.mobileImg[_ngcontent-%COMP%]{\r\n  display: none;\r\n}\r\n  }\r\n  \r\n@media only screen and (max-width:640px) and (min-width:499px) { \r\n  .back[_ngcontent-%COMP%] {\r\n    padding-left: 6px;\r\n    cursor: pointer;\r\n  } \r\n  \r\n  .ContentSection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n    font-size: xx-large;\r\n    font-weight: inherit;\r\n} \r\n.desktopImg[_ngcontent-%COMP%]{\r\n  display: none;\r\n   \r\n}\r\n \r\n.mobileImg[_ngcontent-%COMP%]{\r\n  display: block;\r\n}\r\n}\r\n  \r\n@media only screen and (min-width:641px) and (max-width:961px) {\r\n    .ContentSection[_ngcontent-%COMP%]{\r\n        margin-left: 146px; \r\n    }  \r\n    .back[_ngcontent-%COMP%]{\r\n        padding-left: 50px;\r\n        cursor: pointer;\r\n    } \r\n    .desktopImg[_ngcontent-%COMP%]{\r\n      display: none;\r\n      \r\n    }\r\n     \r\n    .mobileImg[_ngcontent-%COMP%]{\r\n      display: block;\r\n    }\r\n  .ContentSection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n    font-size: xx-large;\r\n    font-weight: inherit;\r\n}\r\n  }\r\n  \r\n@media only screen and (max-width:500px)   {  \r\n    .ContentSection[_ngcontent-%COMP%]{\r\n        margin-left: 68px; \r\n    }  \r\n    .back[_ngcontent-%COMP%]{\r\n        padding-left: 32px;\r\n        cursor: pointer;\r\n    } \r\n    \r\n  .ContentSection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n    font-size: xx-large;\r\n    font-weight: inherit;\r\n}\r\n.desktopImg[_ngcontent-%COMP%]{\r\n  display: none;\r\n}\r\n.mobileImg[_ngcontent-%COMP%]{\r\n  display: block;\r\n}\r\n  }\r\n  \r\n@media only screen and (max-width:499px) and (min-width:100px){\r\n    .ContentSection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n        font-size: large;\r\n        font-weight: inherit;\r\n    }\r\n    .desktopImg[_ngcontent-%COMP%]{\r\n      display: none;\r\n    }\r\n    .mobileImg[_ngcontent-%COMP%]{\r\n      display: block;\r\n    }\r\n  }\r\n  \r\nbody[_ngcontent-%COMP%]{\r\n    height: 100%;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRvd25sb2FkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSTtRQUNJLGtCQUFrQjtRQUNsQixlQUFlO0lBQ25CO0lBQ0E7UUFDSSxrQkFBa0I7SUFDdEI7O0VBRUY7SUFDRSxtQkFBbUI7SUFDbkIsb0JBQW9CO0FBQ3hCO0FBQ0E7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtBQUNmO0VBQ0U7O0FBRUY7RUFDRTtJQUNFLGlCQUFpQjtJQUNqQixlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsbUJBQW1CO0lBQ25CLG9CQUFvQjtBQUN4QjtBQUNBO0VBQ0UsYUFBYTs7QUFFZjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7QUFDQTs7QUFFRTtJQUNFO1FBQ0ksa0JBQWtCO0lBQ3RCO0lBQ0E7UUFDSSxrQkFBa0I7UUFDbEIsZUFBZTtJQUNuQjtJQUNBO01BQ0UsYUFBYTs7SUFFZjs7SUFFQTtNQUNFLGNBQWM7SUFDaEI7RUFDRjtJQUNFLG1CQUFtQjtJQUNuQixvQkFBb0I7QUFDeEI7RUFDRTs7QUFFQTtJQUNFO1FBQ0ksaUJBQWlCO0lBQ3JCO0lBQ0E7UUFDSSxrQkFBa0I7UUFDbEIsZUFBZTtJQUNuQjs7RUFFRjtJQUNFLG1CQUFtQjtJQUNuQixvQkFBb0I7QUFDeEI7QUFDQTtFQUNFLGFBQWE7QUFDZjtBQUNBO0VBQ0UsY0FBYztBQUNoQjtFQUNFOztBQUNBO0lBQ0U7UUFDSSxnQkFBZ0I7UUFDaEIsb0JBQW9CO0lBQ3hCO0lBQ0E7TUFDRSxhQUFhO0lBQ2Y7SUFDQTtNQUNFLGNBQWM7SUFDaEI7RUFDRjs7QUFFQTtJQUNFLFlBQVk7RUFDZCIsImZpbGUiOiJEb3dubG9hZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxNjAwcHgpIGFuZCAobWluLXdpZHRoOiA5NjBweCkge1xyXG4gICAgLmJhY2t7XHJcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA1MHB4O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH0gXHJcbiAgICAuQ29udGVudFNlY3Rpb257XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDMwM3B4OyBcclxuICAgIH1cclxuICAgIFxyXG4gIC5Db250ZW50U2VjdGlvbiBwe1xyXG4gICAgZm9udC1zaXplOiB4eC1sYXJnZTtcclxuICAgIGZvbnQtd2VpZ2h0OiBpbmhlcml0O1xyXG59XHJcbi5kZXNrdG9wSW1ne1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1hcmdpbi10b3A6IDgwcHg7XHJcbn1cclxuIFxyXG4ubW9iaWxlSW1ne1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuICB9XHJcbiAgXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDo2NDBweCkgYW5kIChtaW4td2lkdGg6NDk5cHgpIHsgXHJcbiAgLmJhY2sge1xyXG4gICAgcGFkZGluZy1sZWZ0OiA2cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfSBcclxuICBcclxuICAuQ29udGVudFNlY3Rpb24gcHtcclxuICAgIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XHJcbiAgICBmb250LXdlaWdodDogaW5oZXJpdDtcclxufSBcclxuLmRlc2t0b3BJbWd7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuICAgXHJcbn1cclxuIFxyXG4ubW9iaWxlSW1ne1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcbn1cclxuICBcclxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6NjQxcHgpIGFuZCAobWF4LXdpZHRoOjk2MXB4KSB7XHJcbiAgICAuQ29udGVudFNlY3Rpb257XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDE0NnB4OyBcclxuICAgIH0gIFxyXG4gICAgLmJhY2t7XHJcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA1MHB4O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH0gXHJcbiAgICAuZGVza3RvcEltZ3tcclxuICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICAubW9iaWxlSW1ne1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICAuQ29udGVudFNlY3Rpb24gcHtcclxuICAgIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XHJcbiAgICBmb250LXdlaWdodDogaW5oZXJpdDtcclxufVxyXG4gIH1cclxuICBcclxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTAwcHgpICAgeyAgXHJcbiAgICAuQ29udGVudFNlY3Rpb257XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDY4cHg7IFxyXG4gICAgfSAgXHJcbiAgICAuYmFja3tcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDMycHg7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgfSBcclxuICAgIFxyXG4gIC5Db250ZW50U2VjdGlvbiBwe1xyXG4gICAgZm9udC1zaXplOiB4eC1sYXJnZTtcclxuICAgIGZvbnQtd2VpZ2h0OiBpbmhlcml0O1xyXG59XHJcbi5kZXNrdG9wSW1ne1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuLm1vYmlsZUltZ3tcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG4gIH1cclxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NDk5cHgpIGFuZCAobWluLXdpZHRoOjEwMHB4KXtcclxuICAgIC5Db250ZW50U2VjdGlvbiBwe1xyXG4gICAgICAgIGZvbnQtc2l6ZTogbGFyZ2U7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IGluaGVyaXQ7XHJcbiAgICB9XHJcbiAgICAuZGVza3RvcEltZ3tcclxuICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxuICAgIC5tb2JpbGVJbWd7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYm9keXtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICB9XHJcbiJdfQ== */"] });


/***/ }),

/***/ 9384:
/*!*********************************************************!*\
  !*** ./src/app/Settings/HelpDesk/HelpDesk.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpDeskComponent": () => (/* binding */ HelpDeskComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Shared/services/NavbarCommunication.service */ 4920);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);





function HelpDeskComponent_ng_container_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 20)(2, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Getting Started");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Learn how to create an account, set up your profile, and what you can do on HoozOnline");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "p", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Step1. Login to hoozonline using Google or FB");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Step2. Update your profile with pic and banner.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "p", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Step3. Add tags to your profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "p")(14, "b", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Explore");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, " other interesting features");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
function HelpDeskComponent_ng_container_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 20)(2, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "EXPLORE");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
function HelpDeskComponent_ng_container_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 20)(2, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Get Service");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
function HelpDeskComponent_ng_container_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 20)(2, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Service Provider");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
function HelpDeskComponent_ng_container_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 20)(2, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Write to us");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Share your feedback and experience with us");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "textarea", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, " Submit ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "br")(14, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
function HelpDeskComponent_ng_container_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 29)(2, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Getting Started");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Learn how to create an account, set up your profile, and what you can do on HoozOnline");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "p", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Step1. Login to hoozonline using Google or FB");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Step2. Update your profile with pic and banner.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "p", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Step3. Add tags to your profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "p")(14, "b", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Explore");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, " other interesting features");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
function HelpDeskComponent_ng_container_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 29)(2, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "EXPLORE");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
function HelpDeskComponent_ng_container_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 29)(2, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Get Service");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
function HelpDeskComponent_ng_container_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 29)(2, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Service Provider");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
function HelpDeskComponent_ng_container_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 29)(2, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Write to us");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Share your feedback and experience with us");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "textarea", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, " Submit ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "br")(14, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
const _c0 = function (a0) { return { color: a0 }; };
class HelpDeskComponent {
    constructor(_location, titleService, metaService, navServices) {
        this._location = _location;
        this.titleService = titleService;
        this.metaService = metaService;
        this.navServices = navServices;
        this.isGS = true;
        this.isEX = false;
        this.isSP = false;
        this.isCU = false;
        this.isGetServices = false;
    }
    ngOnInit() {
        this.titleService.setTitle("Help List");
        this.metaService.updateTag({ property: 'og:title', content: 'Help new' });
    }
    GS() {
        this.isGS = true;
        this.isEX = false;
        this.isSP = false;
        this.isCU = false;
        this.isGetServices = false;
    }
    EX() {
        this.isGS = false;
        this.isEX = true;
        this.isSP = false;
        this.isCU = false;
        this.isGetServices = false;
    }
    SP() {
        this.isGS = false;
        this.isEX = false;
        this.isSP = true;
        this.isCU = false;
        this.isGetServices = false;
    }
    GetServices() {
        this.isGS = false;
        this.isEX = false;
        this.isSP = false;
        this.isCU = false;
        this.isGetServices = true;
    }
    CU() {
        this.isGS = false;
        this.isEX = false;
        this.isSP = false;
        this.isCU = true;
        this.isGetServices = false;
    }
    ChangeEvent(e) {
        if (e.target.value == 1) {
            this.GS();
        }
        if (e.target.value == 2) {
            this.EX();
        }
        if (e.target.value == 3) {
            this.GetServices();
        }
        if (e.target.value == 4) {
            this.SP();
        }
        if (e.target.value == 5) {
            this.CU();
        }
    }
    //Back loacation History
    backClicked() {
        this._location.back();
    }
    hideEvent() {
        this.navServices.Toggle();
    }
}
HelpDeskComponent.ɵfac = function HelpDeskComponent_Factory(t) { return new (t || HelpDeskComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_2__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_0__.NavbarCommunicationService)); };
HelpDeskComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HelpDeskComponent, selectors: [["app-HelpDesk"]], decls: 48, vars: 40, consts: [[3, "click"], [1, "d-flex", "justify-content-start"], ["aria-hidden", "true", 1, "back", "fa", "fa-2x", "fa-arrow-left", 3, "click"], [1, "hc"], [1, "InDestop"], [1, "d-flex", "mt-5", 2, "background-color", "rgb(252 252 253)"], [1, "NavSection"], [3, "ngStyle", "click"], [4, "ngIf"], [1, "container-fluid", "InMobile"], [1, "row", "d-flex", "justify-content-center", "mt-5", 2, "background-color", "rgb(252 252 253)"], [1, "ms-2", "c-details"], [1, "select"], ["required", "", 1, "select__field", 2, "color", "rgb(107 93 240)", 3, "change"], ["value", "1", 3, "ngStyle"], ["value", "2", 3, "ngStyle"], ["value", "3", 3, "ngStyle"], ["value", "4", 3, "ngStyle"], ["value", "5", 3, "ngStyle"], [1, "row", "d-flex", "justify-content-center"], [1, "ContentSection", "mt-2"], [1, "mb-5"], [2, "color", "rgb(107 93 240)"], [1, "mt-4"], [1, ""], ["placeholder", "Email", "autocomplete", "off", "type", "email", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control"], [1, "mt-2"], ["autocomplete", "off", "placeholder", "Write here...", "cols", "6", "rows", "6", 1, "form-control"], ["type", "submit", 1, "btn", "btn-hoozGreen"], [1, "ContentSection1", "mt-2"]], template: function HelpDeskComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpDeskComponent_Template_div_click_0_listener() { return ctx.hideEvent(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1)(2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpDeskComponent_Template_i_click_2_listener() { return ctx.backClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h3", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Help Center");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "body")(6, "div", 4)(7, "div", 5)(8, "div", 6)(9, "ul")(10, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpDeskComponent_Template_a_click_10_listener() { return ctx.GS(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Getting Started");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpDeskComponent_Template_a_click_12_listener() { return ctx.EX(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Explore");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpDeskComponent_Template_a_click_14_listener() { return ctx.GetServices(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Get Service");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpDeskComponent_Template_a_click_16_listener() { return ctx.SP(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Service Provider");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpDeskComponent_Template_a_click_18_listener() { return ctx.CU(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Contact Us");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, HelpDeskComponent_ng_container_20_Template, 17, 0, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, HelpDeskComponent_ng_container_21_Template, 4, 0, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, HelpDeskComponent_ng_container_22_Template, 4, 0, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](23, HelpDeskComponent_ng_container_23_Template, 4, 0, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, HelpDeskComponent_ng_container_24_Template, 15, 0, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](25, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "div", 9)(27, "div", 10)(28, "div", 11)(29, "div", 12)(30, "select", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function HelpDeskComponent_Template_select_change_30_listener($event) { return ctx.ChangeEvent($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, "Getting Started\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "Explore\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "option", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "Get Service\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "option", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "Service Provider\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "option", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, "Contact Us\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "div", 9)(42, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](43, HelpDeskComponent_ng_container_43_Template, 17, 0, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](44, HelpDeskComponent_ng_container_44_Template, 4, 0, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](45, HelpDeskComponent_ng_container_45_Template, 4, 0, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](46, HelpDeskComponent_ng_container_46_Template, 4, 0, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](47, HelpDeskComponent_ng_container_47_Template, 15, 0, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](20, _c0, ctx.isGS ? "rgb(107 93 240)" : "black"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](22, _c0, ctx.isEX ? "rgb(107 93 240)" : "black"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](24, _c0, ctx.isGetServices ? "rgb(107 93 240)" : "black"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](26, _c0, ctx.isSP ? "rgb(107 93 240)" : "black"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](28, _c0, ctx.isCU ? "rgb(107 93 240)" : "black"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isGS);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isEX);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isGetServices);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isSP);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isCU);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](30, _c0, ctx.isGS ? "rgb(107 93 240)" : "black"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](32, _c0, ctx.isEX ? "rgb(107 93 240)" : "black"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](34, _c0, ctx.isGetServices ? "rgb(107 93 240)" : "black"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](36, _c0, ctx.isSP ? "rgb(107 93 240)" : "black"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](38, _c0, ctx.isCU ? "rgb(107 93 240)" : "black"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isGS);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isEX);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isGetServices);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isSP);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isCU);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgStyle, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"]], styles: ["@media only screen and (max-width: 1600px) and (min-width: 960px) {\r\n   \r\n    .NavSection[_ngcontent-%COMP%] {\r\n        margin-left: 147px;\r\n    }\r\n    .ContentSection[_ngcontent-%COMP%]{\r\n        margin-left: 97px; \r\n    }\r\n  .InMobile[_ngcontent-%COMP%]{\r\n    display: none;\r\n  }\r\n  }\r\n  \r\n@media only screen and (max-width:640px) and (min-width:499px) {\r\n  \r\n  .InDestop[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n  .InMobile[_ngcontent-%COMP%]{\r\n    display: block;\r\n  }\r\n  .select[_ngcontent-%COMP%] {\r\n    height: 40px;\r\n    width: 27.5rem;\r\n    overflow: hidden;\r\n    position: relative;\r\n    border-radius: 3px;\r\n    margin-bottom: 1em;\r\n    margin-left: 8px\r\n  }\r\n  .select[_ngcontent-%COMP%]:after {\r\n    content: \"\u25BC\";\r\n    padding: 8px 8px 8px;\r\n    position: absolute;\r\n    color: #00fa9a;\r\n    right: 13px;\r\n    top: 0;\r\n    z-index: 1;\r\n    text-align: center;\r\n    width: 10%;\r\n    height: 100%;\r\n    pointer-events: none;\r\n  }\r\n  \r\n  .select__field[_ngcontent-%COMP%] {\r\n    height: 40px;\r\n    width: 100%;\r\n    padding: 5px 15px; \r\n    background-color: white;\r\n    border: 0.05rem solid  #00fa9a !important;\r\n    border-radius: 0.5rem;\r\n    outline: none;\r\n    font-size: 16px;\r\n    -webkit-appearance: none;\r\n    \r\n    \r\n    appearance: none;\r\n    \r\n  }\r\n}\r\n  \r\n@media only screen and (min-width:641px) and (max-width:961px) { \r\n   \r\n    .InMobile[_ngcontent-%COMP%]{\r\n      display: none;\r\n    }\r\n \r\n  }\r\n  \r\n@media only screen and (max-width:500px)   { \r\n   \r\n    .InDestop[_ngcontent-%COMP%]{\r\n        display: none;\r\n    }\r\n    .InMobile[_ngcontent-%COMP%]{\r\n      display: block;\r\n    }\r\n    .select[_ngcontent-%COMP%] {\r\n      height: 40px;\r\n      width: 27.5rem;\r\n      overflow: hidden;\r\n      position: relative;\r\n      border-radius: 3px;\r\n      margin-bottom: 1em;\r\n      margin-left: 8px\r\n    }\r\n    .select[_ngcontent-%COMP%]:after {\r\n      content: \"\u25BC\";\r\n      padding: 8px 8px 8px;\r\n      position: absolute;\r\n      color: #00fa9a;\r\n      right: 13px;\r\n      top: 0;\r\n      z-index: 1;\r\n      text-align: center;\r\n      width: 10%;\r\n      height: 100%;\r\n      pointer-events: none;\r\n    }\r\n    \r\n    .select__field[_ngcontent-%COMP%] {\r\n      height: 40px;\r\n      width: 100%;\r\n      padding: 5px 15px; \r\n      background-color: white;\r\n      border: 0.05rem solid  #00fa9a !important;\r\n      border-radius: 0.5rem;\r\n      outline: none;\r\n      font-size: 16px;\r\n      -webkit-appearance: none;\r\n      \r\n      \r\n      appearance: none;\r\n      \r\n    }\r\n  }\r\n  \r\n@media only screen and (max-width:499px) and (min-width:100px){\r\n    .select[_ngcontent-%COMP%] {\r\n      height: 40px;\r\n      width: 20.5rem;\r\n      overflow: hidden;\r\n      position: relative;\r\n      border-radius: 3px;\r\n      margin-bottom: 1em;\r\n      margin-left: 8px\r\n    }\r\n    .select[_ngcontent-%COMP%]:after {\r\n      content: \"\u25BC\";\r\n      padding: 8px 8px 8px;\r\n      position: absolute;\r\n      color: #00fa9a;\r\n      right: 13px;\r\n      top: 0;\r\n      z-index: 1;\r\n      text-align: center;\r\n      width: 10%;\r\n      height: 100%;\r\n      pointer-events: none;\r\n    }\r\n    \r\n    .select__field[_ngcontent-%COMP%] {\r\n      height: 40px;\r\n      width: 100%;\r\n      padding: 5px 15px; \r\n      background-color: white;\r\n      border: 0.05rem solid  #00fa9a !important;\r\n      border-radius: 0.5rem;\r\n      outline: none;\r\n      font-size: 16px;\r\n      -webkit-appearance: none;\r\n      \r\n      \r\n      appearance: none;\r\n      \r\n    }\r\n  }\r\n  \r\n.NavSection[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{ \r\n    padding: 9px;\r\n    display: grid;\r\n    text-decoration: none;\r\n    color: black;\r\n    font-size: larger;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n}\r\n  \r\n.NavSection[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{ \r\n  color:rgb(107 93 240);\r\n}\r\n  \r\n.ContentSection[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n    font-size: unset;\r\n    font-weight: bold;\r\n}\r\n  \r\n.ContentSection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n    font-weight: 400;\r\n    font-size: initial;\r\n  }\r\n  \r\n.form-control[_ngcontent-%COMP%]{ \r\n    width: 95%;\r\n    background-color: #f7f7f9;\r\n    font-weight: 300;\r\n    color: black;\r\n    border-width: 0;\r\n    border-radius: 0.5rem;\r\n  }\r\n  \r\n.btn-hoozGreen[_ngcontent-%COMP%]{\r\n    \r\n    background-color: #00fa9a;  \r\n    font-weight: 700;\r\n    color: black;\r\n}\r\n  \r\n.c-details[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  font-weight: 300;\r\n  font-size: 13px;  \r\n  justify-content: center;\r\n}\r\n  \r\n.ContentSection1[_ngcontent-%COMP%]{\r\n  margin-left: 29px; \r\n}\r\n  \r\n.ContentSection1[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n  font-size: unset;\r\n  font-weight: bold;\r\n}\r\n  \r\n.ContentSection1[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n  font-weight: 400;\r\n  font-size: initial;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhlbHBEZXNrLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0lBRUk7UUFDSSxrQkFBa0I7SUFDdEI7SUFDQTtRQUNJLGlCQUFpQjtJQUNyQjtFQUNGO0lBQ0UsYUFBYTtFQUNmO0VBQ0E7O0FBRUY7O0VBRUU7SUFDRSxhQUFhO0VBQ2Y7RUFDQTtJQUNFLGNBQWM7RUFDaEI7RUFDQTtJQUNFLFlBQVk7SUFDWixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCO0VBQ0Y7RUFDQTtJQUNFLFlBQVk7SUFDWixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLGNBQWM7SUFDZCxXQUFXO0lBQ1gsTUFBTTtJQUNOLFVBQVU7SUFDVixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLFlBQVk7SUFDWixvQkFBb0I7RUFDdEI7O0VBRUE7SUFDRSxZQUFZO0lBQ1osV0FBVztJQUNYLGlCQUFpQjtJQUNqQix1QkFBdUI7SUFDdkIseUNBQXlDO0lBQ3pDLHFCQUFxQjtJQUNyQixhQUFhO0lBQ2IsZUFBZTtJQUNmLHdCQUF3QjtJQUN4Qix3QkFBd0I7SUFFeEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQix3QkFBd0I7RUFDMUI7QUFDRjs7QUFFRTs7SUFFRTtNQUNFLGFBQWE7SUFDZjs7RUFFRjs7QUFFQTs7SUFFRTtRQUNJLGFBQWE7SUFDakI7SUFDQTtNQUNFLGNBQWM7SUFDaEI7SUFDQTtNQUNFLFlBQVk7TUFDWixjQUFjO01BQ2QsZ0JBQWdCO01BQ2hCLGtCQUFrQjtNQUNsQixrQkFBa0I7TUFDbEIsa0JBQWtCO01BQ2xCO0lBQ0Y7SUFDQTtNQUNFLFlBQVk7TUFDWixvQkFBb0I7TUFDcEIsa0JBQWtCO01BQ2xCLGNBQWM7TUFDZCxXQUFXO01BQ1gsTUFBTTtNQUNOLFVBQVU7TUFDVixrQkFBa0I7TUFDbEIsVUFBVTtNQUNWLFlBQVk7TUFDWixvQkFBb0I7SUFDdEI7O0lBRUE7TUFDRSxZQUFZO01BQ1osV0FBVztNQUNYLGlCQUFpQjtNQUNqQix1QkFBdUI7TUFDdkIseUNBQXlDO01BQ3pDLHFCQUFxQjtNQUNyQixhQUFhO01BQ2IsZUFBZTtNQUNmLHdCQUF3QjtNQUN4Qix3QkFBd0I7TUFFeEIsZ0JBQWdCO01BQ2hCLGdCQUFnQjtNQUNoQix3QkFBd0I7SUFDMUI7RUFDRjs7QUFDQTtJQUNFO01BQ0UsWUFBWTtNQUNaLGNBQWM7TUFDZCxnQkFBZ0I7TUFDaEIsa0JBQWtCO01BQ2xCLGtCQUFrQjtNQUNsQixrQkFBa0I7TUFDbEI7SUFDRjtJQUNBO01BQ0UsWUFBWTtNQUNaLG9CQUFvQjtNQUNwQixrQkFBa0I7TUFDbEIsY0FBYztNQUNkLFdBQVc7TUFDWCxNQUFNO01BQ04sVUFBVTtNQUNWLGtCQUFrQjtNQUNsQixVQUFVO01BQ1YsWUFBWTtNQUNaLG9CQUFvQjtJQUN0Qjs7SUFFQTtNQUNFLFlBQVk7TUFDWixXQUFXO01BQ1gsaUJBQWlCO01BQ2pCLHVCQUF1QjtNQUN2Qix5Q0FBeUM7TUFDekMscUJBQXFCO01BQ3JCLGFBQWE7TUFDYixlQUFlO01BQ2Ysd0JBQXdCO01BQ3hCLHdCQUF3QjtNQUV4QixnQkFBZ0I7TUFDaEIsZ0JBQWdCO01BQ2hCLHdCQUF3QjtJQUMxQjtFQUNGOztBQUVBO0lBQ0UsWUFBWTtJQUNaLGFBQWE7SUFDYixxQkFBcUI7SUFDckIsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsZUFBZTtBQUNuQjs7QUFDQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsa0JBQWtCO0VBQ3BCOztBQUNBO0lBQ0UsVUFBVTtJQUNWLHlCQUF5QjtJQUN6QixnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLGVBQWU7SUFDZixxQkFBcUI7RUFDdkI7O0FBQ0E7O0lBRUUseUJBQXlCO0lBQ3pCLGdCQUFnQjtJQUNoQixZQUFZO0FBQ2hCOztBQUdBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZix1QkFBdUI7QUFDekI7O0FBS0E7RUFDRSxpQkFBaUI7QUFDbkI7O0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQiIsImZpbGUiOiJIZWxwRGVzay5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxNjAwcHgpIGFuZCAobWluLXdpZHRoOiA5NjBweCkge1xyXG4gICBcclxuICAgIC5OYXZTZWN0aW9uIHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMTQ3cHg7XHJcbiAgICB9XHJcbiAgICAuQ29udGVudFNlY3Rpb257XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDk3cHg7IFxyXG4gICAgfVxyXG4gIC5Jbk1vYmlsZXtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG4gIH1cclxuICBcclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjY0MHB4KSBhbmQgKG1pbi13aWR0aDo0OTlweCkge1xyXG4gIFxyXG4gIC5JbkRlc3RvcCB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxuICAuSW5Nb2JpbGV7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcbiAgLnNlbGVjdCB7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB3aWR0aDogMjcuNXJlbTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxZW07XHJcbiAgICBtYXJnaW4tbGVmdDogOHB4XHJcbiAgfVxyXG4gIC5zZWxlY3Q6YWZ0ZXIge1xyXG4gICAgY29udGVudDogXCLilrxcIjtcclxuICAgIHBhZGRpbmc6IDhweCA4cHggOHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgY29sb3I6ICMwMGZhOWE7XHJcbiAgICByaWdodDogMTNweDtcclxuICAgIHRvcDogMDtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB3aWR0aDogMTAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgfVxyXG4gIFxyXG4gIC5zZWxlY3RfX2ZpZWxkIHtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZzogNXB4IDE1cHg7IFxyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBib3JkZXI6IDAuMDVyZW0gc29saWQgICMwMGZhOWEgIWltcG9ydGFudDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICAvKiBmb3Igd2Via2l0IGJyb3dzZXJzICovXHJcbiAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICAvKiBmb3IgZmlyZWZveCAqL1xyXG4gICAgYXBwZWFyYW5jZTogbm9uZTtcclxuICAgIC8qIGZvciBtb2Rlcm4gYnJvd3NlcnMgKi9cclxuICB9XHJcbn1cclxuICBcclxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6NjQxcHgpIGFuZCAobWF4LXdpZHRoOjk2MXB4KSB7IFxyXG4gICBcclxuICAgIC5Jbk1vYmlsZXtcclxuICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxuIFxyXG4gIH1cclxuICBcclxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTAwcHgpICAgeyBcclxuICAgXHJcbiAgICAuSW5EZXN0b3B7XHJcbiAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxuICAgIC5Jbk1vYmlsZXtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB9XHJcbiAgICAuc2VsZWN0IHtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICB3aWR0aDogMjcuNXJlbTtcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDFlbTtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDhweFxyXG4gICAgfVxyXG4gICAgLnNlbGVjdDphZnRlciB7XHJcbiAgICAgIGNvbnRlbnQ6IFwi4pa8XCI7XHJcbiAgICAgIHBhZGRpbmc6IDhweCA4cHggOHB4O1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGNvbG9yOiAjMDBmYTlhO1xyXG4gICAgICByaWdodDogMTNweDtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICB6LWluZGV4OiAxO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIHdpZHRoOiAxMCU7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5zZWxlY3RfX2ZpZWxkIHtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgcGFkZGluZzogNXB4IDE1cHg7IFxyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgICAgYm9yZGVyOiAwLjA1cmVtIHNvbGlkICAjMDBmYTlhICFpbXBvcnRhbnQ7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcclxuICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICAgIC8qIGZvciB3ZWJraXQgYnJvd3NlcnMgKi9cclxuICAgICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xyXG4gICAgICAvKiBmb3IgZmlyZWZveCAqL1xyXG4gICAgICBhcHBlYXJhbmNlOiBub25lO1xyXG4gICAgICAvKiBmb3IgbW9kZXJuIGJyb3dzZXJzICovXHJcbiAgICB9XHJcbiAgfSBcclxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NDk5cHgpIGFuZCAobWluLXdpZHRoOjEwMHB4KXtcclxuICAgIC5zZWxlY3Qge1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgIHdpZHRoOiAyMC41cmVtO1xyXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMWVtO1xyXG4gICAgICBtYXJnaW4tbGVmdDogOHB4XHJcbiAgICB9XHJcbiAgICAuc2VsZWN0OmFmdGVyIHtcclxuICAgICAgY29udGVudDogXCLilrxcIjtcclxuICAgICAgcGFkZGluZzogOHB4IDhweCA4cHg7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgY29sb3I6ICMwMGZhOWE7XHJcbiAgICAgIHJpZ2h0OiAxM3B4O1xyXG4gICAgICB0b3A6IDA7XHJcbiAgICAgIHotaW5kZXg6IDE7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgd2lkdGg6IDEwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLnNlbGVjdF9fZmllbGQge1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBwYWRkaW5nOiA1cHggMTVweDsgXHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gICAgICBib3JkZXI6IDAuMDVyZW0gc29saWQgICMwMGZhOWEgIWltcG9ydGFudDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xyXG4gICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcclxuICAgICAgLyogZm9yIHdlYmtpdCBicm93c2VycyAqL1xyXG4gICAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICAgIC8qIGZvciBmaXJlZm94ICovXHJcbiAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICAgIC8qIGZvciBtb2Rlcm4gYnJvd3NlcnMgKi9cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5OYXZTZWN0aW9uIGF7IFxyXG4gICAgcGFkZGluZzogOXB4O1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIGZvbnQtc2l6ZTogbGFyZ2VyO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4uTmF2U2VjdGlvbiBhOmhvdmVyeyBcclxuICBjb2xvcjpyZ2IoMTA3IDkzIDI0MCk7XHJcbn1cclxuLkNvbnRlbnRTZWN0aW9uIGF7XHJcbiAgICBmb250LXNpemU6IHVuc2V0O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5Db250ZW50U2VjdGlvbiBwe1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIGZvbnQtc2l6ZTogaW5pdGlhbDtcclxuICB9XHJcbiAgLmZvcm0tY29udHJvbHsgXHJcbiAgICB3aWR0aDogOTUlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjdmOTtcclxuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICBib3JkZXItd2lkdGg6IDA7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwLjVyZW07XHJcbiAgfVxyXG4gIC5idG4taG9vekdyZWVue1xyXG4gICAgXHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmYTlhOyAgXHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG5cclxuLmMtZGV0YWlscyBzcGFuIHtcclxuICBmb250LXdlaWdodDogMzAwO1xyXG4gIGZvbnQtc2l6ZTogMTNweDsgIFxyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59IFxyXG5cclxuXHJcblxyXG5cclxuLkNvbnRlbnRTZWN0aW9uMXtcclxuICBtYXJnaW4tbGVmdDogMjlweDsgXHJcbn1cclxuLkNvbnRlbnRTZWN0aW9uMSBhe1xyXG4gIGZvbnQtc2l6ZTogdW5zZXQ7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5Db250ZW50U2VjdGlvbjEgcHtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIGZvbnQtc2l6ZTogaW5pdGlhbDtcclxufVxyXG5cclxuXHJcbiJdfQ== */"] });


/***/ }),

/***/ 4637:
/*!*****************************************!*\
  !*** ./src/app/Shared/Shared.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedModule": () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _TopNavBar_TopNavBar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TopNavBar/TopNavBar.component */ 9679);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);



class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ providers: [
        _TopNavBar_TopNavBar_component__WEBPACK_IMPORTED_MODULE_0__.TopNavBarComponent
    ], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](SharedModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule] }); })();


/***/ }),

/***/ 9679:
/*!*********************************************************!*\
  !*** ./src/app/Shared/TopNavBar/TopNavBar.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TopNavBarComponent": () => (/* binding */ TopNavBarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 3280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 116);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 1989);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 8977);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 2340);
/* harmony import */ var _services_Auth_Profile_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/Auth/Profile.service */ 2521);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @agm/core */ 3333);
/* harmony import */ var _services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/NavbarCommunication.service */ 4920);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 2508);












const _c0 = ["movieSearchInput"];
function TopNavBarComponent_div_1_div_17_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_div_17_li_2_Template_li_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r24); const item_r22 = restoredCtx.$implicit; const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r23.SearchByClick(item_r22.TagName)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const item_r22 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r22.TagName);
} }
function TopNavBarComponent_div_1_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 49)(1, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, TopNavBarComponent_div_1_div_17_li_2_Template, 3, 1, "li", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r4.tag.data);
} }
function TopNavBarComponent_div_1_span_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function TopNavBarComponent_div_1_span_19_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_span_19_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r26); const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r25.ClearSearch()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function TopNavBarComponent_div_1_a_20_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_a_20_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r28); const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r27.RedirectToUser(ctx_r27.user.Id)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("src", ctx_r7.navbarUserPic, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function TopNavBarComponent_div_1_div_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 58)(1, "label", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "i", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} }
function TopNavBarComponent_div_1_a_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
const _c1 = function () { return ["/joblist"]; };
const _c2 = function () { return ["/settings/download"]; };
function TopNavBarComponent_div_1_div_24_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "a", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_div_24_div_2_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r33); const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r32.RedirectToUser(ctx_r32.user.Id)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "i", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "MY PROFILE");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "a", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "i", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Job Listing ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "a", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "i", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Download");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](2, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](3, _c2));
} }
function TopNavBarComponent_div_1_div_24_a_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function TopNavBarComponent_div_1_div_24_a_21_Template(rf, ctx) { if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_div_24_a_21_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r35); const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r34.LogOut()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "i", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
const _c3 = function () { return ["/settings/helpDesk"]; };
function TopNavBarComponent_div_1_div_24_Template(rf, ctx) { if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_div_24_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r37); const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r36.hide()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, TopNavBarComponent_div_1_div_24_div_2_Template, 10, 4, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "a", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "i", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "SETTINGS ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, TopNavBarComponent_div_1_div_24_a_6_Template, 3, 0, "a", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "input", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 69)(9, "a", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "About Us ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "i", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "a", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Help & Support");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "i", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "a", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Terms & Conditions");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](17, "i", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "a", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "Privacy Policies");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](20, "i", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](21, TopNavBarComponent_div_1_div_24_a_21_Template, 3, 0, "a", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r10.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r10.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](4, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r10.isLogedIn);
} }
function TopNavBarComponent_div_1_li_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 39)(1, "a", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Job listing");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](1, _c1));
} }
const _c4 = function () { return ["/jobpost"]; };
function TopNavBarComponent_div_1_li_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 39)(1, "a", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Create Posts");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](1, _c4));
} }
function TopNavBarComponent_div_1_li_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 39)(1, "a", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} }
const _c5 = function (a1) { return ["/profile", a1]; };
function TopNavBarComponent_div_1_li_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](2, _c5, ctx_r14.user.Id));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("src", ctx_r14.user == null ? null : ctx_r14.user.ImageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function TopNavBarComponent_div_1_a_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](1, _c4));
} }
function TopNavBarComponent_div_1_a_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function TopNavBarComponent_div_1_a_39_Template(rf, ctx) { if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_a_39_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r39); const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r38.RedirectToUser(ctx_r38.user.Id)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("src", ctx_r17.navbarUserPic, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function TopNavBarComponent_div_1_label_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "label", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function TopNavBarComponent_div_1_input_41_Template(rf, ctx) { if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "input", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_input_41_Template_input_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r41); const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r40.ShowMenu()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
const _c6 = function () { return ["/chat"]; };
function TopNavBarComponent_div_1_div_42_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "a", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_div_42_div_2_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r46); const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r45.RedirectToUser(ctx_r45.user.Id)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "i", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "MY PROFILE");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "a", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "i", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Job Listing ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "a", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Chats ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](2, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](3, _c6));
} }
function TopNavBarComponent_div_1_div_42_a_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function TopNavBarComponent_div_1_div_42_a_21_Template(rf, ctx) { if (rf & 1) {
    const _r48 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_div_42_a_21_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r48); const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r47.LogOut()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "i", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function TopNavBarComponent_div_1_div_42_Template(rf, ctx) { if (rf & 1) {
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_div_42_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r50); const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r49.hide()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, TopNavBarComponent_div_1_div_42_div_2_Template, 10, 4, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "a", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "i", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "SETTINGS ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, TopNavBarComponent_div_1_div_42_a_6_Template, 3, 0, "a", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "input", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 69)(9, "a", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "About Us ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "i", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "a", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Help & Support");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "i", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "a", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Terms & Conditions");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](17, "i", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "a", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "Privacy Policies");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](20, "i", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](21, TopNavBarComponent_div_1_div_42_a_21_Template, 3, 0, "a", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r20.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r20.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](4, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r20.isLogedIn);
} }
const _c7 = function () { return ["/"]; };
function TopNavBarComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 11)(1, "div", 12)(2, "img", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_Template_img_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r52); const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r51.LogoClick()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "img", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_Template_img_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r52); const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r53.LogoClick()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "i", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 17)(7, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Featching location... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "i", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 21)(13, "div", 22)(14, "form", 23)(15, "input", 24, 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_Template_input_click_15_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r52); const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r54.hide()); })("keyup.enter", function TopNavBarComponent_div_1_Template_input_keyup_enter_15_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r52); const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r55.SearchByEnter()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, TopNavBarComponent_div_1_div_17_Template, 3, 1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](18, TopNavBarComponent_div_1_span_18_Template, 2, 0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, TopNavBarComponent_div_1_span_19_Template, 2, 0, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](20, TopNavBarComponent_div_1_a_20_Template, 2, 1, "a", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](21, TopNavBarComponent_div_1_div_21_Template, 3, 0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](22, TopNavBarComponent_div_1_a_22_Template, 2, 0, "a", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_Template_input_click_23_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r52); const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r56.ShowMenu()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](24, TopNavBarComponent_div_1_div_24_Template, 22, 5, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "div", 34)(26, "div", 35)(27, "form", 36)(28, "ul", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_1_Template_ul_click_28_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r52); const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r57.hide()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](29, TopNavBarComponent_div_1_li_29_Template, 3, 2, "li", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](30, TopNavBarComponent_div_1_li_30_Template, 3, 2, "li", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](31, TopNavBarComponent_div_1_li_31_Template, 3, 0, "li", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "li", 39)(33, "a", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34, "Wall");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](35, TopNavBarComponent_div_1_li_35_Template, 2, 4, "li", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](37, TopNavBarComponent_div_1_a_37_Template, 2, 2, "a", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](38, TopNavBarComponent_div_1_a_38_Template, 2, 0, "a", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](39, TopNavBarComponent_div_1_a_39_Template, 2, 1, "a", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](40, TopNavBarComponent_div_1_label_40_Template, 2, 0, "label", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](41, TopNavBarComponent_div_1_input_41_Template, 1, 0, "input", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](42, TopNavBarComponent_div_1_div_42_Template, 22, 5, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.hidesearchlist);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r0.showClose);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.showClose);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r0.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isLogedIn && ctx_r0.navServices.isShowingMenu);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r0.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](18, _c7));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r0.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isLogedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isLogedIn && ctx_r0.navServices.isShowingMenu);
} }
function TopNavBarComponent_div_2_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function TopNavBarComponent_div_2_span_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function TopNavBarComponent_div_2_span_9_Template(rf, ctx) { if (rf & 1) {
    const _r63 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_2_span_9_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r63); const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r62.ClearSearch()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function TopNavBarComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r65 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "` ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 92)(3, "div", 22)(4, "form", 23)(5, "input", 24, 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_div_2_Template_input_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r65); const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r64.hide()); })("keyup.enter", function TopNavBarComponent_div_2_Template_input_keyup_enter_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r65); const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r66.SearchByEnter()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, TopNavBarComponent_div_2_div_7_Template, 2, 0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, TopNavBarComponent_div_2_span_8_Template, 2, 0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, TopNavBarComponent_div_2_span_9_Template, 2, 0, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.hidesearchlist);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r1.showClose);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.showClose);
} }
function TopNavBarComponent_a_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](1, _c4));
} }
var addressLocation = null;
class TopNavBarComponent {
    constructor(_profileServices, _router, apiloader, navServices, _http) {
        this._profileServices = _profileServices;
        this._router = _router;
        this.apiloader = apiloader;
        this.navServices = navServices;
        this._http = _http;
        this.navbarUserPic = 'https://res.cloudinary.com/drmnyie0t/image/upload/v1652501879/Default_User_1_esjtmm.png';
        this.isLogedIn = false;
        this.hidesearchlist = false;
        this.showClose = false;
        this.isShowingMenu = false;
        this.enableMobieSearch = false;
        this.notifyParent = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user'));
            this._profileServices.GetUserProfile(this.user.Id)
                .subscribe({
                next: (data) => {
                    this.navbarUserPic = data.UserImage;
                }
            });
            this.isLogedIn = true;
        }
        else {
            this.isLogedIn = false;
        }
    }
    ngOnInit() {
        this.fireSearchlist();
        if (!localStorage.getItem("location")) {
            this.AskForLocation();
        }
        else {
            this.location = JSON.parse(localStorage.getItem('location'));
            window.document.getElementById('addressTitle').innerText = this.location.address_components[5].long_name;
            window.document.getElementById('addrDetails').innerText = this.location.address_components[0].long_name + ', ' + this.location.address_components[1].long_name + ', ' + this.location.address_components[2].long_name;
        }
    }
    // ask for location
    AskForLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                if (position) {
                    this.apiloader.load().then(() => {
                        let geocoder = new google.maps.Geocoder;
                        let latlng = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        geocoder.geocode({
                            'location': latlng
                        }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[1]) {
                                    localStorage.setItem('location', JSON.stringify(results[1]));
                                    addressLocation = results[1].address_components[0].long_name + ', ' + results[1].address_components[1].long_name + ', ' + results[1].address_components[2].long_name;
                                    window.document.getElementById('addressTitle').innerText = results[1].address_components[5].long_name;
                                    window.document.getElementById('addrDetails').innerText = addressLocation;
                                }
                            }
                            else {
                                console.log('Not found');
                            }
                        });
                    });
                }
                else {
                    window.document.getElementById('addressTitle').innerText = 'No address';
                    window.document.getElementById('addrDetails').innerText = '';
                }
            });
        }
        else {
        }
    }
    //Search wall by click
    SearchByClick(searchTerm) {
        this.hidesearchlist = false;
        document.getElementById("searchTag").value =
            searchTerm;
        this.notifyParent.emit(searchTerm);
    }
    //Search wall by enter
    SearchByEnter() {
        this.searchval = document.getElementById("searchTag").value;
        this.notifyParent.emit(this.searchval);
        this.hidesearchlist = false;
    }
    ClearSearch() {
        document.getElementById("searchTag").value = "";
        this.showClose = false;
        this.hidesearchlist = false;
        this.SearchByClick("");
    }
    fireSearchlist() {
        (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(this.movieSearchInput.nativeElement, "keyup")
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((event) => {
            return event.target.value;
        }), 
        // if character length greater then 2
        (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.filter)((res) => res.length > -1), 
        // Time in milliseconds between key events
        (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.debounceTime)(0), 
        // If previous query is diffent from current
        (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.distinctUntilChanged)()
        // subscription for response
        )
            .subscribe((text) => {
            //Search api call
            if (text == "") {
                this.hidesearchlist = false;
            }
            this.searchGetCall(text).subscribe({
                next: (res) => {
                    if (res.data.length == 0) {
                        this.hidesearchlist = false;
                        return;
                    }
                    this.tag = res;
                    this.hidesearchlist = true;
                    this.showClose = true;
                }
            }
            // (res:any) => {
            //   if (res.data.length == 0) {
            //     this.hidesearchlist = false;
            //     return;
            //   }
            //   this.tag = res;
            //   this.hidesearchlist = true;
            //   this.showClose = true;
            // },
            // (err) => {
            //
            // }
            );
        });
    }
    searchGetCall(term) {
        if (term === "") {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.of)([]);
        }
        return this._http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_url + "Tag/TagSuggestion/" + term);
    }
    // Suggetion list focous out
    hide() {
        this.navServices.isShowingMenu = false;
    }
    ShowMenu() {
        this.navServices.isShowingMenu = !this.navServices.isShowingMenu;
    }
    LogoClick() {
        window.location.href = '/';
    }
    RedirectToUser(userId) {
        this._router.navigate(['/profile'], { queryParams: { target: userId } });
    }
    LogOut() {
        this._profileServices.LogOut(this.user.Id).subscribe(() => {
            localStorage.removeItem('user');
            location.href = '/';
        });
    }
    url() {
        return window.location.pathname.replace('/', '');
    }
    Search() {
        this.navServices.Toggle();
    }
    EnableSearch() {
        this.enableMobieSearch = !this.enableMobieSearch;
    }
}
TopNavBarComponent.ɵfac = function TopNavBarComponent_Factory(t) { return new (t || TopNavBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_Auth_Profile_service__WEBPACK_IMPORTED_MODULE_1__.ProfileService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_agm_core__WEBPACK_IMPORTED_MODULE_11__.MapsAPILoader), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_2__.NavbarCommunicationService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClient)); };
TopNavBarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: TopNavBarComponent, selectors: [["app-TopNavBar"]], viewQuery: function TopNavBarComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.movieSearchInput = _t.first);
    } }, outputs: { notifyParent: "notifyParent" }, decls: 13, vars: 12, consts: [[1, "mb-5", "navbar", "sticky-top", "navbar-light", "bg-light1", "mb-5"], ["class", "container-fluid", 4, "ngIf"], [1, "nav-item", 3, "routerLink"], ["aria-hidden", "true", 1, "fa", "fa-home"], [1, "nav-item", 3, "click"], ["aria-hidden", "true", 1, "fa", "fa-search"], ["class", "nav-item add_post", 3, "routerLink", 4, "ngIf"], [1, "nav-item", "jobs", 3, "routerLink"], ["src", "../../../assets/Logo/jobs.png", "href", "#", "id", "navbarDropdown", "role", "button", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "img-fluid"], [1, "nav-item", "chat", 3, "routerLink"], [1, "fa-solid", "fa-comment-dots"], [1, "container-fluid"], [1, "logo_location"], ["src", "../../../assets/Logo/hoozon.svg", 1, "img-responsive", "logo", 3, "click"], ["src", "../../../assets/Logo/hoozon_mb.png", 1, "img-responsive", "logo_mb", 3, "click"], [1, "location"], [1, "fas", "fa-map-marker-alt"], [1, "loc_des"], ["id", "addressTitle", 1, "title"], [1, "fas", "fa-caret-down"], ["id", "addrDetails"], [1, "d-flex", "justify-content-between", "search_wrap"], [1, "input-group"], [1, "form"], ["type", "search", "autocomplete", "off", "id", "searchTag", "placeholder", "Search", "tabindex", "-1", "aria-activedescendant", "", 1, "form-control", "form-input", 3, "click", "keyup.enter"], ["movieSearchInput", ""], ["class", "searchSuggetion", 4, "ngIf"], ["class", "left-pan", 4, "ngIf"], ["class", "left-pan", 3, "click", 4, "ngIf"], ["class", "nav-item dropdown_mb profileimg", 3, "click", 4, "ngIf"], ["type", "button", "class", "navbar-toggler tog mb_menu", 4, "ngIf"], ["class", "links mb_menu", "href", "/login", 4, "ngIf"], ["type", "checkbox", "id", "dropdown1", "name", "dropdown1", 1, "dropdown", "tog", 3, "click"], ["class", "section-dropdown tog", 3, "click", 4, "ngIf"], ["id", "navbarCollapse", 1, "collapse", "navbar-collapse", "tog", "justify-content-end"], [1, "navbar-nav", "mr-auto", "mt-2", "mt-md-0"], [1, "d-flex"], [1, "navbar-nav", 3, "click"], ["class", "nav-item", 4, "ngIf"], [1, "nav-item"], ["aria-current", "page", 1, "nav-link", "active", 3, "routerLink"], ["class", "nav-item dropdown profileimg", 3, "routerLink", 4, "ngIf"], [1, "justify-content-end", "togs"], ["class", "links add_post", 3, "routerLink", 4, "ngIf"], ["class", "links", "href", "/login", 4, "ngIf"], ["class", "nav-item dropdown profileimg", 3, "click", 4, "ngIf"], ["class", "for-dropdown menu", "for", "dropdown", 4, "ngIf"], ["class", "dropdown", "type", "checkbox", "id", "dropdown", "name", "dropdown", 3, "click", 4, "ngIf"], ["class", "section-dropdown", 3, "click", 4, "ngIf"], [1, "searchSuggetion"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["tabindex", "-1"], [1, "left-pan"], [1, "left-pan", 3, "click"], [1, "fa", "fa-times-circle"], [1, "nav-item", "dropdown_mb", "profileimg", 3, "click"], ["href", "#", "id", "navbarDropdown", "role", "button", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "rounded-circle", "img-fluid", 3, "src"], ["type", "button", 1, "navbar-toggler", "tog", "mb_menu"], ["for", "dropdown1", 1, "for-dropdown"], [1, "fas", "fa-chevron-down"], ["href", "/login", 1, "links", "mb_menu"], [1, "section-dropdown", "tog", 3, "click"], [1, "dr_top"], [4, "ngIf"], ["id", "b"], [1, "fas", "fa-cog"], ["id", "b", "href", "/login", 4, "ngIf"], ["type", "checkbox", "id", "dropdown-sub", "name", "dropdown-sub", 1, "dropdown-sub"], [1, "section-dropdown-sub"], ["id", "s", "href", "#"], [1, "uil", "uil-arrow-right"], ["id", "s", 3, "routerLink"], ["id", "s", 3, "click", 4, "ngIf"], ["id", "b", 3, "click"], [1, "far", "fa-user-circle"], ["id", "b", 3, "routerLink"], [1, "far", "fa-newspaper"], [1, "fa", "fa-download"], ["id", "b", "href", "/login"], ["id", "s", 3, "click"], [1, "nav-link", "active", 3, "routerLink"], ["href", "/login", 1, "nav-link", "active"], [1, "nav-item", "dropdown", "profileimg", 3, "routerLink"], ["href", "#", "id", "navbarDropdown", "role", "button", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "nav-link", "dropdown-toggle", "img-circle", 3, "src"], [1, "links", "add_post", 3, "routerLink"], [1, "fa", "fa-plus"], ["href", "/login", 1, "links"], [1, "nav-item", "dropdown", "profileimg", 3, "click"], ["for", "dropdown", 1, "for-dropdown", "menu"], ["type", "checkbox", "id", "dropdown", "name", "dropdown", 1, "dropdown", 3, "click"], [1, "section-dropdown", 3, "click"], [1, "d-flex", "justify-content-between"], [1, "nav-item", "add_post", 3, "routerLink"]], template: function TopNavBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, TopNavBarComponent_div_1_Template, 43, 19, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, TopNavBarComponent_div_2_Template, 10, 3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "nav")(4, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TopNavBarComponent_Template_a_click_6_listener() { return ctx.EnableSearch(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "i", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, TopNavBarComponent_a_8_Template, 2, 2, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "i", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.enableMobieSearch);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.enableMobieSearch);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMapInterpolate1"]("footer ", ctx.url(), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](9, _c7));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isLogedIn);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](10, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](11, _c6));
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgForm, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterLinkWithHref], styles: [".togs[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n\r\n\r\n.searchSuggetion[_ngcontent-%COMP%] {\r\n  background: #FFFFFF;\r\n  box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.1);\r\n  border-radius: 12px;\r\n  position: absolute;\r\n  left: 0;\r\n  right: 0;\r\n}\r\n\r\n.searchSuggetion[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\r\n  list-style: none;\r\n  padding: 18px 0;\r\n  margin: 0;\r\n  font-weight: 700;\r\n  max-height: 468px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.searchSuggetion[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  padding: 6px 35px;\r\n  cursor: pointer;\r\n}\r\n\r\n.searchSuggetion[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\r\n  background: var(--light-gray-color);\r\n}\r\n\r\n\r\n\r\n.navbar-toggler[_ngcontent-%COMP%] {\r\n  padding: 0.25rem 0.75rem;\r\n  background-color: transparent;\r\n  border: 1px solid transparent;\r\n}\r\n\r\n[type=\"checkbox\"][_ngcontent-%COMP%]:checked, [type=\"checkbox\"][_ngcontent-%COMP%]:not(:checked) {\r\n  opacity: 0;\r\n  pointer-events: none;\r\n  width: 0;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%]:before, .dropdown[_ngcontent-%COMP%]:not(:checked)    + label[_ngcontent-%COMP%]:before {\r\n  cursor: auto;\r\n  pointer-events: none;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%]:before {\r\n  pointer-events: auto;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%]:not(:checked)    + label[_ngcontent-%COMP%]   .uil[_ngcontent-%COMP%] {\r\n  font-size: 24px;\r\n  transition: transform 200ms linear;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%]   .uil[_ngcontent-%COMP%] {\r\n  transform: rotate(180deg);\r\n  transition: transform 200ms linear;\r\n}\r\n\r\n.section-dropdown[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    background-color: #111;\r\n    color: #fff ;\r\n    top: 70px;\r\n    border-radius: 15px;\r\n    display: block;\r\n    z-index: 999;\r\n    opacity: 1;\r\n  pointer-events: auto;\r\n    width: 320px;\r\n    padding: 20px 0;\r\n    margin-top: 10px;\r\n}\r\n\r\n.section-dropdown[_ngcontent-%COMP%]:after {\r\n  position: absolute;\r\n  top: -7px;\r\n  right: 20px;\r\n  width: 0;\r\n  height: 0;\r\n  border-left: 8px solid transparent;\r\n  border-right: 8px solid transparent;\r\n  border-bottom: 8px solid #111;\r\n  content: '';\r\n  display: block;\r\n  z-index: 2;\r\n  transition: all 200ms linear;\r\n  display: none;\r\n}\r\n\r\n.dropdown-sub[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%], .dropdown-sub[_ngcontent-%COMP%]:not(:checked)    + label[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  color: #fff;\r\n  transition: all 200ms linear;\r\n  font-family: 'Roboto', sans-serif;\r\n  font-weight: 500;\r\n  font-size: 15px;\r\n  border-radius: 2px;\r\n  padding: 5px 0;\r\n  padding-left: 20px;\r\n  padding-right: 15px;\r\n  text-align: left;\r\n  text-decoration: none;\r\n  display: flex;\r\n  -moz-align-items: center;\r\n  -ms-align-items: center;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n    -ms-flex-pack: distribute;\r\n    cursor: pointer;\r\n}\r\n\r\n.dropdown-sub[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%]   .uil[_ngcontent-%COMP%], .dropdown-sub[_ngcontent-%COMP%]:not(:checked)    + label[_ngcontent-%COMP%]   .uil[_ngcontent-%COMP%] {\r\n  font-size: 22px;\r\n}\r\n\r\n.dropdown-sub[_ngcontent-%COMP%]:not(:checked)    + label[_ngcontent-%COMP%]   .uil[_ngcontent-%COMP%] {\r\n  transition: transform 200ms linear;\r\n}\r\n\r\n.dropdown-sub[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%]   .uil[_ngcontent-%COMP%] {\r\n  transform: rotate(135deg);\r\n  transition: transform 200ms linear;\r\n}\r\n\r\n.section-dropdown[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n  display: block;\r\n  padding: 15px 30px;\r\n  font-size: 20px;\r\n  font-weight: 700;\r\n  color: #fff;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.section-dropdown[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  width: 25px;\r\n  margin-right: 15px;\r\n}\r\n\r\n.section-dropdown-sub[_ngcontent-%COMP%] {\r\n  margin-top: 50px;\r\n}\r\n\r\n.section-dropdown-sub[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n  font-size: 18px;\r\n  padding: 12px 30px;\r\n  font-weight: normal;\r\n  display: block;\r\n  color: #fff;\r\n}\r\n\r\n\r\n\r\n.dropdown-item[_ngcontent-%COMP%] {\r\n  cursor: pointer;\r\n}\r\n\r\n.bg-light1[_ngcontent-%COMP%] {\r\n  background-color: white;\r\n}\r\n\r\n.form[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 12px;\r\n  top: 9px;\r\n  padding: 2px;\r\n  color: #000;\r\n  font-size: 22px;\r\n  cursor: pointer;\r\n}\r\n\r\nnav.navbar[_ngcontent-%COMP%] {\r\n  box-shadow: 0px 8px 8px -8px rgb(0 0 0 / 10%);\r\n  height: 80px;\r\n}\r\n\r\nnav.navbar[_ngcontent-%COMP%]   .container-fluid[_ngcontent-%COMP%] {\r\n  padding-left: 30px;\r\n  padding-right: 30px;\r\n}\r\n\r\n.form[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 18px;\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%] {\r\n  width: 454px;\r\n  height: 48px;\r\n  background: var(--light-gray-color);\r\n  border: none;\r\n  border-radius: 12px;\r\n  color: #000;\r\n  box-shadow: none;\r\n  padding-left: 50px;\r\n  font-size: 20px;\r\n}\r\n\r\n.nav-item[_ngcontent-%COMP%] {\r\n  font-weight: bold;\r\n}\r\n\r\n.navbar-expand-lg[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\r\n  padding: 0.8rem;\r\n}\r\n\r\n.tog1[_ngcontent-%COMP%] {\r\n    display: none;\r\n}\r\n\r\n.dropdown-menu[_ngcontent-%COMP%]{\r\n    float: left;\r\n    margin-left: -94px;\r\n}\r\n\r\n.links[_ngcontent-%COMP%] {\r\n  font-size: 20px;\r\n   font-weight:bold;\r\n   color: black;\r\n   padding: 1px;\r\n   text-decoration: none;\r\n   margin-left: 15px;\r\n}\r\n\r\n.for-dropdown[_ngcontent-%COMP%] {\r\n  margin-left: 14px;\r\n  cursor: pointer;\r\n  width: 48px;\r\n  height: 48px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  border-radius: 50%;\r\n  font-size: 24px;\r\n}\r\n\r\n.for-dropdown[_ngcontent-%COMP%]:hover {\r\n  background-color: var(--light-gray-color);\r\n}\r\n\r\n.profileimg[_ngcontent-%COMP%] {\r\n  width: 48px;\r\n  height: 48px;\r\n  border-radius: 50%;\r\n  background-color: var(--light-gray-color);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin-left: 15px;\r\n}\r\n\r\n.profileimg[_ngcontent-%COMP%]:hover {\r\n  background-color: var(--green);\r\n}\r\n\r\n.form-control[_ngcontent-%COMP%]::placeholder { \r\n  color: black;\r\n}\r\n\r\n.logo[_ngcontent-%COMP%] {\r\n  cursor: pointer;\r\n  position: relative;\r\n  top: -8px;\r\n}\r\n\r\n.add_post[_ngcontent-%COMP%] {\r\n  width: 48px;\r\n  height: 48px;\r\n  border-radius: 50%;\r\n  background-color: var(--green);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 24px;\r\n  margin-left: 0;\r\n}\r\n\r\n.add_post[_ngcontent-%COMP%]:hover {\r\n  background-color: var(--btn-bg-color);\r\n  color: var(--btn-text-color) !important;\r\n}\r\n\r\n.tog_sm[_ngcontent-%COMP%] {\r\n  display: flex;\r\n}\r\n\r\n.navbar-toggler.tog.mb_menu[_ngcontent-%COMP%] {\r\n  padding: 0;\r\n}\r\n\r\n.dropdown_mb.profileimg[_ngcontent-%COMP%] {\r\n  margin-left: auto;\r\n}\r\n\r\nnav.footer[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  bottom: 20px;\r\n  left: 30px;\r\n  right: 30px;\r\n  background: #fff;\r\n  z-index: 9;\r\n  box-shadow: 0 0 12px rgb(0 0 0 / 25%);\r\n  border-radius: 40px;\r\n  height: 65px;\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n  padding: 0 10px;\r\n}\r\n\r\nnav.footer[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\r\n  color: #000;\r\n  text-decoration: none;\r\n  font-size: 24px;\r\n}\r\n\r\n.nav-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  max-width: 34px;\r\n}\r\n\r\nnav.chatbox.footer[_ngcontent-%COMP%], nav.footer.jobchatbox[_ngcontent-%COMP%] {\r\n  display: none;\r\n}\r\n\r\n.logo_location[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.logo_location[_ngcontent-%COMP%]   .location[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  margin-left: 22px;\r\n}\r\n\r\n.location[_ngcontent-%COMP%]   i.fa-map-marker-alt[_ngcontent-%COMP%] {\r\n\tmargin-right: 8px;\r\n\tfont-size: 24px;\r\n\tcolor: var(--green);\r\n}\r\n\r\n.loc_des[_ngcontent-%COMP%] {\r\n\tline-height: 1;\r\n}\r\n\r\n.loc_des[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\r\n\tfont-weight: 600;\r\n}\r\n\r\n.loc_des[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .fa-caret-down[_ngcontent-%COMP%] {\r\n\tcolor: #C4C4C4;\r\n}\r\n\r\n.loc_des[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n\tcolor: #2D3E50;\r\n\tfont-size: 12px;\r\n}\r\n\r\n@media (max-width:1100px) {\r\n  .form-input[_ngcontent-%COMP%] {\r\n    width: 350px;\r\n  }\r\n  .loc_des[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n}\r\n\r\n@media (max-width:767px) {\r\n  .logo[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n  .hideInSmall[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n  .togs[_ngcontent-%COMP%], .search_wrap[_ngcontent-%COMP%] {\r\n    display: none !important;\r\n  }\r\n  .for-dropdown[_ngcontent-%COMP%] {\r\n    margin-left: 5px;\r\n  }\r\n  .logo_mb[_ngcontent-%COMP%] {\r\n    position: relative;\r\n    top: -9px;\r\n  }\r\n  nav.navbar[_ngcontent-%COMP%]   .container-fluid[_ngcontent-%COMP%] {\r\n    padding-left: 23px;\r\n    padding-right: 23px;\r\n  }\r\n  .dropdown_mb.profileimg[_ngcontent-%COMP%] {\r\n    border: 3px solid var(--green);\r\n  }\r\n  .mb_menu[_ngcontent-%COMP%] {\r\n    margin-left: auto;\r\n  }\r\n  .profileimg[_ngcontent-%COMP%]    ~ .mb_menu[_ngcontent-%COMP%] {\r\n    margin-left: 0;\r\n  }\r\n  .section-dropdown[_ngcontent-%COMP%] {\r\n    right: 15px;\r\n    width: 280px;\r\n  }\r\n  .logo_location[_ngcontent-%COMP%] {\r\n    align-items: flex-end;\r\n  }\r\n  .logo_location[_ngcontent-%COMP%]   .location[_ngcontent-%COMP%] {\r\n      margin-left: 16px;\r\n      margin-bottom: 8px;\r\n  }\r\n  .location[_ngcontent-%COMP%]   i.fa-map-marker-alt[_ngcontent-%COMP%] {\r\n      font-size: 20px;\r\n  }\r\n  nav.footer[_ngcontent-%COMP%]   .add_post[_ngcontent-%COMP%] {\r\n    width: 44px;\r\n    height: 44px;\r\n  }\r\n}\r\n\r\n@media (min-width: 768px) {\r\n  .hideInSmall[_ngcontent-%COMP%] {\r\n    display: contents;\r\n  }\r\n  .tog[_ngcontent-%COMP%], .dropdown_mb.profileimg[_ngcontent-%COMP%], .logo_mb[_ngcontent-%COMP%], .mb_menu[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n  nav.footer[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRvcE5hdkJhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQSxzQkFBc0I7O0FBQ3RCO0VBQ0UsbUJBQW1CO0VBQ25CLCtDQUErQztFQUMvQyxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLE9BQU87RUFDUCxRQUFRO0FBQ1Y7O0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLFNBQVM7RUFDVCxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtBQUNsQjs7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQixlQUFlO0FBQ2pCOztBQUNBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBLGlCQUFpQjs7QUFDakI7RUFDRSx3QkFBd0I7RUFDeEIsNkJBQTZCO0VBQzdCLDZCQUE2QjtBQUMvQjs7QUFDQTs7RUFFRSxVQUFVO0VBQ1Ysb0JBQW9CO0VBQ3BCLFFBQVE7QUFDVjs7QUFDQTs7RUFFRSxZQUFZO0VBQ1osb0JBQW9CO0FBQ3RCOztBQUNBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUNBO0VBQ0UsZUFBZTtFQUNmLGtDQUFrQztBQUNwQzs7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixrQ0FBa0M7QUFDcEM7O0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixTQUFTO0lBQ1QsbUJBQW1CO0lBQ25CLGNBQWM7SUFDZCxZQUFZO0lBQ1osVUFBVTtFQUNaLG9CQUFvQjtJQUNsQixZQUFZO0lBQ1osZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsV0FBVztFQUNYLFFBQVE7RUFDUixTQUFTO0VBQ1Qsa0NBQWtDO0VBQ2xDLG1DQUFtQztFQUNuQyw2QkFBNkI7RUFDN0IsV0FBVztFQUNYLGNBQWM7RUFDZCxVQUFVO0VBQ1YsNEJBQTRCO0VBQzVCLGFBQWE7QUFDZjs7QUFDQTs7RUFFRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLDRCQUE0QjtFQUM1QixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLHFCQUFxQjtFQUVyQixhQUFhO0VBRWIsd0JBQXdCO0VBQ3hCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsOEJBQThCO0lBQzVCLHlCQUF5QjtJQUN6QixlQUFlO0FBQ25COztBQUNBOztFQUVFLGVBQWU7QUFDakI7O0FBQ0E7RUFDRSxrQ0FBa0M7QUFDcEM7O0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsa0NBQWtDO0FBQ3BDOztBQUNBO0VBQ0UsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxxQkFBcUI7RUFDckIsZUFBZTtBQUNqQjs7QUFDQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBQ0E7RUFDRSxlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixjQUFjO0VBQ2QsV0FBVztBQUNiOztBQUNBLFVBQVU7O0FBQ1Y7RUFDRSxlQUFlO0FBQ2pCOztBQUNBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixRQUFRO0VBQ1IsWUFBWTtFQUNaLFdBQVc7RUFDWCxlQUFlO0VBQ2YsZUFBZTtBQUNqQjs7QUFDQTtFQUNFLDZDQUE2QztFQUM3QyxZQUFZO0FBQ2Q7O0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUNBO0VBQ0UsV0FBVztBQUNiOztBQUNBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixtQ0FBbUM7RUFDbkMsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixlQUFlO0FBQ2pCOztBQUNBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UsZUFBZTtBQUNqQjs7QUFDQTtJQUNJLGFBQWE7QUFDakI7O0FBQ0E7SUFDSSxXQUFXO0lBQ1gsa0JBQWtCO0FBQ3RCOztBQUNBO0VBQ0UsZUFBZTtHQUNkLGdCQUFnQjtHQUNoQixZQUFZO0dBQ1osWUFBWTtHQUNaLHFCQUFxQjtHQUNyQixpQkFBaUI7QUFDcEI7O0FBQ0E7RUFDRSxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLFdBQVc7RUFDWCxZQUFZO0VBQ1osYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7O0FBQ0E7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBQ0E7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQix5Q0FBeUM7RUFDekMsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUNBLDZCQUE2Qix5Q0FBeUM7RUFDcEUsWUFBWTtBQUNkOztBQUNBO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixTQUFTO0FBQ1g7O0FBQ0E7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQiw4QkFBOEI7RUFDOUIsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsZUFBZTtFQUNmLGNBQWM7QUFDaEI7O0FBQ0E7RUFDRSxxQ0FBcUM7RUFDckMsdUNBQXVDO0FBQ3pDOztBQUNBO0VBQ0UsYUFBYTtBQUNmOztBQUNBO0VBQ0UsVUFBVTtBQUNaOztBQUNBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UsZUFBZTtFQUNmLFlBQVk7RUFDWixVQUFVO0VBQ1YsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YscUNBQXFDO0VBQ3JDLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osYUFBYTtFQUNiLDZCQUE2QjtFQUM3QixtQkFBbUI7RUFDbkIsZUFBZTtBQUNqQjs7QUFDQTtFQUNFLFdBQVc7RUFDWCxxQkFBcUI7RUFDckIsZUFBZTtBQUNqQjs7QUFDQTtFQUNFLGVBQWU7QUFDakI7O0FBQ0E7O0VBRUUsYUFBYTtBQUNmOztBQUNBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFDQTtFQUNFLGFBQWE7RUFDYixpQkFBaUI7QUFDbkI7O0FBQ0E7Q0FDQyxpQkFBaUI7Q0FDakIsZUFBZTtDQUNmLG1CQUFtQjtBQUNwQjs7QUFDQTtDQUNDLGNBQWM7QUFDZjs7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjs7QUFDQTtDQUNDLGNBQWM7QUFDZjs7QUFDQTtDQUNDLGNBQWM7Q0FDZCxlQUFlO0FBQ2hCOztBQUVBO0VBQ0U7SUFDRSxZQUFZO0VBQ2Q7RUFDQTtJQUNFLGFBQWE7RUFDZjtBQUNGOztBQUNBO0VBQ0U7SUFDRSxhQUFhO0VBQ2Y7RUFDQTtJQUNFLGFBQWE7RUFDZjtFQUNBO0lBQ0Usd0JBQXdCO0VBQzFCO0VBQ0E7SUFDRSxnQkFBZ0I7RUFDbEI7RUFDQTtJQUNFLGtCQUFrQjtJQUNsQixTQUFTO0VBQ1g7RUFDQTtJQUNFLGtCQUFrQjtJQUNsQixtQkFBbUI7RUFDckI7RUFDQTtJQUNFLDhCQUE4QjtFQUNoQztFQUNBO0lBQ0UsaUJBQWlCO0VBQ25CO0VBQ0E7SUFDRSxjQUFjO0VBQ2hCO0VBQ0E7SUFDRSxXQUFXO0lBQ1gsWUFBWTtFQUNkO0VBQ0E7SUFDRSxxQkFBcUI7RUFDdkI7RUFDQTtNQUNJLGlCQUFpQjtNQUNqQixrQkFBa0I7RUFDdEI7RUFDQTtNQUNJLGVBQWU7RUFDbkI7RUFDQTtJQUNFLFdBQVc7SUFDWCxZQUFZO0VBQ2Q7QUFDRjs7QUFDQTtFQUNFO0lBQ0UsaUJBQWlCO0VBQ25CO0VBQ0E7SUFDRSxhQUFhO0VBQ2Y7RUFDQTtJQUNFLGFBQWE7RUFDZjtBQUNGIiwiZmlsZSI6IlRvcE5hdkJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRvZ3Mge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLyogU2VhcmNoIFN1Z2dldGlvbnMgKi9cclxuLnNlYXJjaFN1Z2dldGlvbiB7XHJcbiAgYmFja2dyb3VuZDogI0ZGRkZGRjtcclxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG59XHJcbi5zZWFyY2hTdWdnZXRpb24gdWwge1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgcGFkZGluZzogMThweCAwO1xyXG4gIG1hcmdpbjogMDtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIG1heC1oZWlnaHQ6IDQ2OHB4O1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuLnNlYXJjaFN1Z2dldGlvbiB1bCBsaSB7XHJcbiAgcGFkZGluZzogNnB4IDM1cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi5zZWFyY2hTdWdnZXRpb24gdWwgbGk6aG92ZXIge1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWxpZ2h0LWdyYXktY29sb3IpO1xyXG59XHJcblxyXG4vKiAvL1RvZ2dsZSBjc3MgKi9cclxuLm5hdmJhci10b2dnbGVyIHtcclxuICBwYWRkaW5nOiAwLjI1cmVtIDAuNzVyZW07XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbn1cclxuW3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkLFxyXG5bdHlwZT1cImNoZWNrYm94XCJdOm5vdCg6Y2hlY2tlZCkge1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgd2lkdGg6IDA7XHJcbn1cclxuLmRyb3Bkb3duOmNoZWNrZWQgKyBsYWJlbDpiZWZvcmUsXHJcbi5kcm9wZG93bjpub3QoOmNoZWNrZWQpICsgbGFiZWw6YmVmb3JlIHtcclxuICBjdXJzb3I6IGF1dG87XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbn1cclxuLmRyb3Bkb3duOmNoZWNrZWQgKyBsYWJlbDpiZWZvcmUge1xyXG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xyXG59XHJcbi5kcm9wZG93bjpub3QoOmNoZWNrZWQpICsgbGFiZWwgLnVpbCB7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyMDBtcyBsaW5lYXI7XHJcbn1cclxuLmRyb3Bkb3duOmNoZWNrZWQgKyBsYWJlbCAudWlsIHtcclxuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyMDBtcyBsaW5lYXI7XHJcbn1cclxuLnNlY3Rpb24tZHJvcGRvd24ge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzExMTtcclxuICAgIGNvbG9yOiAjZmZmIDtcclxuICAgIHRvcDogNzBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHotaW5kZXg6IDk5OTtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XHJcbiAgICB3aWR0aDogMzIwcHg7XHJcbiAgICBwYWRkaW5nOiAyMHB4IDA7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcblxyXG4uc2VjdGlvbi1kcm9wZG93bjphZnRlciB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogLTdweDtcclxuICByaWdodDogMjBweDtcclxuICB3aWR0aDogMDtcclxuICBoZWlnaHQ6IDA7XHJcbiAgYm9yZGVyLWxlZnQ6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICBib3JkZXItcmlnaHQ6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICBib3JkZXItYm90dG9tOiA4cHggc29saWQgIzExMTtcclxuICBjb250ZW50OiAnJztcclxuICBkaXNwbGF5OiBibG9jaztcclxuICB6LWluZGV4OiAyO1xyXG4gIHRyYW5zaXRpb246IGFsbCAyMDBtcyBsaW5lYXI7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG4uZHJvcGRvd24tc3ViOmNoZWNrZWQgKyBsYWJlbCxcclxuLmRyb3Bkb3duLXN1Yjpub3QoOmNoZWNrZWQpICsgbGFiZWwge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBjb2xvcjogI2ZmZjtcclxuICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgbGluZWFyO1xyXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxuICBib3JkZXItcmFkaXVzOiAycHg7XHJcbiAgcGFkZGluZzogNXB4IDA7XHJcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICAtd2Via2l0LWFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgLW1vei1hbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIC1tcy1hbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgLW1zLWZsZXgtcGFjazogZGlzdHJpYnV0ZTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4uZHJvcGRvd24tc3ViOmNoZWNrZWQgKyBsYWJlbCAudWlsLFxyXG4uZHJvcGRvd24tc3ViOm5vdCg6Y2hlY2tlZCkgKyBsYWJlbCAudWlsIHtcclxuICBmb250LXNpemU6IDIycHg7XHJcbn1cclxuLmRyb3Bkb3duLXN1Yjpub3QoOmNoZWNrZWQpICsgbGFiZWwgLnVpbCB7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDIwMG1zIGxpbmVhcjtcclxufVxyXG4uZHJvcGRvd24tc3ViOmNoZWNrZWQgKyBsYWJlbCAudWlsIHtcclxuICB0cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyMDBtcyBsaW5lYXI7XHJcbn1cclxuLnNlY3Rpb24tZHJvcGRvd24gYSB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgcGFkZGluZzogMTVweCAzMHB4O1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLnNlY3Rpb24tZHJvcGRvd24gYSBpIHtcclxuICB3aWR0aDogMjVweDtcclxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbn1cclxuLnNlY3Rpb24tZHJvcGRvd24tc3ViIHtcclxuICBtYXJnaW4tdG9wOiA1MHB4O1xyXG59XHJcbi5zZWN0aW9uLWRyb3Bkb3duLXN1YiBhIHtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgcGFkZGluZzogMTJweCAzMHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgY29sb3I6ICNmZmY7XHJcbn1cclxuLyogT3RoZXIgKi9cclxuLmRyb3Bkb3duLWl0ZW0ge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4uYmctbGlnaHQxIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxufVxyXG4uZm9ybSBzcGFuIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogMTJweDtcclxuICB0b3A6IDlweDtcclxuICBwYWRkaW5nOiAycHg7XHJcbiAgY29sb3I6ICMwMDA7XHJcbiAgZm9udC1zaXplOiAyMnB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5uYXYubmF2YmFyIHtcclxuICBib3gtc2hhZG93OiAwcHggOHB4IDhweCAtOHB4IHJnYigwIDAgMCAvIDEwJSk7XHJcbiAgaGVpZ2h0OiA4MHB4O1xyXG59XHJcbm5hdi5uYXZiYXIgLmNvbnRhaW5lci1mbHVpZCB7XHJcbiAgcGFkZGluZy1sZWZ0OiAzMHB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDMwcHg7XHJcbn1cclxuLmZvcm0gc3BhbiBpbWcge1xyXG4gIHdpZHRoOiAxOHB4O1xyXG59XHJcbi5mb3JtLWlucHV0IHtcclxuICB3aWR0aDogNDU0cHg7XHJcbiAgaGVpZ2h0OiA0OHB4O1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWxpZ2h0LWdyYXktY29sb3IpO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIGNvbG9yOiAjMDAwO1xyXG4gIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgcGFkZGluZy1sZWZ0OiA1MHB4O1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG4ubmF2LWl0ZW0ge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcbi5uYXZiYXItZXhwYW5kLWxnIC5uYXZiYXItbmF2IC5uYXYtbGluayB7XHJcbiAgcGFkZGluZzogMC44cmVtO1xyXG59XHJcbi50b2cxIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuLmRyb3Bkb3duLW1lbnV7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtOTRweDtcclxufVxyXG4ubGlua3Mge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICAgZm9udC13ZWlnaHQ6Ym9sZDtcclxuICAgY29sb3I6IGJsYWNrO1xyXG4gICBwYWRkaW5nOiAxcHg7XHJcbiAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgbWFyZ2luLWxlZnQ6IDE1cHg7XHJcbn1cclxuLmZvci1kcm9wZG93biB7XHJcbiAgbWFyZ2luLWxlZnQ6IDE0cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHdpZHRoOiA0OHB4O1xyXG4gIGhlaWdodDogNDhweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxufVxyXG4uZm9yLWRyb3Bkb3duOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC1ncmF5LWNvbG9yKTtcclxufVxyXG4ucHJvZmlsZWltZyB7XHJcbiAgd2lkdGg6IDQ4cHg7XHJcbiAgaGVpZ2h0OiA0OHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC1ncmF5LWNvbG9yKTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XHJcbn1cclxuLnByb2ZpbGVpbWc6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyZWVuKTtcclxufVxyXG4uZm9ybS1jb250cm9sOjpwbGFjZWhvbGRlciB7IC8qIENocm9tZSwgRmlyZWZveCwgT3BlcmEsIFNhZmFyaSAxMC4xKyAqL1xyXG4gIGNvbG9yOiBibGFjaztcclxufVxyXG4ubG9nbyB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB0b3A6IC04cHg7XHJcbn1cclxuLmFkZF9wb3N0IHtcclxuICB3aWR0aDogNDhweDtcclxuICBoZWlnaHQ6IDQ4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyZWVuKTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiAwO1xyXG59XHJcbi5hZGRfcG9zdDpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYnRuLWJnLWNvbG9yKTtcclxuICBjb2xvcjogdmFyKC0tYnRuLXRleHQtY29sb3IpICFpbXBvcnRhbnQ7XHJcbn1cclxuLnRvZ19zbSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG4ubmF2YmFyLXRvZ2dsZXIudG9nLm1iX21lbnUge1xyXG4gIHBhZGRpbmc6IDA7XHJcbn1cclxuLmRyb3Bkb3duX21iLnByb2ZpbGVpbWcge1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG59XHJcbm5hdi5mb290ZXIge1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICBib3R0b206IDIwcHg7XHJcbiAgbGVmdDogMzBweDtcclxuICByaWdodDogMzBweDtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIHotaW5kZXg6IDk7XHJcbiAgYm94LXNoYWRvdzogMCAwIDEycHggcmdiKDAgMCAwIC8gMjUlKTtcclxuICBib3JkZXItcmFkaXVzOiA0MHB4O1xyXG4gIGhlaWdodDogNjVweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMCAxMHB4O1xyXG59XHJcbm5hdi5mb290ZXIgLm5hdi1pdGVtIHtcclxuICBjb2xvcjogIzAwMDtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG59XHJcbi5uYXYtaXRlbSBpbWcge1xyXG4gIG1heC13aWR0aDogMzRweDtcclxufVxyXG5uYXYuY2hhdGJveC5mb290ZXIsXHJcbm5hdi5mb290ZXIuam9iY2hhdGJveCB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG4ubG9nb19sb2NhdGlvbiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5sb2dvX2xvY2F0aW9uIC5sb2NhdGlvbiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXJnaW4tbGVmdDogMjJweDtcclxufVxyXG4ubG9jYXRpb24gaS5mYS1tYXAtbWFya2VyLWFsdCB7XHJcblx0bWFyZ2luLXJpZ2h0OiA4cHg7XHJcblx0Zm9udC1zaXplOiAyNHB4O1xyXG5cdGNvbG9yOiB2YXIoLS1ncmVlbik7XHJcbn1cclxuLmxvY19kZXMge1xyXG5cdGxpbmUtaGVpZ2h0OiAxO1xyXG59XHJcbi5sb2NfZGVzIC50aXRsZSB7XHJcblx0Zm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG4ubG9jX2RlcyAudGl0bGUgLmZhLWNhcmV0LWRvd24ge1xyXG5cdGNvbG9yOiAjQzRDNEM0O1xyXG59XHJcbi5sb2NfZGVzIHNwYW4ge1xyXG5cdGNvbG9yOiAjMkQzRTUwO1xyXG5cdGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6MTEwMHB4KSB7XHJcbiAgLmZvcm0taW5wdXQge1xyXG4gICAgd2lkdGg6IDM1MHB4O1xyXG4gIH1cclxuICAubG9jX2RlcyBzcGFuIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOjc2N3B4KSB7XHJcbiAgLmxvZ28ge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbiAgLmhpZGVJblNtYWxsIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG4gIC50b2dzLCAuc2VhcmNoX3dyYXAge1xyXG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xyXG4gIH1cclxuICAuZm9yLWRyb3Bkb3duIHtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgfVxyXG4gIC5sb2dvX21iIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHRvcDogLTlweDtcclxuICB9XHJcbiAgbmF2Lm5hdmJhciAuY29udGFpbmVyLWZsdWlkIHtcclxuICAgIHBhZGRpbmctbGVmdDogMjNweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDIzcHg7XHJcbiAgfVxyXG4gIC5kcm9wZG93bl9tYi5wcm9maWxlaW1nIHtcclxuICAgIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWdyZWVuKTtcclxuICB9XHJcbiAgLm1iX21lbnUge1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgfVxyXG4gIC5wcm9maWxlaW1nIH4gLm1iX21lbnUge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDA7XHJcbiAgfVxyXG4gIC5zZWN0aW9uLWRyb3Bkb3duIHtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgd2lkdGg6IDI4MHB4O1xyXG4gIH1cclxuICAubG9nb19sb2NhdGlvbiB7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgfVxyXG4gIC5sb2dvX2xvY2F0aW9uIC5sb2NhdGlvbiB7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAxNnB4O1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgfVxyXG4gIC5sb2NhdGlvbiBpLmZhLW1hcC1tYXJrZXItYWx0IHtcclxuICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gIH1cclxuICBuYXYuZm9vdGVyIC5hZGRfcG9zdCB7XHJcbiAgICB3aWR0aDogNDRweDtcclxuICAgIGhlaWdodDogNDRweDtcclxuICB9XHJcbn1cclxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XHJcbiAgLmhpZGVJblNtYWxsIHtcclxuICAgIGRpc3BsYXk6IGNvbnRlbnRzO1xyXG4gIH1cclxuICAudG9nLCAuZHJvcGRvd25fbWIucHJvZmlsZWltZywgLmxvZ29fbWIsIC5tYl9tZW51IHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG4gIG5hdi5mb290ZXIge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbn1cclxuIl19 */"] });
function next(next, arg1, error, arg3) {
    throw new Error('Function not implemented.');
}


/***/ }),

/***/ 4920:
/*!****************************************************************!*\
  !*** ./src/app/Shared/services/NavbarCommunication.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavbarCommunicationService": () => (/* binding */ NavbarCommunicationService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);

class NavbarCommunicationService {
    constructor() {
        this.isShowingMenu = false;
        this.isShowingSearch = false;
    }
    Toggle() {
        this.isShowingMenu = false;
        this.isShowingSearch = true;
    }
}
NavbarCommunicationService.ɵfac = function NavbarCommunicationService_Factory(t) { return new (t || NavbarCommunicationService)(); };
NavbarCommunicationService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: NavbarCommunicationService, factory: NavbarCommunicationService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 5900:
/*!*****************************************************!*\
  !*** ./src/app/Wall/UserList/userList.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserListComponent": () => (/* binding */ UserListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_Wall_Wall_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/Wall/Wall.service */ 2558);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4666);




const _c0 = function () { return ["/profile"]; };
const _c1 = function (a0) { return { target: a0 }; };
function UserListComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "div", 3)(2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "img", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 6)(5, "h6");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "i", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](5, _c0))("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c1, item_r2.User.Id));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", item_r2.User == null ? null : item_r2.User.UserImage, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r2 == null ? null : item_r2.User == null ? null : item_r2.User.Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r2 == null ? null : item_r2.User == null ? null : item_r2.User.UserAddress);
} }
function UserListComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "br")(2, "br")(3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 9)(5, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.noResultText);
} }
class UserListComponent {
    constructor(_wallServices, activatedRoute) {
        this._wallServices = _wallServices;
        this.activatedRoute = activatedRoute;
        this.userId = 0;
        this.userParams = '';
        this.currentPage = 1;
        this.itemsPerPage = 8;
        this.walldatas = [];
        this.isLoading = true;
        this.NotEmptPost = true;
        this.noResultText = "Explore more with different keyword";
        if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.userId = this.user.Id;
        }
    }
    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            const paramVal = params['searchTag'];
            if (paramVal == undefined) {
                this.loadUserList(this.currentPage, this.itemsPerPage, this.userParams, this.userId);
            }
            else {
                this.userParams = paramVal;
                this.loadUserList(this.currentPage, this.itemsPerPage, this.userParams, this.userId);
            }
        });
    }
    loadUserList(currentPage, itemsPerPage, userParams, userId) {
        this.isLoading = true;
        this._wallServices.GetUserWall(currentPage, itemsPerPage, userParams, userId).subscribe((res) => {
            this.walldata = res.result;
            this.walldatas = res.result;
            this.pagination = res.pagination;
            this.isLoading = false;
            this.NotEmptPost = true;
        }, (err) => {
            this.isLoading = false;
            this.walldatas = [];
            this.NotEmptPost = false;
            this.noResultText = `Couldn't find any Profile with tag "${userParams}" try a different keyword.`;
        });
    }
}
UserListComponent.ɵfac = function UserListComponent_Factory(t) { return new (t || UserListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_Wall_Wall_service__WEBPACK_IMPORTED_MODULE_0__.WallService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute)); };
UserListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: UserListComponent, selectors: [["app-userList"]], decls: 3, vars: 2, consts: [[1, "user_list"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["routerLinkActive", "router-link-active", 1, "user_list_item", 3, "routerLink", "queryParams"], [1, "icon"], [1, "rounded-circle", "img-fluid", 3, "src"], [1, "c-details"], [1, "img", "share"], [1, "fa", "fa-angle-right"], [1, "col-md-12", "d-flex", "justify-content-center"], [1, "Search-result"]], template: function UserListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, UserListComponent_div_1_Template, 10, 8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, UserListComponent_div_2_Template, 7, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.walldatas);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.NotEmptPost);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLinkActive], styles: [".user_list[_ngcontent-%COMP%] {\n  max-width: 100%;\n  width: 630px;\n  padding-left: 15px;\n  padding-right: 15px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.user_list[_ngcontent-%COMP%]   .user_list_item[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 10px;\n  align-items: center;\n  padding: 12px 16px;\n  border-radius: 12px;\n  cursor: pointer;\n}\n.user_list[_ngcontent-%COMP%]   .user_list_item[_ngcontent-%COMP%]   i.fa[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-right: 30px;\n  display: none;\n}\n.user_list[_ngcontent-%COMP%]   .user_list_item[_ngcontent-%COMP%]:hover {\n  background: var(--light-gray-color);\n}\n.user_list[_ngcontent-%COMP%]   .user_list_item[_ngcontent-%COMP%]:hover   i.fa[_ngcontent-%COMP%] {\n  display: block;\n}\n.user_list[_ngcontent-%COMP%]   .user_list_item[_ngcontent-%COMP%]   .c-details[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.user_list[_ngcontent-%COMP%]   .user_list_item[_ngcontent-%COMP%]   .c-details[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  margin: 0 0 7px;\n}\n.user_list[_ngcontent-%COMP%]   .user_list_item[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  margin-right: 17px;\n}\n.user_list[_ngcontent-%COMP%]   .user_list_item[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   img.img-fluid[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n}\n.user_list[_ngcontent-%COMP%]   .user_list_item[_ngcontent-%COMP%]   .img.share[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1;\n}\n@media only screen and (max-width: 767px) {\n  .user_list[_ngcontent-%COMP%] {\n    padding-left: 0;\n    padding-right: 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJMaXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUNKO0FBQUk7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBRVI7QUFEUTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7QUFHWjtBQURRO0VBQ0ksbUNBQUE7QUFHWjtBQUZZO0VBQ0ksY0FBQTtBQUloQjtBQURRO0VBQ0ksT0FBQTtBQUdaO0FBRlk7RUFDSSxlQUFBO0FBSWhCO0FBRFE7RUFDSSxrQkFBQTtBQUdaO0FBRlk7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQUloQjtBQURRO0VBQ0ksZUFBQTtFQUNBLGNBQUE7QUFHWjtBQUNBO0VBQ0k7SUFDSSxlQUFBO0lBQ0EsZ0JBQUE7RUFFTjtBQUNGIiwiZmlsZSI6InVzZXJMaXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnVzZXJfbGlzdCB7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgIHdpZHRoOiA2MzBweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XG4gICAgcGFkZGluZy1yaWdodDogMTVweDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgLnVzZXJfbGlzdF9pdGVtIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZzogMTJweCAxNnB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGkuZmEge1xuICAgICAgICAgICAgZm9udC1zaXplOiAzMnB4O1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWxpZ2h0LWdyYXktY29sb3IpO1xuICAgICAgICAgICAgaS5mYSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmMtZGV0YWlscyB7XG4gICAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgICAgaDYge1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMCAwIDdweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuaWNvbiB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDE3cHg7XG4gICAgICAgICAgICBpbWcuaW1nLWZsdWlkIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogNDhweDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmltZy5zaGFyZSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgICAgfVxuICAgIH1cbn1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDo3NjdweCkge1xuICAgIC51c2VyX2xpc3Qge1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgfVxufSJdfQ== */"] });


/***/ }),

/***/ 9245:
/*!*****************************************************!*\
  !*** ./src/app/Wall/wallList/wallList.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WallListComponent": () => (/* binding */ WallListComponent)
/* harmony export */ });
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert2 */ 598);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngx_timeago_language_strings_en__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-timeago/language-strings/en */ 5260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-timeago */ 2699);
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-clipboard */ 1131);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Shared/services/NavbarCommunication.service */ 4920);
/* harmony import */ var _services_Wall_Wall_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/Wall/Wall.service */ 2558);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _services_JobPost_ReportJob_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/JobPost/ReportJob.service */ 1555);
/* harmony import */ var _services_JobPost_JobPost_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/JobPost/JobPost.service */ 9923);
/* harmony import */ var _services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/SharedServices/Shared.service */ 4937);
/* harmony import */ var _ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngneat/hot-toast */ 7403);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-infinite-scroll */ 2029);
/* harmony import */ var _UserList_userList_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../UserList/userList.component */ 5900);

















function WallListComponent_div_10_div_1_img_5_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "img", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function WallListComponent_div_10_div_1_img_5_Template_img_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r17); const item_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit; const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r15.RedirectToUser(item_r5.Job.User.Id)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("src", item_r5.Job == null ? null : item_r5.Job.User == null ? null : item_r5.Job.User.UserImage, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
} }
function WallListComponent_div_10_div_1_img_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "img", 54);
} if (rf & 2) {
    const item_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("src", item_r5.Job == null ? null : item_r5.Job.AnonmousUserPic, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
} }
function WallListComponent_div_10_div_1_h6_8_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "h6", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function WallListComponent_div_10_div_1_h6_8_Template_h6_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r22); const item_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit; const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r20.RedirectToUser(item_r5.Job.User.Id)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br")(3, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", item_r5 == null ? null : item_r5.Job.User.Name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("date", item_r5 == null ? null : item_r5.Job.CreatedBy);
} }
function WallListComponent_div_10_div_1_h6_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "h6", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Anonymous");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br")(3, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("date", item_r5 == null ? null : item_r5.Job.CreatedBy);
} }
function WallListComponent_div_10_div_1_a_15_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function WallListComponent_div_10_div_1_a_15_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r27); const item_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit; const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r25.AddToJob(item_r5 == null ? null : item_r5.Job == null ? null : item_r5.Job.Id)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Add to My Jobs");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function WallListComponent_div_10_div_1_a_16_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function WallListComponent_div_10_div_1_a_16_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r30); const item_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit; const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r28.RemoveToJob(item_r5 == null ? null : item_r5.Job == null ? null : item_r5.Job.Id)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Remove Job");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function WallListComponent_div_10_div_1_a_17_Template(rf, ctx) { if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function WallListComponent_div_10_div_1_a_17_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r33); const item_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit; const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r31.Report(item_r5 == null ? null : item_r5.Job == null ? null : item_r5.Job.Id)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Report");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function WallListComponent_div_10_div_1_img_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "img", 59);
} if (rf & 2) {
    const item_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("src", item_r5 == null ? null : item_r5.Job.ImagesUrl, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
} }
function WallListComponent_div_10_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 31)(1, "div", 32)(2, "div", 33)(3, "div", 34)(4, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, WallListComponent_div_10_div_1_img_5_Template, 1, 1, "img", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, WallListComponent_div_10_div_1_img_6_Template, 1, 1, "img", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, WallListComponent_div_10_div_1_h6_8_Template, 4, 2, "h6", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, WallListComponent_div_10_div_1_h6_9_Template, 4, 1, "h6", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "div", 41)(11, "div", 42)(12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](13, "img", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, WallListComponent_div_10_div_1_a_15_Template, 2, 0, "a", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](16, WallListComponent_div_10_div_1_a_16_Template, 2, 0, "a", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](17, WallListComponent_div_10_div_1_a_17_Template, 2, 0, "a", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "a", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function WallListComponent_div_10_div_1_Template_a_click_18_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r36); const item_r5 = restoredCtx.$implicit; const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r35.getJobId(item_r5 == null ? null : item_r5.Job == null ? null : item_r5.Job.Id, item_r5 == null ? null : item_r5.Job == null ? null : item_r5.Job.Descriptions)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](19, "Share");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "p", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](22, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function WallListComponent_div_10_div_1_Template_div_click_23_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r36); const item_r5 = restoredCtx.$implicit; const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r37.RedirectToJob(item_r5.Job.Id)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "div", 50)(25, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](26, WallListComponent_div_10_div_1_img_26_Template, 1, 1, "img", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r5.Job.IsAnonymous === false);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (item_r5.Job == null ? null : item_r5.Job.IsAnonymous) === true);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (item_r5 == null ? null : item_r5.Job.IsAnonymous) === false);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r5.Job.IsAnonymous === true);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.userId != (item_r5.Job == null ? null : item_r5.Job.User == null ? null : item_r5.Job.User.Id) && ctx_r2.userId && !(item_r5.Job == null ? null : item_r5.Job.IsAdded));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.userId != (item_r5.Job == null ? null : item_r5.Job.User == null ? null : item_r5.Job.User.Id) && ctx_r2.userId && (item_r5.Job == null ? null : item_r5.Job.IsAdded));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.userId != (item_r5.Job == null ? null : item_r5.Job.User == null ? null : item_r5.Job.User.Id) && ctx_r2.userId);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind3"](22, 10, item_r5 == null ? null : item_r5.Job.Descriptions, 0, 70), "", (item_r5 == null ? null : item_r5.Job.Descriptions.length) > 70 ? "..." : "", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (item_r5 == null ? null : item_r5.Job.ImagesUrl) != null);
} }
function WallListComponent_div_10_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "div")(2, "div")(3, "div")(4, "div")(5, "br")(6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function WallListComponent_div_10_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "br")(2, "br")(3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 61)(5, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r4.noResultText);
} }
function WallListComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, WallListComponent_div_10_div_1_Template, 27, 14, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, WallListComponent_div_10_div_2_Template, 7, 0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, WallListComponent_div_10_div_3_Template, 7, 1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r0.walldatas);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r0.NotEmptPost);
} }
function WallListComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "app-userList");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
class WallListComponent {
    constructor(intl, _clipboardService, titleService, metaService, navServices, _wallServices, activatedRoute, _reportServices, _jobServices, _sharedServices, toast, _router) {
        this._clipboardService = _clipboardService;
        this.titleService = titleService;
        this.metaService = metaService;
        this.navServices = navServices;
        this._wallServices = _wallServices;
        this.activatedRoute = activatedRoute;
        this._reportServices = _reportServices;
        this._jobServices = _jobServices;
        this._sharedServices = _sharedServices;
        this.toast = toast;
        this._router = _router;
        this.currentPosition = window.pageYOffset;
        this.flag = true;
        this.userParams = "";
        this.currentPage = 1;
        this.itemsPerPage = 8;
        this.walldatas = [];
        this.isLoading = true;
        this.noResultText = "Explore more with different keyword";
        this.userId = 0;
        //Scroll Variable
        this.NotEmptPost = true;
        this.notScrollY = true;
        this.isLogedIn = false;
        this.isJobAdded = false;
        this.shareJobId = 0;
        // TabToggleTrackVariable
        this.IsOnJob = true;
        intl.strings = ngx_timeago_language_strings_en__WEBPACK_IMPORTED_MODULE_9__.strings;
        intl.changes.next();
        if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.userId = this.user.Id;
            this.isLoading = true;
        }
    }
    ngOnInit() {
        this.titleService.setTitle(this.noResultText);
        this.metaService.updateTag({ property: 'og:title', content: 'Dynamics new' });
        this._sharedServices.checkInterNetConnection();
        this.activatedRoute.queryParams.subscribe(params => {
            const paramVal = params['searchTag'];
            if (paramVal == undefined) {
                this.LoadWallData(this.currentPage, this.itemsPerPage, this.userParams, this.userId);
            }
            else {
                this.userParams = paramVal;
                this.LoadWallData(this.currentPage, this.itemsPerPage, paramVal, this.userId);
            }
        });
    }
    //For Nav
    LogOut() {
        localStorage.clear();
        location.href = "/";
    }
    showToast() {
        this.toast.success('Link copied!', {
            position: 'top-center',
        });
    }
    LoadWallData(currentPage, itemsPerPage, userParams, userId) {
        currentPage = 1;
        this._wallServices
            .GetWall(currentPage, itemsPerPage, userParams, userId)
            .subscribe({
            next: (res) => {
                this.walldatas = res.result;
                this.pagination = res.pagination;
                this.isLoading = false;
                this.noResultText = "Explore more with different keyword";
            },
        });
    }
    LoadNextPost() {
        this.currentPage = this.currentPage + 1;
        this._wallServices
            .GetWall(this.currentPage, this.itemsPerPage, this.userParams, this.userId)
            .subscribe((res) => {
            const newData = res.result;
            this.isLoading = false;
            if (newData.length === 0) {
                this.NotEmptPost = false;
            }
            this.walldatas = this.walldatas.concat(newData);
            this.notScrollY = true;
            this.pagination = res.pagination;
        });
    }
    onScroll() {
        if (this.notScrollY && this.NotEmptPost) {
            this.noResultText = "Explore more with different keyword";
            this.notScrollY = false;
            this.LoadNextPost();
        }
    }
    // Job Added
    AddToJob(jobId) {
        let userJob = {
            jobModelId: jobId,
            socialAuthenticationId: this.userId,
        };
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
            text: "Please wait.. Adding job",
            showConfirmButton: false,
            icon: "info",
        });
        this._jobServices.AddJobToUser(userJob).subscribe((data) => {
            if (data._responce.Status == 422) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire(`This Job ${jobId} is already Added!`, "", "info");
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire(`Job ${jobId} Added successfully!`, "", "success");
                this.LoadWallData(this.currentPage, this.itemsPerPage, this.userParams, this.userId);
            }
        }, (err) => {
            console.log(err);
        });
    }
    // Job Removed
    RemoveToJob(jobId) {
        let userJob = {
            jobModelId: jobId,
            socialAuthenticationId: this.userId,
        };
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
            text: "Please wait.. Removing job",
            showConfirmButton: false,
            icon: "info",
        });
        this._jobServices.AddJobToUser(userJob).subscribe((data) => {
            if (data._responce.Status == 422) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire(`Job ${jobId} Removed successfully!`, "", "success");
                this.LoadWallData(this.currentPage, this.itemsPerPage, this.userParams, this.userId);
            }
            else {
            }
        }, (err) => {
            console.log(err);
        });
    }
    Report(jobId) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
            title: `Report Post`,
            input: "textarea",
            showDenyButton: true,
            confirmButtonText: "Report",
            denyButtonText: `Cancel`,
        })
            .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let reportJob = {
                    jobModelId: jobId,
                    socialAuthenticationId: this.userId,
                    Isusue: result.value,
                };
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
                    text: "Please wait... Reporting",
                    showConfirmButton: false,
                    icon: "info",
                });
                this._reportServices.ReportJob(reportJob).subscribe((data) => {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire(`Job ${jobId} Reported!`, "", "success");
                }, (err) => {
                    console.log(err);
                });
            }
            else if (result.isDenied) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire("Changes are not saved", "", "info");
            }
        });
    }
    // Suggetion list focous out
    hideEvent() {
        this.navServices.Toggle();
    }
    //Share Button
    getJobId(jobId, imgUrl) {
        this.shareimgUrl = imgUrl;
        this.shareJobId = jobId;
    }
    shareFB(jobId) {
        return window.open("https://www.facebook.com/sharer/sharer.php?" +
            "u=https://hoozonline.com/jobDetails?target=" +
            jobId, "Hooz", `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=600,height=300,left=100,top=100`);
    }
    shareTwitter(jobId) {
        return window.open("http://twitter.com/share?" +
            "url=https://hoozonline.com/jobDetails?target=" +
            jobId, "Hooz", `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
       width=600,height=300,left=100,top=100`);
    }
    shareWhatsApp(jobId) {
        return window.open("https://api.whatsapp.com/send?text=https://hoozonline.com/jobDetails?target=" +
            jobId, "_blank");
    }
    //Shared Link
    GetSharedLink(jobId) {
        this.sharedLink = "https://hoozonline.com/jobDetails?target=" + jobId;
        this._clipboardService.copy(this.sharedLink);
        this.showToast();
    }
    //Checkbox toggle method
    checkValue(event) {
        this.IsOnJob = event;
    }
    LogoClick() {
        window.location.href = "/";
    }
    RedirectToJob(jobId) {
        window.localStorage.setItem("des", "Descrip");
        this._router.navigate(['/jobDetails'], { queryParams: { target: jobId } });
    }
    RedirectToUser(userId) {
        this._router.navigate(['/profile'], { queryParams: { target: userId } });
    }
}
WallListComponent.ɵfac = function WallListComponent_Factory(t) { return new (t || WallListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](ngx_timeago__WEBPACK_IMPORTED_MODULE_10__.TimeagoIntl), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](ngx_clipboard__WEBPACK_IMPORTED_MODULE_11__.ClipboardService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_Shared_services_NavbarCommunication_service__WEBPACK_IMPORTED_MODULE_1__.NavbarCommunicationService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_Wall_Wall_service__WEBPACK_IMPORTED_MODULE_2__.WallService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_JobPost_ReportJob_service__WEBPACK_IMPORTED_MODULE_3__.ReportJobService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_JobPost_JobPost_service__WEBPACK_IMPORTED_MODULE_4__.JobPostService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_5__.SharedService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_14__.HotToastService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router)); };
WallListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: WallListComponent, selectors: [["app-wallList"]], decls: 33, vars: 4, consts: [[3, "click"], [1, "container-sm", "mt-0"], [1, "row", "col-sm-12"], [1, "d-flex", "switch_button_wrap"], [1, "switch-button"], ["type", "checkbox", 1, "switch-button-checkbox", 3, "ngModel", "ngModelChange", "change"], ["for", "", 1, "switch-button-label"], [1, "switch-button-label-span"], ["infiniteScroll", "", 1, "search-results", "mt-5", 3, "infiniteScrollDistance", "scrolled"], ["class", "row post_list_row", 4, "ngIf"], [4, "ngIf"], ["id", "staticBackdrop", "data-bs-backdrop", "static", "data-bs-keyboard", "false", "tabindex", "-1", "aria-labelledby", "staticBackdropLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-dialog-centered", "modal-dialog-scrollable"], [1, "modal-content", "ShareModel"], [1, "modal-header"], ["id", "staticBackdropLabel", 1, "modal-title"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close"], [1, "modal-body"], [1, "row"], [1, "social-buttons"], ["aria-label", "Facebook", 1, "social-buttons__button", "social-button", "social-button--facebook", 3, "click"], [1, "fab", "fa-facebook-f"], ["aria-label", "Twitter", 1, "social-buttons__button", "social-button", "social-button--twitter", 3, "click"], [1, "fab", "fa-twitter"], ["aria-label", "SnapChat", 1, "social-buttons__button", "social-button", "social-button--snapchat", 3, "click"], [1, "fa", "fa-link"], ["aria-label", "Whatsapp", 1, "social-buttons__button", "social-button", "social-button--steam", 3, "click"], [1, "fab", "fa-whatsapp"], [1, "row", "post_list_row"], ["class", "post_list", 4, "ngFor", "ngForOf"], ["class", "lds-ring", 4, "ngIf"], [1, "post_list"], [1, "post_card"], [1, "d-flex", "justify-content-between", "top_sec"], [1, "d-flex", "flex-row", "align-items-center"], [1, "icon"], ["class", "rounded-circle img-fluid", 3, "src", "click", 4, "ngIf"], ["class", "rounded-circle img-fluid", 3, "src", 4, "ngIf"], [1, "ms-2", "c-details"], ["class", "mb-0", 3, "click", 4, "ngIf"], ["class", "mb-0", 4, "ngIf"], [1, "d-flex", "justify-content-end", "share_sec"], [1, "dropdown"], ["src", "./../../../assets/Logo/3dots.svg", 1, "img", "img-responsive", "share"], [1, "dropdown-content", "mt-0"], ["style", "cursor: pointer;", 3, "click", 4, "ngIf"], [3, "click", 4, "ngIf"], ["data-bs-toggle", "modal", "data-bs-target", "#staticBackdrop", 2, "cursor", "pointer", 3, "click"], [1, "heading"], [1, "mt-1", 3, "click"], [1, ""], [1, "col-md-12", "bg-white", "overlay_bg"], ["class", "img-thumbnail img-responsive img-fluid", 3, "src", 4, "ngIf"], [1, "rounded-circle", "img-fluid", 3, "src", "click"], [1, "rounded-circle", "img-fluid", 3, "src"], [1, "mb-0", 3, "click"], ["timeago", "", 3, "date"], [1, "mb-0"], [2, "cursor", "pointer", 3, "click"], [1, "img-thumbnail", "img-responsive", "img-fluid", 3, "src"], [1, "lds-ring"], [1, "col-md-12", "d-flex", "justify-content-center"], [1, "Search-result"]], template: function WallListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function WallListComponent_Template_div_click_0_listener() { return ctx.hideEvent(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function WallListComponent_Template_input_ngModelChange_5_listener($event) { return !(ctx.IsOnJob = $event); })("change", function WallListComponent_Template_input_change_5_listener() { return ctx.checkValue(ctx.IsOnJob ? false : true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "label", 6)(7, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, "Posts");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("scrolled", function WallListComponent_Template_div_scrolled_9_listener() { return ctx.onScroll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](10, WallListComponent_div_10_Template, 4, 3, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](11, WallListComponent_div_11_Template, 2, 0, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](12, "br")(13, "br")(14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "div", 11)(16, "div", 12)(17, "div", 13)(18, "div", 14)(19, "h5", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20, "Share with");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](21, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](22, "div", 17)(23, "div", 18)(24, "div", 19)(25, "a", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function WallListComponent_Template_a_click_25_listener() { return ctx.shareFB(ctx.shareJobId); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](26, "i", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](27, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function WallListComponent_Template_a_click_27_listener() { return ctx.shareTwitter(ctx.shareJobId); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](28, "i", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](29, "a", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function WallListComponent_Template_a_click_29_listener() { return ctx.GetSharedLink(ctx.shareJobId); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](30, "i", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](31, "a", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function WallListComponent_Template_a_click_31_listener() { return ctx.shareWhatsApp(ctx.shareJobId); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](32, "i", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", !ctx.IsOnJob);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("infiniteScrollDistance", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.IsOnJob);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.IsOnJob);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgModel, ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_6__.InfiniteScrollDirective, ngx_timeago__WEBPACK_IMPORTED_MODULE_10__.TimeagoDirective, _UserList_userList_component__WEBPACK_IMPORTED_MODULE_7__.UserListComponent, _angular_common__WEBPACK_IMPORTED_MODULE_15__.SlicePipe], styles: [".switch-button[_ngcontent-%COMP%]:before {\n  content: \"Profiles\";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 136px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 3;\n  font-weight: normal;\n  pointer-events: none;\n}\n\n.row.post_list_row[_ngcontent-%COMP%] {\n  justify-content: center;\n  margin-left: -15px;\n  margin-right: -15px;\n}\n\n.post_list[_ngcontent-%COMP%] {\n  width: 350px;\n  padding-left: 15px;\n  padding-right: 15px;\n  margin-bottom: 40px;\n  cursor: pointer;\n}\n\n.post_list[_ngcontent-%COMP%]   .top_sec[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n\n.post_list[_ngcontent-%COMP%]   .c-details[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n}\n\n.post_list[_ngcontent-%COMP%]   .c-details[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 400;\n  font-size: 15px;\n}\n\n.post_list[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%] {\n  line-height: 25px;\n  padding: 0 10px;\n  margin-bottom: 10px;\n}\n\n.post_list[_ngcontent-%COMP%]   img.img-thumbnail[_ngcontent-%COMP%] {\n  max-height: 380px;\n  width: 100%;\n  object-fit: cover;\n}\n\n@media only screen and (min-width: 768px) {\n  .form[_ngcontent-%COMP%] {\n    width: 538px;\n  }\n\n  .hideInSmall[_ngcontent-%COMP%] {\n    display: contents;\n  }\n\n  .tog[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .togs[_ngcontent-%COMP%] {\n    display: block;\n  }\n\n  .card-text[_ngcontent-%COMP%] {\n    font-size: 28px;\n    font-weight: bolder;\n    color: white;\n  }\n}\n\n.form-input[_ngcontent-%COMP%] {\n  height: 40px;\n  text-indent: 0;\n  border-radius: 10px;\n  background-color: #eff2f5;\n  color: #000;\n}\n\n.navbar-toggler[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: 1px solid transparent;\n}\n\n.links[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: black;\n  padding: 1px;\n  text-decoration: none;\n}\n\n.share[_ngcontent-%COMP%] {\n  height: 1.3rem;\n  width: auto;\n}\n\n\n\n.cd[_ngcontent-%COMP%] {\n  height: 230px;\n  border-radius: 0.5rem;\n}\n\n.tog1[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: none;\n  padding: 0ch;\n  margin-bottom: 0px;\n  transition: all 0.3s ease-in-out;\n}\n\n.card[_ngcontent-%COMP%]   .card-block[_ngcontent-%COMP%] {\n  border-radius: 1.55rem;\n}\n\n.order-card[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n\n\n\n.dropdown-item[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.bg-light1[_ngcontent-%COMP%] {\n  background-color: white;\n}\n\n.form[_ngcontent-%COMP%]   .fa-search[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 20px;\n  left: 20px;\n  color: #9ca3af;\n}\n\n.form[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 17px;\n  top: 4px;\n  padding: 2px;\n}\n\n.nav-item[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n.navbar-expand-lg[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  padding: 0.8rem;\n}\n\n.profileimg[_ngcontent-%COMP%] {\n  margin-top: -8px;\n}\n\n.dropdown-menu[_ngcontent-%COMP%] {\n  float: left;\n}\n\n.form-control[_ngcontent-%COMP%]::placeholder {\n  \n  color: black;\n  content: \"ds\";\n}\n\n.img-thumbnail[_ngcontent-%COMP%] {\n  padding: 0rem;\n  background-color: #fff;\n  border: 0px solid #dee2e6;\n  border-radius: 12px;\n  max-width: 100%;\n  height: auto;\n}\n\n\n\n.search-results[_ngcontent-%COMP%] {\n  overflow-x: hidden;\n  padding-left: 30px;\n  padding-right: 30px;\n}\n\nbody[_ngcontent-%COMP%] {\n  background-color: #eee;\n  width: 100%;\n  overflow-x: hidden;\n}\n\n.icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  background-color: white;\n  border-radius: 15px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 39px;\n}\n\n.badge[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background-color: #fffbec;\n  width: 60px;\n  height: 25px;\n  padding-bottom: 3px;\n  border-radius: 5px;\n  display: flex;\n  color: #fed85d;\n  justify-content: center;\n  align-items: center;\n}\n\n.text1[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n}\n\n.text2[_ngcontent-%COMP%] {\n  color: #a5aec0;\n}\n\n\n\n.lds-ring[_ngcontent-%COMP%] {\n  display: inline-block;\n  position: fixed;\n  width: 80px;\n  height: 80px;\n  top: 260px;\n  z-index: 9;\n}\n\n.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 64px;\n  height: 64px;\n  border: 8px solid black;\n  border-radius: 50%;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: black transparent transparent transparent;\n}\n\n.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: -0.45s;\n}\n\n.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: -0.3s;\n}\n\n.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: -0.15s;\n}\n\n@keyframes lds-ring {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n\n\n.searchSuggetion[_ngcontent-%COMP%] {\n  background: #ffffff;\n  overflow: hidden;\n  border-radius: 10px;\n  cursor: pointer;\n  z-index: 999;\n  width: inherit;\n  position: absolute;\n  box-shadow: rgba(0, 0, 0, 0.16) 0px 4px 16px;\n  border: 1px solid rgba(0, 0, 0, 0.0509803922);\n}\n\n.searchSuggetion[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  color: rgb(4, 17, 29);\n  list-style-type: none;\n  margin-left: -32px;\n  line-height: 5ch;\n  z-index: 999;\n  border-bottom: 0px solid rgb(229, 232, 235);\n}\n\n.searchSuggetion[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  color: var(--hover-color);\n  z-index: 999;\n  box-shadow: 0 0 1px 1px lightgray;\n}\n\n\n\n[type=checkbox][_ngcontent-%COMP%]:checked, [type=checkbox][_ngcontent-%COMP%]:not(:checked) {\n  opacity: 0;\n}\n\n.dropdown[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%]:before, .dropdown[_ngcontent-%COMP%]:not(:checked)    + label[_ngcontent-%COMP%]:before {\n  cursor: auto;\n  pointer-events: none;\n}\n\n.dropdown[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%]:before {\n  pointer-events: auto;\n}\n\n.dropdown[_ngcontent-%COMP%]:not(:checked)    + label[_ngcontent-%COMP%]   .uil[_ngcontent-%COMP%] {\n  font-size: 24px;\n  transition: transform 200ms linear;\n}\n\n.dropdown[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%]   .uil[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n  transition: transform 200ms linear;\n}\n\n.section-dropdown1[_ngcontent-%COMP%]:before {\n  position: absolute;\n  top: -20px;\n  left: 0;\n  width: 100%;\n  height: 20px;\n  content: \"\";\n  display: block;\n  z-index: 1;\n}\n\n.section-dropdown1[_ngcontent-%COMP%]:after {\n  position: absolute;\n  top: -7px;\n  left: 152px;\n  width: 0;\n  height: 0;\n  border-left: 8px solid transparent;\n  border-right: 8px solid transparent;\n  border-bottom: 8px solid #111;\n  content: \"\";\n  display: block;\n  z-index: 2;\n  transition: all 200ms linear;\n}\n\n.dropdown[_ngcontent-%COMP%]:checked    ~ .section-dropdown1[_ngcontent-%COMP%] {\n  opacity: 1;\n  pointer-events: auto;\n  transform: translateY(0);\n  padding: 22px;\n  color: #fff !important;\n  width: max-content;\n}\n\n.section-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  background-color: #111;\n  color: #fff !important;\n  padding: 2px;\n  top: 70px;\n  margin-left: 200px;\n  width: 16% !important;\n  border-radius: 0.6rem;\n  display: block;\n  box-shadow: 0 14px 35px 0 rgba(9, 9, 12, 0.4);\n  z-index: 2;\n  opacity: 0;\n  pointer-events: none;\n  \n  height: 500px;\n}\n\n.dropdown[_ngcontent-%COMP%]:checked    ~ .section-dropdown[_ngcontent-%COMP%] {\n  opacity: 1;\n  pointer-events: auto;\n  transform: translateY(0);\n  padding: 22px;\n  color: #fff !important;\n  width: max-content;\n}\n\n.section-dropdown[_ngcontent-%COMP%]:before {\n  position: absolute;\n  top: -20px;\n  left: 0;\n  width: 100%;\n  height: 20px;\n  content: \"\";\n  display: block;\n  z-index: 1;\n}\n\n.section-dropdown[_ngcontent-%COMP%]:after {\n  position: absolute;\n  top: -7px;\n  left: 211px;\n  width: 0;\n  height: 0;\n  border-left: 8px solid transparent;\n  border-right: 8px solid transparent;\n  border-bottom: 8px solid #111;\n  content: \"\";\n  display: block;\n  z-index: 2;\n  transition: all 200ms linear;\n}\n\n.dropdown-sub[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%], .dropdown-sub[_ngcontent-%COMP%]:not(:checked)    + label[_ngcontent-%COMP%] {\n  position: relative;\n  color: #fff;\n  transition: all 200ms linear;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 500;\n  font-size: 15px;\n  border-radius: 2px;\n  padding: 5px 0;\n  padding-left: 20px;\n  padding-right: 15px;\n  text-align: left;\n  text-decoration: none;\n  display: flex;\n  -moz-align-items: center;\n  -ms-align-items: center;\n  align-items: center;\n  justify-content: space-between;\n  -ms-flex-pack: distribute;\n  cursor: pointer;\n}\n\n.dropdown-sub[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%]   .uil[_ngcontent-%COMP%], .dropdown-sub[_ngcontent-%COMP%]:not(:checked)    + label[_ngcontent-%COMP%]   .uil[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n\n.dropdown-sub[_ngcontent-%COMP%]:not(:checked)    + label[_ngcontent-%COMP%]   .uil[_ngcontent-%COMP%] {\n  transition: transform 200ms linear;\n}\n\n.dropdown-sub[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%]   .uil[_ngcontent-%COMP%] {\n  transform: rotate(135deg);\n  transition: transform 200ms linear;\n}\n\n.section-dropdown-sub[_ngcontent-%COMP%] {\n  position: relative;\n  display: block;\n  width: 100%;\n  pointer-events: none;\n  opacity: 0;\n  max-height: 0;\n  padding-left: 10px;\n  padding-right: 3px;\n  overflow: hidden;\n  transition: all 200ms linear;\n}\n\n.dropdown-sub[_ngcontent-%COMP%]:checked    ~ .section-dropdown-sub[_ngcontent-%COMP%] {\n  pointer-events: auto;\n  opacity: 1;\n}\n\n#b[_ngcontent-%COMP%] {\n  color: #fff !important;\n  text-decoration: none;\n  font-size: medium;\n  font-weight: bold;\n  font-family: inherit;\n  padding: 6px;\n  margin-bottom: 2px;\n  cursor: pointer;\n}\n\n#s[_ngcontent-%COMP%] {\n  color: #fff !important;\n  text-decoration: none;\n  font-size: small;\n  font-weight: normal;\n  font-family: inherit;\n  padding: 6px;\n  margin-bottom: 2px;\n  cursor: pointer;\n}\n\n.section-dropdown-sub[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n\n.share_sec[_ngcontent-%COMP%] {\n  align-items: center;\n  padding-right: 10px;\n}\n\n@media only screen and (max-width: 767px) {\n  .hideInSmall[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .img-responsive[_ngcontent-%COMP%] {\n    margin-bottom: 2px;\n  }\n\n  .togs[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .card-text[_ngcontent-%COMP%] {\n    font-size: 28px;\n    font-weight: bolder;\n    color: white;\n  }\n\n  .section-dropdown1[_ngcontent-%COMP%] {\n    position: absolute;\n    background-color: #111;\n    color: #fff !important;\n    padding: 2px;\n    top: 70px;\n    margin-left: 517px;\n    width: 16%;\n    border-radius: 0.6rem;\n    display: block;\n    box-shadow: 0 14px 35px 0 rgba(9, 9, 12, 0.4);\n    z-index: 2;\n    opacity: 0;\n    pointer-events: none;\n    transform: translateY(20px);\n    transition: all 200ms linear;\n    height: 500px;\n  }\n\n  .form[_ngcontent-%COMP%] {\n    width: 500px;\n  }\n\n  .search-results[_ngcontent-%COMP%] {\n    padding-left: 15px;\n    padding-right: 15px;\n  }\n}\n\n@media only screen and (max-width: 720px) {\n  .post_list[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .post_list[_ngcontent-%COMP%]   img.img-thumbnail.img-responsive[_ngcontent-%COMP%] {\n    margin: 0 auto;\n    display: block;\n  }\n\n  .lds-ring[_ngcontent-%COMP%] {\n    top: 230px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhbGxMaXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFVBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0FBQ0Y7O0FBQ0E7RUFDRSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFFRjs7QUFBQTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBR0Y7O0FBRkU7RUFDRSxtQkFBQTtBQUlKOztBQURJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FBR047O0FBRk07RUFDSSxnQkFBQTtFQUNBLGVBQUE7QUFJVjs7QUFBRTtFQUNFLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0FBRUo7O0FBQUU7RUFBbUIsaUJBQUE7RUFBa0IsV0FBQTtFQUFZLGlCQUFBO0FBS25EOztBQUZBO0VBQ0M7SUFDRyxZQUFBO0VBS0Y7O0VBSEQ7SUFDRyxpQkFBQTtFQU1GOztFQUpEO0lBQ0csYUFBQTtFQU9GOztFQUxEO0lBQ0UsY0FBQTtFQVFEOztFQU5EO0lBQ0csZUFBQTtJQUNBLG1CQUFBO0lBQ0EsWUFBQTtFQVNGO0FBQ0Y7O0FBUEE7RUFDRSxZQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxXQUFBO0FBU0Y7O0FBUEE7RUFDSSw2QkFBQTtFQUNELDZCQUFBO0FBVUg7O0FBUkM7RUFDQyxpQkFBQTtFQUNDLFlBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7QUFXSDs7QUFUQztFQUNDLGNBQUE7RUFDQSxXQUFBO0FBWUY7O0FBVkUsMkJBQUE7O0FBQ0E7RUFDRSxhQUFBO0VBQ0EscUJBQUE7QUFhSjs7QUFWRTtFQUNFLGFBQUE7QUFhSjs7QUFYQTtFQUNFLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUVBLGdDQUFBO0FBY0Y7O0FBWEE7RUFDRSxzQkFBQTtBQWNGOztBQVhBO0VBQ0UsZUFBQTtBQWNGOztBQVpFLCtCQUFBOztBQUVGO0VBQ0UsZUFBQTtBQWNGOztBQVpBO0VBQ0UsdUJBQUE7QUFlRjs7QUFiQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxjQUFBO0FBZ0JGOztBQWJBO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7QUFnQkY7O0FBZEE7RUFDRSxpQkFBQTtBQWlCRjs7QUFmQTtFQUNFLGVBQUE7QUFrQkY7O0FBaEJBO0VBQ0UsZ0JBQUE7QUFtQkY7O0FBakJBO0VBQ0UsV0FBQTtBQW9CRjs7QUFsQkE7RUFBNkIseUNBQUE7RUFDM0IsWUFBQTtFQUNBLGFBQUE7QUFzQkY7O0FBcEJBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FBdUJGOztBQXJCQSxhQUFBOztBQUNBO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBd0JGOztBQXRCQTtFQUNJLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBeUJKOztBQXZCQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtBQTBCSjs7QUF4QkE7RUFDSSx5QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQTJCSjs7QUF4QkE7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7QUEyQko7O0FBeEJBO0VBQ0ksY0FBQTtBQTJCSjs7QUF4QkEsYUFBQTs7QUFFQTtFQUNFLHFCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7QUEwQkY7O0FBeEJBO0VBQ0Usc0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSw4REFBQTtFQUNBLHVEQUFBO0FBMkJGOztBQXpCQTtFQUNFLHVCQUFBO0FBNEJGOztBQTFCQTtFQUNFLHNCQUFBO0FBNkJGOztBQTNCQTtFQUNFLHVCQUFBO0FBOEJGOztBQTVCQTtFQUNFO0lBQ0UsdUJBQUE7RUErQkY7RUE3QkE7SUFDRSx5QkFBQTtFQStCRjtBQUNGOztBQTNCQSxzQkFBQTs7QUFDQTtFQUNFLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDRCxZQUFBO0VBQ0MsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsNENBQUE7RUFDQSw2Q0FBQTtBQTZCRjs7QUEzQkE7RUFDRSxnQkFBQTtFQUNFLGVBQUE7RUFDQSxxQkFBQTtFQUNGLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSwyQ0FBQTtBQThCRjs7QUEzQkE7RUFDRSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxpQ0FBQTtBQThCRjs7QUE1QkEsaUJBQUE7O0FBRUE7O0VBRUUsVUFBQTtBQThCRjs7QUE1QkE7O0VBRUUsWUFBQTtFQUNBLG9CQUFBO0FBK0JGOztBQTdCQTtFQUNFLG9CQUFBO0FBZ0NGOztBQTlCQTtFQUNFLGVBQUE7RUFDQSxrQ0FBQTtBQWlDRjs7QUEvQkE7RUFDRSx5QkFBQTtFQUNBLGtDQUFBO0FBa0NGOztBQTlCQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsVUFBQTtBQWlDRjs7QUEvQkE7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxrQ0FBQTtFQUNBLG1DQUFBO0VBQ0EsNkJBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLFVBQUE7RUFDQSw0QkFBQTtBQWtDRjs7QUFoQ0E7RUFDRSxVQUFBO0VBQ0Esb0JBQUE7RUFDQSx3QkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FBbUNGOztBQWhDQTtFQUNFLGtCQUFBO0VBQ0Usc0JBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0VBQ0EsY0FBQTtFQUNBLDZDQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7RUFDQSxvQkFBQTtFQUNBO2lDQUFBO0VBR0YsYUFBQTtBQWtDRjs7QUFoQ0E7RUFDRSxVQUFBO0VBQ0Esb0JBQUE7RUFDQSx3QkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FBbUNGOztBQWpDQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsVUFBQTtBQW9DRjs7QUFsQ0E7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxrQ0FBQTtFQUNBLG1DQUFBO0VBQ0EsNkJBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLFVBQUE7RUFDQSw0QkFBQTtBQXFDRjs7QUFqQ0E7O0VBRUUsa0JBQUE7RUFDQSxXQUFBO0VBQ0EsNEJBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBRUEsYUFBQTtFQUVBLHdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0UseUJBQUE7RUFDQSxlQUFBO0FBb0NKOztBQWxDQTs7RUFFRSxlQUFBO0FBcUNGOztBQW5DQTtFQUNFLGtDQUFBO0FBc0NGOztBQXBDQTtFQUNFLHlCQUFBO0VBQ0Esa0NBQUE7QUF1Q0Y7O0FBckNBO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLG9CQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQXdDRjs7QUF0Q0E7RUFDRSxvQkFBQTtFQUNBLFVBQUE7QUF5Q0Y7O0FBdkNDO0VBQ0Msc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUEwQ0Y7O0FBdkNDO0VBQ0Msc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUEwQ0Y7O0FBeENBO0VBQ0UsZUFBQTtBQTJDRjs7QUF6Q0E7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0FBNENGOztBQXpDQTtFQUNFO0lBQ0UsYUFBQTtFQTRDRjs7RUExQ0E7SUFDRSxrQkFBQTtFQTZDRjs7RUEzQ0E7SUFDRSxhQUFBO0VBOENGOztFQTVDQTtJQUNFLGVBQUE7SUFDQSxtQkFBQTtJQUNBLFlBQUE7RUErQ0Y7O0VBN0NBO0lBQ0ksa0JBQUE7SUFDQSxzQkFBQTtJQUNBLHNCQUFBO0lBQ0EsWUFBQTtJQUNBLFNBQUE7SUFDQSxrQkFBQTtJQUNBLFVBQUE7SUFDQSxxQkFBQTtJQUNBLGNBQUE7SUFDQSw2Q0FBQTtJQUNBLFVBQUE7SUFDQSxVQUFBO0lBQ0Esb0JBQUE7SUFDQSwyQkFBQTtJQUNBLDRCQUFBO0lBQ0EsYUFBQTtFQWdESjs7RUE5Q0E7SUFDRyxZQUFBO0VBaURIOztFQS9DQTtJQUNFLGtCQUFBO0lBQ0EsbUJBQUE7RUFrREY7QUFDRjs7QUFoREE7RUFDRTtJQUNFLFdBQUE7RUFrREY7RUFqREU7SUFDRSxjQUFBO0lBQ0EsY0FBQTtFQW1ESjs7RUFoREE7SUFDRSxVQUFBO0VBbURGO0FBQ0YiLCJmaWxlIjoid2FsbExpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc3dpdGNoLWJ1dHRvbjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiUHJvZmlsZXNcIjtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGJvdHRvbTogMDtcclxuICByaWdodDogMDtcclxuICB3aWR0aDogMTM2cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHotaW5kZXg6IDM7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxufVxyXG4ucm93LnBvc3RfbGlzdF9yb3cge1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIG1hcmdpbi1sZWZ0OiAtMTVweDtcclxuICBtYXJnaW4tcmlnaHQ6IC0xNXB4O1xyXG59XHJcbi5wb3N0X2xpc3Qge1xyXG4gIHdpZHRoOiAzNTBweDtcclxuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbiAgcGFkZGluZy1yaWdodDogMTVweDtcclxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICAudG9wX3NlYyB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG4gIH1cclxuICAuYy1kZXRhaWxzIHtcclxuICAgIGg2IHtcclxuICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICBzcGFuIHtcclxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgLmhlYWRpbmcge1xyXG4gICAgbGluZS1oZWlnaHQ6IDI1cHg7XHJcbiAgICBwYWRkaW5nOiAwIDEwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIH1cclxuICBpbWcuaW1nLXRodW1ibmFpbCB7bWF4LWhlaWdodDogMzgwcHg7d2lkdGg6IDEwMCU7b2JqZWN0LWZpdDogY292ZXI7fVxyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XHJcbiAuZm9ybSB7XHJcbiAgICB3aWR0aDogNTM4cHg7XHJcbiB9XHJcbiAuaGlkZUluU21hbGwge1xyXG4gICAgZGlzcGxheTpjb250ZW50cztcclxuIH1cclxuIC50b2cge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuIH1cclxuIC50b2dzIHtcclxuICAgZGlzcGxheTogYmxvY2s7XHJcbiB9XHJcbiAuY2FyZC10ZXh0IHtcclxuICAgIGZvbnQtc2l6ZTogMjhweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgfVxyXG59XHJcbi5mb3JtLWlucHV0IHtcclxuICBoZWlnaHQ6IDQwcHg7XHJcbiAgdGV4dC1pbmRlbnQ6IDA7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZmMmY1O1xyXG4gIGNvbG9yOiAjMDAwO1xyXG59XHJcbi5uYXZiYXItdG9nZ2xlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbn1cclxuIC5saW5rcyB7XHJcbiAgZm9udC13ZWlnaHQ6Ym9sZDtcclxuICAgY29sb3I6IGJsYWNrO1xyXG4gICBwYWRkaW5nOiAxcHg7XHJcbiAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuIH1cclxuIC5zaGFyZXtcclxuICBoZWlnaHQ6IDEuM3JlbTtcclxuICB3aWR0aDogYXV0bztcclxuIH1cclxuICAvKiBDYXJkIEZvciBObyBKb2IgSW1hZ2VzICovXHJcbiAgLmNke1xyXG4gICAgaGVpZ2h0OiAyMzBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcclxuICB9XHJcblxyXG4gIC50b2cxe1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbi5jYXJkIHtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBwYWRkaW5nOiAwY2g7XHJcbiAgbWFyZ2luLWJvdHRvbTogMHB4O1xyXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XHJcbn1cclxuXHJcbi5jYXJkIC5jYXJkLWJsb2NrIHtcclxuICBib3JkZXItcmFkaXVzOiAxLjU1cmVtO1xyXG59XHJcblxyXG4ub3JkZXItY2FyZCBpIHtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbn1cclxuICAvKkVuZCAgQ2FyZCBGb3IgTm8gSm9iIEltYWdlcyAqL1xyXG5cclxuLmRyb3Bkb3duLWl0ZW17XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi5iZy1saWdodDF7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbn1cclxuLmZvcm0gLmZhLXNlYXJjaCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMjBweDtcclxuICBsZWZ0OiAyMHB4O1xyXG4gIGNvbG9yOiAjOWNhM2FmXHJcbn1cclxuXHJcbi5mb3JtIHNwYW4ge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICByaWdodDogMTdweDtcclxuICB0b3A6IDRweDtcclxuICBwYWRkaW5nOiAycHg7XHJcbn1cclxuLm5hdi1pdGVtIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG4ubmF2YmFyLWV4cGFuZC1sZyAubmF2YmFyLW5hdiAubmF2LWxpbmsgIHtcclxuICBwYWRkaW5nOiAwLjhyZW07XHJcbn1cclxuLnByb2ZpbGVpbWcge1xyXG4gIG1hcmdpbi10b3A6IC04cHg7XHJcbn1cclxuLmRyb3Bkb3duLW1lbnV7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbn1cclxuLmZvcm0tY29udHJvbDo6cGxhY2Vob2xkZXIgeyAvKiBDaHJvbWUsIEZpcmVmb3gsIE9wZXJhLCBTYWZhcmkgMTAuMSsgKi9cclxuICBjb2xvcjogYmxhY2s7XHJcbiAgY29udGVudDogXCJkc1wiO1xyXG59XHJcbi5pbWctdGh1bWJuYWlsIHtcclxuICBwYWRkaW5nOiAwcmVtO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgYm9yZGVyOiAwcHggc29saWQgI2RlZTJlNjtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IGF1dG87XHJcbn1cclxuLyogTmF2IE92ZXIgKi9cclxuLnNlYXJjaC1yZXN1bHRzIHtcclxuICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgcGFkZGluZy1sZWZ0OiAzMHB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDMwcHg7XHJcbn1cclxuYm9keSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbn1cclxuLmljb24ge1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiAzOXB4XHJcbn1cclxuLmJhZGdlIHNwYW4ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmJlYztcclxuICAgIHdpZHRoOiA2MHB4O1xyXG4gICAgaGVpZ2h0OiAyNXB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDNweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBjb2xvcjogI2ZlZDg1ZDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlclxyXG59XHJcblxyXG4udGV4dDEge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMFxyXG59XHJcblxyXG4udGV4dDIge1xyXG4gICAgY29sb3I6ICNhNWFlYzBcclxufVxyXG5cclxuLyogLy9Mb2FkZXIgKi9cclxuXHJcbi5sZHMtcmluZyB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICB3aWR0aDogODBweDtcclxuICBoZWlnaHQ6IDgwcHg7XHJcbiAgdG9wOiAyNjBweDtcclxuICB6LWluZGV4OiA5O1xyXG59XHJcbi5sZHMtcmluZyBkaXYge1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHdpZHRoOiA2NHB4O1xyXG4gIGhlaWdodDogNjRweDtcclxuICBib3JkZXI6IDhweCBzb2xpZCBibGFjaztcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYW5pbWF0aW9uOiBsZHMtcmluZyAxLjJzIGN1YmljLWJlemllcigwLjUsIDAsIDAuNSwgMSkgaW5maW5pdGU7XHJcbiAgYm9yZGVyLWNvbG9yOiBibGFjayB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtcclxufVxyXG4ubGRzLXJpbmcgZGl2Om50aC1jaGlsZCgxKSB7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAtMC40NXM7XHJcbn1cclxuLmxkcy1yaW5nIGRpdjpudGgtY2hpbGQoMikge1xyXG4gIGFuaW1hdGlvbi1kZWxheTogLTAuM3M7XHJcbn1cclxuLmxkcy1yaW5nIGRpdjpudGgtY2hpbGQoMykge1xyXG4gIGFuaW1hdGlvbi1kZWxheTogLTAuMTVzO1xyXG59XHJcbkBrZXlmcmFtZXMgbGRzLXJpbmcge1xyXG4gIDAlIHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gIH1cclxuICAxMDAlIHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLyogU2VhcmNoIFN1Z2dldGlvbnMgKi9cclxuLnNlYXJjaFN1Z2dldGlvbntcclxuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcblx0ei1pbmRleDogOTk5O1xyXG4gIHdpZHRoOmluaGVyaXQ7XHJcbiAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgYm94LXNoYWRvdzogcmdiKDAgMCAwIC8gMTYlKSAwcHggNHB4IDE2cHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDAwMDBkO1xyXG59XHJcbi5zZWFyY2hTdWdnZXRpb24gdWwgbGkge1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBjb2xvcjogcmdiKDQsIDE3LCAyOSk7XHJcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gIG1hcmdpbi1sZWZ0OiAtMzJweDtcclxuICBsaW5lLWhlaWdodDogNWNoO1xyXG4gIHotaW5kZXg6IDk5OTtcclxuICBib3JkZXItYm90dG9tOiAwcHggc29saWQgcmdiKDIyOSwgMjMyLCAyMzUpO1xyXG5cclxufVxyXG4uc2VhcmNoU3VnZ2V0aW9uIHVsIGxpOmhvdmVyIHtcclxuICBjb2xvcjogdmFyKC0taG92ZXItY29sb3IpO1xyXG4gIHotaW5kZXg6IDk5OTtcclxuICBib3gtc2hhZG93OiAwIDAgMXB4IDFweCBsaWdodGdyYXk7XHJcbn1cclxuLyogLy9Ub2dnbGUgY3NzICovXHJcblxyXG5bdHlwZT1cImNoZWNrYm94XCJdOmNoZWNrZWQsXHJcblt0eXBlPVwiY2hlY2tib3hcIl06bm90KDpjaGVja2VkKXtcclxuICBvcGFjaXR5OiAwO1xyXG59XHJcbi5kcm9wZG93bjpjaGVja2VkICsgbGFiZWw6YmVmb3JlLFxyXG4uZHJvcGRvd246bm90KDpjaGVja2VkKSArIGxhYmVsOmJlZm9yZXtcclxuICBjdXJzb3I6IGF1dG87XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbn1cclxuLmRyb3Bkb3duOmNoZWNrZWQgKyBsYWJlbDpiZWZvcmV7XHJcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XHJcbn1cclxuLmRyb3Bkb3duOm5vdCg6Y2hlY2tlZCkgKyBsYWJlbCAudWlsIHtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDIwMG1zIGxpbmVhcjtcclxufVxyXG4uZHJvcGRvd246Y2hlY2tlZCArIGxhYmVsIC51aWwge1xyXG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDIwMG1zIGxpbmVhcjtcclxufVxyXG5cclxuXHJcbi5zZWN0aW9uLWRyb3Bkb3duMTpiZWZvcmUge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IC0yMHB4O1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHotaW5kZXg6IDE7XHJcbn1cclxuLnNlY3Rpb24tZHJvcGRvd24xOmFmdGVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAtN3B4O1xyXG4gIGxlZnQ6IDE1MnB4O1xyXG4gIHdpZHRoOiAwO1xyXG4gIGhlaWdodDogMDtcclxuICBib3JkZXItbGVmdDogOHB4IHNvbGlkIHRyYW5zcGFyZW50O1xyXG4gIGJvcmRlci1yaWdodDogOHB4IHNvbGlkIHRyYW5zcGFyZW50O1xyXG4gIGJvcmRlci1ib3R0b206IDhweCBzb2xpZCAjMTExO1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHotaW5kZXg6IDI7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGxpbmVhcjtcclxufVxyXG4uZHJvcGRvd246Y2hlY2tlZCB+IC5zZWN0aW9uLWRyb3Bkb3duMXtcclxuICBvcGFjaXR5OiAxO1xyXG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcclxuICBwYWRkaW5nOiAyMnB4O1xyXG4gIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XHJcbiAgd2lkdGg6IG1heC1jb250ZW50O1xyXG59XHJcblxyXG4uc2VjdGlvbi1kcm9wZG93biB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzExMTtcclxuICAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiAycHg7XHJcbiAgICB0b3A6IDcwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMjAwcHg7XHJcbiAgICB3aWR0aDogMTYlICFpbXBvcnRhbnQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwLjZyZW07XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGJveC1zaGFkb3c6IDAgMTRweCAzNXB4IDAgcmdiKDkgOSAxMiAvIDQwJSk7XHJcbiAgICB6LWluZGV4OiAyO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgLyogdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgbGluZWFyOyAqL1xyXG5cclxuICBoZWlnaHQ6IDUwMHB4O1xyXG59XHJcbi5kcm9wZG93bjpjaGVja2VkIH4gLnNlY3Rpb24tZHJvcGRvd257XHJcbiAgb3BhY2l0eTogMTtcclxuICBwb2ludGVyLWV2ZW50czogYXV0bztcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XHJcbiAgcGFkZGluZzogMjJweDtcclxuICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xyXG4gIHdpZHRoOiBtYXgtY29udGVudDtcclxufVxyXG4uc2VjdGlvbi1kcm9wZG93bjpiZWZvcmUge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IC0yMHB4O1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHotaW5kZXg6IDE7XHJcbn1cclxuLnNlY3Rpb24tZHJvcGRvd246YWZ0ZXIge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IC03cHg7XHJcbiAgbGVmdDogMjExcHg7XHJcbiAgd2lkdGg6IDA7XHJcbiAgaGVpZ2h0OiAwO1xyXG4gIGJvcmRlci1sZWZ0OiA4cHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgYm9yZGVyLXJpZ2h0OiA4cHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgYm9yZGVyLWJvdHRvbTogOHB4IHNvbGlkICMxMTE7XHJcbiAgY29udGVudDogJyc7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgei1pbmRleDogMjtcclxuICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgbGluZWFyO1xyXG59XHJcblxyXG5cclxuLmRyb3Bkb3duLXN1YjpjaGVja2VkICsgbGFiZWwsXHJcbi5kcm9wZG93bi1zdWI6bm90KDpjaGVja2VkKSArIGxhYmVse1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBjb2xvcjogI2ZmZjtcclxuICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgbGluZWFyO1xyXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxuICBib3JkZXItcmFkaXVzOiAycHg7XHJcbiAgcGFkZGluZzogNXB4IDA7XHJcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICAtd2Via2l0LWFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgLW1vei1hbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIC1tcy1hbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgLW1zLWZsZXgtcGFjazogZGlzdHJpYnV0ZTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4uZHJvcGRvd24tc3ViOmNoZWNrZWQgKyBsYWJlbCAudWlsLFxyXG4uZHJvcGRvd24tc3ViOm5vdCg6Y2hlY2tlZCkgKyBsYWJlbCAudWlse1xyXG4gIGZvbnQtc2l6ZTogMjJweDtcclxufVxyXG4uZHJvcGRvd24tc3ViOm5vdCg6Y2hlY2tlZCkgKyBsYWJlbCAudWlsIHtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjAwbXMgbGluZWFyO1xyXG59XHJcbi5kcm9wZG93bi1zdWI6Y2hlY2tlZCArIGxhYmVsIC51aWwge1xyXG4gIHRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDIwMG1zIGxpbmVhcjtcclxufVxyXG4uc2VjdGlvbi1kcm9wZG93bi1zdWIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICB3aWR0aDogMTAwJTtcclxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICBvcGFjaXR5OiAwO1xyXG4gIG1heC1oZWlnaHQ6IDA7XHJcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDNweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRyYW5zaXRpb246IGFsbCAyMDBtcyBsaW5lYXI7XHJcbn1cclxuLmRyb3Bkb3duLXN1YjpjaGVja2VkIH4gLnNlY3Rpb24tZHJvcGRvd24tc3Vie1xyXG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xyXG4gIG9wYWNpdHk6IDE7XHJcbn1cclxuICNie1xyXG4gIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xyXG4gIHBhZGRpbmc6IDZweDtcclxuICBtYXJnaW4tYm90dG9tOiAycHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4gI3N7XHJcbiAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgZm9udC1zaXplOiBzbWFsbDtcclxuICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xyXG4gIHBhZGRpbmc6IDZweDtcclxuICBtYXJnaW4tYm90dG9tOiAycHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi5zZWN0aW9uLWRyb3Bkb3duLXN1YiBhIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuLnNoYXJlX3NlYyB7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NzY3cHgpIHtcclxuICAuaGlkZUluU21hbGwge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbiAgLmltZy1yZXNwb25zaXZlIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDJweDtcclxuICB9XHJcbiAgLnRvZ3Mge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbiAgLmNhcmQtdGV4dCB7XHJcbiAgICBmb250LXNpemU6IDI4cHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gIH1cclxuICAuc2VjdGlvbi1kcm9wZG93bjEge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxMTE7XHJcbiAgICAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XHJcbiAgICAgIHBhZGRpbmc6IDJweDtcclxuICAgICAgdG9wOiA3MHB4O1xyXG4gICAgICBtYXJnaW4tbGVmdDogNTE3cHg7XHJcbiAgICAgIHdpZHRoOiAxNiU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAuNnJlbTtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIGJveC1zaGFkb3c6IDAgMTRweCAzNXB4IDAgcmdiKDkgOSAxMiAvIDQwJSk7XHJcbiAgICAgIHotaW5kZXg6IDI7XHJcbiAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XHJcbiAgICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBsaW5lYXI7XHJcbiAgICAgIGhlaWdodDogNTAwcHg7XHJcbiAgfVxyXG4gIC5mb3JtIHtcclxuICAgICB3aWR0aDogNTAwcHg7XHJcbiAgfVxyXG4gIC5zZWFyY2gtcmVzdWx0cyB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xyXG4gIH1cclxufVxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NzIwcHgpIHtcclxuICAucG9zdF9saXN0IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaW1nLmltZy10aHVtYm5haWwuaW1nLXJlc3BvbnNpdmUge1xyXG4gICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5sZHMtcmluZyB7XHJcbiAgICB0b3A6IDIzMHB4O1xyXG4gIH1cclxuXHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _Auth_Login_Login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Auth/Login/Login.component */ 9893);
/* harmony import */ var _ChatModule_Chatbox_Chatbox_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChatModule/Chatbox/Chatbox.component */ 7322);
/* harmony import */ var _ChatModule_Chats_Chats_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChatModule/Chats/Chats.component */ 6655);
/* harmony import */ var _ChatModule_JobChat_JobChat_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChatModule/JobChat/JobChat.component */ 584);
/* harmony import */ var _guard_activate_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./guard/activate-guard */ 5473);
/* harmony import */ var _guard_authPage_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./guard/authPage.guard */ 4796);
/* harmony import */ var _guard_Login_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./guard/Login.guard */ 5092);
/* harmony import */ var _Job_JobDetails_JobDetail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Job/JobDetails/JobDetail.component */ 812);
/* harmony import */ var _Job_JobEdit_JobEdit_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Job/JobEdit/JobEdit.component */ 7651);
/* harmony import */ var _Job_JobList_JobList_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Job/JobList/JobList.component */ 443);
/* harmony import */ var _Job_JobPost_JobPost_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Job/JobPost/JobPost.component */ 2073);
/* harmony import */ var _Profile_EditProfile_Edit_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Profile/EditProfile/Edit.component */ 4026);
/* harmony import */ var _Profile_UserProfile_UserProfile_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Profile/UserProfile/UserProfile.component */ 3664);
/* harmony import */ var _Settings_Download_Download_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Settings/Download/Download.component */ 145);
/* harmony import */ var _Settings_HelpDesk_HelpDesk_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Settings/HelpDesk/HelpDesk.component */ 9384);
/* harmony import */ var _Wall_wallList_wallList_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Wall/wallList/wallList.component */ 9245);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 2560);



















const routes = [
    {
        path: 'login',
        component: _Auth_Login_Login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent,
        canActivate: [_guard_authPage_guard__WEBPACK_IMPORTED_MODULE_5__.authPageGaurd]
    },
    {
        path: '',
        component: _Wall_wallList_wallList_component__WEBPACK_IMPORTED_MODULE_15__.WallListComponent
    },
    {
        path: 'profile',
        component: _Profile_UserProfile_UserProfile_component__WEBPACK_IMPORTED_MODULE_12__.UserProfileComponent
    },
    {
        path: 'editProfile',
        component: _Profile_EditProfile_Edit_component__WEBPACK_IMPORTED_MODULE_11__.EditComponent,
        canActivate: [_guard_Login_guard__WEBPACK_IMPORTED_MODULE_6__.LoginGaurd]
    },
    {
        path: 'jobDetails',
        component: _Job_JobDetails_JobDetail_component__WEBPACK_IMPORTED_MODULE_7__.JobDetailComponent
    },
    {
        path: 'jobpost',
        component: _Job_JobPost_JobPost_component__WEBPACK_IMPORTED_MODULE_10__.JobPostComponent,
        canActivate: [_guard_Login_guard__WEBPACK_IMPORTED_MODULE_6__.LoginGaurd],
        canDeactivate: [_guard_activate_guard__WEBPACK_IMPORTED_MODULE_4__.PendingChangesGuard]
    },
    {
        path: 'joblist',
        component: _Job_JobList_JobList_component__WEBPACK_IMPORTED_MODULE_9__.JobListComponent,
        canActivate: [_guard_Login_guard__WEBPACK_IMPORTED_MODULE_6__.LoginGaurd]
    },
    {
        path: 'editJob',
        component: _Job_JobEdit_JobEdit_component__WEBPACK_IMPORTED_MODULE_8__.JobEditComponent,
        canActivate: [_guard_Login_guard__WEBPACK_IMPORTED_MODULE_6__.LoginGaurd]
    },
    {
        path: 'chat',
        component: _ChatModule_Chats_Chats_component__WEBPACK_IMPORTED_MODULE_2__.ChatsComponent,
        canActivate: [_guard_Login_guard__WEBPACK_IMPORTED_MODULE_6__.LoginGaurd]
    },
    {
        path: 'chatbox',
        component: _ChatModule_Chatbox_Chatbox_component__WEBPACK_IMPORTED_MODULE_1__.ChatboxComponent,
        canActivate: [_guard_Login_guard__WEBPACK_IMPORTED_MODULE_6__.LoginGaurd]
    },
    {
        path: 'jobchatbox',
        component: _ChatModule_JobChat_JobChat_component__WEBPACK_IMPORTED_MODULE_3__.JobChatComponent,
        canActivate: [_guard_Login_guard__WEBPACK_IMPORTED_MODULE_6__.LoginGaurd]
    },
    {
        path: 'settings/helpDesk',
        component: _Settings_HelpDesk_HelpDesk_component__WEBPACK_IMPORTED_MODULE_14__.HelpDeskComponent
    },
    {
        path: 'settings/download',
        component: _Settings_Download_Download_component__WEBPACK_IMPORTED_MODULE_13__.DownloadComponent
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_17__.RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }), _angular_router__WEBPACK_IMPORTED_MODULE_17__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_17__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_17__.RouterModule] }); })();


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _services_SeoService_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/SeoService.service */ 8335);
/* harmony import */ var _services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/SharedServices/Shared.service */ 4937);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _ngx_loading_bar_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-loading-bar/core */ 3571);
/* harmony import */ var _Shared_TopNavBar_TopNavBar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Shared/TopNavBar/TopNavBar.component */ 9679);







function AppComponent_app_TopNavBar_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "app-TopNavBar", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("notifyParent", function AppComponent_app_TopNavBar_1_Template_app_TopNavBar_notifyParent_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.Search($event)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
class AppComponent {
    constructor(_router, activatedRoute, seoService, _sharedServices) {
        this._router = _router;
        this.activatedRoute = activatedRoute;
        this.seoService = seoService;
        this._sharedServices = _sharedServices;
        this.loggedIn = false;
    }
    ngOnInit() {
        this.token = localStorage.getItem('user');
        this.IsLogin();
    }
    Search(searchTerm) {
        this._router.navigate(['/'], { queryParams: { searchTag: searchTerm } });
    }
    IsLogin() {
        if (this.token) {
            this.loggedIn = true;
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_SeoService_service__WEBPACK_IMPORTED_MODULE_0__.SeoServiceService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_1__.SharedService)); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 2, consts: [["color", "#00fa9a", "height", "4px", 3, "includeSpinner"], [3, "notifyParent", 4, "ngIf"], [3, "notifyParent"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "ngx-loading-bar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AppComponent_app_TopNavBar_1_Template, 1, 0, "app-TopNavBar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "router-outlet");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("includeSpinner", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx._sharedServices.IslogingPage);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet, _ngx_loading_bar_core__WEBPACK_IMPORTED_MODULE_6__.LoadingBarComponent, _Shared_TopNavBar_TopNavBar_component__WEBPACK_IMPORTED_MODULE_2__.TopNavBarComponent], encapsulation: 2 });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule),
/* harmony export */   "MyIntl": () => (/* binding */ MyIntl)
/* harmony export */ });
/* harmony import */ var _Job_JobDetails_JobDetail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Job/JobDetails/JobDetail.component */ 812);
/* harmony import */ var _Shared_Shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Shared/Shared.module */ 4637);
/* harmony import */ var _Wall_UserList_userList_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Wall/UserList/userList.component */ 5900);
/* harmony import */ var _Auth_Login_Login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Auth/Login/Login.component */ 9893);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _sweetalert2_ngx_sweetalert2__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @sweetalert2/ngx-sweetalert2 */ 8727);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _ngx_loading_bar_router__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @ngx-loading-bar/router */ 239);
/* harmony import */ var _ngx_loading_bar_core__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @ngx-loading-bar/core */ 3571);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _Shared_TopNavBar_TopNavBar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Shared/TopNavBar/TopNavBar.component */ 9679);
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! angularx-social-login */ 4260);
/* harmony import */ var _ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @ngneat/hot-toast */ 7403);
/* harmony import */ var _services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/SharedServices/Shared.service */ 4937);
/* harmony import */ var _guard_activate_guard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./guard/activate-guard */ 5473);
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @agm/core */ 3333);
/* harmony import */ var _Wall_wallList_wallList_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Wall/wallList/wallList.component */ 9245);
/* harmony import */ var ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-infinite-scroll */ 2029);
/* harmony import */ var ngx_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ngx-copy-to-clipboard */ 4934);
/* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ngx-timeago */ 2699);
/* harmony import */ var _Settings_Download_Download_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Settings/Download/Download.component */ 145);
/* harmony import */ var _Settings_HelpDesk_HelpDesk_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Settings/HelpDesk/HelpDesk.component */ 9384);
/* harmony import */ var _Job_JobEdit_JobEdit_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Job/JobEdit/JobEdit.component */ 7651);
/* harmony import */ var _Job_JobList_JobList_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Job/JobList/JobList.component */ 443);
/* harmony import */ var _Job_JobPost_JobPost_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Job/JobPost/JobPost.component */ 2073);
/* harmony import */ var _Job_JobResponce_JobResponce_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Job/JobResponce/JobResponce.component */ 1750);
/* harmony import */ var _ChatModule_Chatbox_Chatbox_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ChatModule/Chatbox/Chatbox.component */ 7322);
/* harmony import */ var _ChatModule_Chats_Chats_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ChatModule/Chats/Chats.component */ 6655);
/* harmony import */ var _ChatModule_JobChat_JobChat_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./ChatModule/JobChat/JobChat.component */ 584);
/* harmony import */ var _Profile_EditProfile_Edit_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Profile/EditProfile/Edit.component */ 4026);
/* harmony import */ var _Profile_UserProfile_UserProfile_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Profile/UserProfile/UserProfile.component */ 3664);









































class MyIntl extends ngx_timeago__WEBPACK_IMPORTED_MODULE_22__.TimeagoIntl {
}
class AppModule {
    constructor(platformId, appId) {
        this.platformId = platformId;
        this.appId = appId;
        const platform = (0,_angular_common__WEBPACK_IMPORTED_MODULE_23__.isPlatformBrowser)(platformId) ?
            'in the browser' : 'on the server';
        console.log(`Running ${platform} with appId=${appId}`);
    }
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_24__.PLATFORM_ID), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_24__.APP_ID)); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineInjector"]({ providers: [
        _services_SharedServices_Shared_service__WEBPACK_IMPORTED_MODULE_7__.SharedService,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: angularx_social_login__WEBPACK_IMPORTED_MODULE_25__.GoogleLoginProvider.PROVIDER_ID,
                        provider: new angularx_social_login__WEBPACK_IMPORTED_MODULE_25__.GoogleLoginProvider('547202752586-q5lou7tho2mp7ej1g7cfci3hq5offm46.apps.googleusercontent.com')
                    },
                    {
                        id: angularx_social_login__WEBPACK_IMPORTED_MODULE_25__.FacebookLoginProvider.PROVIDER_ID,
                        provider: new angularx_social_login__WEBPACK_IMPORTED_MODULE_25__.FacebookLoginProvider('529256848841971')
                    },
                ]
            },
        },
        _guard_activate_guard__WEBPACK_IMPORTED_MODULE_8__.PendingChangesGuard
    ], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__.BrowserModule.withServerTransition({ appId: 'tour-of-heroes' }),
        _Shared_Shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
        _angular_common__WEBPACK_IMPORTED_MODULE_23__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_27__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_27__.ReactiveFormsModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__.AppRoutingModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_28__.HttpClientModule,
        _ngx_loading_bar_router__WEBPACK_IMPORTED_MODULE_29__.LoadingBarRouterModule,
        ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_10__.InfiniteScrollModule,
        ngx_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_30__.NgxCopyToClipboardModule,
        ngx_timeago__WEBPACK_IMPORTED_MODULE_22__.TimeagoModule.forRoot({
            intl: { provide: ngx_timeago__WEBPACK_IMPORTED_MODULE_22__.TimeagoIntl },
            formatter: { provide: ngx_timeago__WEBPACK_IMPORTED_MODULE_22__.TimeagoFormatter, useClass: ngx_timeago__WEBPACK_IMPORTED_MODULE_22__.TimeagoCustomFormatter },
        }),
        angularx_social_login__WEBPACK_IMPORTED_MODULE_25__.SocialLoginModule,
        // for Core use:
        _ngx_loading_bar_core__WEBPACK_IMPORTED_MODULE_31__.LoadingBarModule,
        _ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_32__.HotToastModule.forRoot(),
        _sweetalert2_ngx_sweetalert2__WEBPACK_IMPORTED_MODULE_33__.SweetAlert2Module.forRoot(),
        _agm_core__WEBPACK_IMPORTED_MODULE_34__.AgmCoreModule.forRoot({
            apiKey: 'AIzaSyC2FrT93DXiG5u9Ow2LCAie6wIxoQzv5qQ',
            libraries: ['places']
        })] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__.AppComponent,
        _Shared_TopNavBar_TopNavBar_component__WEBPACK_IMPORTED_MODULE_6__.TopNavBarComponent,
        _Auth_Login_Login_component__WEBPACK_IMPORTED_MODULE_3__.LoginComponent,
        _Wall_wallList_wallList_component__WEBPACK_IMPORTED_MODULE_9__.WallListComponent,
        _Wall_UserList_userList_component__WEBPACK_IMPORTED_MODULE_2__.UserListComponent,
        _Job_JobDetails_JobDetail_component__WEBPACK_IMPORTED_MODULE_0__.JobDetailComponent,
        _Job_JobEdit_JobEdit_component__WEBPACK_IMPORTED_MODULE_13__.JobEditComponent,
        _Job_JobList_JobList_component__WEBPACK_IMPORTED_MODULE_14__.JobListComponent,
        _Job_JobPost_JobPost_component__WEBPACK_IMPORTED_MODULE_15__.JobPostComponent,
        _Job_JobResponce_JobResponce_component__WEBPACK_IMPORTED_MODULE_16__.JobResponceComponent,
        _ChatModule_Chatbox_Chatbox_component__WEBPACK_IMPORTED_MODULE_17__.ChatboxComponent,
        _ChatModule_Chats_Chats_component__WEBPACK_IMPORTED_MODULE_18__.ChatsComponent,
        _Profile_EditProfile_Edit_component__WEBPACK_IMPORTED_MODULE_20__.EditComponent,
        _Profile_UserProfile_UserProfile_component__WEBPACK_IMPORTED_MODULE_21__.UserProfileComponent,
        _ChatModule_JobChat_JobChat_component__WEBPACK_IMPORTED_MODULE_19__.JobChatComponent,
        _Settings_HelpDesk_HelpDesk_component__WEBPACK_IMPORTED_MODULE_12__.HelpDeskComponent,
        _Settings_Download_Download_component__WEBPACK_IMPORTED_MODULE_11__.DownloadComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__.BrowserModule, _Shared_Shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
        _angular_common__WEBPACK_IMPORTED_MODULE_23__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_27__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_27__.ReactiveFormsModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__.AppRoutingModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_28__.HttpClientModule,
        _ngx_loading_bar_router__WEBPACK_IMPORTED_MODULE_29__.LoadingBarRouterModule,
        ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_10__.InfiniteScrollModule,
        ngx_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_30__.NgxCopyToClipboardModule, ngx_timeago__WEBPACK_IMPORTED_MODULE_22__.TimeagoModule, angularx_social_login__WEBPACK_IMPORTED_MODULE_25__.SocialLoginModule,
        // for Core use:
        _ngx_loading_bar_core__WEBPACK_IMPORTED_MODULE_31__.LoadingBarModule, _ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_32__.HotToastModule, _sweetalert2_ngx_sweetalert2__WEBPACK_IMPORTED_MODULE_33__.SweetAlert2Module, _agm_core__WEBPACK_IMPORTED_MODULE_34__.AgmCoreModule] }); })();


/***/ }),

/***/ 5092:
/*!**************************************!*\
  !*** ./src/app/guard/Login.guard.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginGaurd": () => (/* binding */ LoginGaurd)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 124);


class LoginGaurd {
    constructor(_router) {
        this._router = _router;
    }
    canActivate(next, state) {
        if (localStorage.getItem('user')) {
            return true;
        }
        else {
            window.location.href = '/login';
            return false;
        }
    }
}
LoginGaurd.ɵfac = function LoginGaurd_Factory(t) { return new (t || LoginGaurd)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router)); };
LoginGaurd.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoginGaurd, factory: LoginGaurd.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 5473:
/*!*****************************************!*\
  !*** ./src/app/guard/activate-guard.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PendingChangesGuard": () => (/* binding */ PendingChangesGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);

class PendingChangesGuard {
    canDeactivate(component) {
        // if there are no pending changes, just allow deactivation; else confirm first
        return component.canDeactivate() ?
            true :
            // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
            // when navigating away from your angular app, the browser will show a generic warning message
            // see http://stackoverflow.com/a/42207299/7307355
            confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
    }
}
PendingChangesGuard.ɵfac = function PendingChangesGuard_Factory(t) { return new (t || PendingChangesGuard)(); };
PendingChangesGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PendingChangesGuard, factory: PendingChangesGuard.ɵfac });


/***/ }),

/***/ 4796:
/*!*****************************************!*\
  !*** ./src/app/guard/authPage.guard.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authPageGaurd": () => (/* binding */ authPageGaurd)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 124);


class authPageGaurd {
    constructor(_router) {
        this._router = _router;
    }
    canActivate(next, state) {
        if (!localStorage.getItem('user')) {
            return true;
        }
        else {
            window.location.href = '/';
            return false;
        }
    }
}
authPageGaurd.ɵfac = function authPageGaurd_Factory(t) { return new (t || authPageGaurd)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router)); };
authPageGaurd.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: authPageGaurd, factory: authPageGaurd.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 2521:
/*!**************************************************!*\
  !*** ./src/app/services/Auth/Profile.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileService": () => (/* binding */ ProfileService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 8987);



class ProfileService {
    constructor(_http) {
        this._http = _http;
        this.baseURL = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_url;
    }
    GetUserProfile(id) {
        return this._http.get(this.baseURL + 'User/UserById/' + id);
    }
    load() {
        return this._http.get('');
    }
    UpdateUser(id, user) {
        return this._http.post(this.baseURL + 'User/' + id, user);
    }
    UpdateUserPhoto(userId, file) {
        return this._http.post(this.baseURL + 'AuthLogin/AddAuthUserImage/' + userId, file);
    }
    RemoveUserPhoto(userId) {
        return this._http.post(this.baseURL + 'AuthLogin/RemoveAuthUserImage/' + userId, {});
    }
    AddAuthUserCoverImage(userId, file) {
        return this._http.post(this.baseURL + 'AuthLogin/AddAuthUserCoverImage/' + userId, file);
    }
    Login(user) {
        return this._http.post(this.baseURL + 'AuthLogin/AddAuthUser', user);
    }
    LogOut(loginId) {
        return this._http.post(this.baseURL + 'AuthLogin/LogOut/' + loginId, {});
    }
    IsOnline(loginId) {
        return this._http.get(this.baseURL + 'AuthLogin/IsOnline/' + loginId);
    }
}
ProfileService.ɵfac = function ProfileService_Factory(t) { return new (t || ProfileService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
ProfileService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ProfileService, factory: ProfileService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 9597:
/*!**********************************************************!*\
  !*** ./src/app/services/Chat/JobChat/JobChat.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JobChatService": () => (/* binding */ JobChatService)
/* harmony export */ });
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../../environments/environment.prod */ 9019);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 8987);



class JobChatService {
    constructor(_http) {
        this._http = _http;
        this.baseURL = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_0__.environment.api_url;
    }
    getJobchatList(jobId, senderId, recipientId) {
        return this._http.get(_environments_environment_prod__WEBPACK_IMPORTED_MODULE_0__.environment.api_url + 'Message/GetSingleUserChatByJob/' + jobId + '/' + senderId + '/' + recipientId);
    }
    updateJobReponcesCount(jobId, senderId, recipentId) {
        return this._http.post(_environments_environment_prod__WEBPACK_IMPORTED_MODULE_0__.environment.api_url + 'Message/JobUserMessageResponceUpdate/' + jobId + '/' + senderId + '/' + recipentId, {});
    }
}
JobChatService.ɵfac = function JobChatService_Factory(t) { return new (t || JobChatService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
JobChatService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: JobChatService, factory: JobChatService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 5976:
/*!********************************************************!*\
  !*** ./src/app/services/Chat/User/UserChat.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserChatService": () => (/* binding */ UserChatService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 8987);



class UserChatService {
    constructor(_http) {
        this._http = _http;
        this.baseURL = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_url;
    }
    SendMessage(userid, message) {
        return this._http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_url + 'Message/Send/' + userid, message);
    }
    getUserchatList(loggedUserId) {
        return this._http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_url + 'Message/AllChatsUser/' + loggedUserId);
    }
    getMessages(senderId, recipientId) {
        return this._http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_url + 'Message/UserChat/' + senderId + '/' + recipientId);
    }
}
UserChatService.ɵfac = function UserChatService_Factory(t) { return new (t || UserChatService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
UserChatService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: UserChatService, factory: UserChatService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 9923:
/*!*****************************************************!*\
  !*** ./src/app/services/JobPost/JobPost.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JobPostService": () => (/* binding */ JobPostService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 2340);
/* harmony import */ var _Model_Pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Model/Pagination */ 8361);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);






class JobPostService {
    constructor(_http) {
        this._http = _http;
        this.ii = '';
        this.baseURL = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_url;
    }
    AddJobPost(job) {
        return this._http.post(this.baseURL + 'Job/AddJob', job);
    }
    UpdateJobPost(jobId, job) {
        return this._http.post(this.baseURL + 'Job/UpdateJob/' + jobId, job);
    }
    AddPostImages(jobId, file) {
        return this._http.post(this.baseURL + 'Job/AddJobImage/' + jobId, file);
    }
    GetAllJob() {
        return this._http.get(this.baseURL + 'Job/AllJob');
    }
    GetJobById(id) {
        return this._http.get(this.baseURL + 'Job/WebSingleJobByJobId/' + id);
    }
    GetResponceCount(jobId, senderId) {
        return this._http.get(this.baseURL + 'WebPost/ResponceCount/' + jobId + '/' + senderId);
    }
    GetAllWithAddedJob(userId, page, itemsPerPage, Jobstatus) {
        const paginatedResult = new _Model_Pagination__WEBPACK_IMPORTED_MODULE_1__.PaginatedResult();
        let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpParams();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
            params = params.append('JobStatus', Jobstatus);
        }
        //  params = params.append('searchTag', searchTerm);
        return this._http.get(this.baseURL + 'Job/GetAllWithAddedJob/' + userId, { observe: 'response', params })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(response => {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }));
    }
    GetPostJob(userId, page, itemsPerPage, Jobstatus) {
        const paginatedResult = new _Model_Pagination__WEBPACK_IMPORTED_MODULE_1__.PaginatedResult();
        let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpParams();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
            params = params.append('JobStatus', Jobstatus);
        }
        //  params = params.append('searchTag', searchTerm);
        return this._http.get(this.baseURL + 'Job/JobById/' + userId, { observe: 'response', params })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(response => {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }));
    }
    //Update Job Status
    UpdateJobStatus(jobId, JobStatus) {
        return this._http.post(this.baseURL + 'Job/UpdateJobStatus/' + jobId + '/' + JobStatus, {});
    }
    //Add Job By User
    AddJobToUser(userJobs) {
        return this._http.post(this.baseURL + 'User/AddUserJobs', userJobs);
    }
    //Check is job add to logged user
    IsAddedJob(userId, jobId) {
        return this._http.get(this.baseURL + 'User/IsAddedJob/' + userId + '/' + jobId);
    }
}
JobPostService.ɵfac = function JobPostService_Factory(t) { return new (t || JobPostService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
JobPostService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: JobPostService, factory: JobPostService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 9712:
/*!**********************************************************!*\
  !*** ./src/app/services/JobPost/JobResponces.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JobResponcesService": () => (/* binding */ JobResponcesService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 8987);



class JobResponcesService {
    constructor(_http) {
        this._http = _http;
        this.baseURL = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_url;
    }
    GetJobResponces(jobId, userId) {
        return this._http.get(this.baseURL + 'Message/' + jobId + '/' + userId);
    }
}
JobResponcesService.ɵfac = function JobResponcesService_Factory(t) { return new (t || JobResponcesService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
JobResponcesService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: JobResponcesService, factory: JobResponcesService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 1555:
/*!*******************************************************!*\
  !*** ./src/app/services/JobPost/ReportJob.service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReportJobService": () => (/* binding */ ReportJobService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 8987);



class ReportJobService {
    constructor(_http) {
        this._http = _http;
        this.baseURL = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_url;
    }
    ReportJob(reporting) {
        return this._http.post(this.baseURL + 'Report/AddJobReport', reporting);
    }
}
ReportJobService.ɵfac = function ReportJobService_Factory(t) { return new (t || ReportJobService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
ReportJobService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ReportJobService, factory: ReportJobService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 8335:
/*!************************************************!*\
  !*** ./src/app/services/SeoService.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SeoServiceService": () => (/* binding */ SeoServiceService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);

class SeoServiceService {
    constructor() {
        this.ii = '';
        this.ii = "wow";
    }
    load() {
    }
}
SeoServiceService.ɵfac = function SeoServiceService_Factory(t) { return new (t || SeoServiceService)(); };
SeoServiceService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SeoServiceService, factory: SeoServiceService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 4937:
/*!***********************************************************!*\
  !*** ./src/app/services/SharedServices/Shared.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedService": () => (/* binding */ SharedService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngneat/hot-toast */ 7403);


class SharedService {
    constructor(toast) {
        this.toast = toast;
        this.IslogingPage = false;
    }
    checkInterNetConnection() {
        if (!navigator.onLine)
            return this.toast.info('Please check your internet connection', {
                position: 'top-center',
            });
    }
    LoggedUserData() {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            this.IslogingPage = false;
        }
        else {
            window.location.href = '/login';
        }
    }
    IsUserIsOnLogInPage() {
        this.IslogingPage = true;
    }
}
SharedService.ɵfac = function SharedService_Factory(t) { return new (t || SharedService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngneat_hot_toast__WEBPACK_IMPORTED_MODULE_1__.HotToastService)); };
SharedService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SharedService, factory: SharedService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 4698:
/*!**********************************************!*\
  !*** ./src/app/services/Tags/Tag.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TagService": () => (/* binding */ TagService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 8987);



class TagService {
    constructor(_http) {
        this._http = _http;
        this.baseURL = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_url;
    }
    AddTag(tag) {
        return this._http.post(this.baseURL + 'Tag/AddTagMaster', tag);
    }
}
TagService.ɵfac = function TagService_Factory(t) { return new (t || TagService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
TagService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TagService, factory: TagService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 2558:
/*!***********************************************!*\
  !*** ./src/app/services/Wall/Wall.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WallService": () => (/* binding */ WallService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 2340);
/* harmony import */ var _Model_Pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Model/Pagination */ 8361);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);






class WallService {
    constructor(_http) {
        this._http = _http;
        this.baseURL = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_url;
    }
    GetWall(page, itemsPerPage, searchTerm, userId) {
        const paginatedResult = new _Model_Pagination__WEBPACK_IMPORTED_MODULE_1__.PaginatedResult();
        let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpParams();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        params = params.append('searchTag', searchTerm);
        params = params.append('UserId', userId);
        return this._http.get(this.baseURL + 'Wall/WebGetJobsByMultiTags', { observe: 'response', params })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(response => {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }));
    }
    GetUserWall(page, itemsPerPage, searchTerm, userId) {
        const paginatedResult = new _Model_Pagination__WEBPACK_IMPORTED_MODULE_1__.PaginatedResult();
        let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpParams();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        params = params.append('searchTagTerm', searchTerm);
        params = params.append('UserId', userId);
        return this._http.get(this.baseURL + 'Wall/WebGetUsersByMultiTags', { observe: 'response', params })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(response => {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }));
    }
}
WallService.ɵfac = function WallService_Factory(t) { return new (t || WallService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
WallService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: WallService, factory: WallService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 9032:
/*!*********************************************!*\
  !*** ./src/app/services/signalr.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignalrService": () => (/* binding */ SignalrService)
/* harmony export */ });
/* harmony import */ var _Users_kshitizprobhargav_Projects_HoozOnline_universal_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../environments/environment */ 2340);
/* harmony import */ var _microsoft_signalr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/signalr */ 7930);
/* harmony import */ var _microsoft_signalr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/signalr */ 4493);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var _Model_Message_RealChatDtos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/Message/RealChatDtos */ 9042);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 9337);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 8987);








class SignalrService {
  constructor(http) {
    var _this = this;

    this.http = http;
    this.connection = new _microsoft_signalr__WEBPACK_IMPORTED_MODULE_3__.HubConnectionBuilder().withUrl(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.hubConnectionURL, {
      skipNegotiation: true,
      transport: _microsoft_signalr__WEBPACK_IMPORTED_MODULE_4__.HttpTransportType.WebSockets
    }).build();
    this.POST_URL = _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.broadcastURL;
    this.JobPOST_URL = _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.broadcastJobURL;
    this.receivedMessageObject = new _Model_Message_RealChatDtos__WEBPACK_IMPORTED_MODULE_2__.RealChatDtos();
    this.sharedObj = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
    this.connection.onclose( /*#__PURE__*/(0,_Users_kshitizprobhargav_Projects_HoozOnline_universal_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.start();
    }));
    this.connection.on("ReceiveOne", data => {
      this.mapReceivedMessage(data);
    });
    this.start();
  } // Strart the connection


  start() {
    var _this2 = this;

    return (0,_Users_kshitizprobhargav_Projects_HoozOnline_universal_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this2.connection.start();
        console.log("connected");
      } catch (err) {
        console.log(err);
        setTimeout(() => _this2.start(), 5000);
      }
    })();
  }

  mapReceivedMessage(user) {
    this.receivedMessageObject.SenderId = user.SenderId;
    this.receivedMessageObject.RecipientId = user.RecipientId;
    this.receivedMessageObject.Content = user.Content;
    this.receivedMessageObject.RecipientContent = user.RecipientContent;
    this.receivedMessageObject.SenderContent = user.SenderContent;
    this.sharedObj.next(this.receivedMessageObject);
  }
  /* ****************************** Public Mehods **************************************** */
  // Calls the controller method


  broadcastMessage(msgDto) {
    this.http.post(this.POST_URL, msgDto).subscribe(data => {}); // this.connection.invoke("ReceiveOne",msgDto).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
  }

  broadcastJobMessage(msgDto) {
    this.http.post(this.JobPOST_URL, msgDto).subscribe(data => {}); // this.connection.invoke("ReceiveOne",msgDto).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
  }

  retrieveMappedObject() {
    return this.sharedObj.asObservable();
  } // public connect = () => {
  //   this.startConnection();
  //   this.addListeners();
  // }
  // // Message user to User


  sendMessageToApi(userid, message) {
    return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.api_url + 'Message/Send/' + userid, message).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(_ => {}));
  } // // Message to Job


  sendMessageToJobApi(jobId, recipientId, senderId, message) {
    return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.api_url + 'Message/JobChat/' + jobId + '/' + recipientId + '/' + senderId, message).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(_ => console.log()));
  }

}

SignalrService.ɵfac = function SignalrService_Factory(t) {
  return new (t || SignalrService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient));
};

SignalrService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: SignalrService,
  factory: SignalrService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 9019:
/*!**********************************************!*\
  !*** ./src/environments/environment.prod.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
const environment = {
    production: true,
    api_url: 'https://livsolution.co.in/api/',
    // api_url: 'http://localhost:5000/api/',
    hubConnectionURL: 'https://livsolution.co.in/signalr',
    broadcastURL: 'https://livsolution.co.in/api/Chat/send',
    broadcastJobURL: 'https://livsolution.co.in/api/Chat/Jobsend'
};


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
const environment = {
    production: false,
    api_url: 'https://www.livsolution.co.in/api/',
    //api_url: 'http://localhost:5000/api/',
    hubConnectionURL: 'http://localhost:5000/signalr',
    broadcastURL: 'http://localhost:5000/api/Chat/send',
    broadcastJobURL: 'http://localhost:5000/api/Chat/Jobsend'
};


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
document.addEventListener('DOMContentLoaded', () => {
    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
        .catch(err => console.error(err));
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map