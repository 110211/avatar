const login = async (user, pass, callback) => {
    $.post("api/login", {user: user, password: pass}, (res) => {
        callback(res)
    })
}
    if (window.location.pathname == '/') {
        var token = localStorage.getItem("token")
        if (token === null) {
            window.location = "/login"
        } else {
            $.ajax({
                url: '/me',
                type: 'get',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function (data) {
                    if (data.success) {
                        $("#app").append('Login done. ')
                        if (localStorage.getItem("right") == 9) $("#app").append('<span id="admin">Admin</span>')
                        $("#logout-button").click(() => {
                            localStorage.removeItem("token")
                            window.location = "/login"
                        })
                        $("#admin").click(() => {
                            window.location = "/admin"
                        })
                        $("#welcome").text("Chào bạn " + data.user)
                    } else {
                        localStorage.removeItem("token")
                        alert(data.message)
                        window.location = "./login"
                    }
                }
            })
        }
    }

    if (window.location.pathname == "/admin") { 
        if (localStorage.getItem("right") == 9) {
            console.log("ok")
        } else {
            alert("mày ko phải admin?")
            window.location = "/"
        }
    }
$(document).ready(function () {
    $(".login-container").animate({marginTop: '40%'}, 1000)
    var play = 0;
    var sound = new Howl({
        src: ['./assets/sounds/mainmusic.mp3'],
        volume: 1.0,
        onend: function () {
            alert('We finished with the setup!');
        }
        });
    $("#volume-button").click(() => {
        if (play) {
            sound.stop()
            console.log("turn off sound")
            $("#volume-button").empty()
            $("#volume-button").append('<i class="fas fa-volume-mute"></i>')
        } else {
            sound.play()
            console.log("turn on sound")
            $("#volume-button").empty()
            $("#volume-button").append('<i class="fas fa-volume-up"></i>')
        }
        play = 1 - play;
    })
    $("#login-button").click(() => {
        let user = $("#username").val()
        let pass = $("#password").val()
        if (user.length == 0 || pass.length == 0) {
            alert("Vui lòng điền đầy đủ thông tin")
        } else {
            login(user, pass, (res) => {
                if (res.success) {
                    alert(res.message)
                    localStorage.setItem('token', res.token)
                    localStorage.setItem('right', res.right)
                    window.location = "/"
                } else {
                    alert(res.message)
                }
            })
        }
    })
});