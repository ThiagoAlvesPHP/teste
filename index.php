<!DOCTYPE html>
<html>
<head>
    <title></title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript">
        $(function(){
            $(document).on('click', 'button', function(){
                $('.text').html("Teste Action");
            });
        });
    </script>
</head>
<body>
    <button>Click</button>
    <div class="text"></div>
</body>
</html>