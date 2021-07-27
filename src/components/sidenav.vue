<template>
  <div class="sidenav">
      <ul>
          <li class="navbrand">Payarc</li>
          <li class="navitem" :class="item === 'home' ? 'active' : '' "><span  class="icon"><i class="fas fa-home"></i></span><a href="/#/Home">Home</a></li>
          <li class="navitem" :class="item === 'create' ? 'active' : '' "><span  class="icon"><i class="far fa-user"></i></span><a href="/#/Create">Create Student</a></li>
      </ul>
   </div>
</template>

<script>
export default {
name:'sidenav',
props:{
    item:{
        type:String,
        default:""
    }
}
}
</script>

<style>
.sidenav{
    position: fixed;
    height: 100%;
    background: #0277bd;
    width: 300px;
}
.navbrand{
    font-size: 30px;
    margin-left: 15px;
    color:white;
    margin-bottom: 16px;
    list-style-type: none;
}
.navitem{
        padding: 7px 0px;
}
.icon{
    color:#ffffffc9;
    padding-right:16px;
    padding-left: 13px;
}
.navitem a{
    text-decoration: none;
    color: #ffffffc9;
    font-family: sans-serif;
}
.active{
    background-color: #091838;
    border-left: #01579b 3px solid;
}

.active .icon{
    padding-left: 9px !important;
        color: white;
}

.active a{
    color: white;
}
</style>