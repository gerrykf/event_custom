<script setup lang="ts"></script>
<template>
  <div class="warning-wrap">
    <div class="warning-container">
      <div class="warning-content">
        <span class="logo">
          <div class="white-gradient-for-loading"></div>
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="46"
            viewBox="0 0 120 45.6"
            fill="#7b7b7b"
          >
            <defs></defs>
            <path
              class="cls-1"
              d="M115 15.2a17.9 17.9 0 0 0-25-.3 5.7 5.7 0 0 0-5.5-3.4V20L77 26.9A17.8 17.8 0 0 0 46.7 15v-7S47.2 0 40.2 0v21.6s6.1 2.8 11-1.8a11.4 11.4 0 0 1 16.2 16l-.1.1a11.4 11.4 0 0 1-15.7.4l-.4-.4-10.4-10.3-10.3-10.3a17.9 17.9 0 0 0-24-1.1V8S7 0 0 0v27.9a17.8 17.8 0 0 0 30.5 12.6l6.3-6.3s-6-2.9-11 1.7-11.6 4.5-16 0a11.3 11.3 0 0 1-3.4-8A11.3 11.3 0 0 1 9.6 20l.4-.4a11.4 11.4 0 0 1 15.9.2l10.3 10.3 10.4 10.3a18 18 0 0 0 25.2 0l12.7-11.6v16.9c7 0 6.5-8.2 6.5-8.2V22.8l3.2-3h.1a11.4 11.4 0 0 1 19.5 8v10.5c0 2.1.8 7.4 6.5 7.4v-18a17.6 17.6 0 0 0-5.3-12.5z"
            ></path>
            <path
              class="cls-1"
              d="M85.2 6.2l2.6 2.6 2.6-2.6a3.7 3.7 0 0 0 0-5.2 3.7 3.7 0 1 0-5.2 5.2z"
            ></path>
          </svg> -->
          <span class="company-name"> CG </span>
        </span>
        <br />
        <br />
        活动不存在或非活动时间
        <br />
        <span class="en"> The event doesn't exist or not available now </span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.warning-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  .warning-content {
    text-align: center;
    line-height: 1.2em;
    color: #7b7b7b;

    .logo {
      margin-bottom: 5px;

      .company-name {
        font-size: 60px;
      }
    }
  }
}

.en {
  font-size: 0.8em;
}
</style>
