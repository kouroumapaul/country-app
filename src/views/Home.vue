<script setup lang="ts">
import Header from "../components/Header.vue";
import { onMounted } from "vue";
import { useCountryStore } from "../store/CountryStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const getFirstCapital = (country) => {
      const firstCapital = ref(country.capital[0]);
      return firstCapital.value;
};

const searchValue = ref("");

const countryStore = useCountryStore();
const { countries } = storeToRefs(countryStore);
const { getCountries, searchByName, searchByRegion } = countryStore;
const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Antarctic"];
const selectedOption = ref('');

onMounted(() => {
  fetchCountries()
});

function fetchCountries(){
  getCountries()
    .then(() => {
    })
    .catch((err) => {
      console.error(err);
    });
}

function callback() {
  searchByName(searchValue.value)
    .then(() => {})
    .catch(() => {
    });
}

function getByRegion(event:any) {
  const region = event.target.value;
  searchByRegion(region)
}


</script>

<template>
  <Header />
  <div class="container mt-5">
    <div class="alert alert-success" role="alert">
      Resultat : {{ countries.length }} pays
    </div>
    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
      <input
        v-model="searchValue"
        @input="callback"
        type="search"
        class="form-control"
        placeholder="Search..."
        aria-label="Search"
      />
    </form>
    <div class="d-md-flex d-sm-block justify-content-between mt-3">
      <div v-for="continent in continents" :key="continent" class="form-check">
        <input
          v-on:change="getByRegion($event)"
          class="form-check-input"
          type="radio"
          name="continent"
          :id="`${continent}`"
          :value="`${continent}`"
          v-model="selectedOption"
        />
        <label class="form-check-label" :for="`${continent}`">
          <span class="text-uppercase fw-bold">{{ continent }}</span>
        </label>
      </div>
    </div>
    <div class="row">
      <div
        v-for="country in countries"
        :key="country['cca2']"
        class="col-lg-3 col-md-6 my-3"
      >
        <div class="card">
          <img
            style="height: 250px"
            class="card-img-top"
            :src="`${country['flags']['png']}`"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{{ country["name"]["common"] }}</h5>
            <router-link :to="{ name: 'country', params: { code: country['cca2']} }">Details</router-link>
            
            <hr class="my-4" />
            <p class="lead"><strong>Informations</strong></p>
            <ul
              class="list-unstyled list-inline d-flex justify-content-between"
            >
              <li class="list-inline-item me-0">
                <p class="card-text">
                  <span
                    v-for="capital in country['capital']"
                    class="badge rounded-pill text-bg-secondary"
                    >Capital : {{ capital }}
                    </span
                  >
                </p>
              </li>
              <li class="list-inline-item me-0">
                <p class="card-text">
                  <span class="badge rounded-pill text-bg-info"
                    >Population :
                    {{
                      new Intl.NumberFormat("fr-FR", {
                        maximumSignificantDigits: 3,
                      }).format(country["population"])
                    }}</span
                  >
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
