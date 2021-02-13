const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const fs = require("fs");

async function compress() {

  try {

    const file = await imagemin(["images/*.{jpg,png}"], {
      destination: "compressed/",
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    });


    const pth = file[0].destinationPath.toString().replace(/\\/g, "/");
    const buff = file[0].data;

    // // Save as txt in Buffer format
    // fs.writeFile("compressed_buffer.txt", buff, () => {});

    fs.readFile(pth, { encoding: "base64" }, (err, data) => {
      if (err) throw err;
      // Save as txt in Base64 format
      //fs.writeFile("compressed_base64.txt", data, () => {});
    });
  } catch (err) {
    console.log(err);
  }
}

compress();
