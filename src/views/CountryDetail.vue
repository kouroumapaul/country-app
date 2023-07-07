<script setup lang="ts">
import Header from "../components/Header.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCountryStore } from "../store/CountryStore";
import { storeToRefs } from "pinia";

const countryStore = useCountryStore();
const { country } = storeToRefs(countryStore);
const { searchByCode } = countryStore;

const param = useRouter().currentRoute.value.params.code;

onMounted(() => {
  searchByCode(param).then(() => {
    console.log(country.value[0]);
  });
});
</script>
<template>
  <Header />
  <section class="py-5">
    <div class="container">
      <div class="row gx-5">
        <aside class="col-lg-6">
          <div
            class="bg-gradient-secondary border rounded-4 mb-3 d-flex justify-content-center"
          >
            <a
              data-fslightbox="mygalley"
              class="rounded-4"
              target="_blank"
              data-type="image"
              :href="`${country[0]?.flags?.png}`"
            >
              <img
                style="width: 100%; max-height: 100vh; margin: auto"
                class="rounded-4 fit"
                :src="`${country[0]?.flags?.png}`"
              />
            </a>
          </div>

          <!-- thumbs-wrap.// -->
          <!-- gallery-wrap .end// -->
        </aside>
        <main class="col-lg-6">
          <div class="ps-lg-3">
            <h4 class="title text-dark">
              {{ country[0]?.name?.official }}
            </h4>
            <div class="d-flex flex-row my-3">
              <div class="text-warning mb-1 me-2">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <span class="ms-1"> 4.5 </span>
              </div>
              <span class="text-muted"
                ><i class="fas fa-shopping-basket fa-sm mx-1"></i>154 orders</span
              >
              <span class="text-success ms-2">In stock</span>
            </div>

            <div class="mb-3">
              <span class="h5">{{ country[0]?.region }}</span>
              <span class="h5"> / {{ country[0]?.subregion }}</span>
            </div>

            <p>
              Modern look and quality demo item is a streetwear-inspired collection that
              continues to break away from the conventions of mainstream fashion. Made in
              Italy, these black and brown clothing low-top shirts for men.
            </p>

            <div class="row">

                <dt class="col-3">Capitale</dt>
              <dd class="col-9">
                <span v-for="(capital,index) in country[0]?.capital" :key="index">
                {{ capital }}
                </span>
              </dd>

              <dt class="col-3">Superficie</dt>
              <dd class="col-9">
                {{
                  new Intl.NumberFormat("fr-FR", {
                    maximumSignificantDigits: 3,
                  }).format(country[0]?.area)
                }}
                Km<sup>2</sup>
              </dd>

              <dt class="col-3">Population</dt>
              <dd class="col-9">
                {{
                  new Intl.NumberFormat("fr-FR", {
                    maximumSignificantDigits: 3,
                  }).format(country[0]?.population)
                }}
                habitants
              </dd>

              <dt class="col-3">Langue(s)</dt>
              <dd class="col-9">
                <span v-for="(language, key, index) in country[0]?.languages" :key="key">
                  {{ language
                  }}<span v-if="index !== Object.keys(country[0]?.languages).length - 1"
                    >,
                  </span>
                </span>
              </dd>

              <dt class="col-3">Monnaie</dt>
              <dd class="col-9">
                <span v-for="currency in country[0]?.currencies">
                  {{ currency.name }}
                </span>
              </dd>

              <dt class="col-3">Indicatif</dt>
              <dd class="col-9">
                {{ country[0]?.idd?.root }}{{ country[0]?.idd?.suffixes[0] }}
              </dd>

              <dt class="col-3">Habitant(e)</dt>
              <dd class="col-9">
                {{ country[0]?.demonyms?.fra.m }} /
                {{ country[0]?.demonyms?.fra.f }}
              </dd>

              <dt class="col-3">Fuseau horaire</dt>
              <dd class="col-9">
                <span v-for="(time, index) in country[0]?.timezones" :key="index">
                  {{ time
                  }}<span v-if="index !== country[0]?.timezones.length - 1">, </span>
                </span>
              </dd>
              <dt class="col-3 mt-2">Voiture</dt>
              <dd class="col-9 mt-2">
                Immatriculation : <span class="fw-bold">{{ country[0]?.car.signs[0] }}</span> <br />
                Côté chauffeur :
                <span class="fw-bold">
                  {{ country[0]?.car.side == "left" ? "Gauche" : "Droit" }}</span
                >
              </dd>
            </div>

            <hr />

            <div class="row mb-4">
              <div class="col-md-4 col-6">
                <label class="mb-2">Size</label>
                <select class="form-select border border-secondary" style="height: 35px">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
              <!-- col.// -->
              <div class="col-md-4 col-6 mb-3">
                <label class="mb-2 d-block">Quantity</label>
                <div class="input-group mb-3" style="width: 170px">
                  <button
                    class="btn btn-white border border-secondary px-3"
                    type="button"
                    id="button-addon1"
                    data-mdb-ripple-color="dark"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <input
                    type="text"
                    class="form-control text-center border border-secondary"
                    placeholder="14"
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                  <button
                    class="btn btn-white border border-secondary px-3"
                    type="button"
                    id="button-addon2"
                    data-mdb-ripple-color="dark"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <a :href="`${country[0]?.maps.openStreetMaps}`" class="btn btn-warning shadow-0"> <font-awesome-icon icon="fa-solid fa-map-location" /> Open Street Map </a>
            <a :href="`${country[0]?.maps.googleMaps}`" class="btn btn-danger shadow-0 mx-2">
                <font-awesome-icon icon="fa-solid fa-map-marker" /> Google Maps
            </a>
           
          </div>
        </main>
      </div>
    </div>
  </section>
  <!-- content -->
</template>

<style scoped></style>
