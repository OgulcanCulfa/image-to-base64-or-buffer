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
    fs.readFile(pth, { encoding: "base64" }, (err, data) => {
      //if (err) throw err;

      // Save Buffer
      //fs.writeFile("compressed_new.txt", buff, () => {});

      // Save Base64
      //fs.writeFile("compressed.txt", data, () => {});
    });
  } catch (err) {
    console.log(err);
  }
}

compress();
