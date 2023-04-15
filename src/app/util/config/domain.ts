export default process.env.NODE_ENV === "development"
  ? "http://localhost:6555/"
  : "https://caphub.onrender.com/";
