<?php include './config/config.php' ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="//code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"></script>
    <script src="<?= $domain ?>/assets/styles/main.js"></script>
    <link href="//cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?= $domain ?>/assets/styles/main.css" rel="stylesheet">
    <title>Login <?= $title ?></title>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col"></div>
            <div class="col-4">
                <div class="login-container">
                    <img src="<?= $domain ?>/assets/logo_team.png" width="95" height="52"><br /><br />
                    <div class="login-table">
                        <div class="mb-3 row">
                            <label class="col-sm-4 col-form-label">Tài khoản</label>
                            <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="hoangdz@xxx.vlxx">
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-4 col-form-label">Mật khẩu</label>
                            <div class="col-sm-6">
                                <input type="password" class="form-control">
                            </div>
                        </div>
                        <label class="col-sm col-form-label" style="font-size:12px; text-align: end">Hotline: 1900100 có</label>
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
    </div>
</body>
</html>