import Joi from "joi";
export const validateUserData = (data) => {
  const schema = Joi.object({
    uid: Joi.string().guid(),
    orgId: Joi.string().guid(),
    FirstName: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[A-Za-z]+$/)
      .required(),
    LastName: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[A-Za-z]+$/)
      .required(),
    Email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    Gender: Joi.string().valid("male", "female").required(),
    Age: Joi.number().integer().min(20).max(99).required(),
    Organisation: Joi.string().required().min(3),
    start: Joi.date().required(),
    end: Joi.date().less("2099-12-31").required(),
    JobTitle: Joi.string().required().min(3),
    Phone: Joi.string()
      .pattern(/\b\d{10,12}\b/)
      .required(),
    Address: Joi.string().min(5).max(40).required(),
    ProfilePic: Joi.string().uri().required(),
  }).options({ abortEarly: false });

  return schema.validate(data);
};

export const validateAdminData = (data) => {
  const normalizedData = {
    ...data,
    docsURL: data.docsURL === "" ? null : data.docsURL,
    referenceId: data.referenceId === "" ? null : data.referenceId,
  };

  const schema = Joi.object({
    fullName: Joi.string().min(2).max(40).required(),
    emailId: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    orgName: Joi.string().min(2).max(40).required(),
    designation: Joi.string().min(2).max(40).required(),
    avatarURL: Joi.string().uri().required(),
    logoURL: Joi.string().uri().required(),
    docsURL: Joi.string().uri().allow(null),
    referenceId: Joi.string().max(8).allow(null),
  })
    .xor("docsURL", "referenceId")
    .options({ abortEarly: false });

  return schema.validate(normalizedData);
};

export const emailValid = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

export const userDetValid = (data) => {
  const schema = Joi.object({
    mail: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    pass: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and must be at least 8 characters long.",
      }),
    tok: Joi.string().required(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

export const otpValid = (data) => {
  const schema = Joi.object({
    otp: Joi.string().required(),
    mfaID: Joi.string().guid().required,
  });
  return schema.validate(data);
};

export const coordinatesValid = (data) => {
  const schema = Joi.object({
    latitude: Joi.number().min(-90).max(90).required().messages({
      "number.base": "Latitude must be a number",
      "number.min": "Latitude must be greater than or equal to -90",
      "number.max": "Latitude must be less than or equal to 90",
      "any.required": "Latitude is required",
    }),

    longitude: Joi.number().min(-180).max(180).required().messages({
      "number.base": "Longitude must be a number",
      "number.min": "Longitude must be greater than or equal to -180",
      "number.max": "Longitude must be less than or equal to 180",
      "any.required": "Longitude is required",
    }),
  });
  return schema.validate(data);
};
