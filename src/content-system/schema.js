export const schemas = {
  hero: {
    required: ["title", "subtitle"],
    validate(data) {
      if (typeof data.title !== "string") {
        throw new Error("Hero.title must be a string");
      }

      if (typeof data.subtitle !== "string") {
        throw new Error("Hero.subtitle must be a string");
      }

      if (data.cta) {
        if (typeof data.cta !== "object") {
          throw new Error("Hero.cta must be an object");
        }

        if (typeof data.cta.label !== "string") {
          throw new Error("Hero.cta.label must be a string");
        }

        if (typeof data.cta.href !== "string") {
          throw new Error("Hero.cta.href must be a string");
        }
      }
    }
  }
};
