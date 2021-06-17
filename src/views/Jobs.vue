<template>
  <div class="wrapper">
    <p>
      <label for="name">Find a job </label>
      <input id="name" v-model="name" type="text" name="name">
    </p>

    <p>
      <label for="size">Number of jobs </label>
      <input id="size" v-model="size" type="number" name="size" min="1">
    </p>

    <p>
      <input type="button" value="Search" @click="getJobs">
    </p>
    <div class="card" v-for="profile in arrayProfiles" :key="profile.id" @click="goToSingle(profile)">
      <img :src="profile.picture || '/assets/img_avatar.png'" alt="" style="width:100%">
      <div class="container">
        <h4><b>{{ profile.name }}</b></h4>
        <p>{{ profile.professionalHeadline }}</p>
        <p>{{ profile.locationName }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.wrapper{
  width: 80%;
  margin-left: 10%;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 50%;
  float: left;
  margin-left: 0;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}
</style>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Jobs',
  components: {},
  data () {
    return {
      publicPath: process.env.BASE_URL,
      arrayProfiles: [],
      size: 6,
      name: ''
    }
  },
  methods: {
    getJobs () {
      this.arrayProfiles = []
      const configHeaders = {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
      axios
        .post('https://search.torre.co/opportunities/_search?size=' + this.size + '&aggregate=false&offset=0',
          {
            name: {
              term: this.name
            }
          },
          {
            headers: configHeaders
          })
        .then((result) => {
          console.log(result.data.results)
          this.arrayProfiles = result.data.results
        })
        .catch(e => console.log(e))
    },
    goToSingle (job) {
      console.log(job)
    }
  }
}
</script>
