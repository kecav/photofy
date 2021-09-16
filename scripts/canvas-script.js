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
            const ratio = img.width / img.height;

            // uncomment this for applying filters directly to canvas
            canvas.width = img.width > 2000 ? 2000 : img.width;
            canvas.height = img.width > 2000 ? 2000 / ratio : img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.removeAttribute("hidden");

            // allow download
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
};

// render canvas
const applyFilters = (e) => {

    // render the new filter on canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = getFilterString();
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// resets all filters
const resetFilters = () => {

    // clears previous screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = "none";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    console.log("reset");
};

// creates new canvas to export file to the size of original image
const getExportCanvas = () => {
    const finalCanvas = document.createElement("canvas");
    const finalCtx = finalCanvas.getContext("2d");
    finalCanvas.width = img.width;
    finalCanvas.height = img.height;

    finalCtx.filter = getFilterString();
    finalCtx.drawImage(img, 0, 0);

    return finalCanvas;
};

// downloads file
const downloadImage = () => {
    if (!allowDownload) {
        return;
    }

    // 
    const a = document.createElement("a");
    a.href = getExportCanvas().toDataURL();
    a.setAttribute("download", `${fileData.fileName.slice(0, -4)}_edited.${fileData.fileName.slice(-3)}`);
    a.click();
    console.log("downloaded");
};


// crop
const cropImage = () => {
    console.log("cropped");
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
// cropX.addEventListener("input", (e) => {
//     console.log("CropX :", e.target.value);
// });
// cropY.addEventListener("input", (e) => {
//     console.log("CropY: ", e.target.value);
// });