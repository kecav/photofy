// label values
const brightnessVal = document.getElementById("brightness-value");
const contrastVal = document.getElementById("contrast-value");
const saturateVal = document.getElementById("saturate-value");
const sepiaVal = document.getElementById("sepia-value");
const blurVal = document.getElementById("blur-value");
const hueVal = document.getElementById("hue-value");

// filters value
const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const saturate = document.getElementById("saturate");
const blur = document.getElementById("blur");
const sepia = document.getElementById("sepia");
const hue = document.getElementById("hue");

// dom elements
const preview = document.querySelector(".preview");
const figure = document.getElementById("figure");
const inputFile = document.querySelector("#input-file");
const downloadBtn = document.getElementById("download-button");
const resetBtn = document.getElementById("reset-button");
// const cropX = document.getElementById("crop-x");
// const cropY = document.getElementById("crop-y");

// canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");