<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <a class="close_modal" @click="$emit('close')">X</a>
          <div v-if="pageName === 'people'" class="modal-header">
            <img class="pic_avatar" :src="data?.person?.picture || avatar" alt="">
            <div class="personal_info_box">
              <h3>{{ data?.person?.name }}</h3>
              <section>
                <strong>Profession:</strong> {{ data?.person?.professionalHeadline }}<br>
                <strong>Location:</strong> {{ data?.person?.location?.name }}<br>
                <strong>Languages:</strong> <span v-for="lang in data?.languages" :key="lang.id">
                  {{ lang.language }},
                </span>
              </section>
            </div>
          </div>
          <div v-else class="modal-header">
            <span v-for="org in data?.organizations?.slice(0,1)" :key="org.id">
              <img class="pic_avatar" :src="org?.picture || avatar" alt="">
            </span>
            <div class="personal_info_box">
              <h3 >{{ data?.objective }}</h3>
              <section>
                <strong>Organization: </strong>
                <span v-for="org in data?.organizations?.slice(0,1)" :key="org.id">
                  {{ org.name }}
                </span><br>
                <strong>Compensation: </strong>
                <span v-if="data?.compensation?.visible">
                    {{ data?.compensation?.minAmount }} - {{ data?.compensation?.maxAmount }} / {{ data?.compensation?.periodicity }}
                  </span>
                <span v-else>
                    To be defined
                  </span><br>
                <strong>Languages: </strong>
                <span v-for="lang in data?.languages" :key="lang.id">
                  {{ lang.language.name }} ({{ lang.fluency }}),
                </span><br>
                <strong>Opportunity: </strong> {{ data?.opportunity }}
              </section>
            </div>
          </div>
          <div v-if="pageName === 'people'" class="modal-body">
            <div class="info_box">
              <h3>Education</h3>
              <div v-if="data?.education?.length">
                <section v-for="edu in data?.education" :key="edu.id">
                  <strong>Title:</strong> {{ edu.name }}<br>
                  <strong>University:</strong> {{ edu.organizations.name }}<br>
                  <strong v-if="edu.fromMonth">From:</strong> {{ edu.fromMonth }}<span v-if="edu.fromMonth">/</span>{{ edu.fromYear }}<br>
                  <strong v-if="edu.toMonth">To:</strong> {{ edu.toMonth }}<span v-if="edu.toMonth">/</span>{{ edu.toYear }}<br>
                  <span>&nbsp;</span>
                </section>
              </div>
              <div v-else>
                There is no experiences listed
              </div>
            </div>
            <div class="info_box">
              <h3>Experiences</h3>
              <div v-if="data?.experiences?.length">
                <section v-for="exp in data?.experiences" :key="exp.id">
                  <strong>Title:</strong> {{ exp.name }}<br>
                  <strong>University:</strong> {{ exp.organizations.name }}<br>
                  <strong v-if="exp.fromMonth">From:</strong> {{ exp.fromMonth }}<span v-if="exp.fromMonth">/</span>{{ exp.fromYear }}<br>
                  <strong v-if="exp.toMonth">To:</strong> {{ exp.toMonth }}<span v-if="exp.toMonth">/</span>{{ exp.toYear }}<br>
                  <span>&nbsp;</span>
                </section>
              </div>
              <div v-else>
                There is no education listed
              </div>
            </div>
          </div>
          <div v-else class="modal-body">
            <div class="info_box" v-for="detail in data?.details" :key="detail.id">
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
  name: 'Modal',
  props: {
    dataIdName: String,
    pageName: String
  },
  data () {
    return {
      data: {},
      avatar: avatar
    }
  },
  beforeCreate () {
    let url = ''
    if (this.pageName === 'people') {
      url = 'https://torre.bio/api/bios/' + this.dataIdName
    } else {
      url = 'https://torre.co/api/opportunities/' + this.dataIdName
    }
    axios.get(url)
      .then((result) => {
        this.data = result.data
        console.log(this.data)
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

.modal-header h3, .modal-body h3, .modal-footer h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  display: block;
}

.close_modal {
  float: right;
  font-size: 30px;
  color: #9DBFAF;
  cursor: pointer;
}

.close_modal:hover{
  color: #42b983;
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
