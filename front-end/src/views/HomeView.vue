<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const ampouleImage = ref('');
  const ampouleEtat = ref('');
  const relayIsOn = ref(null);
  const ampouleIp = ref('');
  const ampouleWifiSsid = ref('');
  const ampouleTemperature = ref('');


  const fetchDeviceStatus = async () => {
  const deviceId = '4022d88e30e8';
  const authKey = 'MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73';

  const apiUrl = `https://shelly-77-eu.shelly.cloud/device/status?id=${deviceId}&auth_key=${authKey}`;

  try {
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.isok) {
  relayIsOn.value = data.data.device_status.relays[0].ison;
  updateAmpouleState(relayIsOn.value);

  const ip = data.data.device_status.wifi_sta.ip;
  const wifiSsid = data.data.device_status.wifi_sta.ssid;
  const temperature = data.data.device_status.temperature;

  ampouleIp.value = ip;
  ampouleWifiSsid.value = wifiSsid;
  ampouleTemperature.value = temperature;
}
} catch (error) {
  console.error('Erreur lors de la récupération des données de l\'API', error);
}
};


  const updateAmpouleState = (isRelayOn) => {
  if (isRelayOn) {
  ampouleImage.value = "/src/assets/ampoule-bleu.svg";
  ampouleEtat.value = "État : Allumé";
} else {
  ampouleImage.value = "/src/assets/ampoule.svg";
  ampouleEtat.value = "État : Éteinte";
}
};

  const toggleRelayWithAxios = async (isOn) => {
    const deviceId = '4022d88e30e8';
    const authKey = 'MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73';
    const turn = isOn ? 'on' : 'off';

    const apiUrl = 'https://shelly-77-eu.shelly.cloud/device/relay/control';

    const requestBody = new FormData();
    requestBody.append('channel', '0');
    requestBody.append('id', deviceId);
    requestBody.append('auth_key', authKey);
    requestBody.append('turn', turn);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: apiUrl,
      headers: {
        'Content-Type': 'multipart/form-data', // Définir l'en-tête correct
      },
      data: requestBody,
    };

    try {
      const response = await axios.request(config);

      if (response.data.isok) {
        relayIsOn.value = isOn;
        updateAmpouleState(isOn);

        //const dbState = isOn ? 1 : 0;
        //const dbApiUrl = 'https://127.0.0.1:8000/api/statess';
        //await axios.post(dbApiUrl, {
          //datatime: new Date().toISOString(),
          //state: dbState
        //});
      }
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la prise (état : ${isOn ? 'Allumé' : 'Éteint'})`, error);
    }
  };

  onMounted(() => {
    fetchDeviceStatus();

    const updateInterval = 30000;
    setInterval(fetchDeviceStatus, updateInterval);
  });

</script>

<template>
  <main>
    <div class="header-profil">
      <img src="@/assets/user/benji.png" alt="">
      <div class="header-profil-name">Benjamin Frenal</div>
    </div>
    <h1>Tableau de Bord</h1>
    <div class="home-view">
      <div class="ampoule">
        <img :src="ampouleImage" alt="">
        <div class="info-texte-lampe">
          <span>{{ ampouleEtat }}</span>
          <span>IP: {{ ampouleIp }}</span>
          <span>Réseau Wi-Fi: {{ ampouleWifiSsid }}</span>
          <span>Température: {{ ampouleTemperature }} °C</span>
        </div>
      </div>
      <div class="info-prise">
        <h2>Informations de la prise</h2>
        <p>
          À gauche, nous pouvons apercevoir l'état actuel de la prise connectée au cloud. Appuyé plusieurs fois et attendre 3 secondes le temps de l'actualisation
        </p>
        <div class="buttons">
          <a id="on" @click="toggleRelayWithAxios(true)">Allumer <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg></a>
          <a id="off" @click="toggleRelayWithAxios(false)">Éteindre <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg></a>
        </div>
      </div>
    </div>
  </main>
</template>
