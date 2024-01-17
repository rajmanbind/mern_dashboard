import UserModel from "../models/userSchema.js";
import transporter from "../config/emailConfig.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

class UserController {
  static userRegistraion = async (req, res) => {
    const { name, email, password, password_confirmation, turmCondition } =
      req.body;
    const user = await UserModel.findOne({ email: email });

    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      if (name && email && password && password_confirmation && turmCondition) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10);

            const hashPassword = await bcrypt.hash(password, salt);

            const userDoc = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
              turmCondition: turmCondition,
            });
            await userDoc.save();

            // Generate JWT token
            const userJwtGenerate = await UserModel.findOne({ email: email });
            const token = jwt.sign(
              { userID: userJwtGenerate._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "30d" }
            );
            res.status(201).send({
              status: "Success",
              message: "Registered Successfully!",
              token,
            });
          } catch (error) {
            res.send({
              status: "failed",
              message: "Unable to registerd!",
              error,
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "Password and Confirm Password doesn't match",
          });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);

          if (user.email === email && isMatch) {
            // Generate JWT token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "15m" }
            );
            res.send({
              status: "Success",
              message: "Login Successfull!",
              token,
            });
          } else {
            res.send({ status: "failed", message: "Invalid Credendial!" });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not a Registered User",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      res.send({ status: "failed", message: "Unable to Login" });
    }
  };

  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({
          status: "failed",
          message: "Password and Confirm Password doesn't match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);

        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: {
            password: newHashPassword,
          },
        });

        res.send({
          status: "Success",
          message: "Password changed Successfully!",
        });
      }
    } else {
      res.send({
        status: "failed",
        message: "All Fields are Required!",
      });
    }
  };

  static loggedUser = async (req, res) => {
    res.send({ user: req.user });
  };

  static sentMailToResetPassword = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user._id }, secret, {
          expiresIn: "15m",
        });

        // const link = `http://127.0.0.1:5173/api/user/reset/${user._id}/${token}`;
        const link = `http://localhost:5173/api/user/reset/${user._id}/${token}`;
        // Send Email

        // let info = await transporter.sendMail({
        //   from: process.env.EMAIL_FROM,
        //   to: user.email,
        //   subject: "Rajman You did it!",
        //   html: `<a href = ${link}>click here to Reset your password<a/>`,
        // });
        res.send({
          status: "Success",
          message: "Check Your console to Reset Password...",
          link: link,
        });
      } else {
        res.send({
          status: "failed",
          message: "Email doesn't exists!",
        });
      }
    } else {
      res.send({
        status: "failed",
        message: "Email fields Required !",
      });
    }
  };

  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body;
    const { id, token } = req.params;
    const user = await UserModel.findById(id);
    const newSecret = user._id + process.env.JWT_SECRET_KEY;

    try {
      jwt.verify(token, newSecret);

      if (password && password_confirmation) {
        if (password === password_confirmation) {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await UserModel.findByIdAndUpdate(user._id, {
            $set: {
              password: newHashPassword,
            },
          });

          res.send({
            status: "Success",
            message: "Password Reset Successfully",
          });
        } else {
          res.send({
            status: "failed",
            message: "Password doesn't match!",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "All Fields are Required!",
        });
      }
    } catch (error) {
      res.send({
        status: "failed",
        message: "Invalid Token",
      });
    }
  };
}

export default UserController;
