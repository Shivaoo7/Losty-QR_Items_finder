const qrText = document.getElementById('qrText');
const generateBtn = document.getElementById('generateBtn');
const qrcodeDiv = document.getElementById('qrcode');
const downloadBtn = document.getElementById('downloadBtn');

generateBtn.addEventListener('click', () => {
    const text = qrText.value;
    if (text) {
        qrcodeDiv.innerHTML = '';
        const qrcode = new QRCode(qrcodeDiv, {
            text: text,
            width: 128,
            height: 128
        });
        downloadBtn.href = qrcodeDiv.querySelector('canvas').toDataURL("image/png");
        downloadBtn.style.display = 'block';
    }
});

const qrVideo = document.getElementById('qrVideo');
const startScanBtn = document.getElementById('StartScanBtn')
const scanResult = document.getElementById('scanResult');

startScanBtn.addEventListener('click', () => {
    qrVideo.style.display = 'block';

    navigator.mediaDevices.getUserMedia({ video: {facingMode: 'environment'} })
        .then(stream => {
            qrVideo.srcObject = stream;
            const scanner = new Instascan.Scanner({ video: qrVideo });
            scanner.addListener('scan', content => {
                scanResult.innerHTML = `scanned QR Code: ${content}`;
            });
            Instascan.Camera.getCamera()
                .then(cameras =>{
                    if (cameras.length > 0) {
                        scanner.start(cameras[0]);
                    } else {
                        console.error('No Cameras Found.');
                    }
                })
                .catch(error => console.error('Error Accessing Cameras:', error));
        });
});
