$(function(){
  resetui()
  clicks()
  function clicks(){
  $('#btnSend').click(function(){
    //文本内容
    let ipt = $('#ipt').val().trim()
    // 判断
    if(!ipt) return alert('请输入内容')
    let str = `
            <li class="right_word">
              <img src="img/person02.png" /> <span>${ipt}</span>
            </li>
    `
    $('#talk_list').append(str)
    //清空文本
    $('#ipt').val('')
    //调用
    resetui()

    //机器回复  http://ajax-api.itheima.net/api/robot

    $.get('http://ajax-api.itheima.net/api/robot',{spoken:ipt},(ran) => {
      // let {data:{info:{text}}} = ran
      let message = ran.data.info.text
      let str = `
      <li class="left_word">
          <img src="img/person01.png" /> <span>${message}</span>
        </li>
      `
    $('#talk_list').append(str)

    //渲染页面
    resetui()
    getVioce(message)
    })
  })
}
    //文字转语音
    function getVioce(message) {
      $.get('http://ajax-base-api-t.itheima.net/api/synthesize',
      {text:message},
      ren=>{
        $('#voice').attr('src',ren.voiceUrl)
        
      })
    }
    let btn = document.querySelector('#btnSend')
    //回车键
    $('#ipt').keydown(function(e){
      // console.log( e.which===13)
      
      if(e.which === 13) {

        $('#btnSend').click()
        
        
        
      }
      
    })
  //------------------------------
})
