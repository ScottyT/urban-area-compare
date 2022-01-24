<template>
    <div class="autocomplete" :class="{ 'is-focused': inputFocused === true }">
        <input 
            ref="searchText" 
            v-model="search" type="text" :placeholder="placeholderText" 
            @blur="inputFocused = false" @focus="inputFocused = true" @keydown.down="onArrowDown"
            @keyup.up="onArrowUp" @keydown.enter="onEnter" class="autocomplete__input autocomplete__input--light"  />    
            <div class="results" v-if="itemClicked !== '' || search !== ''">
                <div 
                     v-for="(location, i) in locationsMatchingSearch" 
                    :key="i" @click="clickedLocation(location)"
                    class="results__result" :class="{ 'is-active': i === arrow_counter }">
                    {{location.name}}
                </div>
            </div>
    </div>
    
</template>
<script>
import { onMounted, reactive, ref, toRefs, computed, watch } from 'vue'

export default {
    props: {
        items: {
            type: Array,
            required: true
        },
        placeholderText: {
            type: String,
            required: false,
            default: "Search..."
        },
    },
    emits: ["locationClicked"],
    setup(props, { emit }) {
        const { items } = toRefs(props)
        const search = ref('')
        const focused = ref(false)
        const itemClicked = ref('')
        const arrowCounter = ref(-1)

        const onArrowDown = () => {
            if (arrowCounter.value < locationsMatchingSearch.value.length) {
                arrowCounter.value = arrowCounter.value + 1
            }
        }
        const onArrowUp = () => {
            if (arrowCounter.value > 0) {
                arrowCounter.value = arrowCounter.value - 1;
            }
        }
        const onEnter = () => {
            search.value = locationsMatchingSearch.value[arrowCounter.value].name
            itemClicked.value = locationsMatchingSearch.value[arrowCounter.value]
            arrowCounter.value = -1
            emit("locationClicked", itemClicked.value)

        }
        const locationsMatchingSearch = computed(() => {
            if (search.value === '' && itemClicked.value === '') {
                return []
            }
            return items.value.filter(
                item => item.name.includes(search.value)
            ).slice(0, 10)
        })
        const clickedLocation = (item) => {
            search.value = item.name
            itemClicked.value = item
            emit("locationClicked", itemClicked.value)
        }
        watch(locationsMatchingSearch, (val) => {
            itemClicked.value = ""
        })
        return {
            clickedLocation,
            locations: items.value,
            search,
            locationsMatchingSearch,
            inputFocused: focused.value,
            itemClicked,
            arrow_counter: computed(() => arrowCounter.value),
            onArrowDown,
            onArrowUp,
            onEnter
        }
        
    },
}
</script>
<style lang="scss">
.autocomplete {
    display:flex;
    align-items:flex-start;
    flex:1 1 auto;
    max-width:100%;
    text-align:left;
    position:relative;
    height:35px;
    margin-bottom:20px;
    
    &.is-focused {
        &::after {
            width:100%;
            transition:all 0.5s cubic-bezier(0.61, 0.03, 0.36, 1.06);
            transform:scaleX(1)
        }
        .autocomplete__placeholder {
            transform:translateY(-18px) scale(.75);
            color:#1976d2;
            transition:all 0.3s cubic-bezier(0.15, 0.72, 0.38, 1.03);
        }
    }
    &__results {
        padding:0;
        overflow:auto;
        position:absolute;
        top:35px;
        width:100%;
        background:black;
        color:white;
        z-index:1;
    }
    &__input {
        width:100%;
        padding:5px;
        position:absolute;
        left:0;
        color:white;
        &:focus {
            outline:none;
        }
        &--light {
            color:black;
            background-color:white;
        }
        &--dark {
            color:white;
            background-color:black;
            padding:5px 8px;
        }
    }
}
.results {
    position:absolute;
    top:35px;
    &__result {
        border-bottom:1px solid black;
        padding:5px 0;
        background:white;
        &:hover {
            cursor: pointer;
        }
        &.is-active {
            border-bottom:2px solid blue;
        }
    }
}
</style>