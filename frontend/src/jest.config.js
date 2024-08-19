module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Преобразование JavaScript/JSX файлов с помощью babel-jest
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // Исключаем axios из игнорирования
  ],
};
