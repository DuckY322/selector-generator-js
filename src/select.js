function isObject(data) {
  return Object.prototype.toString.call(data) === "[object Object]";
}

function objectParsing(optionsData, item) {
  Object.keys(item).forEach((label) => {
    optionsData.push({ value: item[label], label: item[label] })
  });
}

function dataConverting(data) {
  const optionsData = [];
  const isDataArray = Array.isArray(data);

  for (const key in data) {
    let optionSet = {};
    const { value = data[key].label, label = data[key].value } = data[key];

    if ((value, label)) {
      optionSet = { value, label };
    } else if (isObject(data[key])) {
      objectParsing(optionsData, data[key]);
      continue;
    } else {
      optionSet = { value: isDataArray ? data[key] : key, label: data[key] };
    }

    optionsData.push(optionSet);
  }

  return optionsData;
}

function creatingSelect(options, selectedOption) {
  const readyArr = dataConverting(options);
  const select = document.createElement(`select`);
  const body = document.body;

  for (const item of readyArr) {
    const option = document.createElement(`option`);

    option.value = item.value;
    option.textContent = item.label;

    if (option.value === selectedOption) {
      option.selected = true;
    }

    select.append(option);
  }

  body.append(select);

  return select;
}