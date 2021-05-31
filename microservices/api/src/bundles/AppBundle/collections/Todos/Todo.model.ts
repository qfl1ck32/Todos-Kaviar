import { Schema, Is, a, an } from "@kaviar/validator-bundle";

@Schema()
export class Todo {
  @Is(a.objectId().required())
  _id: any;

  @Is(a.objectId().required())
  userId: any;

  @Is(a.string().required())
  title: string;

  @Is(a.number().required())
  order: number;

  @Is(a.string().required())
  description: string;

  @Is(a.boolean().required())
  checked: boolean;
}
