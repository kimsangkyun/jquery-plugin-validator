	<html>
	<head>
	<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
  <script src="~~~"></script>
	</head>
	<body>
		<form id="frm" action="haha.html">
			<input type="text" valid="require,kAndE"/>
			<input type="text" valid="kNot"/>
			<input type="text" valid="url"/>
			<input type="text" valid="english"/>
			<input type="submit" id="bt">
		</form>
	</body>
	<script>
	

	$(document).ready(function(){
		$('#frm').submit(function(event){
			$('#frm').validate();
			event.preventDefault();
			return false;
		});
	});
  
  
	</script>
	</html>
