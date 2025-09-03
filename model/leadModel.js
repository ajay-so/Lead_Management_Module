const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

// Lead Schema
const leadSchema = new mongoose.Schema(
  {
    id : {
      type : String,
      default : () => "lead-" + nanoid(6), // 6 character id
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required"],
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "Phone number is required"],
      unique: true,
    },
    source: {
      type: String,
      enum: ["WEBSITE", "FACEBOOK", "GOOGLE_ADS", "REFERRAL", "OTHER"],
      default: "WEBSITE",
    },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "QUALIFIED", "LOST", "CONVERTED"],
      default: "NEW",
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
