import { Collection, Behaviors } from "@kaviar/mongo-bundle";
import * as links from "./Users.links";
import * as reducers from "./Users.reducers";
import { User } from "./User.model";

export class UsersCollection extends Collection<User> {
  static collectionName = "users";
  static model = User;

  static links = links;
  static reducers = reducers;

  static behaviors = [];

  // Create an array of indexes
  static indexes = [];
}
