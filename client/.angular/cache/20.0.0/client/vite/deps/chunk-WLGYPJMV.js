import {
  HighContrastModeDetector
} from "./chunk-LYVN5RTK.js";
import {
  BidiModule
} from "./chunk-O5V7MQQN.js";
import {
  NgModule,
  setClassMetadata,
  ɵɵdefineNgModule
} from "./chunk-Y6CTUUFB.js";
import {
  InjectionToken,
  inject,
  ɵɵdefineInjector
} from "./chunk-6ZTUDWXA.js";

// node_modules/@angular/material/fesm2022/common-module-cKSwHniA.mjs
var MATERIAL_SANITY_CHECKS = new InjectionToken("mat-sanity-checks", {
  providedIn: "root",
  factory: () => true
});
var MatCommonModule = class _MatCommonModule {
  constructor() {
    inject(HighContrastModeDetector)._applyBodyHighContrastModeCssClasses();
  }
  static ɵfac = function MatCommonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCommonModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatCommonModule,
    imports: [BidiModule],
    exports: [BidiModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [BidiModule, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCommonModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule],
      exports: [BidiModule]
    }]
  }], () => [], null);
})();

export {
  MATERIAL_SANITY_CHECKS,
  MatCommonModule
};
//# sourceMappingURL=chunk-WLGYPJMV.js.map
