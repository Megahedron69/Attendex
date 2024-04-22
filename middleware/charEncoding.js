import contentType from "content-type";
export const charset = (req, res, next) => {
  res.set(
    "Content-Type",
    contentType.format({
      type: "application/json",
      parameters: { charset: "utf-8" },
    })
  );
  next();
};
