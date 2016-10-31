<template>
    <div class="toast" v-text="toasttxt"></div>
</template>
<script>
    export default {
        name:'toast',
        ready:function(){
            setInterval(function() {
                this.$dispatch('hideToast', false);
            }.bind(this),4000)
        },
        props:{
            toasttxt:{
                type: String
            }
        }
    }
</script>
<style>

</style>