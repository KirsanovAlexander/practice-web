import * as Data from './data'

export class Api {
  static find(modelName, id) {
    console.log(modelName)
    return Data[modelName].find(item => item.id === id)
  }
}
