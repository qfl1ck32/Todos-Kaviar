import { IPasswordAuthenticationStrategy } from "@kaviar/password-bundle";
import { IUser, IUserProfile } from "@kaviar/security-bundle";


export class User implements IUser {
  _id: any;

  isEnabled: boolean;
  createdAt: Date;
  password: IPasswordAuthenticationStrategy;
  profile: IUserProfile;
  /**
   * @reducer
   * This is read from "password.email" let here for convenience for GraphQL
   */
  email: string;
  /**
   * @reducer
   * This is going to return permissions that are in APP_DOMAIN
   */
  roles: string[];
}
