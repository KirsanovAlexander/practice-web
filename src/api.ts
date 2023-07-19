import { Data } from "./data";
import type { Server } from "./typings";

export interface SearchParams {
  term?: string;
  title?: string;
  regNumber?: string;
  code?: string;
  preorderTypeId?: number | null;
  configurationId?: number | null;
  environmentId?: number | null;
  datacenterIds?: Array<number>;
  isReplication?: boolean | null;
  statuses?: Array<string>;
  page?: number;
  perPage?: number;
}

export interface SearchResult<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  count: number;
  results: T;
}

export class Api {
  static get<T extends keyof typeof Data>(
    modelName: T,
    id: number
  ): Promise<Server.Model | Server.Preorder> {
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = (Data[modelName] as Array<any>).find(
        (item: Server.Entity) => item.id === id
      );
      setTimeout(() => {
        resolve(result);
      }, 800);
    });
  }

  static delete<T extends keyof typeof Data>(
    modelName: T,
    id: number
  ): Promise<Array<(typeof Data)[T]>> {
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = (Data[modelName] as Array<any>).filter(
        (item: Server.Entity) => item.id !== id
      );

      Data[modelName] = result;

      setTimeout(() => {
        resolve(result);
      }, 800);
    });
  }

  static create<T extends keyof typeof Data>(
    modelName: T,
    item: Server.Model | Server.Preorder
  ): Promise<Server.Model | Server.Preorder> {
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const lastItem = Data[modelName][Data[modelName].length - 1];
      const result = [
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ...(Data[modelName] as Array<any>),
        { ...item, id: lastItem.id + 1 },
      ];

      Data[modelName] = result;

      setTimeout(() => {
        resolve(item);
      }, 800);
    });
  }

  static update<T extends keyof typeof Data>(
    modelName: T,
    id: number,
    item: Server.Model | Server.Preorder
  ): Promise<Server.Model | Server.Preorder> {
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      (Data[modelName] as Array<any>)[id] = item;

      setTimeout(() => {
        resolve(item);
      }, 800);
    });
  }

  static find<T extends keyof typeof Data>(
    modelName: T,
    id: number
  ): Promise<Array<(typeof Data)[T]>> {
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = (Data[modelName] as Array<any>).find(
        (item: Server.Entity) => item.id === id
      );
      setTimeout(() => {
        resolve(result);
      }, 800);
    });
  }

  static search<T extends keyof typeof Data>(
    modelName: T,
    _params?: SearchParams
  ): Promise<SearchResult<(typeof Data)[T]>> {
    const emptyParams = {
      term: "",
      regNumber: "",
      code: "",
      preorderTypeId: null,
      configurationId: null,
      environmentId: null,
      datacenterIds: [],
      isReplication: null,
      statuses: [],
      page: 1,
      perPage: 22,
    };

    return new Promise((resolve) => {
      const params = { ...emptyParams, ..._params };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const results = (Data[modelName] as Array<any>)
        .filter(
          (item: Server.Model) =>
            !params.term ||
            item.code.toLowerCase().includes(params.term.toLowerCase()) ||
            item.title.toLowerCase().includes(params.term.toLowerCase())
        )
        .filter(
          (item: Server.Preorder) =>
            !params.regNumber ||
            item.regNumber
              .toLowerCase()
              .includes(params.regNumber.toLowerCase())
        )
        .filter(
          (item: Server.Preorder) =>
            !params.preorderTypeId ||
            item.preorderTypeId === params.preorderTypeId
        )
        .filter(
          (item: Server.Preorder) =>
            !params.configurationId ||
            item.configurationId === params.configurationId
        )
        .filter(
          (item: Server.Preorder) =>
            !params.environmentId || item.environmentId === params.environmentId
        )
        .filter(
          (item: Server.Preorder) =>
            !params.datacenterIds ||
            !params.datacenterIds.length ||
            item.datacenterIds.some((_id) => params.datacenterIds.includes(_id))
        )
        .filter(
          (item: Server.Preorder) =>
            (!params.isReplication && params.isReplication !== false) ||
            item.isReplication === params.isReplication
        )
        .filter(
          (item: Server.Preorder) =>
            !params.statuses ||
            !params.statuses.length ||
            params.statuses.includes(item.status)
        );

      const page = results.slice(
        params.perPage * (params.page - 1),
        params.perPage * params.page
      );

      const result = {
        currentPage: params.page,
        pageSize: params.perPage,
        totalPages: Math.ceil(results.length / params.perPage),
        count: results.length,
        results: page,
      };

      setTimeout(() => {
        resolve(result);
      }, 800);
    });
  }
}
