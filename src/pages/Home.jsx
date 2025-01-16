export const Home = () => {
  if (!document.cookie.includes("token")) {
    window.location.href = "/login";
  }
  return <div></div>;
};
