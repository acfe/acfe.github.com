class Config {
  constructor () {
    this.init()
  }
  init () {
    this.api = {
      op: {
        findConfigTemplate: '/operation/fcboxapp/mallconfig/findConfigTemplate',
        addConfigTemplate: '/operation/fcboxapp/mallconfig/addConfigTemplate',
        getQiNiuToken: '/operation/consumer/topic/uploadToken',
        uploadSign: '/operation/consumer/patch/getOldUploadToken',
        logout: '/operation/operationLogin/logout'
      }
    }
  }
}
export default new Config()
