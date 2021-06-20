<template>
    <div class="login-div">
        <div class="login">
            <form action="" class="form-div">
                <div class="form-group">
                    <label for="">Username</label>
                    <input v-model="form.email.val" type="text" class="form-control" placeholder="Enter Username">
                    <small>{{form.email.error_msg[0]}}</small>
                </div>
                <div class="form-group my-2">
                    <label for="">Password</label>
                    <input v-model="form.password.val" type="password" class="form-control" placeholder="Enter Password">
                    <small>{{form.password.error_msg[0]}}</small>

                </div>
                <div class="">
                    <button v-if="isLoadingbtn" class="btn btn-primary w-100">
                        <div class="spinner">
                            <div class="rect1"></div>
                            <div class="rect2"></div>
                            <div class="rect3"></div>
                            <div class="rect4"></div>
                            <div class="rect5"></div>
                        </div>
                        <h6>Please wait</h6>
                    </button>
                    <button @click.prevent="login" v-else class="my-2 btn btn-primary w-100">Login</button>
                    <a style="color:#ffffff" href="register">Register</a>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import mixin from '../mixin'
export default {
    mixins:[mixin],
    data(){
        return{
            isLoadingbtn: false,
            form:{
                email:{
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
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.$store.state.isLogged) {
                if(vm.$store.state.role == 0){
                    next({name:'AdminMain'});
                }else{
                    next({name:'FreelancerMain'});
                }
            }else {
                next();
            }
        });
    },
    methods:{
        login(){
            this.isLoadingbtn = true;
            var formdata = new FormData();
            formdata.append("method", "login");
            formdata.append("email", this.form.email.val);
            formdata.append("password", this.form.password.val);
            if (this.validate(this.form).status) {
                this.isLoadingbtn=false;
                this.form = this.validate(this.form).obj_ret;
                console.log("its not ok");
            }else{
                let call = (data) =>{
                    if (data.return == "error") {
                        this.isLoadingbtn = false;
                            this.$toast.open({
                                message: 'Wrong Credentials',
                                type: 'error',
                            });
                    }else{
                        this.isLoadingbtn = false;
                        this.$store.commit('set', ["isLogged",true]);
                        this.$store.commit('set', ["role",data.return.role]);
                        this.$store.commit('set', ["id",data.return.id]);
                        if (data.return.role == 0) {
                            this.$router.push({ name: 'AdminMain'})
                        }else{
                                this.$router.push({ name: 'FreelancerMain'})
                        }
                    }
                }
                this.postGet(formdata, call, "packageAuth");
            }
        }
    }
}
</script>
<style scoped>
.login-div{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
}

.login{
    width: 30%;
    background-color: #094074;
    padding: 4%;
}

.form-div{
    color: #ffffff;
}

.spinner {
    height: 40px;
    text-align: center;
    font-size: 10px;
}

.spinner > div {
    background-color: #ffffff;
    height: 100%;
    margin-right: 5px;
    width: 6px;
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
    20% { -webkit-transform: scaleY(1.0) }
}

@keyframes sk-stretchdelay {
    0%, 40%, 100% { 
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
    }  20% { 
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
    }
}
</style>