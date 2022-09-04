function Validator(option){var formElement= document.querySelector(option.form)
    /*function getParent(element,selector){
        while(element.parentElement){
            if(element.parentNode.matches(selector)){
                return element.parentNode
            }
            element = element.parentNode
        }
    }*/
    
    
    var notification;
    var selectorRules= {}
    
    
    formElement.onsubmit=function(e){
        e.preventDefault();
        var isSuccess = true

        option.rules.forEach((rule)=>{
            var inputElement = formElement.querySelector(rule.selector)
            var message = ///getParent(inputElement,option.formGroupSelector)
            inputElement.parentNode.querySelector('.form-mesage')
            notification = rule.test(inputElement.value)
            for(var i = 0;i<selectorRules[rule.selector].length;++i){
                notification = selectorRules[rule.selector][i](inputElement.value)
                
                if(notification) break;
            }    
            
            
            if(notification){
                message.innerText=notification
                inputElement.classList.add('border--color')
                isSuccess=false
            }else{
                message.innerText=''
                inputElement.classList.remove('border--color')
                
            }
        })
        if (isSuccess){
            var input = Array.from(formElement.querySelectorAll('[name]')).reduce((a,values)=>{
                a[values.name]=values.value 
                return a
            },{})
            option.onSubmit(input)
        }else{
            console.log()
        }
    }
    option.rules.forEach((rule)=>{
        var inputElement = formElement.querySelector(rule.selector)
        var message = inputElement.parentNode.querySelector('.form-mesage')
        if(Array.isArray(selectorRules[rule.selector])){
            selectorRules[rule.selector].push(rule.test)
        }else{
            selectorRules[rule.selector]=[rule.test]
        } 
        
        if(inputElement){
            inputElement.onblur=function(){
                notification = rule.test(inputElement.value)
                for(var i = 0;i<selectorRules[rule.selector].length;++i){
                    notification = selectorRules[rule.selector][i](inputElement.value)
                    
                    if(notification) break;
                }    
                
                
                if(notification){
                    message.innerText=notification
                    inputElement.classList.add('border--color')
                }else{
                    message.innerText=''
                    inputElement.classList.remove('border--color')
                }
                
            }
            
        }
        inputElement.oninput=function(){
            message.innerText=''
            inputElement.classList.remove('border--color')
        }
    
    })
    
    
}
function Validate(){
    
}
Validator.isRequire=function(selector){
    return {
        selector,
        test(value){
            return value.trim()? undefined: 'vui long nhap truong nay'
        }
    }
    
}
Validator.isEmail=function(selector){
    return {
        selector,
        test(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            
            return regex.test(value)? undefined:'truong nay phai la email'
        }
    }
}
Validator.minLength=function(selector,min){
    return {
        selector,
        test(value){
            
            return value.length >= min? undefined:`mhap toi thieu ${min} ki tu`
        }
    }
}
Validator.isComfirmed=function(selector){
    return {
        selector,
        test(value){
            var regex = document.getElementById('password_confirmation').value
            
            return value===regex? undefined:'mat khau chua dung'
        }
    }
}