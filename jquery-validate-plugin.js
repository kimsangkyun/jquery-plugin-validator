/**
 *
 * @author : ksk1004zz
 * @Date   : 2015. 4. 3
 */
(function(){
	
	var stop = (function() {
		var _validate;
		var setValidate = function(validateBoolean) {
			_validate = validateBoolean;
		};
		
		var getValidate = function() {
			return _validate;
		}
		
		return {
			getValidate : getValidate,
			setValidate : setValidate
		};
	})();
	
	var koreanReg = /(^[가-힣ㄱ-ㅎㅏ-ㅣ\\x20])/i;;//한국어
	var kAndEReg = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]+$/;;//한국어영어
	var kNotReg = /[^가-힣ㄱ-ㅎㅏ-ㅣ]/;;//한국어만 아닌거
	var regExp = {
		mp : '^\\d{3}-\\d{3,4}-\\d{4}$',//핸드폰
		ln : '^\\d{3}-\\d{2}-\\d{5}$',//사업자등록번호
		hp : '^\\d{2,3}-\\d{3,4}-\\d{4}$',//집번호
		korean : koreanReg ,
		kAndE : kAndEReg,
		kNot : kNotReg,
		url : '(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})',
		english : '^[a-zA-Z]*$/',//영어
		eAndN : '^[0-9a-zA-Z]*$',//영어숫자
		number : '^[0-9]*$',//숫자
		email : '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?'
	}
	//이메일
	var message = {
		email : '이메일만 입력 가능 합니다.',
		mp : '핸드폰 번호만 입력 가능 합니다.',
		hp : '집 혹은 팩스 번호 형식이 아닙니다.',
		english : '영어만 입력 가능 합니다.',
		korean : '한글만 입력 가능 합니다.',
		kAndE : '한글과 영어만 입력 가능 합니다.',
		eAndN : '영어와 숫자만 입력 가능 합니다.',
		require : '값을 반드시 입력해야 합니다.',
		number : '숫자만 입력 할 수 있습니다.',
		ln : '사업자 번호만 입력 할 수 있습니다.',
		kNot : '한글은 입력 할 수 없습니다.',
		url : 'url만 입력 할 수 있습니다.'
	}
		
	$.fn.validate = function() {
		stop.setValidate(true);
		var tagValidArr = [];
		var tagValidArrLength;
		if(this.get(0).tagName.toLowerCase() !== 'form' &&
				this.get(0).tagName.toLowerCase() === 'input') {
			tagValidArr[0] = this;
		} else {
			tagValidArr = selectAttrValid($(this));
		}
		
		tagValidArrLength = tagValidArr.length;
		
		for (var i = 0; i < tagValidArrLength; i++) {
			applyReg($(tagValidArr[i]));
			if(stop.getValidate() === false){
				return stop.getValidate();
			}
		
		}
		return true;
	};//function
	
	var applyReg = function(tagValid) {
			var valid = tagValid.attr('valid');
			var validArr = valid.split(',');
			var validLength = validArr.length;
			var minLength = tagValid.attr('minLength');
			
			for (var i = 0; i < validLength; i++) {
				
				if (minLength > tagValid.val().length) {
					simpleAlert(tagValid, "이 지정된 길이 " + minLength + "보다 짧습니다.");
					stop.setValidate(false);
					return;
				}
				
				if (valid === 'require') {
					if(valueTrim === '' || valueTrim === null || valueTrim.length === 0) {
						simpleAlert(tagValid, message.require);
						return;
					}
				}
				
				regCheck(regExp[validArr[i]], tagValid, message[validArr[i]]);
			}//for valid속성에 값이 하나만 들어가지만 혹시나 나중에 몇가지를 넣을수 있는 상황이 생길수도 있어서 반복문
	}
	
	var simpleAlert = function(tagValid, message) {
		tagValid = $(tagValid);
		alert(getLabelName(tagValid.attr('id')) + message);
		tagValid.focus();
	}
	
	var getLabelName = function(id) {
		return $('label[for="' + id + '"]').text();
	};

	var regCheck = function(reg, tagValid, message) {
			pattern = new RegExp(reg);
			var tagValid = $(tagValid);
			var tagValidTrim = $.trim(tagValid.val());
			tagValid.val(tagValidTrim);

			if(!pattern.test(tagValidTrim)) {
				simpleAlert(tagValid, "에는 " + message);
				stop.setValidate(false);
			}
	}
	
	var selectAttrValid = function(form){
		return form.find('[valid]');
	};

	})($);
