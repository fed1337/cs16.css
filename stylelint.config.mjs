/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard"],
  rules: {
    "custom-property-empty-line-before": null,
    "custom-property-pattern": null,
    "length-zero-no-unit": null,
    "media-feature-range-notation": "prefix",
    "no-descending-specificity": null,
    "property-no-deprecated": [
      true,
      {
        ignoreProperties: ["clip"],
      },
    ],
    "property-no-vendor-prefix": null,
    "selector-class-pattern": null,
    "selector-pseudo-element-colon-notation": null,
  },
};
