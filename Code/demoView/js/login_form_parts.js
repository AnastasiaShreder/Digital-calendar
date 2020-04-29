function render_login_page(){
    if (localStorage.length==0){

      var div = document.body;
      div.insertAdjacentHTML("beforeend",`<div class="limiter" id="login_form">
      <div class="container-login100">
        <div class="wrap-login100">
          <form class="login100-form validate-form">
            <span class="login100-form-title">
              Вход в систему
            </span>
    
            <div class="wrap-input100 validate-input" data-validate = "Введите email">
              <input id = "login_form_email" class="input100" type="text" name="email" placeholder="Email">
              <span class="focus-input100-1"></span>
              <span class="focus-input100-2"></span>
            </div>
    
            <div class="wrap-input100 rs1 validate-input"  data-validate="Введите пароль">
              <input id = "login_form_password" class="input100" type="password" name="pass" placeholder="Пароль">
              <span class="focus-input100-1"></span>
              <span class="focus-input100-2"></span>
            </div>
    
            <div class="container-login100-form-btn">
              <button class="login100-form-btn" onclick="check_login()">
                Войти
              </button>
            </div>
    
            <!--<div class="text-center text-center-padding">
              <span class="txt1">
                Забыли
              </span>
    
              <a href="#" class="txt2 hov1">
                Пароль?
              </a>
            </div>
    
            <div class="text-center">
              <span class="txt1">
                Создать аккаунт?
              </span>
    
              <a href="#" class="txt2 hov1">
                Зарегистрироваться
              </a>
            </div>-->
          </form>
        </div>
      </div>
    </div>`)
    }
    else {
      user_id = localStorage.getItem("user_id")
      render_calendar()
    }
  
  }



function check_login(){
    var email = document.getElementById("login_form_email").value
    var password = document.getElementById("login_form_password").value
        

    var request = new XMLHttpRequest();
    request.open('POST','http://85.142.164.100:5000/',false);//request.open('POST','/',false);
    request.addEventListener('readystatechange', function() {
        if ((request.readyState==4) && (request.status==200)) {
            responce = JSON.parse(request.responseText)

            if (responce.isTrue == "True"){
                user_id = responce.user_id
                localStorage.setItem("user_id", user_id)
                delete_login_form()
                render_calendar()
            }
            else {
                alert("Неправильный логин или пароль")
            }
        }}) 
        
    if ((email != "") && (password !="")) {
        request.send(JSON.stringify({'type':'login', 'email':email, 'password':password})); 
    }
    else {
        alert("Неправильный логин или пароль")
    } 
}


function delete_login_form(){
    var div = document.getElementById("login_form")
    div.remove()
}