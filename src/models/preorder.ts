import ApplicationModel from "./applicationModel";

export class Preorder extends ApplicationModel {
  modelName = "Preorders" as const;
  indexCaption = "Потребности";
  caption = "Потребность";
  description = "Информация о потребностях в оборудовании";
  icon = "calendar plus";
}
