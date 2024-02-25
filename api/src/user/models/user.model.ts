import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true }) // Email is unique for each user
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  dob: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Apply pre-save hook
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export interface IUser {
    id?: string;
    username: string;
    email: string;
    dob: Date;
    createdAt: Date;
}
