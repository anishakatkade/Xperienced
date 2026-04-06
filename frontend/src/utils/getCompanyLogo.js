export const getCompanyLogo = (company) => {
  const logos = {
    netflix: "https://logo.clearbit.com/netflix.com",
    google: "https://logo.clearbit.com/google.com",
    amazon: "https://logo.clearbit.com/amazon.com",
    meta: "https://logo.clearbit.com/meta.com",
    facebook: "https://logo.clearbit.com/facebook.com",
    apple: "https://logo.clearbit.com/apple.com",
    microsoft: "https://logo.clearbit.com/microsoft.com",

    oracle: "https://logo.clearbit.com/oracle.com",
    adobe: "https://logo.clearbit.com/adobe.com",
    salesforce: "https://logo.clearbit.com/salesforce.com",
    uber: "https://logo.clearbit.com/uber.com",
    ola: "https://logo.clearbit.com/olacabs.com",
    airbnb: "https://logo.clearbit.com/airbnb.com",
    paypal: "https://logo.clearbit.com/paypal.com",
    stripe: "https://logo.clearbit.com/stripe.com",
    atlassian: "https://logo.clearbit.com/atlassian.com",

    flipkart: "https://logo.clearbit.com/flipkart.com",
    paytm: "https://logo.clearbit.com/paytm.com",
    zomato: "https://logo.clearbit.com/zomato.com",
    swiggy: "https://logo.clearbit.com/swiggy.com",
    byju: "https://logo.clearbit.com/byjus.com",
    razorpay: "https://logo.clearbit.com/razorpay.com",
    cred: "https://logo.clearbit.com/cred.club",
    upstox: "https://logo.clearbit.com/upstox.com",
    groww: "https://logo.clearbit.com/groww.in",

    tcs: "https://logo.clearbit.com/tcs.com",
    infosys: "https://logo.clearbit.com/infosys.com",
    wipro: "https://logo.clearbit.com/wipro.com",
    hcl: "https://logo.clearbit.com/hcltech.com",
    accenture: "https://logo.clearbit.com/accenture.com",
    cognizant: "https://logo.clearbit.com/cognizant.com",
    capgemini: "https://logo.clearbit.com/capgemini.com",
    techmahindra: "https://logo.clearbit.com/techmahindra.com",

    ibm: "https://logo.clearbit.com/ibm.com",
    intel: "https://logo.clearbit.com/intel.com",
    nvidia: "https://logo.clearbit.com/nvidia.com",
    samsung: "https://logo.clearbit.com/samsung.com",
    sony: "https://logo.clearbit.com/sony.com",
    dell: "https://logo.clearbit.com/dell.com",
    hp: "https://logo.clearbit.com/hp.com",

    linkedin: "https://logo.clearbit.com/linkedin.com",
    twitter: "https://logo.clearbit.com/twitter.com",
    x: "https://logo.clearbit.com/x.com",
    github: "https://logo.clearbit.com/github.com",
    stackoverflow: "https://logo.clearbit.com/stackoverflow.com",
  };

  return (
    logos[company?.toLowerCase()] ||
    `https://logo.clearbit.com/${company?.toLowerCase()}.com` ||
    "https://via.placeholder.com/40"
  );
};
