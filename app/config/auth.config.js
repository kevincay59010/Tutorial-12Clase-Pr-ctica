module.exports = {
  secret: process.env.JWT_SECRET || "dev_secret_example",
  expiresIn: process.env.JWT_EXPIRES_IN || "1h"
};
