const login = async (user, pass, callback) => {
    $.post("api/login", {user: user, password: pass}, (res) => {
        callback(res)
    })
}
$(document).ready(function () {
    if (localStorage.getItem("token") !== null) {
        window.location = "/"
    }
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
                    window.location = "/"
                } else {
                    alert(res.message)
                }
            })
        }
    })
});