import "dotenv/config";

export default {
  name: "beta-ecommerce",
  slug: "beta-ecommerce",
  version: "22.08.24",
  orientation: "portrait",
  icon: "./assets/images/icon2.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/SplashScreen.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  extra: {
    baseUrl: "https://beta-ecommerce-api.herokuapp.com/",
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
