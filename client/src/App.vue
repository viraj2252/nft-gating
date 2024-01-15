<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "./components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";
</script>

<template>
  <main class="container m-auto p-10">
    <TheHeader />
    <EntryEditor />
    <ul>
      <li>
        <EntryCard />
      </li>
    </ul>
    <div>
      <WalletConnector @walletConnected="handleWalletConnected" />
      <ImageDisplay src="https://violet-tricky-cod-678.mypinata.cloud/ipfs/QmYEXqfmjieVvno4D91TrYJqqKa9K4dge2fKo6xuuErVnA/1.png" alt="Always Visible Image" :isVisible="true" />
      <ImageDisplay src="path/to/gated-image.jpg" alt="Gated Image" :isVisible="hasNFT" />

    </div>
  </main>
</template>

<script lang="ts">
import WalletConnector from '@/components/WalletConnector.vue';
import ImageDisplay from '@/components/ImageDisplay.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Home App',
  components: {
    WalletConnector,
    ImageDisplay,
  },
  data() {
    return {
      hasNFT: false,
    };
  },
  methods: {
    handleWalletConnected(walletAddress: string) {
// Implement logic to verify NFT ownership
// For simplicity, using a mock function
      this.verifyNFTOwnership(walletAddress);
    },
    async verifyNFTOwnership(walletAddress: string) {
// Send a request to your backend server to verify NFT ownership
      fetch('http://localhost:8080/contracts/verify-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      })
          .then(response => response.json())
          .then(data => {
            this.hasNFT = data.responseObject.userNFTs;
          })
          .catch(error => console.error('Error:', error));
    },
  },
});
</script>