const version = '';
const publicPath = '/mall/';

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
        loadArr.push(publicPath + show + version + '.js?0.6627334200042398');
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