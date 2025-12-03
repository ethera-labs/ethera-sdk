import urlJoin from "@/utils/api/url-join";

export const endpoint = (...paths: (string | number)[]) => {
  return urlJoin(...paths.map(String));
};
