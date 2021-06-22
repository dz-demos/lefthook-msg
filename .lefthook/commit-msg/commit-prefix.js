const { promises: fsp } = require("fs");

const [, , messageFilePath] = process.argv;

const regex = /^\[PROJ\-\d+\]/;

/**
 * @param {string} message
 * @returns { boolean }
 */
function testMessage(message) {
  return regex.test(message);
}

fsp.readFile(messageFilePath, { encoding: "utf8" }).then((commitMessage) => {
  const valid = testMessage(commitMessage);

  if (!valid) {
    return fsp.writeFile(messageFilePath, `[PROJ-42] ${commitMessage}`, {
      encoding: "utf8",
    });
  }
});
