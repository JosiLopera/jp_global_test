<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <button class="modal-default-button" @click="$emit('close')">
            Close
          </button>

          <div class="modal-header">
            <img class="pic_avatar" :src="profile?.person?.picture || avatar" alt="">
            <div class="personal_info_box">
              <h3>{{ profile?.person?.name }}</h3>
              <section>
                <strong>Profession:</strong> {{ profile?.person?.professionalHeadline }}<br>
                <strong>Location:</strong> {{ profile?.person?.location?.name }}<br>
                <strong>Languages:</strong> <span v-for="lang in profile?.languages" :key="profile?.languages?.code">
                  {{ lang.language }},
                </span>
              </section>
            </div>
          </div>

          <div class="modal-body">
            <div class="info_box">
              <h3>Education</h3>
              <div v-if="profile?.education?.length">
                <section v-for="edu in profile?.education.slice(0, 3)" :key="profile?.education.id">
                  <strong>Title:</strong> {{ edu.name }}<br>
                  <strong>University:</strong> {{ edu.organizations[0].name }}<br>
                  <strong v-if="edu.fromMonth">From:</strong> {{ edu.fromMonth }}<span v-if="edu.fromMonth">/</span>{{ edu.fromYear }}<br>
                  <strong v-if="edu.toMonth">To:</strong> {{ edu.toMonth }}<span v-if="edu.toMonth">/</span>{{ edu.toYear }}<br>
                  <span v-else></span>
                  <span>&nbsp;</span>
                </section>
              </div>
              <div v-else>
                There is no experiences listed
              </div>
            </div>
            <div class="info_box">
              <h3>Experiences</h3>
              <div v-if="profile?.experiences?.length">
                <section v-for="exp in profile?.experiences.slice(0, 3)" :key="profile?.experiences.id">
                  <strong>Title:</strong> {{ exp.name }}<br>
                  <strong>University:</strong> {{ exp.organizations[0].name }}<br>
                  <strong v-if="exp.fromMonth">From:</strong> {{ exp.fromMonth }}<span v-if="exp.fromMonth">/</span>{{ exp.fromYear }}<br>
                  <strong v-if="exp.toMonth">To:</strong> {{ exp.toMonth }}<span v-if="exp.toMonth">/</span>{{ exp.toYear }}<br>
                  <span v-else></span>
                  <span>&nbsp;</span>
                </section>
              </div>
              <div v-else>
                There is no education listed
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">

            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
import avatar from '@/assets/img_avatar.png'

export default {
  name: 'Modal',
  props: {
    username: String
  },
  data () {
    return {
      profile: {},
      avatar: avatar
    }
  },
  beforeCreate () {
    console.log(this.username)
    axios.get('https://torre.bio/api/bios/' + this.username)
      .then((result) => {
        this.profile = result.data
        console.log(this.profile)
      })
      .catch(e => console.log(e))
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 80%;
  height: 80%;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  display: block;
}

.modal-header h3, .modal-body h3, .modal-footer h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  display: block;
}

.modal-default-button {
  float: right;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.personal_info_box {
  display: inline-block;
  width: auto;
  max-width: 50%;
  vertical-align: middle;
  text-align: left;
  margin-left: 20px;
}
.pic_avatar {
  height: auto;
  display: inline-block;
  width: 150px;
  vertical-align: middle;
}

.info_box {
  display: inline-block;
  width: 47%;
  vertical-align: middle;
  text-align: left;
  margin-left: 3%;
  float: left;
}

</style>
