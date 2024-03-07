export const enforceHTTPS = (req, res, next) => {
  if (req.secure) {
    return next();
  }
  res.redirect(`https://${req.hostname}:${port}${req.url}`);
};
