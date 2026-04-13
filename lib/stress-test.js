const puppeteer = require("puppeteer");
const _ = require("lodash/fp");
const username = require("./username");

const initClient = async (
  browser,
  logger,
  joinUrl,
  webcam = false,
  microphone = false
) => {

  const page = await browser.newPage();
  await page.goto(joinUrl);
  try {




    const timeout = 10000;
    page.setDefaultTimeout(timeout);

    {
      const targetPage = page;
      await targetPage.setViewport({
        width: 1280,
        height: 903
      })
    }

    if (microphone) {
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator("[data-test='microphoneBtn'] i"),
        targetPage.locator('::-p-xpath(//*[@data-test=\\"microphoneBtn\\"]/span[1]/i)'),
        targetPage.locator(":scope >>> [data-test='microphoneBtn'] i")
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 22.421875,
            y: 9.453125,
          },
        });

      {
        const targetPage = page;
        await puppeteer.Locator.race([
          targetPage.locator("[data-test='joinEchoTestButton'] > span"),
          targetPage.locator('::-p-xpath(//*[@data-test=\\"joinEchoTestButton\\"]/span)'),
          targetPage.locator(":scope >>> [data-test='joinEchoTestButton'] > span")
        ])
          .setTimeout(timeout)
          .click({
            offset: {
              x: 46.796875,
              y: 10.375,
            },
          });
      }
    } else {
      {
        const targetPage = page;
        await puppeteer.Locator.race([
          targetPage.locator("[data-test='listenOnlyBtn'] i"),
          targetPage.locator('::-p-xpath(//*[@data-test=\\"listenOnlyBtn\\"]/span[0]/i)'),
          targetPage.locator(":scope >>> [data-test='listenOnlyBtn'] i")
        ])
          .setTimeout(timeout)
          .click({
            offset: {
              x: 47.828125,
              y: 13.453125,
            },
          });
      }
    }

    if (webcam) {

      await page.screenshot({ path: '/app/example-0.png' });
      {
        const targetPage = page;
        await puppeteer.Locator.race([
          targetPage.locator('div.sc-jknRBj i'),
          targetPage.locator('::-p-xpath(//*[@data-test=\\"joinVideo\\"]/span[1]/i)'),
          targetPage.locator(':scope >>> div.sc-jknRBj i')
        ])
          .setTimeout(timeout)
          .click({
            offset: {
              x: 14.5,
              y: 9.96875,
            },
          });
      }

      await page.screenshot({ path: '/app/example-1.png' });
      const targetPage = page;
      await puppeteer.Locator.race([
        targetPage.locator('::-p-aria(Start sharing) >>>> ::-p-aria([role=\\"generic\\"])'),
        targetPage.locator("[data-test='startSharingWebcam'] > span"),
        targetPage.locator('::-p-xpath(//*[@data-test=\\"startSharingWebcam\\"]/span)'),
        targetPage.locator(":scope >>> [data-test='startSharingWebcam'] > span"),
        targetPage.locator('::-p-text(Start sharing)')
      ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 52,
            y: 10.6875,
          },
        });
    }

    return Promise.resolve(page);
  } catch (e) {
    console.log(e)
    await page.screenshot({ path: '/app/example.png' });
    throw e
  }


  // await browser.close();

  // const microphoneS = "#simpleModal > div > div > div.sc-eNSrOW.dxxcAK > div > span > button:nth-child(1)"
  // const listenOnlyS = "#simpleModal > div > div > div.sc-eNSrOW.dxxcAK > div > span > button:nth-child(3)"
  // // try {
  // //   // const audioAction = microphone ? "Microphone" : "Listen only";
  // //   // logger.debug(`waiting for audio prompt ([aria-label="${audioAction}"])`);
  // //   // await page.waitForSelector(`[aria-label="${audioAction}"]`);
  // //   // logger.debug(`click on ${audioAction}`);
  // //   // await page.click(`[aria-label="${audioAction}"]`);
  // //   if (microphone) {
  // //     logger.debug("waiting for the echo test dialog");
  // //     try {
  // //       await page.waitForSelector(`[aria-label="Echo is audible"]`);
  // //       logger.debug(
  // //         'echo test dialog detected. clicking on "Echo is audible" button.'
  // //       );
  // //       await page.click(`[aria-label="Echo is audible"]`);
  // //     } catch (err) {
  // //       logger.debug(
  // //         "unable to detect the echo test dialog. Maybe echo test is disabled."
  // //       );
  // //     }
  // //   }
  // // } catch (e) {
  // //   await page.screenshot({ path: '/app/example.png' });
  // //   throw e
  // // }
  // try {
  //   await page.waitForSelector(microphoneS)
  //   if (microphone) {
  //     await page.click(microphoneS)
  //   } else {
  //     await page.click(listenOnlyS)
  //   }
  // } catch (e) {
  //   await page.screenshot({ path: '/app/example.png' });
  //   throw e
  // }



  // try {
  //   // const joinButtonSelector = "#simpleModal > div > div > div.sc-dhFUGM.hoHpSR > div > div.sc-imwsjW.hzdSF > button.sc-JrDLc.jctMqV"
  //   // const joinButtonSelector = "#simpleModal > div > div > div.sc-eNSrOW.dxxcAK > div > div.sc-dGCmGc.fsTlEJ > button.sc-lcIPJg.dLqmEV"
  //   const joinButtonSelector = "#simpleModal  button[aria-label='Join audio']"
  //   await page.waitForSelector(joinButtonSelector);

  //   if (!microphone) {
  //     // const microphoneSelector = "#simpleModal > div > div > div.sc-dhFUGM.hoHpSR > div > div.sc-dGCmGc.YMtPt > div:nth-child(1) > label > select"
  //     const microphoneSelector = "#simpleModal > div > div > div.sc-eNSrOW.dxxcAK > div > div.sc-bkEOxz.eoSMwh > div:nth-child(1) > label > select"
  //     await page.select(microphoneSelector, 'listen-only')
  //     await page.screenshot({ path: '/app/listen-only.png' });
  //   }
  //   await page.click(joinButtonSelector)
  //   logger.debug(`click on Join Audio`);
  // } catch (e) {
  //   await page.screenshot({ path: '/app/example-2.png' });
  //   throw e
  // }

  // await page.waitForSelector(".ReactModal__Overlay", { hidden: true });
  // if (microphone) {
  //   logger.debug("Ensure that we are not muted...");
  //   // Wait for the toolbar to appear
  //   await page.waitForSelector('[aria-label="Mute"],[aria-label="Unmute"]');
  //   // If we are muted, click on Unmute
  //   const unmuteButton = await page.$('[aria-label="Unmute"]');
  //   if (unmuteButton !== null) {
  //     logger.debug("clicking on unmute button");
  //     await unmuteButton.click();
  //   }
  // }
  // if (webcam) {
  //   // await page.waitForSelector('[aria-label="Share webcam"]');
  //   // await page.click('[aria-label="Share webcam"]');
  //   const WebcamButton = await page.waitForSelector('button#tippy-22')
  //   await WebcamButton.click();
  //   await page.screenshot({ path: '/app/after-click-webcam.png' });
  //   logger.debug("clicked on sharing webcam");
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   await page.waitForSelector("#setCam > option");
  //   await page.waitForSelector('[aria-label="Start sharing"]');
  //   logger.debug("clicking on start sharing");
  //   await page.click('[aria-label="Start sharing"]');
  // }
  // return Promise.resolve(page);
};

const generateClientConfig = (webcam = false, microphone = false) => {
  return {
    username: username.getRandom(),
    webcam,
    microphone,
  };
};

async function start(
  bbbClient,
  logger,
  meetingID,
  testDuration,
  clientWithCamera,
  clientWithMicrophone,
  clientListening
) {
  const [browser, meetingPassword] = await Promise.all([
    puppeteer.launch({
      // headless:'shell',
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome',
      // executablePath: "google-chrome-unstable",
      args: [
        "--use-fake-device-for-media-stream",
        "--use-fake-ui-for-media-stream",
        "--mute-audio",
        "--no-sandbox",
        "--disable-setuid-sandbox" // Often required in Linux/Docker
      ],
    }),
    bbbClient.getModeratorPassword(meetingID),
  ]);

  const clientsConfig = [
    ...[...Array(clientWithCamera)].map(() => generateClientConfig(true, true)),
    ...[...Array(clientWithMicrophone)].map(() =>
      generateClientConfig(false, true)
    ),
    ...[...Array(clientListening)].map(() =>
      generateClientConfig(false, false)
    ),
  ];

  for (let idx = 0; idx < clientsConfig.length; idx++) {
    logger.info(`${clientsConfig[idx].username} join the conference`);
    await initClient(
      browser,
      logger,
      bbbClient.getJoinUrl(
        clientsConfig[idx].username,
        meetingID,
        meetingPassword
      ),
      clientsConfig[idx].webcam,
      clientsConfig[idx].microphone
    ).catch((err) => {
      logger.error(
        `Unable to initialize client ${clientsConfig[idx].username} : ${err}`
      );
      Promise.resolve(null);
    });
  }

  logger.info("All user joined the conference");
  logger.info(`Sleeping ${testDuration}s`);
  await new Promise((resolve) => setTimeout(resolve, testDuration * 1000));
  logger.info("Test finished");
  return browser.close();
}

module.exports = {
  start,
};
