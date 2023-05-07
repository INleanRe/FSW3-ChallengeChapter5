const ImageKit = require("imagekit")

var imagekit = new ImageKit({
    publicKey: "public_I0fhFMmPPZ1wdW/nSsiTohfWecY=",
    urlEndpoint: "https://ik.imagekit.io/tinpet",
    privateKey: "private_guNf5l+hqG9BkBK3KiLUINAYflQ=",
});

module.exports = imagekit;