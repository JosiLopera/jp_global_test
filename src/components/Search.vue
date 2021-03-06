<template>
  <div class="wrapper">
    <div class="wrap_search">
      <div class="search">
        <input v-model="name" v-on:keyup="validateWithEnter" type="text" class="searchTerm" :placeholder="pageName === 'people' ? 'Find a profile' : 'Find a job' ">
        <button type="submit" class="searchButton" @click="getData(false)">
          Search
        </button>
      </div>
    </div>

    <div class="wrap_card" v-if="pageName === 'opportunities'">
      <div class="card" v-for="job in arrayData" :key="job.id" @click="goToSingle(job.id)">
        <img class="pic_avatar" :src="job?.organizations[0]?.picture || avatar" alt="">
        <div class="card_container">
          <h4><b>{{ job?.objective }}</b></h4>
          <p><strong>Organization:</strong> {{ job?.organizations[0]?.name }}</p>
          <p>
            <strong>Compensation: </strong>
            <span v-if="job?.compensation?.data !== null">
              {{ job?.compensation?.data?.currency }} {{ job?.compensation?.data?.minAmount }}-{{ job?.compensation?.data?.maxAmount }}/{{ job?.compensation?.data?.periodicity }}
            </span>
            <span v-else>To be defined</span>
          </p>
          <p>
            <strong>Remote: </strong>
            <span v-if="job?.remote">Yes</span>
            <span v-else>No</span>
          </p>
        </div>
      </div>
    </div>
    <div class="wrap_card" v-else>
      <div class="card" v-for="profile in arrayData" :key="profile.id" @click="goToSingle(profile.username)">
        <img class="pic_avatar" :src="profile.picture || avatar" alt="">
        <div class="card_container">
          <h4><b>{{ profile.name }}</b></h4>
          <p>{{ profile.professionalHeadline }}</p>
          <p>{{ profile.locationName }}</p>
        </div>
      </div>
    </div>
    <a class="button_load" type="button" v-if="arrayData.length > 0" @click="getData(true)">Load more</a>
  </div>
  <Modal :page-name="pageName" :dataIdName="SingleData" v-if="showModal" @close="showModal = false" />
</template>

<script>
import axios from 'axios'
import avatar from '@/assets/img_avatar.png'
import Modal from '../components/Modal'

export default {
  name: 'Search',
  components: { Modal },
  props: {
    pageName: String
  },
  data () {
    return {
      arrayData: [],
      size: 3,
      offset: 0,
      name: '',
      avatar: avatar,
      SingleData: '',
      showModal: false
    }
  },
  methods: {
    validateWithEnter (e) {
      if (e.keyCode === 13) {
        this.getData(false)
      }
    },
    getData (isLoadMore) {
      console.log(this.pageName)
      if (!isLoadMore) {
        this.arrayData = []
        this.offset = 0
      } else {
        this.offset = this.offset + 3
      }
      const configHeaders = {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
      let body = {}
      if (this.name !== '') {
        if (this.pageName === 'opportunities') {
          body = {
            'skill/role': {
              text: this.name,
              experience: 'potential-to-develop'
            }
          }
        } else {
          body = {
            name: {
              term: this.name
            }
          }
        }
      }
      console.log(body)
      axios
        .post('https://search.torre.co/' + this.pageName + '/_search?size=' + this.size + '&aggregate=false&offset=' + this.offset,
          body,
          {
            headers: configHeaders
          })
        .then((result) => {
          for (let i = 0; i < result.data.results.length; i++) {
            this.arrayData.push(result.data.results[i])
          }
        })
        .catch(e => console.log(e))
    },
    goToSingle (singleData) {
      console.log(this.pageName)
      this.SingleData = singleData
      this.showModal = true
    }
  }
}
</script>

<style scoped>

.wrapper{
  width: 80%;
  margin-left: 10%;
}

body{
  background: #f2f2f2;
  font-family: 'Open Sans', sans-serif;
}

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid #42b983;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus{
  color: #42b983;
}

.searchButton {
  width: 80px;
  height: 36px;
  border: 1px solid #42b983;
  background: #42b983;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

.wrap_search{
  width: 50%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto 20px;
}

.wrap_card{
  width: 100%;
  margin: 30px auto;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 80%;
  float: left;
  margin: 0 0 20px 10%;
  cursor: pointer;
}

a.button_load{
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid #42b983;
  margin: 20px 0;
  border-radius: 5%;
  box-sizing: border-box;
  text-decoration:none;
  color: #42b983;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
}

a.button_load:hover{
  color:#ffffff;
  background-color:#42b983;
}

.pic_avatar{
  float: left;
  width: 30%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.card_container {
  float: right;
  width: 64%;
  margin: 5% 3%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.card_container p, .card_container h4{
  margin: 3px auto;
}
</style>
