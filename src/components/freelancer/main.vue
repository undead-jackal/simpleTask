<template>
    <div class="row justify-content-center main">
        <div class="col-md-8 ">
            <div class="row bg-primary header">
                <div class="col-3">
                    <h4 class="whiteText">Projects</h4>
                </div>
                <div class="col-9 text-end inp">

                    <button @click="generateWallet"  class="btn btn-sm btn btn-outline-light margLeft10">Wallet</button>
                    <button @click="logout"  class="btn btn-sm btn btn-outline-light margLeft10">Logout</button>
                </div>
            </div>
            <div class="row">
                <div class="col-12 realHeads">
                    <div class="card">
                        <div class="card-header">
                            List of Project(s) 
                        </div>
                        <div class="card-body">
                            <table v-if="!isLoading" class="table table-striped table-hover empTable">
                                <thead>
                                    <th>Id #</th>
                                    <th>Project Title</th>
                                    <th>Total Hours</th>
                                    <th>Total Earned(Peso)</th>
                                    <th>stopWatch</th>
                                    <th></th>
                                </thead>
                                <tbody v-if="!hasData">
                                    <tr>
                                        <td colspan="100" class="text-center">NO DATA</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr v-for="(ind, index) in projects" :key="index">
                                        <td>{{ind.id}}</td>
                                        <td>{{ind.title}}</td>
                                        <td v-if="ind.total_hrs == null">N/A</td>
                                        <td v-else>{{ind.total_hrs.toFixed(3)}}</td>
                                        <td v-if="ind.total_amount == null">N/A</td>
                                        <td v-else>{{ind.total_amount.toFixed(3)}}</td>
                                        <td>{{timeHolder[index].time}}</td>
                                        <td>
                                            <a v-if="!timeHolder[index].isOn" @click.prevent="start(index, ind.id)" href="" class="btn btn-sm btn-success"><i class="fas fa-stopwatch"></i> Start</a>
                                            <a v-else class="btn btn-sm btn-danger" @click.prevent="stop(index,ind.pay)" href=""><i class="fas fa-stop-circle"></i> Remove</a>
                                            <a @click.prevent="getProjectView(ind.id)" class="btn btn-sm btn-info margLeft10"  href=""> <i class="fas fa-eye"></i>View</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-else class="isLoading bg-primary">
                                <div class="spinner">
                                    <div class="rect1"></div>
                                    <div class="rect2"></div>
                                    <div class="rect3"></div>
                                    <div class="rect4"></div>
                                    <div class="rect5"></div>
                                </div>
                                <h6>Please wait</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal
            id="viewProject"
            title="View Project"
            @hide="hideIt"
        >
            <form v-if="isEditLoading" action="">
                <div class="form-group">
                    <label for="">Project Title</label>
                    <b><p>{{aProject.title}}</p></b>
                    
                </div>
                <div class="form-group">
                    <label for="">Per Hour</label>
                    <b><p>{{aProject.pay}}</p></b>
                </div>
                <div class="form-group">
                    <label for="">Instruction</label>
                    <b><p>{{aProject.instruction}}</p></b>
                </div>
            </form>
            <div v-else class="isLoading bg-primary">
                <div class="spinner">
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
                </div>
                <h6>Please wait</h6>
            </div>
            <template #modal-footer>
                <div v-if="isLoadingbtn" class="loader">
                    <button class="btn btn-primary">
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
                <div v-else class="w-100 footer-div">
                    <button @click="$bvModal.hide('viewProject')" class="btn btn-sm btn-secondary">Close</button>
                </div>
            </template>
        </b-modal>

        <b-modal
            id="wallet"
            title="My Wallet"
        >
            <div v-if="!isLoadingWallet" class="">
                <h3>&#8369; {{walletSum.toFixed(2)}}</h3>
            </div>
            <div v-else class="isLoading bg-primary">
                <div class="spinner">
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
                </div>
                <h6>Please wait generating wallet</h6>
            </div>
            <template #modal-footer>
                <div class="w-100 footer-div">
                    <button @click="$bvModal.hide('wallet')" class="btn btn-sm btn-secondary">Close</button>
                </div>
            </template>
        </b-modal>

    </div> 
</template>
<script>
import mixin from './../../mixin'
import * as moment from "moment/moment";

export default {
    mixins:[mixin],
    data(){
        return{
            isEditLoading:false,
            isLoadingbtn:false,
            isLoadingWallet:false,
            hasData:true,
            isLoading:false,
            aProject:[],
            projects:[],
            offset:0,
            limit:7,
            totalEmp:0,
            getCurrentTimeId:null,
            timeBegan : null,
            timeStopped : null,
            stoppedDuration : 0,
            started : null,
            running : false,
            time:'00:00:00',
            timeHolder:[],
            walletSum:0.00
        }
    },
    mounted(){
        this.getProjects();
    },
    methods:{
        hideIt(){
            this.isEditLoading = false;
        },
        generateWallet(){
            this.$bvModal.show('wallet');
            var formdata = new FormData();
            this.isLoadingWallet = true;
            formdata.append('method', "wallet");
            formdata.append('myId', this.$store.state.id);
            let callback=(data) =>{
                this.walletSum = data.return.reduce((s, a) => s + a.amount, 0);
                this.isLoadingWallet = false;
            }
            this.postGet(formdata, callback,'package1')
        },
        getProjectView(id){
            this.$bvModal.show('viewProject');
            var formdata = new FormData();
            formdata.append('method', "getAProject");
            formdata.append('id', id);
            let callback=(data) =>{
                this.isEditLoading = true;
                this.aProject = data.return;
            }
            this.postGet(formdata, callback,'package1')
        },
        getProjects(){
            var formdata = new FormData();
            this.isLoading = true;
            formdata.append('method', "getAll");
            formdata.append('offset', this.offset);
            formdata.append('limit', this.limit);
            formdata.append('myId', this.$store.state.id);

            let callback=(data) =>{
                this.isLoading = false;
                this.projects = data.return;
                this.totalEmp = Math.ceil(data.total/this.limit)
                    if(this.projects.length != 0){
                        
                        for (let index = 0; index < this.projects.length; index++) {
                            var arrTime = {
                                time:'00:00:00',
                                isOn:false,
                                id:"ako si " + index,
                            }
                            this.timeHolder.push(arrTime);
                        }
                        console.log(this.timeHolder);
                        this.hasData = true
                    }else{
                        this.hasData = false
                    }
            }
            this.postGet(formdata, callback,'package1')
        },
        start(id, project) {
            
            var hasNoTask = true;
            for (let index = 0; index < this.timeHolder.length; index++) {
                if (this.timeHolder[index].isOn) {
                    hasNoTask = false
                }
            }
            if (hasNoTask == true) {
                this.getCurrentTimeId = id;
                this.timeHolder[id].isOn = true;

                if(this.running) return;
                
                if (this.timeBegan === null) {
                    for (let index = 0; index < this.timeHolder.length; index++) {
                        if (!this.timeHolder[index].isOn) {
                            this.reset(index)
                        }
                    }
                    this.timeBegan = new Date();
                }

                if (this.timeStopped !== null) {
                    this.stoppedDuration += (new Date() - this.timeStopped);
                }

                this.started = setInterval(this.clockRunning, 10);	
                this.running = true;
                var todaydate = new Date();
                var time = moment(todaydate).format("h:mm a");
                
                var formdata = new FormData();
                formdata.append('method',"activityStart");
                formdata.append('user_id',this.$store.state.id);
                formdata.append('project_id', project);
                formdata.append('started', time);

                let call = (data) =>{
                    this.timeHolder[id].id = data.return;
                }
                this.postGet(formdata, call, 'package1');

            }else{
                alert("stop other task");
            }
        },

        stop(id, pay){
                var todaydate = new Date();
                var time = moment(todaydate).format("h:mm a");
                
                var formdata = new FormData();
                formdata.append('method',"activityUpdate");
                formdata.append('id',this.timeHolder[id].id);
                formdata.append('ended', time);
                formdata.append('hrs_spents', this.getRenderedTime(this.timeHolder[id].time));
                formdata.append('pay', this.getRenderedTime(this.timeHolder[id].time) * pay);

                let call = (data) =>{
                    this.timeHolder[id].id = data.id;
                    this.getProjects()
                }
                this.postGet(formdata, call, 'package1');

            this.reset(id);
        },

        getRenderedTime(time){
            var data = time.split('.')[0].split(':');
            var hours = parseInt(data[0]) + ((parseInt(data[1]) * 1)/60) + (parseInt(data[2])/3600);
            return hours.toFixed(4);
        },

        reset(id) {
            this.running = false;
            clearInterval(this.started);
            this.stoppedDuration = 0;
            this.timeBegan = null;
            this.timeStopped = null;
            this.timeHolder[id].time = "00:00:00";
            this.timeHolder[id].isOn = false;
            this.timeHolder[id].id = null;
        },
        clockRunning(){
            var currentTime = new Date()
            , timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
            , hour = timeElapsed.getUTCHours()
            , min = timeElapsed.getUTCMinutes()
            , sec = timeElapsed.getUTCSeconds()
            this.timeHolder[this.getCurrentTimeId].time = 
                this.zeroPrefix(hour, 2) + ":" + 
                this.zeroPrefix(min, 2) + ":" + 
                this.zeroPrefix(sec, 2) 
        },

        zeroPrefix(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
    }
}
</script>
<style scoped>
.whiteText{
    color:#ffffff!important
}
.isLoadin{
    width: 100%;
    height: 100px;
    position: relative;
}
.footer-div{
    text-align: end;
}
.footer-div button{
    margin-left: 10px;
}
.empTable .body-tab tr:hover{
    cursor: pointer;
}
.realHeads{
    padding: 0px;
    margin-top: 30px;
}
.margLeft10{
    margin-left: 10px;
}
.margTop10{
    margin-top: 10px;
}
.inp{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}
.main{
    padding-top: 4% ;
}
.header{
    padding: 1%;
}

</style>