import ApplicationModel from "./applicationModel";

export class Configuration extends ApplicationModel {
  modelName = "Configurations" as const;
  caption = "Конфигурация";
  indexCaption = "Конфигурации";
  description = "Настройка списка типовых конфигураций оборудования";
  icon = "sliders";
}
