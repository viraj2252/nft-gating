<template>
  <v-btn color="primary" @click="connectWallet">Connect Wallet</v-btn>
</template>

<script lang="ts">
import detectEthereumProvider from "@metamask/detect-provider";
import { defineComponent} from 'vue';

export default defineComponent({
  name: 'WalletConnector',
  methods: {
    async connectWallet() {
      const provider = await detectEthereumProvider();
      if (provider) {
        try {
          const accounts = await provider.request({ method: 'eth_requestAccounts' });
          console.log(accounts);
          this.$emit('walletConnected', accounts[0]);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('Please install Metamask.');
      }
    },
  },
});
</script>
