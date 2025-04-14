document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("dataForm");
    const table = document.getElementById("dataTable").querySelector("tbody");
    const searchInput = document.getElementById("searchInput");
  
    let editingRow = null;
    let currentSortColumn = -1;
    let currentSortAsc = true;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const age = document.getElementById("age").value.trim();
      const city = document.getElementById("city").value.trim();
      const email = document.getElementById("email").value.trim();
  
      if (!name || name.length < 2 || name.length > 30) return alert("Hibás név");
      if (!age || isNaN(age) || age < 1 || age > 120) return alert("Hibás kor");
      if (!city || city.length < 2 || city.length > 30) return alert("Hibás város");
      if (!email.includes("@")) return alert("Hibás email");
  
      if (editingRow) {
        editingRow.cells[0].textContent = name;
        editingRow.cells[1].textContent = age;
        editingRow.cells[2].textContent = city;
        editingRow.cells[3].textContent = email;
        editingRow = null;
      } else {
        const row = table.insertRow();
        row.insertCell(0).textContent = name;
        row.insertCell(1).textContent = age;
        row.insertCell(2).textContent = city;
        row.insertCell(3).textContent = email;
  
        const actionCell = row.insertCell(4);
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
  
        editBtn.textContent = "Szerkesztés";
        deleteBtn.textContent = "Törlés";
  
        editBtn.addEventListener("click", () => {
          document.getElementById("name").value = row.cells[0].textContent;
          document.getElementById("age").value = row.cells[1].textContent;
          document.getElementById("city").value = row.cells[2].textContent;
          document.getElementById("email").value = row.cells[3].textContent;
          editingRow = row;
        });
  
        deleteBtn.addEventListener("click", () => {
          if (confirm("Biztosan törlöd ezt a sort?")) {
            table.deleteRow(row.rowIndex - 1);
          }
        });
  
        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);
      }
  
      form.reset();
    });
  
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();
      for (let row of table.rows) {
        const text = Array.from(row.cells).map(cell => cell.textContent.toLowerCase()).join(" ");
        row.style.display = text.includes(filter) ? "" : "none";
      }
    });
  
    window.sortTable = function (columnIndex) {
      const rows = Array.from(table.rows);
  
      if (currentSortColumn === columnIndex) {
        currentSortAsc = !currentSortAsc;
      } else {
        currentSortColumn = columnIndex;
        currentSortAsc = true;
      }
  
      rows.sort((a, b) => {
        let x = a.cells[columnIndex].textContent.trim();
        let y = b.cells[columnIndex].textContent.trim();
  
        let xNum = parseFloat(x);
        let yNum = parseFloat(y);
  
        if (!isNaN(xNum) && !isNaN(yNum)) {
          return currentSortAsc ? xNum - yNum : yNum - xNum;
        } else {
          return currentSortAsc ? x.localeCompare(y) : y.localeCompare(x);
        }
      });
  
      rows.forEach(row => table.appendChild(row));
    };
  });
  