var fileNames = ""
var fileContents = ""
console.log("content.js loaded on " + document.URL)
var currentNum= 0
var text = ""
window.addEventListener("DOMContentLoaded", function(event){
	
	for( var i= 0 ; i < event.target.scripts.length;i++){

		ev = event.target.scripts[i];
		src= ev.src;
		var data = {
			"src":src, 
			"text":ev.innerText};
		text = data.text
		chrome.runtime.sendMessage({fileName: data.src})
		//name = data.src
		//downloadFileFromText(name, text)
		

	}

	

});

setTimeout(function() {
	chrome.runtime.sendMessage({nextPage: true});
},10000)

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
		
	if (request.fileName != undefined)
		downloadFileFromText(request.currentNum + "_" + request.fileName, text)
}); 

function downloadFileFromText(filename, content) {
    var a = document.createElement('a');
    var blob = new Blob([ content ], {type : "text/plain;charset=UTF-8"});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click(); //this is probably the key - simulating a click on a download link
    delete a;// we don't need this anymore
} 






