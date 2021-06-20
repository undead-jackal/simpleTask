import axios from './axiosInstance'
// import * as moment from "moment/moment";

export default {
    data(){
        return{

        }
    },
    methods:{
        postGet(data, callback, to){
            axios.post(to, data)
            .then((response) => {
                callback(response.data);
            }, (error) => {
                console.log(error);
            });
        },
        logout(){
            this.$store.commit('set', ["isLogged",false]);
            this.$store.commit('set', ["role",null]);
            this.$store.commit('set', ["id",null]);
            this.$router.push({ name: 'Login'})
        },
        validate(form){
            console.log(form);
            let obj = form;
            var ret = false;

            Object.keys(obj).map(function(key) {
                obj[key].error_msg = [];
                Object.keys(obj[key].rules).map(function(ruleName) {
                    var valid ='';
                    switch (ruleName) {
                        case "required":
                            if (obj[key].rules[ruleName] == true) {
                                if (obj[key].val == null) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must not be empty");
                                }else{
                                    if(obj[key].val.length == 0){
                                        ret = true;
                                        obj[key].error = true;
                                        obj[key].error_msg.push("This Field must not be empty");
                                    }
                                }
                            }
                            break;
                        case "min":
                            if (obj[key].val != null) {
                                if (obj[key].val.length<=obj[key].rules[ruleName]) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must not be less than" +obj[key].rules[ruleName]);
                                }
                            }
                            break;
                        case "max":
                            if (obj[key].val != null) {
                                if (obj[key].val.length>=obj[key].rules[ruleName]) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must not exceed" +obj[key].rules[ruleName]);
                                }
                            }
                            break;
                        case "isAlphaNumeric":
                            if (obj[key].rules[ruleName] == true) {
                                var letter = /[a-zA-Z]/; 
                                var number = /[0-9]/;
                                valid = number.test(obj[key].val) && letter.test(obj[key].val);
                                if (!valid) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must contain Numbers and Letter");
                                }
                            }
                            break;
                        case "hasUpperCase":
                            if (obj[key].rules[ruleName] == true) {
                                var hasCaps = /[A-Z]/; 
                                valid = hasCaps.test(obj[key].val);
                                if (!valid) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must contain an Uppercase");
                                }
                            }
                            break;
                        case "isMatch":
                            var valueName = String(obj[key].rules[ruleName]);
                            if (obj[valueName].val != obj[key].val) {
                                ret = true;
                                obj[key].error = true;
                                obj[key].error_msg.push("This Field must contain match " + valueName);
                            }
                            break;
                        case "hasSpecChar":
                            var regex = /[!@#$%^&*]/;
                            if (obj[key].rules[ruleName] == "required") {
                                if (!regex.test(obj[key].val)) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must contain one special characters");
                                }
                            }else if(obj[key].rules[ruleName] == "not_allowed"){
                                if (regex.test(obj[key].val)) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must not contain any special characters");
                                }
                            }
                            break;
                        default:
                            break;
                    }
                })
            });
            return {
                obj_ret:obj,
                status:ret
            };
        }
    }
}