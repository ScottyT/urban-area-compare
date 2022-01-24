<template>
  <h1>Urban Area Compare</h1>
  <div class="area-search-wrapper">
    <div class="area area--area1">
      <AreaSearch title="Urban area 1" :locations="urban_areas" />
    </div>
    <div class="area area--area2">
      <AreaSearch title="Urban area 2" :locations="urban_areas" />
    </div>
  </div>
</template>

<script>
import AreaSearch from "./components/AreaSearch.vue"
import axios from 'axios';
export default {
  name: 'App',
  components:{
    AreaSearch
  },
  data() {
    return {
      urban_areas: [],
      api_url: "https://api.teleport.org/api/urban_areas"
    }
  },
  methods: {
    fetchingAreas() {
      axios.get(`${this.api_url}/`).then((res) => {
        this.urban_areas = res.data._links["ua:item"]
      });
    }
  },
  mounted() {
    this.fetchingAreas()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.area-search-wrapper {
  max-width:900px;
  display:grid;
  grid-template-columns:1fr 1fr;
  column-gap:20px;
  margin:auto;
}
</style>
