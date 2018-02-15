var pc = new RTCPeerConnection();

// Connect to peer through matrix... Then...
var dchannel = pc.createDataChannel("hello", options);

dchannel.onmessage = function (evt) {
  console.log("Received:", evt.data);
};

dchannel.onopen = function () {
  dataChannel.send("Hello, World!");
};
