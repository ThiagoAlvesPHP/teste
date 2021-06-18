<!DOCTYPE html>
<html>
<head>
    <title></title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <script type="text/javascript">
        $(function(){
            let v = parseFloat('1000.50');

            $('div').html(v.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) );
        });
    </script>
    
</head>
<body>
        
    <div></div>    

</body>
</html>