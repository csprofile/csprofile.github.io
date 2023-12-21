pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.mjs';

let pdfContainer = document.getElementById('pdfContainer');
let circles = [];
let counter = 1;
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;

pdfContainer.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    removeCircle(e);
});

pdfContainer.addEventListener('click', function (e) {
    addCircle(e);
});

pdfContainer.addEventListener('wheel', function (e) {
    resizeCircle(e);
});

document.getElementById('pdfInput').addEventListener('change', function (e) {
    loadPDF(e);
});

function addCircle(event) {
    let circle = document.createElement('div');
    circle.className = 'circle';
    circle.textContent = counter;
    counter++;

    let rect = pdfContainer.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    // circle.addEventListener('click', function (e) {
    //     e.stopPropagation();
    //     removeCircle(e);
    // });

    pdfContainer.appendChild(circle);
    circles.push(circle);
}

function removeCircle(event) {
    let target = event.target;
    if (target.classList.contains('circle')) {
        let index = circles.indexOf(target);
        circles.splice(index, 1);
        target.remove();

        // Reorganize numbers
        circles.forEach((circle, i) => {
            circle.textContent = i + 1;
        });
        counter = circles.length + 1;
    }
}

function resizeCircle(event) {
    let target = event.target;
    if (target.classList.contains('circle')) {
        let scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
        let transform = window.getComputedStyle(target).getPropertyValue('transform');
        let currentScale = parseFloat(transform.split(',')[3]) || 1;

        target.style.transform = `scale(${currentScale * scaleFactor})`;
    }
}

function loadPDF(event) {
    let file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
        let reader = new FileReader();

        reader.onload = function (e) {
            let pdfData = e.target.result;
            renderPDF(pdfData);
        };

        reader.readAsArrayBuffer(file);
    } else {
        alert('Please choose a valid PDF file.');
    }
}

function renderPDF(data) {
    pdfjsLib.getDocument({ data: data }).promise.then(function (pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('pdfContainer').innerHTML = '';

        for (let i = 1; i <= pdfDoc.numPages; i++) {
            let canvas = document.createElement('canvas');
            canvas.className = 'pdf-page';
            pdfContainer.appendChild(canvas);
            renderPage(i, canvas);
        }
    });
}

function renderPage(num, canvas) {
    pageRendering = true;
    pdfDoc.getPage(num).then(function (page) {
        let viewport = page.getViewport({ scale: 1 });
        let context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        let renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        page.render(renderContext).promise.then(function () {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
}

pdfContainer.addEventListener('wheel', function (e) {
  let scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
  
  circles.forEach(circle => {
      if (circle.classList.contains('active')) {
          let transform = window.getComputedStyle(circle).getPropertyValue('transform');
          let currentScale = parseFloat(transform.split(',')[3]) || 1;
          circle.style.transform = `scale(${currentScale * scaleFactor})`;
      }
  });
});
