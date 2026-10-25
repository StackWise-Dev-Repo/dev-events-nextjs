import mongoose, { Schema } from 'mongoose';
import { IRegisterUser, IRegisterUserModel } from '@/lib/types';

const registerUserSchema: Schema<IRegisterUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
      maxlength: [100, 'User name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'User email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    registerDateTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: ensure email is lowercased and registration date is set
registerUserSchema.pre<IRegisterUser>('save', function () {
  const user = this;

  // Ensure email is always lowercase
  if (user.isModified('email')) {
    user.email = user.email.toLowerCase().trim();
  }

  // Set registration date for new users
  if (user.isNew && !user.registerDateTime) {
    user.registerDateTime = new Date();
  }
});

// Indexes for better query performance
registerUserSchema.index({ email: 1 });

// Static method: Find user by email
registerUserSchema.static('findByEmail', function (email: string) {
  return this.findOne({ email: email.toLowerCase().trim() });
});

const RegisterUser = mongoose.model<IRegisterUser, IRegisterUserModel>('RegisterUser', registerUserSchema);

export default RegisterUser;
