const { createWorker } = require("tesseract.js");
const fs = require('fs');

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
    console.log(text);

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
    console.log(text);

    await worker.terminate();

    res.status(200).send(text);
  } catch (error) {
    res.status(500).send("An error occurred while processing the image.");
  }
};

const downloadPDF = async (req, res) => {
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
      data: { text, pdf },
    } = await worker.recognize(myImage, { pdfTitle: 'Textractor Result' }, { pdf: true });
    console.log(text);

    fs.writeFileSync('textractor-result.pdf', Buffer.from(pdf));
    console.log('Generate PDF: textractor-result.pdf');
    await worker.terminate();

    res.status(200).send(text);
  } catch (error) {
    res.status(500).send("An error occurred while processing the image.");
  }
};

module.exports = {
  imageRecognize,
  imageDetect,
  downloadPDF,
};
