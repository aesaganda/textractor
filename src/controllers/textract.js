const { createWorker } = require("tesseract.js");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

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

const imageToPdf = async (req, res) => {
  const { imagePath, lang } = req.body;

  if (!imagePath) {
    return res.status(400).send("Missing imageUrl");
  }

  if (!lang) {
    return res.status(400).send("Missing language");
  }

  try {
    // Recognize text in image using Tesseract.js
    const worker = await createWorker({
      // langPath: "../../lang-data/",
      logger: (m) => console.log(m),
    });

    await worker.loadLanguage(lang);
    await worker.initialize(lang);

    const { data } = await worker.recognize(imagePath);
    const { text } = await data;
    await worker.terminate();

    // PDF oluşturma ve metni PDF'e yazma
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(text, { x: 50, y: 500 });

    // PDF'i dosyaya yazma
    const pdfBytes = await pdfDoc.save();
    const outputPdfPath = `${Date.now()}.pdf`; // random create pdf name with date
    fs.writeFileSync(outputPdfPath, pdfBytes);

    res.download(outputPdfPath, (err) => {
      if (err) {
        res.status(500).send("PDF file dont download");
      } else {
        fs.unlinkSync(outputPdfPath);
      }
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("An error occurred while processing the pdf.");
  }
};

module.exports = {
  imageRecognize,
  imageDetect,
  imageToPdf,
};
