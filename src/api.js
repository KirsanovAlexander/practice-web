import * as Data from './data'

export class Api {
  static find(modelName, id) {
    return new Promise(resolve => {
      const result = Data[modelName].find(item => item.id === id)
      setTimeout(() => resolve(result), 800)
    })
  }
}
