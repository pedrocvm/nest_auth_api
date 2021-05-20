import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import FormatDateNow from 'utils/DateFormat';

export enum UserRoleEnum {
  COMMON = '1',
  ADMIN = '2'
}

export type PhoneType = {
  number: number;
  ddd: number;
};

@Schema({
  collection: 'users',
  versionKey: false,
  toJSON: {
    transform: (doc: DocumentType, ret) => {
      ret.id = ret._id;
      delete ret._id;
    }
  },
  timestamps: true
})
export class UserModel extends Document {
  @Prop({
    required: true
  })
  name: string;

  @Prop({
    lowercase: true,
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    required: true,
    select: false
  })
  password: string;

  @Prop({
    required: true
  })
  phones: PhoneType[];

  @Prop({
    default: UserRoleEnum.COMMON
  })
  role: UserRoleEnum;

  @Prop({
    default: FormatDateNow()
  })
  lastLogin: string;

  @Prop({
    unique: true
  })
  token: string;
}

const UserSchema = SchemaFactory.createForClass(UserModel);

export { UserSchema };
