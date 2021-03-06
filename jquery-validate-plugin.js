/**
 *
 * @author : ksk1004zz
 * @Date   : 2015. 4. 3
 */
(function($){

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
	
	
	var SHORTER_SIZE = "이 지정된 길이 #{minLength} 보다 짧습니다."
	var SUBJECT_SUPPORT = "에는"; 
	
	var koreanReg = /(^[가-힣ㄱ-ㅎㅏ-ㅣ\\x20])/i;;//한국어
	var kAndEReg = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]+$/;;//한국어영어
	var kNotReg = /[^가-힣ㄱ-ㅎㅏ-ㅣ]/;;//한국어만 아닌거
	
	var REGEXP = {
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
	var MESSAGE = {
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
			var valueTrim = $.trim(tagValid.val());
			var i;
			
			if (valid.indexOf('require') >= 0) {
			  makeFirstRequire(validArr, validLength);
			}
			
			for (i = 0; i < validLength; i++) {
				
				if (minLength > tagValid.val().length) {
					simpleAlert(tagValid, SHORTER_SIZE.replace("#{minLength}", minLength));
					return;
				}
				
				if (validArr[i] === 'require') {
				  
				  if(!isCheckNull(valueTrim)) {
			      simpleAlert(tagValid, MESSAGE.require);
			      return;
			    }
				  
				} else {
				  
				  if(isCheckNull(valueTrim)) {
				    regCheck(REGEXP[validArr[i]], tagValid, MESSAGE[validArr[i]]);
			    }
				  
				}
				
			}
	}
	
	var isCheckNull = function(valueTrim) {
	  if(valueTrim === '' || valueTrim === null || valueTrim.length === 0) {
      return false
    }
	  return true;
	}
	
	var makeFirstRequire = function(validArr, validLength) {
		var imsiValid;
		
		for (i = 0; i < validLength; i++) {
			if (validArr[i] == 'require') {
				imsiValid = validArr[0];
				validArr[0] = validArr[i];
				validArr[i] = imsiValid;
			}
		}
	}
	
	var simpleAlert = function(tagValid, message) {
		tagValid = $(tagValid);
		alert(getLabelName(tagValid.attr('id')) + message);
		tagValid.focus();
		stop.setValidate(false);
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
				simpleAlert(tagValid, SUBJECT_SUPPORT + message);
			}
	}
	
	var selectAttrValid = function(form){
		return form.find('[valid]');
	};

	})($);
