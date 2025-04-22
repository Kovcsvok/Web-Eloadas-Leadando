self.onmessage = function(e) {
    const num = e.data;
    let result = 0;
    for (let i = 1; i <= num; i++) {
      result += i;
    }
    self.postMessage(result);
  };
  