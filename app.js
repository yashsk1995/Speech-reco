
var myButton = document.getElementById("getrans");
myButton.onclick = function() {
  getdata();
};

var delButton = document.getElementById("hapus");
var epety = document.querySelector("textarea");
delButton.onclick = function() {
  epety.value = "";
};

var area = document.getElementById("InputUrl");
var message = document.getElementById("jumlah");
var maxLength = 5000;
var checkLength = function() {
  if (area.value.length < maxLength) {
    message.innerHTML =
      maxLength - area.value.length + " characters remainging";
  }
};
setInterval(checkLength, 300);

function getdata() {
  var base_url = "https://transid.herokuapp.com";
  var selector = document.getElementById("langin");
  var valin = selector[selector.selectedIndex].value;
  var selectora = document.getElementById("langout");
  var valina = selectora[selectora.selectedIndex].value;
  var text = document.getElementById("InputUrl").value;
  console.log(valin + " - " + valina);
  $.ajax({
    url: base_url + "/?in=" + valin + "&out=" + valina + "&text=" + text,
    async: false,
    success: function(data) {
      result = data;
      // console.log(result);
      $("#Inputdata").text(result.translate);
      if ("speechSynthesis" in window) {
        var NewText = $("#Inputdata").text();
        console.log(NewText);
        var msg = new SpeechSynthesisUtterance(NewText);
        window.speechSynthesis.speak(msg);
      }
    }
  });
}

$("textarea")
  .each(function() {
    this.setAttribute(
      "style",
      "height:" + this.scrollHeight + "px;overflow-y:hidden;"
    );
  })
  .on("input", function() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });



  
$(".speechbtn").on("click", function(event) {
    event.preventDefault();
    console.log("hi");
  
    if ("speechSynthesis" in window) {
      var NewText = $("#Inputdata").text();
      console.log(NewText);
      var msg = new SpeechSynthesisUtterance(NewText);
      window.speechSynthesis.speak(msg);
    }
  });


  
var r = document.getElementById('InputUrl');

$("#speechbtn").on("click", function (event) {

    event.preventDefault();
    if ('webkitSpeechRecognition' in window) {
        var speechRecognizer = new webkitSpeechRecognition();
        speechRecognizer.continuous = true;
        speechRecognizer.interimResults = true;
        speechRecognizer.lang = 'en-IN';
        speechRecognizer.start();

        var finalTranscripts = '';

        speechRecognizer.onresult = function (event) {
            var interimTranscripts = '';
            for (var i = event.resultIndex; i < event.results.length; i++) {
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");
                if (event.results[i].isFinal) {
                    finalTranscripts += transcript;
                } else {
                    interimTranscripts += transcript;
                }
            }
            r.innerHTML = finalTranscripts  + interimTranscripts ;
            $("#searchEvents").val(r.innerText);


        };


        speechRecognizer.onerror = function (event) {
        };
    } else {
        r.innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
    }


});




  