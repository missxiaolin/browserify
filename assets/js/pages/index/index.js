$ = require('jquery')
$(function(){
    console.log(require('../../commond/ceshi'))
    var config = require('../../commond/config')

    console.log(config.apiUrl)
    // alert(process.env.BASE_API)
})