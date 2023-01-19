var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');
var stopButton = document.querySelector('#stop-btn');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices();

  for(i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

inputForm.onsubmit = function(event) {
  event.preventDefault();

  var speakText = new SpeechSynthesisUtterance(inputTxt.value);

  var selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedVoice) {
      speakText.voice = voices[i];
    }
  }

  speakText.rate = rate.value;
  speakText.pitch = pitch.value;
  synth.speak(speakText);

  inputTxt.blur();
}

stopButton.addEventListener('click', function(){
    synth.cancel();
});

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}
