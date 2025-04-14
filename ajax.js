const code = "xj07rmabc123";
const url = "http://gamf.nhely.hu/ajax2/";

async function read() {
  document.getElementById("code").innerHTML = "code=" + code;
  let response = await fetch(url, {
    method: 'post',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: "code=" + code + "&op=read"
  });
  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;

  let str = "<h1>Read</h1>";
  str += "<p>Number of records: " + data.rowCount + "</p>";
  str += "<p>Last max " + data.maxNum + " records:</p>";
  str += "<table border='1'><tr><th>ID</th><th>Name</th><th>Height</th><th>Weight</th><th>Code</th></tr>";

  let sum = 0, count = 0, max = 0;

  for (let item of list) {
    str += `<tr>
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>${item.height}</td>
              <td>${item.weight}</td>
              <td>${item.code}</td>
            </tr>`;
    let h = parseFloat(item.height);
    if (!isNaN(h)) {
      sum += h;
      count++;
      if (h > max) max = h;
    }
  }

  str += "</table>";

  const avg = count > 0 ? (sum / count).toFixed(2) : 0;

  str += `<p><strong>Height összeg:</strong> ${sum}</p>`;
  str += `<p><strong>Height átlag:</strong> ${avg}</p>`;
  str += `<p><strong>Height maximum:</strong> ${max}</p>`;

  document.getElementById("readDiv").innerHTML = str;
}

async function create() {
  let name = document.getElementById("name1").value;
  let height = document.getElementById("height1").value;
  let weight = document.getElementById("weight1").value;

  if (name.length > 0 && name.length <= 30 &&
      height.length > 0 && height.length <= 30 &&
      weight.length > 0 && weight.length <= 30) {

    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `code=${code}&op=create&name=${name}&height=${height}&weight=${weight}`
    });

    let result = await response.text();
    document.getElementById("createResult").innerHTML = result > 0 ? "Create successful!" : "Create NOT successful!";
    document.getElementById("name1").value = "";
    document.getElementById("height1").value = "";
    document.getElementById("weight1").value = "";
    read();
  } else {
    document.getElementById("createResult").innerHTML = "Validation error!";
  }
}

async function getDataForId() {
  let id = document.getElementById("idUpd").value;
  let response = await fetch(url, {
    method: 'post',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `code=${code}&op=read`
  });

  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;

  for (let item of list) {
    if (item.id === id) {
      document.getElementById("name2").value = item.name;
      document.getElementById("height2").value = item.height;
      document.getElementById("weight2").value = item.weight;
    }
  }
}

async function update() {
  let id = document.getElementById("idUpd").value;
  let name = document.getElementById("name2").value;
  let height = document.getElementById("height2").value;
  let weight = document.getElementById("weight2").value;

  if (id.length > 0 && id.length <= 30 &&
      name.length > 0 && name.length <= 30 &&
      height.length > 0 && height.length <= 30 &&
      weight.length > 0 && weight.length <= 30) {

    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `code=${code}&op=update&id=${id}&name=${name}&height=${height}&weight=${weight}`
    });

    let result = await response.text();
    document.getElementById("updateResult").innerHTML = result > 0 ? "Update successful!" : "Update NOT successful!";
    read();
  } else {
    document.getElementById("updateResult").innerHTML = "Validation error!";
  }
}

async function deleteF() {
  let id = document.getElementById("idDel").value;
  if (id.length > 0 && id.length <= 30) {
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `code=${code}&op=delete&id=${id}`
    });

    let result = await response.text();
    document.getElementById("deleteResult").innerHTML = result > 0 ? "Delete successful!" : "Delete NOT successful!";
    read();
  } else {
    document.getElementById("deleteResult").innerHTML = "Validation error!";
  }
}

window.onload = () => {
  read();
};
