<template>
    <div class="set_up">
	    <SetUpChina></SetUpChina>
	    <SetUpOverseas></SetUpOverseas>
	</div>
</template>

<script>
import SetUpChina from './SetUpChina.vue'
import SetUpOverseas from './SetUpOverseas.vue'
export default {
    data () {
        return {
            msg: 'Hello Vue!'
        }
    },
    components: {
        SetUpChina,
        SetUpOverseas
    }
}
</script>

<style scoped>
.set_up {
    overflow: hidden;
}
.china {
	height: 53%;
	border-bottom: 1px solid silver;
}
.overseas {
	height: 47%;
}
.item {
	padding: 0 10%;
	min-width: 520px;
	box-sizing: border-box;
}
</style>
