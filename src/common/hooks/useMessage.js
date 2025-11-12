import {App} from "antd";

export const useMessage = () => {
  const { message: antdMessage } = App.useApp();

  const HandleError = (error, options = {}) => {
    const {
      type = "error",
      field = "message",
      fallback = "Đã có lỗi xảy ra!",
      silent = false,
    } = options;

    const msg =
      (error?.response?.data && error.response.data[field]) ||
      error?.message ||
      fallback;

      if (!silent) antdMessage[type](msg);

    return msg;
  };

  return { HandleError, antdMessage };
};