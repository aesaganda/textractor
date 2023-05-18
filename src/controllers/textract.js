const { createWorker, createScheduler } = require("tesseract.js");
const fs = require("fs");

const scheduler = createScheduler();

// Creates worker and adds to scheduler
const workerGen = async (req, res) => {

  const worker = await createWorker({ cachePath: "." });
  await worker.loadLanguage(req.body.language);
  await worker.initialize(req.body.language);

  const image = req.body.imageUrl;
  console.log(`Processing ${image}`);

  scheduler.addWorker(worker);
}

const workerN = 4;

const schedule = async (req, res) => {
  const { imageUrl, language } = req.body;

  if (!imageUrl) {
    return res.status(400).send("Missing imageUrl");
  }

  if (!language) {
    return res.status(400).send("Missing language");
  }
  const resArr = Array(workerN);
  for (let i = 0; i < workerN; i++) {
    resArr[i] = workerGen(req, res);
  }
  await Promise.all(resArr);
  /** Add 4 recognition jobs */
  const results = await Promise.all(Array(10).fill(0).map(() => (
    scheduler.addJob('recognize', imageUrl).then((x) => console.log(x.data.text))
  )))

  console.log(results);

  await scheduler.terminate(); // It also terminates all workers.
  res.status(200).send("Scheduler terminated successfully");
};

const convertImage = (imageSrc) => {
  const data = atob(imageSrc.split(',')[1])
    .split('')
    .map((c) => c.charCodeAt(0));

  return new Uint8Array(data);
}

const imageProcessing = async (req, res) => {
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

    const image = imageUrl;
    console.log(`Processing ${image}`);

    const { data: { imageColor, imageGrey, imageBinary } } = await worker.recognize(image, { rotateAuto: true }, { imageColor: true, imageGrey: true, imageBinary: true });

    console.log("Saving intermediate images: imageColor.png, imageGrey.png, imageBinary.png");

    fs.writeFileSync("imageColor.png", convertImage(imageColor));
    fs.writeFileSync("imageGrey.png", convertImage(imageGrey));
    fs.writeFileSync("imageBinary.png", convertImage(imageBinary));

    await worker.terminate();

    res.status(200).send("Images saved successfully");
  } catch (error) {
    res.status(500).send("An error occurred while processing the image.");
  }
};

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

    const image = imageUrl;
    console.log(`Processing ${image}`);

    const {
      data: { text },
    } = await worker.recognize(image);
    console.log(text);

    await worker.terminate();

    res.status(200).json({
      data: text,
      message: "Success imageRecognize ",
    });

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

    const image = imageUrl;
    console.log(`Processing ${image}`);

    const {
      data: { text },
    } = await worker.detect(image, { rectangle });
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

    const image = imageUrl;
    console.log(`Processing ${image}`);

    const {
      data: { text, pdf },
    } = await worker.recognize(image, { pdfTitle: "Textractor Result" }, { pdf: true });
    console.log(text);

    fs.writeFileSync("textractor-result.pdf", Buffer.from(pdf));
    console.log("Generate PDF: textractor-result.pdf");
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
  imageProcessing,
  schedule,
};
