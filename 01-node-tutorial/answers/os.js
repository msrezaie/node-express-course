const os = require("os");

const osInfo = {
  hostname: os.hostname(),
  memory: os.freemem(),
  platform: os.platform(),
  version: os.version(),
};

module.exports = osInfo;
