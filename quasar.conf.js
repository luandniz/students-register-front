module.exports = function (/* ctx */) {
  return {
    // ...
    css: {
      loaderOptions: {
        postcss: {
          plugins: [require("tailwindcss"), require("autoprefixer")],
        },
      },
    },
    // ...
  };
};
