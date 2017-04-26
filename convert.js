const convert = require("excel-as-json").processFile;

convert(
    "./sample-data.xlsx",
    "./src/data.json",
    { sheet: "2" }
);
