import * as Data from './data'

export interface SearchParams {
    term?: string;
    title?: string;
    regNumber?: string;
    preorderTypeId?: number | null
    configurationId?: string | null
    environmentId?: string | null 
    datacenterIds?: string[],
    isReplication?: boolean | null,
    statuses?: string[],
    page?: number
    perPage?: number
}

export class Api {
  static find(modelName: string, id: string) {
    return new Promise(resolve => {
      const result = Data[modelName].find(item => item.id === id)
      setTimeout(() => resolve(result), 800)
    })
  }

  static search(modelName: string, _params: SearchParams) {
    const emptyParams: SearchParams = {
      term: '',
      regNumber: '',
      preorderTypeId: null,
      configurationId: null,
      environmentId: null,
      datacenterIds: [],
      isReplication: null,
      statuses: [],
      page: 1,
      perPage: 10
    }

    return new Promise(resolve => {
      const params = {...emptyParams, ..._params}
      const results = Data[modelName]
        .filter(item => !params.term || item.code.toLowerCase().includes(params.term.toLowerCase()) || item.title.toLowerCase().includes(params.term.toLowerCase()))
        .filter(item => !params.regNumber || item.regNumber.toLowerCase().includes(params.regNumber.toLowerCase()))
        .filter(item => !params.preorderTypeId || item.preorderTypeId === params.preorderTypeId)
        .filter(item => !params.configurationId || item.configurationId === params.configurationId)
        .filter(item => !params.environmentId || item.environmentId === params.environmentId)
        .filter(item => !params.datacenterIds || !params.datacenterIds.length || item.datacenterIds.some(_id => params.datacenterIds.includes(_id)))
        .filter(item => (!params.isReplication && params.isReplication !== false) || item.isReplication === params.isReplication)
        .filter(item => !params.statuses || !params.statuses.length || params.statuses.includes(item.status))

      const page = results.slice(params.perPage * (params.page - 1), params.perPage * params.page)

      const result = {
        currentPage: params.page,
        pageSize: params.perPage,
        totalPages: Math.ceil(results.length / params.perPage),
        count: results.length,
        results: page
      }
      
      setTimeout(() => resolve(result), 800)
    })
  }
}
