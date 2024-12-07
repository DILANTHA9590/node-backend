import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  isBlock: {
    type: Boolean,
    default: false,
  },

  type: {
    type: String,
    default: "customer",
  },

  profilePic: {
    type: String,
    default:
      "https://th.bing.com/th/id/OIP.1mSyfMp-r01kxBYitbubbAHaHa?w=193&h=193&c=7&r=0&o=5&pid=1.7",
  },
});

const User = mongoose.model("users", userSchema);

export default User;
