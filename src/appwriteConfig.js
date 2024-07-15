import {
  Client,
  Account,
  Databases,
  ID,
  Permission,
  Role,
  Query,
} from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_API_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID, Permission, Role, Query };
