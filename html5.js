function saveToStorage() {
    const value = document.getElementById('storageInput').value;
    localStorage.setItem('myData', value);
    alert("Mentve a Web Storage-be!");
}

function loadFromStorage() {
    const value = localStorage.getItem('myData');
    document.getElementById('storageOutput').textContent = value ? `Mentett érték: ${value}` : "Nincs mentett érték.";
}

function startWorker() {
    const num = parseInt(document.getElementById("workerInput").value);
    if (!num || num < 1) return alert("Adj meg egy pozitív számot!");
  
    const worker = new Worker("worker.js");
    worker.postMessage(num);
    worker.onmessage = (e) => {
      document.getElementById("workerResult").textContent = `Eredmény: ${e.data}`;
      worker.terminate();
    };
  }
  
  function startSSE() {
    const log = document.getElementById("sseLog");
    log.innerHTML = "";
    let counter = 0;
  
    const interval = setInterval(() => {
      counter++;
      const li = document.createElement("li");
      li.textContent = `Üzenet érkezett: ${new Date().toLocaleTimeString()}`;
      log.appendChild(li);
  
      if (counter >= 5) clearInterval(interval);
    }, 2000);
  }
  
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                document.getElementById('locationOutput').textContent = `Szélesség: ${latitude}, Hosszúság: ${longitude}`;
            },
            error => {
                document.getElementById('locationOutput').textContent = "Nem sikerült lekérni a helyzetet.";
            }
        );
    } else {
        document.getElementById('locationOutput').textContent = "A böngésző nem támogatja a geolokációt.";
    }
}


const dragZone = document.getElementById('dragZone');
const dropZone = document.getElementById('dropZone');

dragZone.addEventListener('dragstart', e => {
    e.dataTransfer.setData("text/plain", "Húzott elem");
});

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.style.backgroundColor = "#e0e0e0";
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.backgroundColor = "";
});

dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.textContent = "Sikeresen ide dobtad!";
    dropZone.style.backgroundColor = "";
});


window.addEventListener('load', () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 150, 80);
});
