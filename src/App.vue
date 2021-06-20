<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
/*  */
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
/*  */
.isLoading{
    width: 100%;
    padding: 2%;
    text-align: center;
    color:#ffffff!important
}
.isLoading .spinner {
    height: 40px;
    text-align: center;
    font-size: 10px;
}

.isLoading .spinner > div {
    background-color: #ffffff;
    height: 100%;
    margin-right: 5px;
    width: 6px;
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.isLoading .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.isLoading .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.isLoading .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.isLoading .spinner .rect5 {
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
