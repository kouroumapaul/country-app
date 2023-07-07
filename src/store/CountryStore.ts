import { defineStore } from 'pinia';
import { ref } from 'vue';
import { axiosInstance } from '../plugins/axios';
export const useCountryStore = defineStore('CountryStore', () => {
  const countries = ref([] );
  const country = ref({})

  async function getCountries(): Promise<void> {
    countries.value = (await axiosInstance.get(`all`)).data;
  }

  async function searchByName(name:string): Promise<void> {
    countries.value = (await axiosInstance.get(`name/${name}`)).data;
  }

  async function searchByRegion(region:string): Promise<void> {
    countries.value = (await axiosInstance.get(`region/${region}`)).data;
  }

  async function searchByCode(code:string): Promise<void> {
    country.value = (await axiosInstance.get(`alpha/${code}`)).data;
  }
  
  return {
    countries,
    country,
    getCountries,
    searchByName,
    searchByRegion,
    searchByCode
  };
});
