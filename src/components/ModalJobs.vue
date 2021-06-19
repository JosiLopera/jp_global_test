<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <button class="modal-default-button" @click="$emit('close')">
            Close
          </button>

          <div class="modal-header">
            <span v-for="org in job?.organizations?.slice(0,1)" :key="org.id">
              <img class="pic_avatar" :src="org?.picture || avatar" alt="">
            </span>
            <div class="personal_info_box">
              <h3 >{{ job?.objective }}</h3>
              <section>
                <strong>Organization: </strong>
                <span v-for="org in job?.organizations?.slice(0,1)" :key="org.id">
                  {{ org.name }}
                </span><br>
                <strong>Compensation: </strong>
                  <span v-if="job?.compensation?.visible">
                    {{ job?.compensation?.minAmount }} - {{ job?.compensation?.maxAmount }} / {{ job?.compensation?.periodicity }}
                  </span>
                  <span v-else>
                    To be defined
                  </span><br>
                <strong>Languages: </strong>
                <span v-for="lang in job?.languages" :key="lang.id">
                  {{ lang.language.name }} ({{ lang.fluency }}),
                </span><br>
                <strong>Opportunity: </strong> {{ job?.opportunity }}
              </section>
            </div>
          </div>

          <div class="modal-body">
            <div class="info_box" v-for="detail in job?.details" :key="detail.id">
              <h3>{{ detail.code }}</h3>
              <p>{{ detail.content }}</p>
            </div>
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
  name: 'ModalJobs',
  props: {
    jobId: String
  },
  data () {
    return {
      job: {},
      avatar: avatar
    }
  },
  beforeCreate () {
    axios.get('https://torre.co/api/opportunities/' + this.jobId)
      .then((result) => {
        this.job = result.data
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
  overflow: scroll;
}

.modal-header {
  display: block;
}

.modal-header h3, .modal-body h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #42b983;
  text-transform: capitalize;
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
