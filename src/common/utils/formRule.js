export const formRules = {
  required: (fieldName, type = "type") => ({
    required: true,
    message: `Vui lòng ${
      type === "type" ? "nhập" : "chọn"
    } ${fieldName.toLowerCase()}!`,
  }),

  minLength: (label, min) => ({
    min,
    message: `${label} ít nhất ${min} ký tự!`,
  }),

  maxLength: (label, max) => ({
    max,
    message: `${label} tối đa ${max} ký tự!`,
  }),

  textRange: (label, min, max) => ({
    validator: (_, value) => {
      if (!value) return Promise.resolve();
      const length = value.trim().length;
      if (length < min)
        return Promise.reject(new Error(`${label} ít nhất ${min} ký tự!`));
      if (length > max)
        return Promise.reject(new Error(`${label} tối đa ${max} ký tự!`));
      return Promise.resolve();
    },
  }),
};