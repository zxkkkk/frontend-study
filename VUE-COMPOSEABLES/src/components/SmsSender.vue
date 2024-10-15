<template>
  <div class="sms-sender-container">
    <h2>发送短信</h2>
    <form @submit.prevent="handleSend">
      <div class="form-group">
        <label for="phoneNumber">手机号:</label>
        <input
          id="phoneNumber"
          v-model="phoneNumber"
          type="tel"
          placeholder="请输入手机号"
          required
        />
      </div>

      <div class="form-group">
        <label for="message">短信内容:</label>
        <textarea
          id="message"
          v-model="message"
          placeholder="请输入短信内容"
          required
        ></textarea>
      </div>

      <button type="submit" :disabled="isSending">
        {{ isSending ? '发送中...' : '发送短信' }}
      </button>
    </form>

    <div class="feedback">
      <p v-if="success" class="success">短信发送成功！</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSmsSender } from '@/composables/useSmsSender';

const phoneNumber = ref('');
const message = ref('');
const { isSending, success, error, sendSms } = useSmsSender();

const handleSend = () => {
  if (!phoneNumber.value || !message.value) {
    alert('请填写手机号和短信内容');
    return;
  }
  sendSms(phoneNumber.value, message.value);
};
</script>

<style scoped>
.sms-sender-container {
  background-color: var(--sms-bg-color, #f9f9f9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--box-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
  max-width: 400px;
  margin: 20px auto;
  transition: background-color 0.3s, box-shadow 0.3s;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: var(--sms-title-color, #333);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--sms-label-color, #555);
}

input,
textarea {
  padding: 10px;
  border: 1px solid var(--input-border-color, #ccc);
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus {
  border-color: var(--input-focus-border-color, #3498db);
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: var(--button-bg-color, #2ecc71);
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:disabled {
  background-color: var(--button-disabled-bg-color, #95a5a6);
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: var(--button-hover-bg-color, #27ae60);
  transform: translateY(-2px);
}

.feedback {
  margin-top: 15px;
  text-align: center;
}

.success {
  color: var(--feedback-success-color, #27ae60);
  font-weight: bold;
}

.error {
  color: var(--feedback-error-color, #e74c3c);
  font-weight: bold;
}
</style>
