import bcrypt from "bcrypt";

const PasswordHash = (userSchema) => {
  userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
      next();
    } catch (error) {
      console.log(error);
      return next(error);
    }
  });
};
export default PasswordHash;
