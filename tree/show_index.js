const version = '';
const publicPath = '/';

var index = function () {
    this.init();
}

index.prototype =  {

    init: function () {
        this.getProjectData();
    },

    getProjectData: function () {
        var show = this.getQueryString('show', location.search);
        show = show || 'index';
        var loadArr = [];
        loadArr.push(publicPath + show + version + '.js?0.9936646613107663');
        require(loadArr);
    },

    getQueryString: function (name, urlSearch) {
        if (!urlSearch) {
            return false;
        }
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = urlSearch.substr(1).match(reg);
        return r ? r[2] : false;
    }

};

new index();