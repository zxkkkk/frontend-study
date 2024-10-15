<template>
  <div class="form-container">
    <h2>用户注册</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">用户名:</label>
        <input
          id="username"
          v-model="values.username"
          @blur="() => validateField('username')"
          type="text"
          placeholder="请输入用户名"
          required
        />
        <span v-if="errors.username" class="error">{{ errors.username }}</span>
      </div>

      <div class="form-group">
        <label for="email">邮箱:</label>
        <input
          id="email"
          v-model="values.email"
          @blur="() => validateField('email')"
          type="email"
          placeholder="请输入邮箱"
          required
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-buttons">
        <button type="submit">提交</button>
        <button type="button" @click="reset">重置</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useFormValidation } from '@/composables/useFormValidation';

const initialValues = {
  username: '',
  email: '',
};

const validationRules = {
  username: [
    {
      validator: (value: string) => (!value ? '用户名不能为空' : null),
    },
    {
      validator: (value: string) =>
        value.length < 3 ? '用户名至少需要3个字符' : null,
    },
  ],
  email: [
    {
      validator: (value: string) => (!value ? '邮箱不能为空' : null),
    },
    {
      validator: (value: string) =>
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? '邮箱格式不正确'
          : null,
    },
  ],
};

const { values, errors, validateField, validateAll, reset } =
  useFormValidation(initialValues, validationRules);

const handleSubmit = () => {
  if (validateAll()) {
    alert('表单验证通过！');
    console.log('表单数据:', values);
    // 在这里处理表单提交逻辑，例如发送到服务器
  } else {
    alert('请修正表单中的错误');
  }
};
</script>

<style scoped>
.form-container {
  background-color: var(--form-bg-color, #f9f9f9);
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
  color: var(--form-title-color, #333);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--form-label-color, #555);
}

input {
  padding: 10px;
  border: 1px solid var(--input-border-color, #ccc);
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: var(--input-focus-border-color, #3498db);
  outline: none;
}

.error {
  color: var(--error-color, #e74c3c);
  font-size: 0.875em;
  margin-top: 5px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  flex: 1;
  padding: 10px 0;
  background-color: var(--button-bg-color, #3498db);
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button[type='button'] {
  background-color: var(--button-secondary-bg-color, #95a5a6);
}

button:disabled {
  background-color: var(--button-disabled-bg-color, #bdc3c7);
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: var(--button-hover-bg-color, #2980b9);
  transform: translateY(-2px);
}

button[type='button']:hover {
  background-color: var(--button-secondary-hover-bg-color, #7f8c8d);
}
</style>
