let data = {};
const allFields = [];

const _field = document.querySelector(".field");
const _query = document.querySelector(".query");
const _results = document.querySelector(".results");

function getData(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data.json");

    xhr.onload = function() {
        if (xhr.status !== 200) return;
        data = JSON.parse(xhr.response);
        createFields();
        if (callback) callback();
    }

    xhr.send();
}

function createFields() {
    Object.keys(data[0]).forEach(fieldName => {
        allFields.push(fieldName);

        const fieldOption = document.createElement("option");
        fieldOption.value = fieldOption.innerHTML = fieldName;
        _field.appendChild(fieldOption);

        const fieldHeader = document.createElement("div");
        fieldHeader.className = "result-field";
        fieldHeader.innerHTML = fieldName;
        document.querySelector(".results-headers").appendChild(fieldHeader);
    });
}

function getField() {
    return _field.value || "";
}

function getQuery() {
    return _query.value || "";
}

function find() {
    const field = getField();
    const query = getQuery();

    const results =  _.filter(data, component => new RegExp(query, "i").test(component[field]));

    displayResults(results);
}

function displayResults(results) {
    _results.innerHTML = "";

    results.forEach(result => {
        const resultElement = document.createElement("div");
        resultElement.className = "result";

        allFields.forEach(fieldName => {
            const fieldElement = document.createElement("span");
            fieldElement.className = fieldName.replace(/ +/g, "-") + " result-field";
            fieldElement.innerHTML = result[fieldName];
            resultElement.appendChild(fieldElement);
        });

        _results.appendChild(resultElement);
    });
}

function init() {
    document.querySelector("form.title").onsubmit = event => {
        event.preventDefault();
        find();
    };
    getData();
}

init();
