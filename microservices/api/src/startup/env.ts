import { config } from "dotenv";
import { KernelContext } from "@kaviar/core";

const result = config();

if (result.error) {
  console.error(result.error);
  process.exit(0);
}

export default {
  APP_URL: process.env.APP_URL,
  ROOT_URL: process.env.ROOT_URL,
  ROOT_PORT: parseInt(process.env.ROOT_PORT),
  MONGO_URL: process.env.MONGO_URL,
  CONTEXT: (process.env.NODE_ENV as KernelContext) || KernelContext.DEVELOPMENT,
};
