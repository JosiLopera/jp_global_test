<template>
  <div class="home">
    <button @click="getProfiles">get profiles</button>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      arrayProfiles: []
    }
  },
  methods: {
    getProfiles () {
      axios
        .get('https://bio.torre.co/api/bios/dianacarvajalrios', {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then((result) => {
          console.log(result.data)
        })
        .catch(e => console.log(e))
    }
  }
}
</script>
