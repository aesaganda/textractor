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
      // langPath: "../../lang-data/",
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
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).send("Missing imageUrl");
  }

  try {
    // Detect text in image using Tesseract.js
    const worker = await createWorker({
      // langPath: "../../lang-data",
      logger: (m) => console.log(m),
    });

    await worker.loadLanguage("osd");
    await worker.initialize("osd");

    const myImage = imageUrl;

    const {
      data: { text },
    } = await worker.detect(myImage);

    await worker.terminate();

    res.status(200).send(text);
  } catch (error) {
    res.status(500).send("An error occurred while processing the image.");
  }
};

module.exports = {
  imageRecognize,
  imageDetect,
};
