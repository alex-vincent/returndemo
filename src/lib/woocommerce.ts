import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const wooCommerceClient = new WooCommerceRestApi({
    url: process.env.WOOCOMMERCE_URL || "https://example.com",
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || "ck_example",
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || "cs_example",
    version: "wc/v3",
});
