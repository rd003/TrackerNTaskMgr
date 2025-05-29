import {
  MatPseudoCheckboxModule
} from "./chunk-XWJLVXOH.js";
import {
  MatOptgroup,
  MatOption
} from "./chunk-ED7BK2FI.js";
import {
  MatRippleModule
} from "./chunk-HI3UC2HZ.js";
import {
  MatCommonModule
} from "./chunk-WLGYPJMV.js";
import {
  NgModule,
  setClassMetadata,
  ɵɵdefineNgModule
} from "./chunk-Y6CTUUFB.js";
import {
  ɵɵdefineInjector
} from "./chunk-6ZTUDWXA.js";

// node_modules/@angular/material/fesm2022/index-DwiL-HGk.mjs
var MatOptionModule = class _MatOptionModule {
  static ɵfac = function MatOptionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatOptionModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatOptionModule,
    imports: [MatRippleModule, MatCommonModule, MatPseudoCheckboxModule, MatOption, MatOptgroup],
    exports: [MatOption, MatOptgroup]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [MatRippleModule, MatCommonModule, MatPseudoCheckboxModule, MatOption]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatOptionModule, [{
    type: NgModule,
    args: [{
      imports: [MatRippleModule, MatCommonModule, MatPseudoCheckboxModule, MatOption, MatOptgroup],
      exports: [MatOption, MatOptgroup]
    }]
  }], null, null);
})();

export {
  MatOptionModule
};
//# sourceMappingURL=chunk-OT2MTBLQ.js.map
