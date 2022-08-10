import "dotenv/config";

export default {
  name: "beta-ecommerce",
  slug: "beta-ecommerce",
  version: "22.08.03",
  orientation: "portrait",
  icon: "./assets/images/icon2.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/SplashScreen.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  extra: {
    baseUrl: process.env.BASE_URL,
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    package: "com.beta.ecommerce",
    versionCode: 220803,
    adaptiveIcon: {
      foregroundImage: "./assets/images/icon2.png",
      backgroundColor: "#ffffff",
    },
  },
};
