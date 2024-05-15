const callPostMessage = () => {
  setTimeout(() => {
    postMessage('update');
    callPostMessage();
  }, 60000);
};

callPostMessage();
