<template>
    <div class="register-div row justify-content-center">
        <div class="register col-md-6 col-11">
            <form action="" class="form-div">
                <div class="row py-2">
                    <div class="form-group col-6">
                        <label for="">Username</label>
                        <input v-model="form.username.val" type="text" class="form-control" placeholder="Enter Username">
                        <small>{{form.username.error_msg[0]}}</small>
                    </div>
                    <div class="form-group col-6">
                        <label for="">Password</label>
                        <input v-model="form.password.val" type="password" class="form-control" placeholder="Enter Password">
                        <small>{{form.password.error_msg[0]}}</small>
                    </div>
                </div>

                <div class="row py-2">
                    <div class="form-group col-6">
                        <label for="">Confirm Password</label>
                        <input v-model="form.conpass.val" type="password" class="form-control" placeholder="Enter Password">
                        <small>{{form.conpass.error_msg[0]}}</small>
                    </div>
                    <div class="form-group col-6">
                        <label for="">Firstname</label>
                        <input v-model="form.fname.val" type="text" class="form-control" placeholder="Enter Password">
                        <small>{{form.fname.error_msg[0]}}</small>
                    </div>
                </div>

                <div class="row py-2">
                    <div class="form-group col-6">
                        <label for="">Lastname</label>
                        <input v-model="form.lname.val" type="text" class="form-control" placeholder="Enter Password">
                    </div>
                    <div class="form-group col-6">
                        <label for="">Email</label>
                        <input v-model="form.email.val" type="text" class="form-control" placeholder="Enter Password">
                        <small>{{form.email.error_msg[0]}}</small>
                    </div>
                </div>
                
                
                <div class="form-group py-2">
                    <label for="">Role</label>
                    <select v-model="form.role.val" class="form-control" >
                        <option value="0">Admin</option>
                        <option value="1">Freelancer</option>
                    </select>
                    <small>{{form.role.error_msg[0]}}</small>
                </div>
                <div class="">
                    <div v-if="isLoadingbtn" class="loader">
                        <button class="btn btn-primary w-100">
                            <div class="spinner">
                                <div class="rect1"></div>
                                <div class="rect2"></div>
                                <div class="rect3"></div>
                                <div class="rect4"></div>
                                <div class="rect5"></div>
                            </div>
                            <h6>Please wait</h6>
                        </button>
                    </div>
                    <button @click.prevent="register" v-else class="my-2 btn btn-primary w-100">Register</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import mixin from '../mixin';
export default {
    mixins:[mixin],
    data(){
        return{
            isLoadingbtn:false,
            form:{
                fname:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                lname:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                email:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                role:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                username:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                password:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                conpass:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                        isMatch:"password"
                    }
                }
            }
        }
    },
    methods:{
        register(){
            this.isLoadingbtn=true;
            var formdata = new FormData();
            formdata.append('method','register');
            formdata.append('fname',this.form.fname.val);
            formdata.append('lname',this.form.lname.val);
            formdata.append('username',this.form.username.val);
            formdata.append('password',this.form.password.val);
            formdata.append('email',this.form.email.val);
            formdata.append('role',this.form.role.val);
            if (this.validate(this.form).status) {
                this.isLoadingbtn=false;
                this.form = this.validate(this.form).obj_ret;
                console.log("its not ok");
            }else{
                let call = () =>{
                    this.isLoadingbtn=false;
                    this.$toast.open({
                        message: 'Successful registration',
                        type: 'success',
                    });
                    this.$router.push({ name: 'Login'});
                }
                this.postGet(formdata,call,'packageAuth')
            }

        }
    }
}
</script>
<style scoped>
.register-div{
    /* display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh; */
    margin-top: 5%;

}

.register{
    /* width: 50%; */
    background-color: #094074;
    padding: 2% 2%;
}

.form-div{
    color: #ffffff;
}
</style>