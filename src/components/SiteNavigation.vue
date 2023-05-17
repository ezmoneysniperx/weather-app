<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg"> <!-- ana sayfa rengi -->
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    > <!--header icindeki text rengi-->
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-sharp fa-solid fa-snowflake text-2xl"></i><!--yagmur simgesi -->
          <i class="fa-sharp fa-solid fa-cloud text-2xl"></i> <!--bulut simgesi -->
          <i class="fa-solid fa-sun text-2xl"></i> <!--gunes simgesi -->
          <p class="text-2xl">Hava Durumu Uygulaması</p> <!--header yazi-->
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query"
        ></i>
      </div>

      <BaseModal
        :modalActive="modalActive"
        @close-modal="toggleModal"
      >
        <div class="text-black">
          <h1 class="text-2xl mb-1">Hakkında:</h1>
          <p class="mb-4">
            Hava Durumu Uygulaması, seçtiğiniz şehirlerin mevcut ve gelecekteki hava durumunu izlemenizi sağlar.
          </p>
          <h2 class="text-2xl">Nasıl çalışır:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Arama çubuğuna şehir adı girerek istediğiniz şehri arayın.
            </li>
            <li>
              Sonuçlardan bir şehir seçin, bu sizi seçiminiz için mevcut hava durumuna götürecektir.
            </li>
            <li>
              Sağ üstteki "+" simgesine tıklayarak şehri takip edin. Bu, şehri daha sonra ana sayfada görüntülemek üzere kaydedecektir.
            </li>
          </ol>

          <h2 class="text-2xl">Kaydedilen bir şehri kaldırma</h2>
          <p>
            Artık bir şehri takip etmek istemiyorsanız, ana sayfadan şehri seçmeniz yeterlidir. Sayfanın alt kısmında, şehri silmek için bir seçenek olacaktır.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { uid } from "uid";
import { ref } from "vue";
import BaseModal from "./BaseModal.vue";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(
      localStorage.getItem("savedCities")
    );
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem(
    "savedCities",
    JSON.stringify(savedCities.value)
  );

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
