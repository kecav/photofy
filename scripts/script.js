let allowDownload = false;
let img = new Image();

// image data
const fileData = {
    fileName: "",
    fileSize: "",
    filter: {
        blur: "0px",
        brightness: "1",
        contrast: "100%",
        hue: "0deg",
        saturate: "100%",
        sepia: "0%",
    },
};

// file upload handler
const uploadImage = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    // readerfile onload
    reader.onloadend = (e) => {

        // add file data
        fileData.fileName = imageFile.name;
        fileData.fileSize = `${(imageFile.size / 1024).toFixed(2)}KB`;
        console.log(imageFile);

        // add image
        img.src = e.target.result;

        // load image on canvas
        img.onload = () => {

            // uncomment this for applying filters directly to canvas
            // canvas.width = img.width;
            // canvas.height = img.height;
            // ctx.drawImage(img, 0, 0);

            // applying all filters to img element for better performance
            img.setAttribute("id", "preview-img");
            figure.appendChild(img);
            allowDownload = true;
        };
    };
};

// returns filters in string format
const getFilterString = () => {
    let filter = "";

    // iterate through each key values of filter
    for (property in fileData.filter) {
        if (property === "hue") {
            filter += `hue-rotate(${fileData.filter[property]}) `;
            continue;
        }
        filter += `${property}(${fileData.filter[property]}) `;
    }

    console.log(filter);
    return filter;
}

// render canvas
const applyFilters = () => {

    // render the new filter on canvas
    // ctx.clearRect(0, 0, img.width, img.height);
    // ctx.filter = filter;
    // ctx.drawImage(img, 0, 0);

    // filters for image
    img.style.filter = getFilterString();
};

// resets all filters
const resetFilters = () => {

    // clears previous screen
    // ctx.clearRect(0, 0, img.width, img.height);
    // ctx.filter = "none";
    // ctx.drawImage(img, 0, 0);

    // img element filter
    img.style.filter = "none";
}

// downloads file
const downloadImage = () => {
    if (!allowDownload) {
        return;
    }

    // create canvas first 
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.filter = img.style.filter;
    ctx.drawImage(img, 0, 0);

    // creates anchor tag to download
    const a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.setAttribute("download", `${fileData.fileName.slice(0, -4)}_edited.${fileData.fileName.slice(-3)}`);
    a.click();

    // 
    console.log("downloaded");
};


// crop
const cropImage = () => {
    console.log("cropped");
    ctx.fillStyle = "#00000044";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = canvas.width / 500;
    ctx.clearRect(0, 0, 200, 200);
    // ctx.strokeRect(20, 10, 160, 100);
    // ctx.strokeRect(canvas.width / 3, canvas.height / 3, canvas.width / 3, canvas.height / 3);
    // ctx.fillRect(canvas.width / 3, canvas.height / 3, canvas.width / 3, canvas.height / 3);
    // ctx.drawImage(img, 0, 0);
};

// event listeners
inputFile.addEventListener("change", uploadImage);
downloadBtn.addEventListener("click", downloadImage);
resetBtn.addEventListener("click", resetFilters);

// filter events
blur.addEventListener("input", (e) => {
    fileData.filter.blur = e.target.value + "px";
    blurVal.innerText = e.target.value + "px";
    applyFilters();
});
brightness.addEventListener("input", (e) => {
    fileData.filter.brightness = e.target.value / 100;
    brightnessVal.innerText = e.target.value + "%";
    applyFilters();
});
contrast.addEventListener("input", (e) => {
    fileData.filter.contrast = e.target.value + "%";
    contrastVal.innerText = e.target.value + "%";
    applyFilters();
});
hue.addEventListener("input", (e) => {
    fileData.filter.hue = e.target.value + "deg";
    hueVal.innerText = e.target.value + "deg";
    applyFilters();
});
saturate.addEventListener("input", (e) => {
    fileData.filter.saturate = e.target.value + "%";
    saturateVal.innerText = e.target.value + "%";
    applyFilters();
});
sepia.addEventListener("input", (e) => {
    fileData.filter.sepia = e.target.value + "%";
    sepiaVal.innerText = e.target.value + "%";
    applyFilters();
});