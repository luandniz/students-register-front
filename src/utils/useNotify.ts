import { Notify } from "quasar";

export const showPositiveNotify = (message: string) => {
  Notify.create({
    type: "positive",
    color: "green",
    message: message,
    html: true,
    progress: true,
    position: "top-right",
  });
};

export const showNegativeNotify = (message: string) => {
  Notify.create({
    type: "negative",
    message: message,
    html: true,
    progress: true,
    position: "top-right",
  });
};
