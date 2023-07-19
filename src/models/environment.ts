import ApplicationModel from "./applicationModel";

export class Environment extends ApplicationModel {
  modelName = "Environments" as const;
  caption = "Среда";
  indexCaption = "Среды";
  description = "Справочник сред";
  icon = "envira";
}
