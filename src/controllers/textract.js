const { createWorker } = require("tesseract.js");

const imageRecognize = async (req, res) => {
  const { imageUrl, language } = req.body;

  if (!imageUrl) {
    return res.status(400).send("Missing imageUrl");
  }

  if (!language) {
    return res.status(400).send("Missing language");
  }

  try {
    // Recognize text in image using Tesseract.js
    const worker = await createWorker({
      logger: (m) => console.log(m),
    });

    await worker.loadLanguage(language);
    await worker.initialize(language);

    const myImage = imageUrl;

    const {
      data: { text },
    } = await worker.recognize(myImage);

    await worker.terminate();

    res.status(200).send(text);
  } catch (error) {
    res.status(500).send("An error occurred while processing the image.");
  }
};

const imageDetect = async (req, res) => {
  try {
    // Detect text in image using Tesseract.js
    const path = require("path");
    const Tesseract = require("tesseract.js");

    const [, , imagePath] = process.argv;
    // const image = path.resolve(__dirname, (imagePath || '../../tests/assets/images/cosmic.png'));

    const image = "https://tesseract.projectnaptha.com/img/eng_bw.png";
    console.log(`Recognizing ${image}`);

    Tesseract.detect(image, { logger: (m) => console.log(m) }).then(({ data }) => {
      console.log(data);
    });
  } catch (error) {
    res.status(500).send("An error occurred while processing the image.");
  }
};

module.exports = {
  imageRecognize,
  imageDetect,
};
