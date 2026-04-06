export const getCompanyLogo = (company) => {
  if (!company) return "";

  const name = company.toLowerCase().trim();

  return {
    primary: `https://logo.clearbit.com/${name}.com`,
    backup: `https://img.logo.dev/${name}.com`,
    fallback: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
  };
};