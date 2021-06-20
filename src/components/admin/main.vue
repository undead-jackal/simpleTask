<template>
    <div class="row justify-content-center main">
        <div class="col-md-8 ">
            <div class="row bg-primary header">
                <div class="col-3">
                    <h4 class="whiteText">Projects</h4>
                </div>
                <div class="col-9 text-end inp">
                    <button @click="openCreateModal" class="btn btn-sm btn btn-outline-light margLeft10">Create Project </button>
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
                            <table v-if="!isLoading" class="table table-striped empTable">
                                <thead>
                                    <th>Id #</th>
                                    <th>Project Title</th>
                                    <th>Total Hours</th>
                                    <th>Total Earned(Peso)</th>
                                    <th>Asigned To</th>
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
                                        <td v-if="ind.fname == null">Not Assigned yet</td>
                                        <td v-else>{{ind.fname}} {{ind.lname}}</td>
                                        <td v-if="ind.fname == null">
                                            <a class="btn btn-primary" @click.prevent="openAssignModal(ind.id)" href="">Assign</a>
                                        </td>
                                        <td v-else>
                                            <span class="assigned">Assigned</span>
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

        <!-- Modals -->
        <b-modal
            id="createProject"
            title="Create Project"
        >
            <form action="">
                <div class="form-group">
                    <label for="">Project Title</label>
                    <input v-model="form.title.val" type="text" class="form-control" placeholder="Enter Project Title">
                    <small>{{form.title.error_msg[0]}}</small>
                </div>
                <div class="form-group">
                    <label for="">Per Hour</label>
                    <input v-model="form.pay.val" type="number" class="form-control" placeholder="Enter Per hour charge">
                    <small>{{form.pay.error_msg[0]}}</small>
                </div>
                <div class="form-group">
                    <label for="">Instruction</label>
                    <textarea v-model="form.instruction.val" type="text" class="form-control" placeholder="" cols="10"></textarea>
                    <small>{{form.instruction.error_msg[0]}}</small>
                </div>
            </form>
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
                    <button @click="$bvModal.hide('createProject')" class="btn btn-sm btn-secondary">No</button>
                    <button @click="addProject()" class="btn btn-sm btn-success">Create</button>
                </div>
            </template>
        </b-modal>
        <b-modal
            id="editProject"
            title="Create Project"
        >
            <form action="">
                <div class="form-group">
                    <label for="">Project Title</label>
                    <input v-model="form.title" type="text" class="form-control" placeholder="Enter Project Title">
                </div>
                <div class="form-group">
                    <label for="">Per Hour</label>
                    <input v-model="form.pay" type="text" class="form-control" placeholder="Enter Per hour charge">
                </div>
                <div class="form-group">
                    <label for="">Instruction</label>
                    <textarea v-model="form.instruction" type="text" class="form-control" placeholder="" cols="10"></textarea>
                </div>
            </form>
        </b-modal>
        <b-modal
            id="deleteProject"
            title="Create Project"
        >
        <div>
            Are you sure you want to stop this project
        </div>

        </b-modal>
        <b-modal
            id="assignProject"
            title="Assign"
        >
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <label for="">Employee</label>
                        <select v-model="personId" class="form-control">
                            <option selected="selected" hidden>Select an Employee</option>
                            <option  v-for="(ind,index) in persons" :key="index" :value="ind.id">{{ind.fname}} {{ind.lname}}</option>
                        </select>
                    </div>
                </div>
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
                    <button @click="$bvModal.hide('assignProject')" class="btn btn-sm btn-secondary">close</button>
                    <button @click="assign" class="btn btn-sm btn-success">Assign</button>
                </div>
            </template>
        </b-modal>
    </div> 
</template>
<script>
import mixin from './../../mixin'
export default {
    mixins:[mixin],
    data(){
        return{
            isEdit:false,
            isLoadingbtn:false,
            hasData:true,
            isLoading:false,
            form:{
                title:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                pay:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                instruction:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
            },
            assingId:null,
            persons:[],
            projects:[],
            projectId:null,
            personId:null,
            offset:0,
            limit:7,
            totalEmp:0
        }
    },
    mounted(){
        this.getProjects();
    },
    methods:{
        openCreateModal(){
            this.$bvModal.show('createProject')
        },
        openEditModal(){
            this.$bvModal.show('editProject')
        },
        openDeleteModal(){
            this.$bvModal.show('deleteProject')
        },
        openAssignModal(id){
            this.projectId = id;
            this.$bvModal.show('assignProject');
            var formdata = new FormData();
            formdata.append('method', "getPersons");
            let callback=(data) =>{
                this.persons = data.return
                console.log(this.persons);
            }
            this.postGet(formdata, callback,'package1')
        },
        assign(){
            this.isLoadingbtn = true;
            var formdata = new FormData();
            formdata.append('method', "assignData");
            formdata.append('emp', this.personId);
            formdata.append('id',this.projectId);
            let callback=() =>{
                this.isLoadingbtn = false;
                this.$bvModal.hide("assignProject");
                this.$toast.open({
                        message: 'Succesful',
                        type: 'success',
                    });
                this.getProjects()
            }
            this.postGet(formdata, callback,'package1')
        },
        addProject(){
            this.isLoadingbtn = true;
            var formdata = new FormData();
            formdata.append('method', "addProject");
            formdata.append('title', this.form.title.val);
            formdata.append('pay', this.form.pay.val);
            formdata.append('instruction', this.form.instruction.val);

            if (this.validate(this.form).status) {
                this.isLoadingbtn=false;
                this.form = this.validate(this.form).obj_ret;
            }else{
                let callback=() =>{
                    this.isLoadingbtn = false;
                    this.$bvModal.hide("createProject")
                        this.$toast.open({
                            message: 'Project added',
                            type: 'success',
                        });
                    this.clear();
                    this.getProjects()
                }
                this.postGet(formdata, callback,'package1')
            }
        },
        getProjects(){
            var formdata = new FormData();
            this.isLoading = true;
            formdata.append('method', "getAll");
            formdata.append('offset', this.offset);
            formdata.append('limit', this.limit);
            let callback=(data) =>{
                this.isLoading = false;
                this.projects = data.return;
                this.totalEmp = Math.ceil(data.total/this.limit)
                    if(this.projects.length != 0){
                        this.hasData = true
                    }else{
                        this.hasData = false
                    }
            }
            this.postGet(formdata, callback,'package1')
        },
        clear(){
            this.form.title.val = ''
            this.form.pay.val = ''
            this.form.instruction.val = ''
        }
    }
}
</script>
<style scoped>
.assigned{
    background: #28a745;
    color:#ffffff;
    padding: 5px;
    font: 5px;
    border-radius: 10px;
}
small{
    color: red;
}
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