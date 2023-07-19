import ApplicationModel from "./applicationModel";

export class PreorderType extends ApplicationModel {
  modelName = "PreorderTypes" as const;
  caption = "Тип потребности";
  indexCaption = "Типы потребностей";
  description = "Список доступных вариантов потребности";
  icon = "calendar plus";
}
