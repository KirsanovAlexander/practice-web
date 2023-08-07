export module Server {
import { Datacenter } from './../models/datacenter';
import { PreorderType } from './../models/preorderType';
  export interface Entity {
    id: number;
  }

  export interface Model extends Entity {
    code: string;
    title: string;
    description: string;
  }

  export type Configuration = Model;

  export type Datacenter = Model;

  export type Environment = Model;

  export interface Preorder extends Entity {
    regNumber: string;
    preorderTypeId: number;
    configurationId: number;
    environmentId: number;
    datacenterIds: Array<number>;
    isReplication: boolean;
    status: "NEW" | "APPROVED" | "IN_WORK" | "COMPLETED";
  }

  export type PreorderType = Model;
}
