<script setup >
import Close from '../components/close.vue'
import logo from '../components/logo.vue'
import { reactive, defineProps,ref } from 'vue'

const props = defineProps( {
    Color: null,
    backgroundColor: null,
    title: null,
    description: null,
    closeColor: '#000000',
    image: null,

})
const { Color, backgroundColor, closeColor, image } = reactive(props)

const showChat = ref(false)
const formInfo = ref({
    email: '',
    name: '',
    phone: ''
})
const alertEmail = ref(false)
const alertName = ref(false)
const alertPhone = ref(false)

const openChat = () => {
    showChat.value = true
}
const closeChat = () => {
    showChat.value = false
}
const validatePhone = (evt) => {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
    } else {
        return true;
    }
}

const submitForm = (_evt) => {
    if (formInfo.value.email == '') {

    }
}

</script>

<template>
    <div class="pigeon" :class="{ Color, backgroundColor }">
        <div class="pigeon__body" v-if="showChat">
            <div class="pigeon__body_top">
                <div @click="closeChat" class="--close">
                    <Close :color="closeColor" />
                </div>
                <div class="pigeon__body_top_content">
                    <div class="__image">
                        <img v-if="image" :src="image" alt="">
                        <logo v-else />
                    </div>
                    <div class="__info">
                        <span>
                            {{ title ? title : 'Company name' }}
                        </span>
                        <p>{{ description ? description : 'Description about your company' }}</p>
                    </div>

                </div>
            </div>
            <div class="pigeon__body_bottom">
                <form>
                    <input :class="{ 'alert': alertEmail }" type="text" v-model="formInfo.email" placeholder="Email">
                    <input :class="{ 'alert': alertName }" type="text" v-model="formInfo.name" placeholder="Name">
                    <input :class="{ 'alert': alertPhone }" @keypress="validatePhone" v-model="formInfo.phone"
                        placeholder="phone number">
                    <button @click="submitForm"
                        :disabled="formInfo.email == '' || formInfo.name == '' || formInfo.phone == ''">Send</button>
                </form>
                <p>Made by <a href="">Ali Khalouf</a></p>
            </div>
        </div>
        <div @click="openChat" class="pigeon__chat" v-else>
            <button class="pigeon__chat_button">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <span class="pigeon__chat_title">
                <slot name="title" />
            </span>
        </div>
    </div>
</template>


<style lang="sass" scoped>
.pigeon
    position: fixed
    bottom: 20px
    right: 20px
    &__body
        width: 400px
        height: 400px
        background-color: #F4F3F3
        border-radius: 25px
        display: grid
        grid-template-rows: 1fr 2fr
        &_top
            border-top-left-radius: 25px
            border-top-right-radius: 25px
            background: #FECC00
            position: relative
            display: flex
            align-items: center
            .--close
                position: absolute
                width: 30px
                height: 30px
                top: -15px
                right: 30px
                background: #F4F3F3
                border-radius: 26px
                display: flex
                align-items: center
                justify-content: center
                font-weight: bold
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
                cursor: pointer
            &_content
                position: relative
                padding: 10px
                display: grid
                width: 100%
                grid-template-columns: 1fr 3fr
                align-items: center
                .__image
                    width: 70px
                    height: 70px
                    background: #F4F3F3
                    border-radius: 26px
                    margin-right: 10px
                    overflow: hidden
                    img
                        width: 100%
                        height: 100%
                        object-fit: cover
                .__info
                    font-weight: normal
                    color: #000
                    p
                        font-size: 14px
        &_bottom
            width: 100%
            height: 100%
            
            form
                display: flex
                flex-direction: column
                padding: 20px
                input
                    padding: 10px
                    margin-bottom: 5px
                    border: none
                    font-size: 12px
                button
                    margin-top: 10px
                    padding: 10px
                    cursor: pointer
                    background-color: #FECC00
                    border: none
                    border: 5px
            p
                font-size: 12px
                color: #000
                text-align: center
    &__chat
        position: relative
        display: flex
        align-items: center
        background: #FECC00
        border-radius: 26px
        cursor: pointer
        &_button
            width: 50px
            height: 50px
            border: none
            background: transparent
            display: flex
            align-items: center
            justify-content: space-between
            padding: 10px
            border-radius: 26px
            span
                position: relative
                height: 5px
                width: 5px
                background: #fff
                border-radius: 5px
        &_title
            display: none
            transition: 1s ease-in-out
        &:hover
            .pigeon__chat_title
                display: block
                padding-right: 10px
                color: #fff
                font-size: 16px
                font-weight: bold

</style>