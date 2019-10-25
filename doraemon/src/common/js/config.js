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
        logout: '/operation/operationLogin/logout',
        customerServiceCenter: {
          upSign: '/operation/consumer/patch/getUploadToken',
          addAdviceFeedback: '/operation/consumer/adviceFeedback/addAdviceFeedback',
          updateAdviceFeedback: '/operation/consumer/adviceFeedback/updateAdviceFeedback'
        }
      }
    }
  }
}
export default new Config()
