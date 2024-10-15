// src/composables/useFormValidation.ts
import { reactive, Ref } from 'vue';

interface ValidationRule {
  validator: (value: any) => string | null;
}

interface UseFormValidationReturn {
  values: any;
  errors: any;
  validateField: (field: string) => boolean;
  validateAll: () => boolean;
  reset: () => void;
}

export function useFormValidation(
  initialValues: Record<string, any>,
  validationRules: Record<string, ValidationRule[]>
): UseFormValidationReturn {
  const values = reactive({ ...initialValues });
  const errors = reactive<Record<string, string | null>>({});

  const validateField = (field: string): boolean => {
    const rules = validationRules[field];
    if (!rules) return true;

    for (const rule of rules) {
      const error = rule.validator(values[field]);
      if (error) {
        errors[field] = error;
        return false;
      } else {
        errors[field] = null;
      }
    }
    return true;
  };

  const validateAll = (): boolean => {
    let isValid = true;
    for (const field in validationRules) {
      const valid = validateField(field);
      if (!valid) isValid = false;
    }
    return isValid;
  };

  const reset = () => {
    for (const key in initialValues) {
      values[key] = initialValues[key];
      errors[key] = null;
    }
  };

  return {
    values,
    errors,
    validateField,
    validateAll,
    reset,
  };
}
