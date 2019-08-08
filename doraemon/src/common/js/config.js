class Config {
  constructor () {
    this.init()
  }
  init () {
    this.api = {
      op: {
        getQiNiuToken: '/operation/consumer/topic/uploadToken',
        uploadSign: '/operation/consumer/patch/getOldUploadToken',
        logout: '/operation/operationLogin/logout'
      }
    }
  }
}
export default new Config()
