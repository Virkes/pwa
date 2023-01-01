const record = document.querySelector('.record');
const stop = document.querySelector('.stop');
const soundClips = document.querySelector('.sound-clips');
const canvas = document.querySelector('canvas');
const mainSelection = document.querySelector('.main-controls');

stop.disabled = true;

let audioCtx;
const canvasCtx = canvas.getContext("2d");

if (navigator.mediaDevices.getUserMedia){

    const constraints = { video: false, audio: true}
    let chunks = [];

    let onSuccess = function(stream) {
        const mediaRecorder = new MediaRecorder(stream);

        record.onclick = function() {
            mediaRecorder.start();
            record.getElementsByClassName.background = "red";

            stop.disabled = false;
            record.disabled = true;
        }

        stop.onclick = function() {
            mediaRecorder.stop();
            record.style.background = "";
            record.style.color = "";

            stop.disabled = true;
            record.disabled = false;
        }

        mediaRecorder.onstop = function(e) {

            const clipContainer = document.createElement('article');
            const clipLabel = document.createElement('p');
            clipLabel.textContent = 'Untitled'

            const audio = document.createElement('audio');
            const deleteButton = document.createElement('button');

            clipContainer.classList.add('clip');
            audio.setAttribute('controls', '');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';

            clipContainer.appendChild(audio);
            clipContainer.appendChild(clipLabel);
            clipContainer.appendChild(deleteButton);
            soundClips.appendChild(clipContainer);

            audio.controls = true;
            const blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'});
            chunks = [];
            const audioURL = window.URL.createObjectURL(blob);
            audio.src = audioURL;

            deleteButton.onclick = function(e) {
                let evtTgt = e.target;
                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
            }
            
        }

        mediaRecorder.ondataavailable = function(e) {
            chunks.push(e.data);
        }

    }
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess)
}