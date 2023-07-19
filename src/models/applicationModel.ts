import { Api } from "../api";
import type { SearchParams } from "../api";
import { Data } from "../data";
import { Server } from "../typings";

export default class ApplicationModel {
  modelName: keyof typeof Data | undefined;
  caption = "";
  indexCaption = "";
  description = "";
  icon = "";

  static find(id: number) {
    if (this.modelName) {
      return Api.find(this.modelName, id);
    }
  }

  static search(params?: SearchParams) {
    if (this.modelName) {
      return Api.search(this.modelName, params);
    }
  }

  static get(id: number) {
    if (this.modelName) {
      return Api.get(this.modelName, id);
    }
  }

  static create(item: Server.Model | Server.Preorder) {
    if (this.modelName) {
      return Api.create(this.modelName, item);
    }
  }

  static update(id: number, item: Server.Model | Server.Preorder) {
    if (this.modelName) {
      return Api.update(this.modelName, id, item);
    }
  }

  static delete(id: number) {
    if (this.modelName) {
      return Api.delete(this.modelName, id);
    }
  }

  static get modelName() {
    return new this().modelName;
  }

  static get caption() {
    return new this().caption;
  }

  static get indexCaption() {
    return new this().indexCaption;
  }

  static get description() {
    return new this().description;
  }

  static get icon() {
    return new this().icon;
  }
}
