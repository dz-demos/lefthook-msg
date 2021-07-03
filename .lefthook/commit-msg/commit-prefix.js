const { promises: fsp } = require("fs");

// https://git-scm.com/docs/githooks#_commit_msg
// commit-msg takes a single parameter, the name of the file that holds the proposed commit log message
const [, , messageFilePath] = process.argv;

const regex = /^\[PROJ\-\d+\]/;

/**
 * Checks if we like the message
 * @param {string} message
 * @returns { boolean }
 */
function testMessage(message) {
  return regex.test(message);
}

(async () => {
  // Read the commit message from the file
  const commitMessage = await fsp.readFile(messageFilePath, {
    encoding: "utf8",
  });

  // Check if it is prefixed
  const valid = testMessage(commitMessage);

  if (!valid) {
    // If the message is not prefixed add hardcoded prefix
    // TODO: extract prefix from the branch name
    const prefixedMessage = `[PROJ-42] ${commitMessage}`;

    // write the prefixed message to the commit message file
    await fsp.writeFile(messageFilePath, prefixedMessage, { encoding: "utf8" });
  }
})();
