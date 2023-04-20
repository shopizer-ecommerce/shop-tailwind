import { fr_ca_lang, pt_br_lang, en_us_lang } from "./languages";
import { fr_ca_routes, pt_br_routes, en_us_routes } from "./routes";


export const STATENAME = process.env.REACT_APP_STATE || "amplifylogin";

export const TYPES = {
  UPDATE_LANG: "UPDATE_LANG",
  UPDATE_USER: "UPDATE_USER",
  UPDATE_CART: "UPDATE_CART",
  UPDATE_CATEGORIES: "UPDATE_CATEGORIES"
};

export const LANGUAGES = {
  "en-US": en_us_lang,
  "fr-CA": fr_ca_lang,
};

export const PROVINCES = {
  "qc":  "qc",
  "on":  "on"
};

export const COUNTRY = {
  "CA":  "CA"
};

export const ROUTES = {
  "en-US": en_us_routes,
  "fr-CA": fr_ca_routes,
};

export const API_VERSIONS = {
  "v1":  "/v1/",
  "v2":  "/v2/"
};

export const ACTION = {
  "PRODUCT_GROUP": 'products/group/',
};

export const STORE = {
  "DEFAULT": 'DEFAULT',
};
