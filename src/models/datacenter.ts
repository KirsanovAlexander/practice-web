import ApplicationModel from "./applicationModel";

export class Datacenter extends ApplicationModel {
  modelName = "Datacenters" as const;
  caption = "ЦОД";
  indexCaption = "ЦОДы";
  description = "Список ЦОДов";
  icon = "building";
}
