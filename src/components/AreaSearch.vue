<template>
    <h2>{{title}}</h2>
    <Autocomplete :items="locations" placeholder-text="Search for locations..." @locationClicked="fetchingInfo" />
    <div class="area-result" v-if="Object.keys(areaInfo).length !== 0">
        <div class="area-result__info" v-for="(data, value) in areaInfo" :key="data">
            {{value}} - {{data}}
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import {
        onMounted,
        ref
    } from "vue";
    import Autocomplete from "./Autocomplete.vue";

    export default {
        components: {
            Autocomplete
        },
        props: {
            title: String,
            locations: Array
        },
        setup() {
            const areaInfo = ref({
                
            })
            const fetchingInfo = (location) => {
                axios.get(`${location.href}`).then((res) => {
                    areaInfo.value["Continent"] = res.data.continent
                })
                axios.get(`${location.href}scores/`).then((res) => {
                    var costOfLiving = Math.round(res.data.categories.find(obj => obj.name === "Cost of Living").score_out_of_10 * 100) / 100
                    var healthcare = Math.round(res.data.categories.find(obj => obj.name === "Healthcare").score_out_of_10 * 100) / 100
                    var cityScore = Math.round(res.data.teleport_city_score * 100) / 100
                    areaInfo.value["Cost of living score"] = costOfLiving + " out of 10"
                    areaInfo.value["Healthcare score"] = healthcare + " out of 10"
                    areaInfo.value["City score"] = cityScore + " out of 10"
                })
                axios.get(`${location.href}cities/`).then((res) => {
                    areaInfo.value["Cities nearby"] = res.data._links["city:items"].map(obj => obj.name)
                })
            }
            return {
                fetchingInfo,
                areaInfo
            };
        }
    };
</script>
<style lang="scss">
.area-result {
    &__info {
        padding:5px 0;
    }
}
</style>