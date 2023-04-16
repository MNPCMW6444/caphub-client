import { Document } from "mongoose";

export interface CapHubUser extends Document {
  email: string;
  name: string;
  passwordHash: string;
}
