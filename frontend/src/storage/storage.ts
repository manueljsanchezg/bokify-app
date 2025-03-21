import { useLocalStorage } from "@vueuse/core";

export const jwtStorage = useLocalStorage('jwt', '');