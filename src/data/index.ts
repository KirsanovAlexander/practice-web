import { default as ConfigurationsJSON } from "./configurations.json";
import { default as DatacentersJSON } from "./datacenters.json";
import { default as EnvironmentsJSON } from "./environments.json";
import { default as PreordersJSON } from "./preoders.json";
import { default as PreorderTypesJSON } from "./preorderTypes.json";
import type { Server } from "../typings";

export const Data = {
  Configurations: ConfigurationsJSON as Array<Server.Configuration>,
  Datacenters: DatacentersJSON as Array<Server.Datacenter>,
  Environments: EnvironmentsJSON as Array<Server.Environment>,
  Preorders: PreordersJSON as Array<Server.Preorder>,
  PreorderTypes: PreorderTypesJSON as Array<Server.PreorderType>,
};
