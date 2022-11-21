var form = document.getElementById('form');
var downloadBtn = document.getElementById('download')
//var xhr = new XMLHttpRequest();
var results;

async function submit(e) {
    e.preventDefault();
    downloadBtn.disabled = true;
    downloadBtn.innerText = 'Waiting for results';
    let url = "/submit/"; //http://127.0.0.1:8000/submit/
    console.log(url);
    let formData = new FormData(form);
    let response = await fetch(url, {method:'POST', 
                                    //  headers: {
                                    //     'Content-Type': "multipart/form-data",
                                    //  },
                                     body: formData
                                    }
                              );
    
    if (response.ok) {
        results = await response.text();  //response.blob();
        downloadBtn.disabled = false;
        // Create a new link
        //<a href="file.pdf" download="resume.pdf">Download PDF</a>
        const anchor = document.createElement('a');
        //href = '/download/'+results;
        href = '/results/'+results;
        anchor.href = href.replaceAll('"','');
        console.log('right code', anchor.href);
        anchor.innerHTML = 'Download Results';
        //anchor.download = 'results.tar';

        downloadBtn.innerText = '';
        // Append to the DOM
        downloadBtn.appendChild(anchor);
    } else {
        alert("HTTP-Error: " + response.status);
    }
    
};

form.addEventListener('submit', submit);

function downloadBtnHandler() {
    
};

downloadBtn.addEventListener('onclick', downloadBtnHandler);

