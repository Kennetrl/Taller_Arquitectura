/*################################################################################################*/
/*####################################### CLIENTE MQTT ###########################################*/
/*################################################################################################*/

//var wsbroker = "192.168.0.3";  //mqtt websocket enabled broker
//var wsbroker = "localhost";
var wsbroker = "broker.hivemq.com";

//var wsport = 8083 // port for above
var wsport = 1883; // port for above

var client = new Paho.MQTT.Client(
	wsbroker,
	Number(8000),
	"myclientid_" + parseInt(Math.random() * 100, 10)
);

client.onConnectionLost = function (responseObject) {
	console.log("connection lost: " + responseObject.errorMessage);
};

/*################################################################################################*/
/*####################################### LLEGA EL MENSAJE########################################*/
/*################################################################################################*/

client.onMessageArrived = function (message) {
	let destination = message.destinationName;
	if (destination === "test_arquitectura2") {
		let response = JSON.parse(message.payloadString);
		dataFormat = response;
		let dataCPU = dataFormat.CPU;
		let dataMemoria = dataFormat.Memoria;
		let dataDisk = dataFormat.Disco;
		console.log(dataFormat);
		console.log(parseFloat(dataFormat.value));

		const dataCPUelement = document.getElementById("dataCPUelement");
		dataCPUelement.textContent = dataCPU.toFixed(2) + "%";

		const dataRAMelement = document.getElementById("dataRAMelement");
		dataRAMelement.textContent = dataMemoria.toFixed(2) + "%";

		const dataDISKelement = document.getElementById("dataDISKelement");
		dataDISKelement.textContent = dataDisk.toFixed(2) + "%";

		addData(myChart, parseFloat(dataCPU));
		addData(myChartMemory, parseFloat(dataMemoria));
		addData(myChartDisk, parseFloat(dataDisk));
	}
};

var options = {
	timeout: 3,
	onSuccess: function () {
		console.log("mqtt connected");
		// Connection succeeded; subscribe to our topic, you can add multile lines of these
		client.subscribe("test_arquitectura2", { qos: 1 });
	},
	onFailure: function (message) {
		console.log("Connection failed: " + message.errorMessage);
	},
};

function initMqtt() {
	client.connect(options);
}
