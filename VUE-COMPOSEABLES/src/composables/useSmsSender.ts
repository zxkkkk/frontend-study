// src/composables/useSmsSender.ts
import { ref } from 'vue';

export function useSmsSender() {
  const isSending = ref(false);
  const success = ref(false);
  const error = ref<string | null>(null);

  const sendSms = async (phoneNumber: string, message: string) => {
    isSending.value = true;
    success.value = false;
    error.value = null;
    try {
      // 模拟短信发送延迟
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // 模拟成功发送
      success.value = true;
    } catch (err) {
      error.value = '短信发送失败';
    } finally {
      isSending.value = false;
    }
  };

  return {
    isSending,
    success,
    error,
    sendSms,
  };
}
