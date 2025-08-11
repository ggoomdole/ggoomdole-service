import { clientApi } from "./api";

export const uploadProfileImage = async (formData: FormData) => {
  return clientApi.post("users/image", undefined, { body: formData });
};
